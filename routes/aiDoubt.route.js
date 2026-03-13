import express from "express";
const router = express.Router();

import {askAIDoubt} from "../controllers/aiDoubt.controller.js"

router.post("/",askAIDoubt)

export default router;