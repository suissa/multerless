# CaC - Capability and Contract as Code

Este projeto utiliza a arquitetura **CaC (Capabilities as Code)** para garantir que as regras de negócio, invariantes de segurança e especificações técnicas sejam aplicadas de forma determinística e automatizada.

## 🏗️ Estrutura

A lógica está dividida em duas partes principais:

1.  **`.cac/`**: Contém as definições declarativas (YAML/Markdown).
    - `invariants.yml`: Regras que nunca devem ser violadas (ex: proibição de dependências externas).
    - `ruleset.yml`: Conjunto de regras críticas aplicadas ao projeto.
    - `specifications/`: Documentos detalhados de especificações técnicas.
    - `decisions/`: Registro de decisões arquiteturais (ADRs).

2.  **`src/cac/`**: Implementação da validação das regras.
    - `executor.ts`: Ponto de entrada para validação completa.
    - `loaders.ts`: Carregador de contexto que lê os arquivos da pasta `.cac`.
    - `validators/`: Lógica específica para validar cada tipo de contrato.

## 🛡️ Execução e Garantia

As regras são aplicadas de duas formas:

### 1. Validação Estática (CI/Build)
O `executor.ts` verifica se o estado atual do projeto respeita todas as especificações e invariantes. Se houver violação, o processo é interrompido.

### 2. Validação via Decorator (Runtime)
Utilizamos o decorator `@ValidateUpload` para garantir que as regras definidas no CaC (como limites de tamanho e tipos de arquivo) sejam aplicadas em tempo de execução nos métodos de storage.

```typescript
// Exemplo em src/storage/disk.ts
@ValidateUpload()
_handleFile(req, file, callback) { ... }
```

## 📝 Manifesto

O manifesto do projeto, presente em `.cac/manifesto.md`, define que este software é **Mission Critical**, priorizando estabilidade e segurança sobre novas funcionalidades, com o compromisso de manter **Zero Dependências Externas**.

---
*Gerado automaticamente pela arquitetura CaC em February 2026*
