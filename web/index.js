import { createServer } from "node:http";

const PORT = Number(process.env.PORT) || 3000;

const sendJson = (res, statusCode, body) => {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });
  res.end(JSON.stringify(body));
};

const server = createServer((req, res) => {
  const url = req.url || "/";

  if (url === "/" || url === "/api") {
    return sendJson(res, 200, {
      message: "Hello from local Node.js JSON server",
      ok: true,
      timestamp: new Date().toISOString()
    });
  }

  if (url === "/health") {
    return sendJson(res, 200, { status: "ok" });
  }

  return sendJson(res, 404, {
    error: "Not Found",
    path: url
  });
});

server.listen(PORT, () => {
  console.log(`JSON server is running on http://localhost:${PORT}`);
});
