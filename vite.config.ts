import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias for tinymce so Vite can resolve it correctly
      tinymce: path.resolve(__dirname, "node_modules/tinymce/tinymce.js"),
      "tinymce/icons/default": path.resolve(
        __dirname,
        "node_modules/tinymce/icons/default/icons.js"
      ),
      "tinymce/plugins": path.resolve(
        __dirname,
        "node_modules/tinymce/plugins"
      ),
      "tinymce/themes/silver": path.resolve(
        __dirname,
        "node_modules/tinymce/themes/silver/theme.js"
      ),
      "tinymce/skins/ui/oxide": path.resolve(
        __dirname,
        "node_modules/tinymce/skins/ui/oxide"
      ),
    },
  },
});
