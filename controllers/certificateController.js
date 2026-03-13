import Certificate from "../models/Certificate.js";
import CoursePurchase from "../models/coursePurchase.model.js";
import { generateCertificateHash } from "../utils/hashCertificate.js";
import { generateCertificateId } from "../utils/certificateId.js";

export const generateCertificate = async (req, res) => {

  const { courseId } = req.body;
  const userId = req.user._id;

  const purchase = await CoursePurchase
    .findOne({
      user: userId,
      course: courseId,
      paymentStatus: "success",
    })
    .populate("course");

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

  const certificateId = generateCertificateId();

  const hash = generateCertificateHash({
    userId,
    courseId,
    certificateId,
  });

  const existing = await Certificate.findOne({
  user: userId,
  course: courseId,
});

if (existing) {
  return res.json(existing);
}

  const certificate = await Certificate.create({
    certificateId,
    user: userId,
    course: courseId,
    hash,
  });

  res.json(certificate);
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
  });
};