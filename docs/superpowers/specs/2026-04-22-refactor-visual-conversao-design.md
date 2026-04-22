# Refactor Visual + Conversão — UP Academia

**Data:** 2026-04-22
**Escopo:** site estático multi-página (index, musculação, pilates, funcional, personal, faq, blog)
**Abordagem:** repaint bold mínimo-invasivo (mantém arquitetura CSS/JS modular atual)
**Motivação:** identidade visual fraca + conversão ruim. Não transmite energia/atitude de academia e não converte visitante em lead.

## Princípios

- Reaproveita estrutura CSS modular existente (`tokens.css`, `components.css`, `sections.css`, `animations.css`).
- Reaproveita módulos JS existentes (`carousel.js`, `stats.js`, `reveal.js`, `magnetic.js`, etc.).
- Dark mode já implementado — preservar paridade.
- Respeita `prefers-reduced-motion` em todas animações novas.
- Dedup de header/footer entre HTMLs **fica fora de escopo** (demandaria migração de stack, abordagem futura).

## 1. Identidade visual (tokens)

### Palette

- **Primária:** `--c-primary: #FF5B2E` (laranja — era accent, sobe pra protagonista)
- **Primária-glow:** `--c-primary-glow` (variante +luminosidade pra halos)
- **Secundária:** azul `#1E56FF` rebaixado pra links/detalhe
- **Neutros:** mantém ink/paper/silver existentes
- Atualizar `--g-blue` → `--g-primary` (gradiente principal agora laranja)

### Tipografia

- Display (Space Grotesk) peso **700 padrão** em h1/h2 de seção
- Novo token `--fs-hero`: `clamp(4rem, 2.5rem + 9vw, 14rem)` — exclusivo pra palavra-manifesto e número-chave do hero
- `--fs-3xl` aumenta teto para `~11rem`
- Fraunces serif: usar italic em palavras-chave (reforça padrão existente)

### Motion

- Reveal: variante `reveal-bold` (translate maior + scale 0.96→1 + stagger por linha)
- Marquee: velocidade +30%
- Magnético: aplicar em CTAs primários (já existe módulo)

## 2. Componentes novos

### 2.1 WhatsApp FAB

- Fixo bottom-right, `z-index: var(--z-overlay)`, visível todas páginas
- Ícone WhatsApp SVG + label "Agendar avaliação" (colapsa só-ícone em mobile após scroll > 200px)
- Link: `https://wa.me/5516996151525?text=Oi%2C+quero+agendar+uma+avalia%C3%A7%C3%A3o+na+UP`
- Pulse sutil (desliga em `prefers-reduced-motion`)
- Entrada: 800ms após load OU scroll > 200px (o que vier antes)
- **Arquivos:** `js/modules/whatsapp-fab.js` (novo) + bloco `.whatsapp-fab` em `components.css`
- HTML: snippet copiado em cada página (não há sistema de includes)

### 2.2 Seção Depoimentos rica

- Substitui/expande social proof atual
- Card: foto circular 80px + nome + objetivo (emagrecimento/hipertrofia/reabilitação/performance) + tempo de treino + quote + antes/depois opcional (2 imgs, revela hover/tap)
- Layout: grid 3 cols desktop → carousel 1-slide mobile (`carousel.js`)
- Dados: `assets/data/testimonials.json` ou inline data-attrs (decidir na implementação; JSON preferido)
- **Placeholder aceitável** enquanto cliente não envia fotos/autorização

### 2.3 Stats bar

- Abaixo do hero (home)
- Números: alunos ativos / anos de mercado / avaliação Google (4.9★)
- Counter animado em scroll (`stats.js` existente)
- Placeholder aceitável (estimar com cliente)

### 2.4 CTA hero reforçado

- Dois CTAs: primário "Agendar avaliação grátis" (→ WhatsApp) + secundário "Conhecer modalidades" (→ âncora)
- Primário: cor primária, `--shadow-glow` adaptado a laranja, hover magnético

## 3. Aplicação por página

