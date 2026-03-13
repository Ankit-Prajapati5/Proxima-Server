import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    unique: true,
    index: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },

  hash: {
    type: String,
    required: true,
  },
  pdfUrl: {
    type: String,
  },

  issuedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Certificate", certificateSchema);
