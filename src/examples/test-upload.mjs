/**
 * Automated test for multerless upload functionality
 */

import { writeFile } from "fs/promises";
import { join } from "path";

// Create a test image (1x1 red pixel PNG)
const createTestImage = () => {
  // Minimal PNG file (1x1 red pixel)
  return Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
    0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
    0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xde, 0x00, 0x00, 0x00,
    0x0c, 0x49, 0x44, 0x41, 0x54, 0x08, 0xd7, 0x63, 0xf8, 0xcf, 0xc0, 0x00,
    0x00, 0x03, 0x01, 0x01, 0x00, 0x18, 0xdd, 0x8d, 0xb4, 0x00, 0x00, 0x00,
    0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
  ]);
};

// Helper to create multipart form data
const createFormData = (fields) => {
  const boundary =
    "----WebKitFormBoundary" + Math.random().toString(36).substring(2);
  let body = "";

  for (const [name, value] of Object.entries(fields)) {
    body += `--${boundary}\r\n`;

    if (Buffer.isBuffer(value)) {
      body += `Content-Disposition: form-data; name="${name}"; filename="test.png"\r\n`;
      body += `Content-Type: image/png\r\n\r\n`;
      body += value.toString("binary");
      body += "\r\n";
    } else {
      body += `Content-Disposition: form-data; name="${name}"\r\n\r\n`;
      body += value;
      body += "\r\n";
    }
  }

  body += `--${boundary}--\r\n`;

  return {
    body: Buffer.from(body, "binary"),
    contentType: `multipart/form-data; boundary=${boundary}`,
  };
};

console.log("🧪 Iniciando testes de upload...\n");

// Test 1: Single file upload
console.log("📤 Teste 1: Upload de arquivo único");
try {
  const testImage = createTestImage();
  const { body, contentType } = createFormData({
    avatar: testImage,
  });

  const response = await fetch("http://localhost:3000/upload/single", {
    method: "POST",
    headers: {
      "Content-Type": contentType,
      "Content-Length": body.length.toString(),
    },
    body,
  });

  const result = await response.json();
  console.log("✅ Resultado:", JSON.stringify(result, null, 2));
} catch (error) {
  console.error("❌ Erro:", error.message);
}

console.log("\n" + "=".repeat(60) + "\n");

// Test 2: Multiple files upload
console.log("📤 Teste 2: Upload de múltiplos arquivos");
try {
  const testImage1 = createTestImage();
  const testImage2 = createTestImage();

  const boundary =
    "----WebKitFormBoundary" + Math.random().toString(36).substring(2);
  let body = "";

  // Add first file
  body += `--${boundary}\r\n`;
  body += `Content-Disposition: form-data; name="photos"; filename="test1.png"\r\n`;
  body += `Content-Type: image/png\r\n\r\n`;
  body += testImage1.toString("binary");
  body += "\r\n";

  // Add second file
  body += `--${boundary}\r\n`;
  body += `Content-Disposition: form-data; name="photos"; filename="test2.png"\r\n`;
  body += `Content-Type: image/png\r\n\r\n`;
  body += testImage2.toString("binary");
  body += "\r\n";

  body += `--${boundary}--\r\n`;

  const bodyBuffer = Buffer.from(body, "binary");

  const response = await fetch("http://localhost:3000/upload/multiple", {
    method: "POST",
    headers: {
      "Content-Type": `multipart/form-data; boundary=${boundary}`,
      "Content-Length": bodyBuffer.length.toString(),
    },
    body: bodyBuffer,
  });

  const result = await response.json();
  console.log("✅ Resultado:", JSON.stringify(result, null, 2));
} catch (error) {
  console.error("❌ Erro:", error.message);
}

console.log("\n" + "=".repeat(60) + "\n");

// Test 3: Memory storage
console.log("📤 Teste 3: Upload para memória");
try {
  const testImage = createTestImage();
  const { body, contentType } = createFormData({
    file: testImage,
  });

  const response = await fetch("http://localhost:3000/upload/memory", {
    method: "POST",
    headers: {
      "Content-Type": contentType,
      "Content-Length": body.length.toString(),
    },
    body,
  });

  const result = await response.json();
  console.log("✅ Resultado:", JSON.stringify(result, null, 2));
} catch (error) {
  console.error("❌ Erro:", error.message);
}

console.log("\n" + "=".repeat(60) + "\n");

// Test 4: Mixed fields
console.log("📤 Teste 4: Upload com campos mistos");
try {
  const testImage = createTestImage();

  const boundary =
    "----WebKitFormBoundary" + Math.random().toString(36).substring(2);
  let body = "";

  // Add text field
  body += `--${boundary}\r\n`;
  body += `Content-Disposition: form-data; name="title"\r\n\r\n`;
  body += "Meu Título de Teste";
  body += "\r\n";

  // Add avatar file
  body += `--${boundary}\r\n`;
  body += `Content-Disposition: form-data; name="avatar"; filename="avatar.png"\r\n`;
  body += `Content-Type: image/png\r\n\r\n`;
  body += testImage.toString("binary");
  body += "\r\n";

  // Add gallery file
  body += `--${boundary}\r\n`;
  body += `Content-Disposition: form-data; name="gallery"; filename="gallery1.png"\r\n`;
  body += `Content-Type: image/png\r\n\r\n`;
  body += testImage.toString("binary");
  body += "\r\n";

  body += `--${boundary}--\r\n`;

  const bodyBuffer = Buffer.from(body, "binary");

  const response = await fetch("http://localhost:3000/upload/fields", {
    method: "POST",
    headers: {
      "Content-Type": `multipart/form-data; boundary=${boundary}`,
      "Content-Length": bodyBuffer.length.toString(),
    },
    body: bodyBuffer,
  });

  const result = await response.json();
  console.log("✅ Resultado:", JSON.stringify(result, null, 2));
} catch (error) {
  console.error("❌ Erro:", error.message);
}

console.log("\n" + "=".repeat(60));
console.log("🎉 Testes concluídos!");
console.log("📁 Verifique a pasta ./uploads/ para ver os arquivos salvos");
