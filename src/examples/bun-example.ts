/**
 * Exemplo de uso do nexmulter com Bun (usando Elysia)
 */

import { Elysia } from "elysia";
import { createBunMulter } from "../adapters/bun.js";
import { diskStorage } from "../storage/index.js";

const app = new Elysia();

// Cria instância do multer para Bun
const upload = createBunMulter({
  storage: diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// Rota para upload de arquivo único
app.post("/upload/single", async ({ request }) => {
  const result = await upload.single(request, "file");

  return {
    message: "Arquivo enviado com sucesso!",
    file: result.file,
    body: result.body,
  };
});

// Rota para upload de múltiplos arquivos
app.post("/upload/array", async ({ request }) => {
  const result = await upload.array(request, "photos", 10);

  return {
    message: "Arquivos enviados com sucesso!",
    files: result.files,
    body: result.body,
  };
});

// Rota para upload de campos mistos
app.post("/upload/fields", async ({ request }) => {
  const result = await upload.fields(request, [
    { name: "avatar", maxCount: 1 },
    { name: "gallery", maxCount: 8 },
  ]);

  return {
    message: "Arquivos enviados com sucesso!",
    files: result.files,
    body: result.body,
  };
});

// Rota para apenas campos de texto
app.post("/upload/none", async ({ request }) => {
  const result = await upload.none(request);

  return {
    message: "Dados recebidos com sucesso!",
    body: result.body,
  };
});

// Rota para qualquer arquivo
app.post("/upload/any", async ({ request }) => {
  const result = await upload.any(request);

  return {
    message: "Arquivos enviados com sucesso!",
    files: result.files,
    body: result.body,
  };
});

app.listen(3000);

console.log("Servidor Bun (Elysia) rodando em http://localhost:3000");
console.log("\nTeste com curl:");
console.log(
  'curl -X POST -F "file=@test.txt" -F "title=Teste" http://localhost:3000/upload/single',
);
