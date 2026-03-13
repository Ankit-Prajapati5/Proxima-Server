import express from "express";
import {
  generateCertificate,
  verifyCertificate,
} from "../controllers/certificateController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/generate", isAuthenticated, generateCertificate);

router.get("/verify/:id", verifyCertificate);

export default router;