### Home (`index.html`)

1. Hero bold (display massivo, 2 CTAs, parallax/glow)
2. Stats bar
3. Pillars "Por que UP" (repaint)
4. Modalidades (grid 4 cards, hover rico)
5. Depoimentos ricos
6. Manifesto (repaint tipográfico)
7. CTA final + horários + mapa
8. FAB

### Modalidades (`musculacao.html`, `pilates.html`, `funcional.html`, `personal.html`)

- Hero modalidade (imagem + CTA "Agendar experiência grátis")
- Bloco "Pra quem é" (3 perfis por objetivo)
- Bloco "Como funciona" (método passo-a-passo)
- 3-4 depoimentos filtrados
- FAQ específico (accordion)
- CTA final + FAB

### Blog (`blog/index.html` + posts)

- Listagem: grid cards bold (cover + categoria + título + lead)
- Post: Fraunces no corpo, max-width prose, CTA contextual meio + fim
- FAB em todas

### FAQ (`faq.html`)

- Accordion por categoria
- CTA final + FAB
- Busca inline **fora de escopo**

### Footer global

- Reforço CTA, horários, endereço, Instagram, mapa embed
- Padronizar em todas páginas

## 4. Arquivos tocados

### Novos
- `js/modules/whatsapp-fab.js`
- `assets/data/testimonials.json`

### Modificados
- `css/tokens.css` — palette + escala tipográfica + `--fs-hero`
- `css/typography.css` — pesos display, aplicação serif italic
- `css/components.css` — `.whatsapp-fab`, card depoimento rico, CTA bold
- `css/sections.css` — hero, stats bar, depoimentos
- `css/animations.css` — `reveal-bold`, ajustes marquee
- `js/main.js` — registro módulo FAB
- `index.html`, `musculacao.html`, `pilates.html`, `funcional.html`, `personal.html`, `faq.html`, `blog/index.html` e posts — CTAs hero, inclusão FAB, novas seções, footer padronizado

## 5. Ordem de execução (fases)

1. Tokens + tipografia (base visual)
2. WhatsApp FAB (quick win conversão, cross-página)
3. Hero + CTAs bold (home)
4. Stats bar + depoimentos ricos (home)
5. Propagação pras 4 modalidades
6. Blog (listagem + template post)
7. FAQ
8. QA final

## 6. Testing

Site estático, sem framework/test-runner.

- **Manual:** cada página em Chrome + Firefox + Safari (mobile iOS simulador ou real)
- **Lighthouse:** performance + a11y não regride > 5 pts do baseline atual
- **Dark mode:** toggle funcional todas páginas, contraste ok
- **FAB:** não oculta conteúdo crítico em mobile (avaliar overlap com CTAs inline)
- **`prefers-reduced-motion`:** desliga pulse, reveal-bold, marquee acelerado
- **Cross-device:** 360px → 1920px sem quebras

## 7. Conteúdo placeholder (TODO cliente)

Marcar no HTML com comentário `<!-- TODO conteúdo: ... -->`:
- Fotos reais de alunos (depoimentos) — autorizar com cliente
- Antes/depois — validar autorização caso-a-caso
- Números reais (alunos ativos, anos de mercado) — confirmar com cliente
- Texto dos depoimentos — coletar com cliente

## 8. Fora de escopo (refactor futuro)

- Dedup de header/footer entre HTMLs (requer Astro/11ty — abordagem 3 futura)
- Busca inline no FAQ
- CMS/dashboard para gerir depoimentos
- A/B testing de CTAs
- Integração analytics/lead tracking além de click no WhatsApp

## 9. Critérios de sucesso

- Visual comunica energia/atitude (abordagem bold aplicada home + modalidades)
- Visitante encontra forma de contato em **qualquer scroll** de qualquer página (FAB)
- Prova social rica e visível na home (stats + depoimentos com foto+quote)
- Consistência visual entre páginas (mesmo sistema de tokens, componentes, motion)
- Dark mode + a11y + reduced-motion preservados
