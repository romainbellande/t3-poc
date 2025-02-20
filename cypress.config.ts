import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL!,
  },
  env: {
    AUTH_USERNAME: process.env.AUTH_USERNAME!,
    AUTH_PASSWORD: process.env.AUTH_PASSWORD!,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN!,
    CYPRESS_BASE_URL: process.env.CYPRESS_BASE_URL!,
  },
});
