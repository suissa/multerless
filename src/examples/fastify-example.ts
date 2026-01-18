/**
 * Exemplo de uso do native-multer com Fastify
 */

import Fastify from "fastify";
import { createFastifyMulter } from "../adapters/fastify.js";
import { diskStorage } from "../storage/index.js";

const fastify = Fastify({ logger: true });

// Cria instância do multer para Fastify
const upload = createFastifyMulter({
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
fastify.post(
  "/upload/single",
  {
    preHandler: upload.single("file"),
  },
  async (request, reply) => {
    return {
      message: "Arquivo enviado com sucesso!",
      file: request.file,
      body: request.body,
    };
  },
);

// Rota para upload de múltiplos arquivos
fastify.post(
  "/upload/array",
  {
    preHandler: upload.array("photos", 10),
  },
  async (request, reply) => {
    return {
      message: "Arquivos enviados com sucesso!",
      files: request.files,
      body: request.body,
    };
  },
);

// Rota para upload de campos mistos
fastify.post(
  "/upload/fields",
  {
    preHandler: upload.fields([
      { name: "avatar", maxCount: 1 },
      { name: "gallery", maxCount: 8 },
    ]),
  },
  async (request, reply) => {
    return {
      message: "Arquivos enviados com sucesso!",
      files: request.files,
      body: request.body,
    };
  },
);

// Rota para apenas campos de texto
fastify.post(
  "/upload/none",
  {
    preHandler: upload.none(),
  },
  async (request, reply) => {
    return {
      message: "Dados recebidos com sucesso!",
      body: request.body,
    };
  },
);

// Inicia o servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Servidor Fastify rodando em http://localhost:3000");
    console.log("\nTeste com curl:");
    console.log(
      'curl -X POST -F "file=@test.txt" -F "title=Teste" http://localhost:3000/upload/single',
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
