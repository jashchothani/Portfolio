import dns from "node:dns";

// Force IPv4 first to prevent ENETUNREACH errors on cloud container hosts (Render/Docker)
try {
  dns.setDefaultResultOrder("ipv4first");
} catch {
  // Ignore in older Node versions
}

import { createApp } from "./app.js";
import { env } from "./config/env.js";

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`🚀 API listening on port ${env.PORT} [${env.NODE_ENV}]`);
  console.log(`   CORS allowed origin: ${env.FRONTEND_URL}`);
});
