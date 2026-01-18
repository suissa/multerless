/**
 * Exemplo de uso do native-multer com NestJS
 */

import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile as NestUploadedFile,
  UploadedFiles as NestUploadedFiles,
  Body,
  Module,
  NestFactory,
} from "@nestjs/common";
import {
  FileInterceptor,
  FilesInterceptor,
  FileFieldsInterceptor,
  AnyFilesInterceptor,
} from "../adapters/nestjs.js";
import { diskStorage } from "../storage/index.js";
import type { File } from "../types.js";

const storageConfig = {
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
};

@Controller("upload")
export class UploadController {
  // Upload de arquivo único
  @Post("single")
  @UseInterceptors(FileInterceptor("file", storageConfig))
  uploadFile(@NestUploadedFile() file: File, @Body() body: any) {
    return {
      message: "Arquivo enviado com sucesso!",
      file,
      body,
    };
  }

  // Upload de múltiplos arquivos
  @Post("array")
  @UseInterceptors(FilesInterceptor("photos", 10, storageConfig))
  uploadArray(@NestUploadedFiles() files: File[], @Body() body: any) {
    return {
      message: "Arquivos enviados com sucesso!",
      files,
      body,
    };
  }

  // Upload de campos mistos
  @Post("fields")
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: "avatar", maxCount: 1 },
        { name: "gallery", maxCount: 8 },
      ],
      storageConfig,
    ),
  )
  uploadFields(
    @NestUploadedFiles() files: { avatar?: File[]; gallery?: File[] },
    @Body() body: any,
  ) {
    return {
      message: "Arquivos enviados com sucesso!",
      files,
      body,
    };
  }

  // Upload de qualquer arquivo
  @Post("any")
  @UseInterceptors(AnyFilesInterceptor(storageConfig))
  uploadAny(@NestUploadedFiles() files: File[], @Body() body: any) {
    return {
      message: "Arquivos enviados com sucesso!",
      files,
      body,
    };
  }
}

@Module({
  controllers: [UploadController],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  console.log("Servidor NestJS rodando em http://localhost:3000");
  console.log("\nTeste com curl:");
  console.log(
    'curl -X POST -F "file=@test.txt" -F "title=Teste" http://localhost:3000/upload/single',
  );
}

bootstrap();
