import crypto from "crypto";

export const generateCertificateHash = (payload) => {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(payload))
    .digest("hex");
};