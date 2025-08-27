import { defineConfig } from "drizzle-kit";

import { config } from "./src/config";

export default defineConfig({
  schema: "src/db/schema.ts",
  out: "src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    // Ch 6. Storage Lv 4. Automatic Migrations
    url: config.db.url,
  },
});