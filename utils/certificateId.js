export const generateCertificateId = () => {
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  const year = new Date().getFullYear();
  return `PRX-${year}-${rand}`;
};