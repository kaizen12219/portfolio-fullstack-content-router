import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { projects } from "./content.js";
import { selectProjects } from "./router.js";

const port = Number(process.env.PORT ?? 4177);
const publicDir = fileURLToPath(new URL("../public/", import.meta.url));

createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host}`);

  if (url.pathname === "/api/projects") {
    const variant = url.searchParams.get("variant") ?? "fullstack-product";
    const accent = url.searchParams.get("accent") ?? "node";
    sendJson(response, {
      variant,
      accent,
      projects: selectProjects(projects, { variant, accent })
    });
    return;
  }

  const fileName = url.pathname === "/" ? "index.html" : url.pathname.slice(1);
  try {
    const file = await readFile(join(publicDir, fileName), "utf8");
    response.writeHead(200, { "content-type": contentType(fileName) });
    response.end(file);
  } catch {
    response.writeHead(404, { "content-type": "text/plain" });
    response.end("Not found");
  }
}).listen(port, () => {
  console.log(`Portfolio content router listening on http://localhost:${port}`);
});

function sendJson(response, payload) {
  response.writeHead(200, { "content-type": "application/json" });
  response.end(JSON.stringify(payload, null, 2));
}

function contentType(fileName) {
  return extname(fileName) === ".js" ? "text/javascript" : "text/html";
}
