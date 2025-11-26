# Guia de Deployment no GitHub Pages

Sua aplicação de Medidas Corporais está pronta para ser hospedada no GitHub Pages! A aplicação usa Firebase/Firestore para persistência de dados na nuvem.

## 🔥 Pré-requisitos: Configurar Firebase

**IMPORTANTE**: Antes de fazer o deployment, você precisa configurar o Firebase seguindo o guia completo em [`FIREBASE_SETUP.md`](FIREBASE_SETUP.md).

Resumo:
1. Criar projeto Firebase
2. Ativar Authentication (Anonymous)
3. Criar Firestore Database
4. Configurar regras de segurança
5. Obter as credenciais do projeto

## Opção 1: Deployment Automático com GitHub Actions ⭐ (Recomendado)

### Passo 1: Configure as Secrets do Firebase

**CRUCIAL**: Antes de fazer push, adicione as secrets do Firebase:

1. Vá para **Settings > Secrets and variables > Actions** no GitHub
2. Adicione cada uma destas secrets (clique em "New repository secret"):
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

Veja os valores corretos em `FIREBASE_SETUP.md`.

### Passo 2: Prepare seu repositório
1. Crie um repositório no GitHub chamado `medidas-corporais` (ou o nome que preferir)
2. Clone este projeto para o repositório
3. Configure a origem remota:
   ```bash
   git remote add origin https://github.com/seu-usuario/medidas-corporais.git
   git branch -M main
   git push -u origin main
   ```

### Passo 3: Configure GitHub Pages
1. Vá para as configurações do repositório no GitHub
2. Acesse **Settings > Pages**
3. Em "Build and deployment", selecione:
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` (será criada automaticamente pelo Actions)

### Passo 4: Deploy automático
O arquivo `.github/workflows/deploy.yml` já está configurado no projeto com as env vars Firebase. Basta fazer push para a main branch:

```bash
git push
```

O GitHub Actions fará o build e deployment automaticamente! ✨

**Importante**: O build só funcionará se você configurou as secrets do Firebase no Passo 1.

## Opção 2: Deployment Manual

### Passo 1: Build para produção
```bash
npm run build
```

### Passo 2: Deploy para GitHub Pages
Você pode usar o `gh-pages` package:

```bash
npm install --save-dev gh-pages
```

Adicione este script ao seu `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && npx gh-pages -d dist/public"
  }
}
```

Então execute:
```bash
npm run deploy
```

## Opção 3: Configuração Manual do vite.config.ts

Se o seu repositório NÃO for `username.github.io`, você precisa adicionar a configuração de base:

Edite `vite.config.ts` e adicione:
```typescript
export default defineConfig({
  // ... resto da config
  base: '/medidas-corporais/', // substitua pelo nome do seu repositório
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  // ...
});
```

**Observação**: Se seu repositório for `username.github.io`, deixe `base` como `/` (padrão).

## Estrutura de Deployment

```
seu-repo/
├── dist/public/         ← Pasta gerada pelo build (será servida pelo GitHub Pages)
│   ├── index.html
│   ├── assets/
│   └── ...
├── client/              ← Código-fonte React
├── server/              ← Código do servidor (NÃO será deployado)
├── .github/workflows/   ← Configuração do GitHub Actions
└── ...
```

## Dados dos Usuários

A aplicação usa **Firebase/Firestore** para armazenar dados na nuvem. Isso significa:
- ✅ Dados sincronizados entre dispositivos
- ✅ Autenticação anônima segura (cada usuário tem ID único)
- ✅ Backup automático na nuvem
- ✅ Regras de segurança impedem acesso aos dados de outros usuários
- ✅ Migração automática de dados do localStorage (se existirem)

### Backup de Dados
Usuários podem fazer backup clicando em "Exportar Dados" para baixar um arquivo JSON com suas medições.

## Verificar o Deployment

Após o deployment, sua aplicação estará disponível em:

**Se usar GitHub Actions (recomendado):**
- `https://seu-usuario.github.io/medidas-corporais/`

**Se o repo for seu site principal:**
- `https://seu-usuario.github.io/`

## Troubleshooting

### Erro: Firebase configuration not found
- Verifique se adicionou todas as 6 secrets do Firebase no GitHub
- Confirme que os nomes das secrets estão corretos (com prefixo `VITE_`)

### Página em branco após deployment
- Verifique se configurou corretamente a base URL no `vite.config.ts`
- Verifique se o Firebase está configurado corretamente

### Erro ao fazer login / registrar medições
- Abra o Console do navegador (F12) e veja os erros
- Verifique se ativou Authentication (Anonymous) no Firebase Console
- Confirme que criou o Firestore Database
- Verifique as regras de segurança do Firestore

### Assets não carregam
Certifique-se que `dist/public` foi gerado corretamente rodando:
```bash
npm run build
```

## Mais Informações

Para detalhes completos sobre configuração Firebase, veja [`FIREBASE_SETUP.md`](FIREBASE_SETUP.md).

### GitHub Pages não atualiza
- Verifique se o workflow rodou com sucesso em **Actions**
- Confirme que o branch `gh-pages` foi criado em **Settings > Pages**
- Limpe o cache do navegador (Ctrl+Shift+Delete)

## Suporte

Para mais informações sobre GitHub Pages, consulte:
https://docs.github.com/en/pages
