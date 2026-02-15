# CHANGELOG

## [Release] v1.2.0 - 2026-01-19

### What's Changed

#### 📝 Documentação & Conscientização

- **Artigo Técnico: Alarme sobre Multer** - Criado documento `ARTIGO_ALARME_MULTER.md`
  - Exposição detalhada dos riscos do multer original (9.4M downloads/semana, 6 meses sem update)
  - Análise crítica de 69 PRs pendentes e 178 issues abertas
  - Documentação de vulnerabilidades de segurança conhecidas e não corrigidas
  - Apresentação da filosofia do multerless (0 dependências, versionamento canônico)
  - Proposta de pipeline de automação inteligente para manutenção proativa
  - Guia completo de migração do multer para multerless
  - Visão de futuro para ecossistema npm mais seguro e sustentável

#### 🎯 Filosofia e Princípios

- **Versionamento Canônico**: Estabelecido modelo de apenas 2 versões (1.0.0 e latest)
- **Interface Imutável**: Garantia de nunca quebrar assinaturas, tipos ou contratos de I/O
- **Zero Dependências**: Compromisso permanente de nunca adicionar dependências externas
- **Manutenção Automatizada**: Definição de pipeline semanal de análise de PRs/issues

### Técnica Utilizada

Escrita técnica de artigo de conscientização usando:

- Análise comparativa (multer vs multerless)
- Dados factuais de npm stats e repositório GitHub
- Proposta de arquitetura de estabilidade em camadas
- Definição de pipeline de automação com IA para classificação e correção
- Estrutura persuasiva com foco em segurança e sustentabilidade

### Objetivo

Alertar a comunidade Node.js sobre os riscos de usar bibliotecas críticas sem manutenção ativa e posicionar o multerless como solução estável, segura e sustentável a longo prazo.

## [Release] v1.1.1 - 2026-01-19

### What's Changed

#### 📝 Documentação

- **Internacionalização (i18n)** - README traduzido para 8 novos idiomas:
  - Português (pt-BR)
  - Français (fr)
  - Deutsch (de)
  - Italiano (it)
  - Русский (ru)
  - 中文 (简体) (zh-CN)
  - 中文 (繁體) (zh-TW)
  - 日本語 (ja)
- Adicionada barra de navegação de idiomas no topo de todos os arquivos README.

### Técnica Utilizada

- Criação manual de arquivos Markdown separados para cada idioma (`README.lang.md`).
- Adaptação técnica dos termos mantendo a precisão das instruções de instalação e uso da API.

#### 🎨 Interface

- Atualizado background do site para `#0d1117` (GitHub Dark Dimmed).
- Adicionado logo oficial no header.

## [Release] v1.1.0 - 2026-01-18

### What's Changed

#### ✨ Novos Recursos

- **Multi-Framework Support** - Suporte oficial para Fastify, NestJS e Bun
  - Criado factory pattern com detecção automática de frameworks
  - Implementado `FastifyMulter` com suporte a preHandlers
  - Implementado `NestMulterInterceptor` com decorators completos (@UploadedFile, @UploadedFiles)
  - Implementado `BunMulter` com plugins para Elysia e Hono
- **Novos Exports**
  - `createMulterForFramework()` - Cria instância para framework específico
  - `createMulterAuto()` - Detecção automática de framework
  - `detectFramework()` - Função helper para detectar framework
  - `createFastifyMulter()` - Factory para Fastify
  - `createNestMulter()` - Factory para NestJS
  - `createBunMulter()` - Factory para Bun

#### 📝 Documentação

- Adicionada seção completa de Multi-Framework Support no README.md
- Exemplos de código para cada framework (Fastify, NestJS, Bun/Elysia)
- Documentação de framework detection
- Guia de uso para cada adapter

#### 📁 Arquivos Criados

- `src/factory.ts` - Factory principal com detecção de frameworks
- `src/adapters/fastify.ts` - Adapter para Fastify
- `src/adapters/nestjs.ts` - Adapter para NestJS com interceptors
- `src/adapters/bun.ts` - Adapter para Bun com suporte Elysia e Hono
- `src/adapters/index.ts` - Exports centralizados
- `src/examples/fastify-example.ts` - Exemplo completo Fastify
- `src/examples/nestjs-example.ts` - Exemplo completo NestJS
- `src/examples/bun-example.ts` - Exemplo completo Bun/Elysia

#### 🔧 Configurações

- Atualizado `tsconfig.json` para incluir tipos DOM e excluir exemplos do build
- Adicionado `@ts-nocheck` em adapters para permitir peer dependencies opcionais
- Mantida retrocompatibilidade com uso tradicional do Express

### Técnica Utilizada

Implementação de **Factory Pattern** com **Strategy Pattern** para adapters específicos por framework:

- Factory detecta o framework automaticamente ou permite seleção manual
- Cada adapter converte as interfaces específicas do framework (FastifyRequest, NestJS ExecutionContext, Bun Request) para a interface esperada pelo Multer
- Uso de `@ts-nocheck` permite que a biblioteca compile sem ter todas as peer dependencies instaladas
- Peer dependencies são marcadas como opcionais no `package.json`

### Breaking Changes

Nenhuma breaking change - toda funcionalidade anterior continua funcionando.

### Notas

- Os adapters usam peer dependencies opcionais (Fastify, NestJS, Bun não são instalados automaticamente)
- Exemplos na pasta `src/examples` não são incluídos no build final
- Framework detection funciona pela análise de propriedades específicas do objeto request
