/**
 * Inline CSS and JS from the Vite build into a single self-contained HTML file.
 * Output: ../workout.html  (repo root level, next to workout-app/)
 */
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "../dist");
const assetsDir = join(distDir, "assets");

const files = readdirSync(assetsDir);
const cssFile = files.find((f) => f.endsWith(".css"));
const jsFile = files.find((f) => f.endsWith(".js") && !f.includes("workbox") && !f.includes("registerSW"));

if (!cssFile || !jsFile) {
  console.error("Could not find CSS or JS asset in dist/assets/");
  process.exit(1);
}

const css = readFileSync(join(assetsDir, cssFile), "utf8");
const js = readFileSync(join(assetsDir, jsFile), "utf8");

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Workout Generator</title>
    <style>${css}</style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">${js}</script>
  </body>
</html>
`;

const outPath = join(__dirname, "../../workout.html");
writeFileSync(outPath, html, "utf8");
const kb = Math.round(Buffer.byteLength(html, "utf8") / 1024);
console.log(`workout.html rebuilt — ${kb} KB`);
