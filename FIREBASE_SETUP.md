# Configuração do Firebase

Este guia ensina como configurar o Firebase/Firestore para a aplicação de Medidas Corporais.

## Passo 1: Criar Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto" ou "Create a project"
3. Digite o nome do projeto (ex: `medidas-corporais`)
4. Desabilite Google Analytics (opcional)
5. Clique em "Criar projeto"

## Passo 2: Registrar Web App

1. Na página inicial do projeto, clique no ícone da Web `</>`
2. Digite um apelido para o app (ex: `medidas-corporais-web`)
3. **NÃO** marque "Firebase Hosting" (vamos usar GitHub Pages)
4. Clique em "Registrar app"
5. **Copie as configurações** que aparecem na tela:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Passo 3: Ativar Authentication

1. No menu lateral, clique em "Authentication"
2. Clique em "Get started" ou "Começar"
3. Na aba "Sign-in method", clique em "Anonymous"
4. **Ative** a autenticação anônima
5. Clique em "Salvar"

## Passo 4: Criar Database Firestore

1. No menu lateral, clique em "Firestore Database"
2. Clique em "Create database" ou "Criar banco de dados"
3. Escolha o modo de produção: **"Start in production mode"**
4. Escolha uma localização próxima (ex: `southamerica-east1` para Brasil)
5. Clique em "Enable" ou "Ativar"

## Passo 5: Configurar Regras de Segurança

1. Na página do Firestore, vá para a aba "Rules" ou "Regras"
2. Cole as seguintes regras de segurança:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permite que usuários autenticados leiam e escrevam apenas seus próprios dados
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Clique em "Publish" ou "Publicar"

## Passo 6: Configurar Variáveis de Ambiente

### Para desenvolvimento local:

1. Copie o arquivo `.env.example` para `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Preencha com os valores do Firebase Console (Passo 2):
   ```env
   VITE_FIREBASE_API_KEY=AIza...
   VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=seu-projeto
   VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

### Para GitHub Pages (produção):

1. Vá para as **Settings** do repositório no GitHub
2. No menu lateral, clique em **Secrets and variables** > **Actions**
3. Clique em **New repository secret** e adicione cada variável:
   - Nome: `VITE_FIREBASE_API_KEY`, Valor: `AIza...`
   - Nome: `VITE_FIREBASE_AUTH_DOMAIN`, Valor: `seu-projeto.firebaseapp.com`
   - Nome: `VITE_FIREBASE_PROJECT_ID`, Valor: `seu-projeto`
   - Nome: `VITE_FIREBASE_STORAGE_BUCKET`, Valor: `seu-projeto.appspot.com`
   - Nome: `VITE_FIREBASE_MESSAGING_SENDER_ID`, Valor: `123456789`
   - Nome: `VITE_FIREBASE_APP_ID`, Valor: `1:123456789:web:abc123`

## Passo 7: Atualizar GitHub Actions Workflow

O arquivo `.github/workflows/deploy.yml` já está configurado para usar as secrets. Certifique-se de que contém:

```yaml
env:
  VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
  VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
  VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
  VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
  VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
  VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
```

## Testando

### Desenvolvimento local:

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173` e teste:
1. Clique em "Entrar" (autenticação anônima)
2. Registre uma medição
3. Verifique se aparece nos gráficos

### Produção (GitHub Pages):

Após fazer push para o GitHub:
1. A GitHub Action fará o build automaticamente
2. O site estará disponível em `https://seu-usuario.github.io/medidas-corporais/`
3. Teste o login e registro de medições

## Migração de Dados Locais

Se você já tinha dados salvos no localStorage:
1. Faça login na aplicação
2. Um aviso aparecerá oferecendo migrar os dados
3. Clique em "Migrar para a nuvem"
4. Os dados serão transferidos automaticamente

## Segurança

✅ **Implementado:**
- Autenticação anônima (cada usuário tem um ID único)
- Regras Firestore que impedem acesso aos dados de outros usuários
- Variáveis de ambiente para proteger chaves
- HTTPS obrigatório via GitHub Pages

⚠️ **Importante:**
- Nunca comite o arquivo `.env.local` no Git
- As chaves Firebase são seguras para uso client-side (com regras corretas)
- Cada usuário só pode acessar seus próprios dados

## Troubleshooting

### Erro: "Firebase: Error (auth/configuration-not-found)"
- Verifique se todas as variáveis de ambiente estão configuradas
- Confirme que habilitou Authentication no console

### Erro: "Missing or insufficient permissions"
- Verifique as regras de segurança do Firestore
- Certifique-se de estar autenticado

### Dados não aparecem após login
- Abra o Console do navegador (F12) e veja os erros
- Verifique se as regras do Firestore estão corretas
- Confirme que o userId nas regras corresponde ao auth.uid

## Suporte

Para mais informações:
- [Documentação Firebase](https://firebase.google.com/docs)
- [Guia Firestore](https://firebase.google.com/docs/firestore)
- [Regras de Segurança](https://firebase.google.com/docs/firestore/security/get-started)
