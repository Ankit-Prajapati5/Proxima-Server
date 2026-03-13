import Certificate from "../models/Certificate.js";
import CoursePurchase from "../models/coursePurchase.model.js";
import { generateCertificateHash } from "../utils/hashCertificate.js";
import { generateCertificateId } from "../utils/certificateId.js";
import html_to_pdf from "html-pdf-node";
import { certificateTemplate } from "../utils/certificateTemplate.js";
import imagekit from "../utils/imagekit.js";


export const generateCertificate = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user._id;

  const purchase = await CoursePurchase.findOne({
    user: userId,
    course: courseId,
    paymentStatus: "success",
  }).populate("course");

  if (!purchase) {
    return res.status(404).json({
      message: "Course purchase not found",
    });
  }

  const totalLectures = purchase.course.lectures.length;
  const completedLectures =
    purchase.progress?.completedLectures?.length || 0;

  const percent =
    totalLectures > 0
      ? Math.round((completedLectures / totalLectures) * 100)
      : 0;

  if (percent !== 100) {
    return res.status(403).json({
      message: "Course not completed",
    });
  }

  const existing = await Certificate.findOne({
    user: userId,
    course: courseId,
  });

  if (existing) {
    return res.json(existing);
  }

  const certificateId = generateCertificateId();

  const hash = generateCertificateHash({
    userId,
    courseId,
    certificateId,
  });

  // HTML template
  const html = certificateTemplate({
    name: req.user.name,
    course: purchase.course.courseTitle,
    certificateId,
    issueDate: new Date().toDateString(),
    verifyUrl: `https://proxima.edorotechnologies.com/verify/${certificateId}`,
  });

  // PDF options
  const options = {
    format: "A4",
    landscape: true,
    printBackground: true,
  };

  const file = { content: html };

  const pdfBuffer = await html_to_pdf.generatePdf(file, options);

  // Upload to ImageKit
  const upload = await imagekit.upload({
    file: pdfBuffer.toString("base64"),
    fileName: `Proxima-Certificate-${certificateId}.pdf`,
    folder: "/proxima-certificates",
  });

  const certificate = await Certificate.create({
    certificateId,
    user: userId,
    course: courseId,
    hash,
    pdfUrl: upload.url,
  });

  res.json(certificate);
};

export const downloadCertificate = async (req, res) => {
  const cert = await Certificate.findOne({
    certificateId: req.params.id,
  });

  if (!cert) {
    return res.status(404).json({
      message: "Certificate not found",
    });
  }

  return res.redirect(cert.pdfUrl);
};

export const verifyCertificate = async (req, res) => {
  const cert = await Certificate.findOne({
    certificateId: req.params.id,
  })
    .populate("user")
    .populate("course");

  if (!cert) {
    return res.json({
      valid: false,
    });
  }

  res.json({
    valid: true,
    name: cert.user.name,
    course: cert.course.courseTitle,
    issuedAt: cert.issuedAt,
    pdfUrl: cert.pdfUrl,
  });
};
