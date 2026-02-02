#!/usr/bin/env node

import { preview } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Iniciar o servidor de preview com configurações específicas
async function startPreview() {
  try {
    const server = await preview({
      configFile: path.resolve(__dirname, 'vite.config.ts'),
      preview: {
        host: '0.0.0.0',
        port: 8321,
        strictPort: false,
        allowedHosts: [
          'multerless.purecore.codes',
          'multerless.purecore.codes:443',
          'multerless.purecore.codes:8321',
          '::ffff:127.0.0.1'
        ]
      }
    });

    console.log(`Preview server running at:`);
    server.printUrls();
  } catch (error) {
    console.error('Erro ao iniciar o servidor de preview:', error);
    process.exit(1);
  }
}

startPreview();