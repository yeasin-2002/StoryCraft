export const Env = {
  DATABASE_URL: process.env.DATABASE_URL || "",

  // NextAuth
  GITHUB_ID: process.env.GITHUB_ID || "",
  GITHUB_SECRET: process.env.GITHUB_SECRET || "",
  GOOGLE_ID: process.env.GOOGLE_ID || "",
  GOOGLE_SECRET: process.env.GOOGLE_SECRET || "",
  NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET,

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRETE: process.env.CLOUDINARY_API_SECRETE || "",
  CLOUDINARY_API_ENVIRONMENT_VARIABLE:
    process.env.CLOUDINARY_API_ENVIRONMENT_VARIABLE || "",
};
