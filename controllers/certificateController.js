import Certificate from "../models/Certificate.js";
import CoursePurchase from "../models/coursePurchase.model.js";
import { generateCertificateHash } from "../utils/hashCertificate.js";
import { generateCertificateId } from "../utils/certificateId.js";
import puppeteer from "puppeteer";
import { certificateTemplate } from "../utils/certificateTemplate.js";

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

export const downloadCertificate = async (req,res) => {

try{

const cert = await Certificate.findOne({
certificateId:req.params.id
})
.populate("user")
.populate("course");

if(!cert){
return res.status(404).json({
message:"Certificate not found"
});
}

const browser = await puppeteer.launch({
  headless: "new",
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage"
  ]
});

const page = await browser.newPage();

const html = certificateTemplate({

name: cert.user.name,
course: cert.course.courseTitle,
certificateId: cert.certificateId,
issueDate: cert.issuedAt.toDateString(),
verifyUrl:`https://proxima.edorotechnologies.com/verify/${cert.certificateId}`

});

await page.setContent(html,{
waitUntil:"networkidle0"
});

const pdf = await page.pdf({

format:"A4",
landscape:true,
printBackground:true

});

await browser.close();

res.set({

"Content-Type":"application/pdf",
"Content-Disposition":`attachment; filename=Proxima-Certificate-${cert.certificateId}.pdf`

});

res.send(pdf);

}catch(err){

console.log(err);
res.status(500).json({
message:"Error generating certificate"
});

}

};