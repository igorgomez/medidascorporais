# Diretrizes de Design - Aplicação de Medidas Corporais

## Abordagem de Design

**Design System:** Material Design adaptado para aplicações de saúde e fitness, com influência de dashboards modernos como Notion e Linear para apresentação de dados.

**Justificativa:** Aplicação utilitária focada em eficiência, legibilidade de dados e uso frequente. Requer componentes padronizados, hierarquia clara e visualização eficaz de informações.

---

## Tipografia

**Famílias de Fonte:**
- Primary: Inter (via Google Fonts) - interface, formulários, dados
- Monospace: JetBrains Mono - valores numéricos em gráficos e medições

**Hierarquia:**
- H1 (Título Principal): 2.5rem/3rem (mobile/desktop), font-weight 700
- H2 (Seções): 1.75rem/2rem, font-weight 600
- H3 (Sub-seções): 1.25rem/1.5rem, font-weight 600
- Body (Texto padrão): 1rem, font-weight 400
- Small (Labels, metadados): 0.875rem, font-weight 500
- Numbers (Medições): 1.5rem-2rem, font-weight 600, monospace

---

## Sistema de Layout

**Espaçamento Primitivo (Tailwind):** Use unidades 2, 4, 6, 8, 12, 16, 20

**Estrutura de Página:**
- Container principal: max-w-6xl mx-auto px-4
- Seções: py-8 (mobile), py-12 (desktop)
- Cards/Componentes: p-6
- Gaps entre elementos: gap-4 (padrão), gap-6 (seções)

**Grid System:**
- Mobile: single column (grid-cols-1)
- Tablet: 2 columns para cards (md:grid-cols-2)
- Desktop: até 3 columns (lg:grid-cols-3)

---

## Biblioteca de Componentes

### Navegação
**Header Superior:**
- Posição fixa no topo (sticky top-0)
- Altura: h-16
- Logo/título à esquerda
- Ações principais à direita (exportar dados, adicionar medição)
- Mobile: menu hamburger se necessário

**Tabs/Navegação Secundária:**
- Pills horizontais para alternar entre "Registrar", "Gráficos Temporais", "Radar", "Histórico"
- Indicador visual da tab ativa (underline ou background)
- Scroll horizontal no mobile

### Formulários
**Card de Registro de Medidas:**
- Card elevado com sombra sutil (shadow-md)
- Formulário vertical com campos agrupados logicamente
- Inputs com labels flutuantes ou acima
- Campos numéricos com step controls (+/-)
- Date/time picker para registro da medição
- Botão primário de submit destacado
- Validação inline com feedback imediato

**Input Fields:**
- Altura: h-12
- Border radius: rounded-lg
- Padding: px-4
- Focus state com outline visível
- Placeholder text descritivo
- Unidades de medida (kg, cm) exibidas como suffix

### Visualização de Dados

**Cards de Gráfico:**
- Background branco/neutro com borda sutil
- Padding interno: p-6
- Header do card com título da medida e período
- Área do gráfico: min-height de 300px (mobile), 400px (desktop)
- Tooltip interativo ao hover/touch nos pontos

**Gráfico de Radar:**
- Posição central destacada
- Legenda clara com todas as medidas
- Tamanho responsivo: 100% width do container, max 500px
- Labels legíveis em todas as dimensões

**Lista Histórica:**
- Table responsiva ou cards empilhados (mobile)
- Cada entrada mostra: data/hora, todas medidas, ação de deletar
- Ordenação cronológica reversa (mais recente primeiro)
- Alternância de background em linhas (zebra striping)
- Ação de delete com confirmação

### Overlays & Ações

**Botões:**
- Primary: rounded-lg, px-6, py-3, font-weight 600
- Secondary: outline variant com border
- Icon buttons: w-10 h-10, rounded-full
- Disabled state claramente visível

**Modal de Confirmação:**
- Backdrop semi-transparente
- Modal centralizado, max-width md
- Título, mensagem, botões de ação
- Close button (X) no canto superior direito

**Toast/Notificações:**
- Posição: top-right ou bottom-center
- Auto-dismiss após 3-4 segundos
- Ícone de status (sucesso, erro, info)

---

## Ícones

**Biblioteca:** Heroicons (via CDN)
- Adicionar medição: plus-circle
- Gráficos: chart-bar
- Radar: radar (ou circle-stack)
- Histórico: clock
- Exportar: download
- Deletar: trash
- Configurações: cog

---

## Animações

**Mínimas e Funcionais:**
- Transições de tab: 200ms ease
- Chart load animation: fade-in suave
- Modal open/close: scale + fade (150ms)
- Hover states: 100ms ease
- Evitar animações complexas que prejudicam performance em mobile

---

## Responsividade Mobile-First

**Breakpoints:**
- Mobile: < 768px - layout vertical, stack completo
- Tablet: 768px-1024px - 2 colunas para cards
- Desktop: > 1024px - 3 colunas, layouts lado a lado

**Adaptações Mobile:**
- Formulário: inputs full-width, espaçamento generoso (min-height 48px para touch)
- Gráficos: scroll horizontal se necessário, gestos touch-friendly
- Tabs: scroll horizontal com indicadores de overflow
- Tabelas: transformar em cards empilhados
- Floating action button para "Adicionar Medição" (bottom-right, fixed)

---

## Acessibilidade

- Labels descritivos em todos inputs
- Focus states visíveis em todos elementos interativos
- Contraste mínimo WCAG AA (4.5:1 para texto normal)
- ARIA labels em ícones e botões sem texto
- Keyboard navigation completa
- Skip to content link
- Mensagens de erro descritivas e associadas aos campos

---

## Imagens

**Uso de Imagens:** Não recomendado para esta aplicação utilitária focada em dados. Priorize visualização de informações através de gráficos e ícones.

**Se necessário:** Avatares de usuário (opcional) ou ilustrações sutis para estado vazio ("Nenhuma medição registrada ainda").