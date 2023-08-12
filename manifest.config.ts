import { defineManifest } from "@crxjs/vite-plugin";
// @ts-ignore
import packageJson from "./package.json";

const { version, name, description } = packageJson;

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name: env.command === "serve" ? `[DEV] ${name}` : name,
  version: version,
  version_name: version,
  description: description,
  icons: {
    16: "icons/icon16.png",
    32: "icons/icon32.png",
    48: "icons/icon48.png",
    128: "icons/icon128.png",
  },
  action: {
    default_icon: {
      16: "icons/icon16.png",
      32: "icons/icon32.png",
      48: "icons/icon48.png",
      128: "icons/icon128.png",
    },
    default_popup: "src/popup/popup.html",
  },
  background: {
    service_worker: "src/serviceWorker/index.ts",
  },
  content_scripts: [
    {
      js: ["src/contentScript/index.ts"],
      matches: ["*://*/*"],
    },
  ],
  options_page: "src/options/index.html",
  permissions: ["storage", "activeTab"],
  web_accessible_resources: [
    {
      matches: ["*://*/*"],
      resources: ["src/contentScript/index.ts"],
    },
  ],
}));
