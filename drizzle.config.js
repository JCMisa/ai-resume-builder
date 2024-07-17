/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://accounts:1xoDZ3EdXYTQ@ep-autumn-dust-a16tmp0x.ap-southeast-1.aws.neon.tech/ai-resume-builder?sslmode=require",
  },
};
