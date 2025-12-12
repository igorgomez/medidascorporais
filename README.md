# 📊 Rastreador de Medidas Corporais

Uma aplicação web moderna e responsiva para registrar e acompanhar medidas corporais ao longo do tempo, com gráficos de evolução e visualizações interativas.

## ✨ Características

- 📝 **Registro de Medições**: Peso, altura, peito, cintura, quadril, braço e coxa
- 📈 **Gráficos de Evolução**: Timeline para cada medida com histórico dos últimos 10 registros
- 🎯 **Radar Chart**: Visão geral das medidas mais recentes
- 📱 **Design Responsivo**: Interface adaptada para mobile, tablet e desktop
- 🌓 **Tema Claro/Escuro**: Alternância de temas com preferência salva
- ☁️ **Cloud Sync**: Dados sincronizados na nuvem via Firebase/Firestore
- 🔐 **Multi-usuário**: Suporte a múltiplos usuários com autenticação anônima
- 📤 **Exportação**: Backup dos dados em formato JSON
- 🇧🇷 **Interface em Português**: Totalmente traduzida

## 🚀 Como Usar

### Opção 1: Usar a Aplicação Online (Recomendado)

Após o deploy no GitHub Pages, acesse:
```
https://seu-usuario.github.io/medidas-corporais/
```

### Opção 2: Rodar Localmente

#### Pré-requisitos

- Node.js 18+ instalado
- Conta no Firebase (gratuita)

#### Passo 1: Configurar Firebase

1. Siga as instruções completas em [`FIREBASE_SETUP.md`](FIREBASE_SETUP.md) para:
   - Criar um projeto Firebase
   - Ativar Authentication (Anonymous)
   - Criar database Firestore
   - Obter credenciais do projeto

2. Copie o arquivo de exemplo:
   ```bash
   cp .env.example .env.local
   ```

3. Preencha as variáveis no arquivo `.env.local` com suas credenciais Firebase:
   ```env
   VITE_FIREBASE_API_KEY=sua-api-key-aqui
   VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=seu-projeto-id
   VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```

#### Passo 2: Instalar e Executar

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse: `http://localhost:5173`

#### Passo 3: Build para Produção

```bash
# Gerar build otimizado
npm run build

# Os arquivos estarão em: dist/public/
```

## 📦 Deploy no GitHub Pages

Siga as instruções detalhadas em [`DEPLOY.md`](DEPLOY.md) para:

1. Criar repositório no GitHub
2. Configurar secrets do Firebase no GitHub
3. Ativar GitHub Pages
4. Deploy automático via GitHub Actions

⚠️ **Importante**: O Firebase deve ser configurado antes do deploy!

## 🗂️ Estrutura do Projeto

```
├── client/src/
│   ├── components/          # Componentes React
│   │   ├── MeasurementForm.tsx
│   │   ├── TimelineChart.tsx
│   │   ├── RadarChart.tsx
│   │   ├── HistoryTable.tsx
│   │   ├── AuthButton.tsx
│   │   └── ui/             # Componentes Shadcn
│   ├── contexts/
│   │   └── AuthContext.tsx # Provider de autenticação
│   ├── hooks/
│   │   └── useMeasurements.ts # React Query hooks
│   ├── lib/
│   │   ├── firebase.ts     # Configuração Firebase
│   │   └── measurementService.ts # CRUD Firestore
│   ├── pages/
│   │   └── home.tsx        # Página principal
│   └── App.tsx
├── FIREBASE_SETUP.md       # Guia de configuração Firebase
├── DEPLOY.md              # Guia de deploy
└── README.md              # Este arquivo
```

## 🛠️ Tecnologias

### Frontend
- **React 18** com TypeScript
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização
- **Shadcn/ui** - Componentes UI (Radix UI)
- **Recharts** - Gráficos e visualizações
- **Wouter** - Roteamento
- **React Hook Form** + **Zod** - Formulários e validação

### Backend/Cloud
- **Firebase Authentication** - Login anônimo
- **Cloud Firestore** - Banco de dados NoSQL
- **TanStack Query** - Gerenciamento de estado assíncrono

### Build & Deploy
- **GitHub Actions** - CI/CD
- **GitHub Pages** - Hospedagem estática

## 📱 Funcionalidades Detalhadas

### Registro de Medições
- Formulário com todos os campos opcionais
- Data e hora customizáveis (permite registrar medições antigas)
- Validação: pelo menos uma medida deve ser preenchida
- Feedback visual com toasts de sucesso/erro

### Visualizações
- **Timeline Charts**: Evolução temporal de cada medida (últimos 10 registros)
- **Radar Chart**: Visão geral das medidas mais recentes
- **Tabela de Histórico**: Todos os registros com opção de deletar

### Autenticação
- Login anônimo automático
- Cada usuário recebe ID único
- Dados isolados por usuário
- Logout disponível (cria nova sessão anônima)

### Migração de Dados
- Prompt automático para migrar dados do localStorage
- Migração opcional e segura
- Mantém histórico existente

### Segurança
- Regras Firestore impedem acesso entre usuários
- Credenciais Firebase em variáveis de ambiente
- Sem exposição de dados sensíveis

## 🔧 Scripts Disponíveis

```bash
npm run dev        # Servidor de desenvolvimento
npm run build      # Build de produção
npm run preview    # Preview do build
npm run lint       # Verificar código
```

## 📄 Documentação Adicional

- [**FIREBASE_SETUP.md**](FIREBASE_SETUP.md) - Guia completo de configuração Firebase
- [**DEPLOY.md**](DEPLOY.md) - Instruções de deploy no GitHub Pages
- [**replit.md**](replit.md) - Arquitetura técnica e preferências

## 🐛 Solução de Problemas

### Erro: "Firebase: Error (auth/invalid-api-key)"
- **Causa**: Variáveis de ambiente Firebase não configuradas
- **Solução**: Configure o arquivo `.env.local` seguindo [`FIREBASE_SETUP.md`](FIREBASE_SETUP.md)

### Gráficos vazios
- **Causa**: Nenhuma medição registrada
- **Solução**: Adicione medições pelo formulário

### Dados não sincronizam
- **Causa**: Problema de conexão ou regras Firestore
- **Solução**: Verifique console do navegador e regras Firestore

## 📝 Notas Importantes

1. **Primeiro Uso**: Faça login ao abrir a aplicação pela primeira vez
2. **Dados Locais**: Se tinha dados no localStorage, aparecerá prompt de migração
3. **Ordem Cronológica**: Gráficos sempre mostram ordem correta, mesmo com medições antigas
4. **Backup**: Exporte seus dados regularmente via botão de exportação

## 🌟 Próximas Melhorias Sugeridas

- [ ] Testes unitários e E2E
- [ ] Metas e objetivos personalizados
- [ ] Comparação entre períodos
- [ ] Fotos de progresso
- [ ] Notificações de lembrete
- [ ] Compartilhamento de progresso
- [ ] Gráficos adicionais (IMC, etc)

## 📞 Suporte

Para problemas com:
- **Firebase**: Consulte [Firebase Documentation](https://firebase.google.com/docs)
- **GitHub Pages**: Consulte [GitHub Pages Docs](https://docs.github.com/pages)
- **Aplicação**: Verifique os logs do console do navegador

## 📜 Licença

Este projeto está disponível sob a licença MIT.

---

**Desenvolvido com ❤️ usando React, Firebase e Tailwind CSS**
