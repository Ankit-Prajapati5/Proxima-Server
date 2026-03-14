import express from "express"
import { aiHelper } from "../controllers/aiCodeController.js"

const router = express.Router()

router.post("/ai-helper",aiHelper)

export default router