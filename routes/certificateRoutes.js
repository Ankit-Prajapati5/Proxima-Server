import express from "express";
import {
  generateCertificate,
  verifyCertificate,
  downloadCertificate
} from "../controllers/certificateController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";


const router = express.Router();

router.post("/generate", isAuthenticated, generateCertificate);

router.get("/verify/:id", verifyCertificate);

router.get("/download/:id",isAuthenticated, downloadCertificate);

export default router;