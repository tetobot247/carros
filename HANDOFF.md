# Agent Handoff — Análise de Desvalorização de Veículos Elétricos

> **Documento de Transição / Handoff do Projeto**  
> **Última Atualização:** 22/Jul/2026 23:05 (Lisboa)  
> **Versão do Modelo:** v4.0 (18 variantes)  
> **Repositório GitHub:** https://github.com/tetobot247/carros  
> **Branch principal:** `main`

---

## 🎯 OBJETIVO DO PROJETO

O utilizador (Porto, Portugal) pretende comprar um carro elétrico usado em **Agosto/2026** e vendê-lo em **Dezembro/2028** (28 meses de posse, 750 km/mês = 21.000 km adicionados). O projeto calcula a **desvalorização mensal (€/mês)** para cada combinação de modelo × ano de fabrico × quilometragem de compra × preço de compra, para determinar qual carro custa menos por mês de posse.

---

## 🚗 MODELOS COBERTOS (18 VARIANTES)

### 5 Famílias / Plataformas (`brand`):

| Brand ID | Nome | Cor CSS | Anos | Nº Variantes |
|----------|------|---------|------|--------------|
| `tesla` | Tesla Model 3 SR/RWD (LFP) | `#ff3b30` (vermelho) | 2021-2024 | 4 |
| `tesla_lr` | Tesla Model 3 Long Range AWD (NMC) | `#ff9f0a` (laranja) | 2021-2024 | 4 |
| `ioniq5_58` | IONIQ 5 58 kWh (Standard Range) | `#5ac8fa` (azul claro) | 2021-2022 | 2 |
| `ioniq5` | IONIQ 5 Long Range (72.6–84 kWh) | `#32ade6` (azul) | 2021-2024 | 4 |
| `megane` | Megane E-Tech EV60 | `#af52de` (roxo) | 2021-2024 | 4 |

### Tabela de Dados Base Completa (Revenda @35k km):

| ID Inline | Brand | Ano | `b35` (€) | `step` | `jump` | LFP | `ry` | `rm` | `wk` |
|-----------|-------|-----|-----------|--------|--------|-----|------|------|------|
| `tesla_2021` | tesla | 2021 | 18300 | 300 | 400 | ✅ | 2021 | 12 | 192000 |
| `tesla_2022` | tesla | 2022 | 19800 | 300 | 400 | ✅ | 2022 | 6 | 192000 |
| `tesla_2023` | tesla | 2023 | 21500 | 350 | 400 | ✅ | 2023 | 6 | 192000 |
| `tesla_2024` | tesla | 2024 | 24500 | 400 | 500 | ✅ | 2024 | 3 | 192000 |
| `tesla_lr_2021` | tesla_lr | 2021 | 20000 | 350 | 450 | ❌ | 2021 | 9 | 192000 |
| `tesla_lr_2022` | tesla_lr | 2022 | 21800 | 350 | 450 | ❌ | 2022 | 6 | 192000 |
| `tesla_lr_2023` | tesla_lr | 2023 | 24000 | 400 | 450 | ❌ | 2023 | 6 | 192000 |
| `tesla_lr_2024` | tesla_lr | 2024 | 27500 | 450 | 550 | ❌ | 2024 | 3 | 192000 |
| `ioniq5_58_2021` | ioniq5_58 | 2021 | 13500 | 450 | 500 | ❌ | 2021 | 11 | 160000 |
| `ioniq5_58_2022` | ioniq5_58 | 2022 | 15000 | 450 | 500 | ❌ | 2022 | 7 | 160000 |
| `ioniq_2021` | ioniq5 | 2021 | 16000 | 500 | 500 | ❌ | 2021 | 11 | 160000 |
| `ioniq_2022` | ioniq5 | 2022 | 17500 | 500 | 500 | ❌ | 2022 | 7 | 160000 |
| `ioniq_2023` | ioniq5 | 2023 | 19800 | 500 | 500 | ❌ | 2023 | 6 | 160000 |
| `ioniq_2024` | ioniq5 | 2024 | 23200 | 500 | 600 | ❌ | 2024 | 3 | 160000 |
| `megane_2021` | megane | 2021 | 15800 | 500 | 500 | ❌ | 2021 | 12 | 160000 |
| `megane_2022` | megane | 2022 | 16500 | 500 | 500 | ❌ | 2022 | 9 | 160000 |
| `megane_2023` | megane | 2023 | 18500 | 500 | 500 | ❌ | 2023 | 6 | 160000 |
| `megane_2024` | megane | 2024 | 21000 | 500 | 600 | ❌ | 2024 | 3 | 160000 |

> **Nota: O IONIQ 5 58 kWh só existe em 2021 e 2022.** Não existem variantes 2023/2024 porque a Hyundai descontinuou a versão Standard Range nesses anos.

---

## 📐 MOTOR DE CÁLCULO (DUPLICADO EM CADA HTML)

> ⚠️ **IMPORTANTE:** Não existe um ficheiro JS partilhado. Cada HTML contém o seu próprio motor de cálculo inline em `<script>`. Ao modificar a lógica, é necessário atualizar **TODOS os 8 HTMLs ativos** individualmente.

### Parâmetros Globais

```javascript
var M = 28;           // Meses de posse
var KPM = 750;        // Km por mês
var TKM = 21000;      // Km total adicionado (M × KPM)
var LFPR = 0.5;       // Redutor LFP (50%)
```

### Escada de Penalização de Garantia de Bateria

```javascript
var WS = [
    {m: 24, p: 0},        // ≥24 meses restantes → sem penalização
    {m: 18, p: 750},      // 18-23 meses
    {m: 12, p: 1500},     // 12-17 meses
    {m: 6,  p: 2000},     // 6-11 meses
    {m: 0,  p: 2500},     // 0-5 meses
    {m: -999, p: 3000}    // Expirada
];
// Se carro é LFP e penalização > 0: penalização *= LFPR (50%)
```

### Fórmula de Revenda Base

```javascript
function getBaseResale(c, k) {
    // c.b35 = revenda base @35.000 km
    // Para cada faixa de 5.000 km acima de 35k, subtrai c.step
    // No salto de 90k → 95k (barreira psicológica dos 100k),
    // acrescenta c.jump à queda
}
```

### Preços de Compra Realistas por Ano

```javascript
var REALISTIC_PRICES = {
    2021: 24000,
    2022: 26000,
    2023: 29000,
    2024: 33000
};
// Tesla LR adiciona +€3.000 (2021-2023) ou usa €37.000 (2024)
```

### Faixa de Km de Compra e Preço

```javascript
var KM = [35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115]; // ×1000 km
var PR = [];
for (var i = 21000; i <= 42000; i += 1000) PR.push(i); // €21k a €42k
```

### Resultado Final

```
Depreciação_Mensal = round((Preço_Compra - Revenda_Ajustada) / 28)
Se Preço_Compra ≤ Revenda_Ajustada → mostra "—" (combinação irrealista)
```

---

## 📁 INVENTÁRIO COMPLETO DE FICHEIROS

### Ficheiros de Dados (fonte da verdade)

| Ficheiro | Descrição |
|----------|-----------|
| **`regras-calculo.md`** | **FONTE DA VERDADE** do modelo. Especificação matemática, parâmetros, tabela de b35, e histórico de versões (v1.0 → v4.0). |
| **`valores-revenda.json`** | Base de dados JSON com os 18 modelos e as estimativas de revenda expandidas (17 faixas de km × 18 modelos = 306 pontos de dados). Inclui metadata, garantia, e fatores de desvalorização. |
| **`matrizes-consenso-final.md`** | Documento Markdown antigo com o consenso dos debates de subagentes. Não é mais atualizado. |

### HTMLs Ativos (motor inline v4.0 — 18 variantes)

| Ficheiro | Descrição | Funcionalidades |
|----------|-----------|-----------------|
| **`mega-matriz-todas-ofertas.html`** | Dashboard principal com abas | **Aba 1:** Matriz cruzada completa com filtros de faixa €/mês. **Aba 2:** Simulador de oferta concreta (introduzir modelo/ano/km/preço e ver highlight dourado animado). |
| **`modelo-estatistico-decisao-modelo.html`** | Modelo estatístico e probabilístico | Monte Carlo 10.000 iterações, estatística descritiva robusta (média, mediana, σ, IQR, P10-P90), Sharpe Ratio, CDF, regressão linear, VaR 95%, skewness/kurtosis, com explicações práticas sob cada secção. |
| **`ranking-melhor-opcao.html`** | Ranking comparativo visual | Pódio Global, Mapa de Vencedores por faixa km/preço, Curvas de Retenção de Valor, Custo por Km. |
| **`mapa-calor-minimizacao-custo.html`** | Mapa de calor mestre | Matriz visual de densidade sem filtros. Todas as 18 variantes × 17 faixas km. |
| **`comparativo-custo-mensal.html`** | Dashboard comparativo | Custo mensal lado a lado, com filtros de modelo e preço. |
| **`diagrama-referencia-ofertas.html`** | Diagrama de referência de ofertas | Selector dropdown com todos os 18 modelos, mostra valores de revenda e custos mensais num diagrama visual. |
| **`matrizes-unificadas-granulares.html`** | Matrizes granulares unificadas | Dois modos: Tabela cruzada unificada e Matrizes lado a lado. Filtros por ano e preço. |
| **`matrizes-km-granular-v3.html`** | Matrizes granulares detalhadas | Cards individuais por modelo com tabela preço×km, ranking automático de sweet spots, info de garantia de bateria. |

### HTMLs Legacy (NÃO atualizados para v4.0)

| Ficheiro | Descrição | Estado |
|----------|-----------|--------|
| `matrizes-km-granular.html` | Versão v1 das matrizes | **Obsoleto.** Ainda tem apenas 3 modelos originais. |
| `matrizes-km-granular-v2.html` | Versão v2 das matrizes | **Obsoleto.** Ainda tem apenas 3 modelos originais. |

---

## 🎨 SISTEMA DE CORES E BRANDING

### Classes CSS por Brand

Cada HTML que usa badges visuais define estas classes CSS:

```css
/* Badges de modelo */
.ind-tesla      { color: #ff453a; }     /* Vermelho */
.ind-tesla_lr   { color: #ff9f0a; }     /* Laranja */
.ind-ioniq5     { color: #64d2ff; }     /* Azul */
.ind-ioniq5_58  { color: #5ac8fa; }     /* Azul claro */
.ind-megane     { color: #d070ff; }     /* Roxo */

/* Dots luminosos */
.dot-tesla      { background: #ff3b30; }
.dot-tesla_lr   { background: #ff9f0a; }
.dot-ioniq5     { background: #32ade6; }
.dot-ioniq5_58  { background: #5ac8fa; }
.dot-megane     { background: #af52de; }

/* Bordas de cards */
.border-tesla      { border-top: 3px solid #ff3b30; }
.border-tesla_lr   { border-top: 3px solid #ff9f0a; }
.border-ioniq5     { border-top: 3px solid #32ade6; }
.border-ioniq5_58  { border-top: 3px solid #5ac8fa; }
.border-megane     { border-top: 3px solid #af52de; }
```

### Heatmap de €/mês (escala verde→vermelho)

```javascript
function col(v) {
    var t = Math.max(0, Math.min(1, (v - 100) / 600));
    return 'rgb(' + Math.round(255 * t) + ',' + Math.round(255 * (1 - t)) + ',50)';
}
// €100/mês = verde puro, €700/mês = vermelho puro
```

---

## 📊 RESULTADOS ATUAIS DO MODELO (v4.0)

### Monte Carlo (10.000 iterações) — Ranking por Plataforma:

| # | Plataforma | Prob. Vitória | Custo Médio (€/mês) |
|---|-----------|---------------|---------------------|
| 🥇 | Tesla Model 3 (LFP) | ~70-80% | ~€280-350 |
| 🥈 | IONIQ 5 58 kWh | ~10-15% | ~€320-380 |
| 🥉 | Tesla Model 3 LR | ~5-10% | ~€350-400 |
| 4 | IONIQ 5 LR | ~2-5% | ~€450-500 |
| 5 | Megane E-Tech | ~1-3% | ~€480-530 |

> **Nota:** Os valores exatos dependem da distribuição de preços de compra simulados. Abra `modelo-estatistico-decisao-modelo.html` num browser para ver os resultados exatos ao vivo (cada load faz uma nova simulação).

---

## ⚙️ HISTÓRICO DE VERSÕES

| Versão | Data | Alterações |
|--------|------|------------|
| **v1.0** | Jul/2026 | Modelo base: 3 modelos (Tesla M3, IONIQ 5 LR, Megane), barreira 100k km, degradação por km |
| **v2.0** | 22/Jul/2026 | Penalização de garantia de bateria e redutor LFP (50%) |
| **v3.0** | 22/Jul/2026 | Expansão 2021-2024 (12 variantes), filtros por ano/modelo nos HTMLs |
| **v3.1** | 22/Jul/2026 | Proteção contra depreciação negativa, preços realistas por ano |
| **v3.2** | 22/Jul/2026 | Ajuste IONIQ 5 2021: b35 de €17.000→€16.000 (auditoria independente) |
| **v4.0** | 22/Jul/2026 | **+6 variantes:** Tesla M3 Long Range AWD (×4) + IONIQ 5 58 kWh Standard (×2) = 18 variantes totais. PR expandido até €42k. Novas cores CSS. |

---

## 🔧 COMO ADICIONAR UM NOVO MODELO

1. **Definir os parâmetros** do novo modelo (b35, step, jump, brand, lfp, ry, rm, wy, wk)
2. **Atualizar `regras-calculo.md`** — tabela de revenda base e histórico de versões
3. **Atualizar `valores-revenda.json`** — adicionar bloco completo com estimativas de revenda para cada faixa de km
4. **Atualizar CADA um dos 8 HTMLs ativos** — array `CARS[]`, classes CSS (`.ind-*`, `.dot-*`, `.border-*`), filtros/botões, legendas, e `BRANDS` (onde aplicável)
5. **Expandir `PR[]`** se o novo modelo tem preço de compra acima do topo atual (€42k)
6. **Testar** abrindo cada HTML no browser
7. **Git commit & push**

> ⚠️ **O passo 4 é o mais crítico e o mais propenso a erros.** Cada HTML tem o seu próprio código inline. Não há ficheiro JS partilhado. Se esqueceres um HTML, esse ficheiro ficará desatualizado e inconsistente.

---

## 🐛 PROBLEMAS CONHECIDOS / LIÇÕES APRENDIDAS

1. **Sem CSS framework** — tudo é vanilla CSS inline em cada HTML (dark mode, glassmorphism). Não há ficheiro `.css` partilhado.
2. **Sem JS framework** — vanilla JS com IIFEs em cada HTML. Sem dependências npm.
3. **LaTeX no HTML** — o `modelo-estatistico-decisao-modelo.html` usava notação LaTeX (`$P(\text{...})$`) em subtítulos que aparecia literalmente. Foi corrigido para usar entidades HTML (P(Custo ≤ X)). Evitar LaTeX nos textos visíveis.
4. **Emojis UTF-8** — os HTMLs usam emojis extensivamente nos títulos e badges. Cuidado com escape sequences que podem corromper (`\uFE0F` a mais, etc.).
5. **`matrizes-km-granular.html` e `matrizes-km-granular-v2.html`** são ficheiros legado com apenas 3 modelos originais. Não foram atualizados para v4.0 intencionalmente.
6. **IONIQ 5 58 kWh** — só 2021 e 2022. Não inventar variantes 2023/2024.
7. **Tesla M3 LR** — `lfp: false` (usa bateria NMC). NÃO aplica o redutor LFP de 50%. Isto causa penalizações de garantia mais altas que o M3 LFP.

---

## 🔴 DÍVIDA TÉCNICA & PRÓXIMOS PASSOS

### Prioridade Alta

#### 1. Motor de Cálculo Partilhado (`engine.js`) - ✅ CONCLUÍDO
> A lógica core foi centralizada em `engine.js`. Todos os 8 HTMLs foram refatorados para importar as variáveis e funções partilhadas.

#### 2. CSS Partilhado (`styles.css`) - ✅ CONCLUÍDO
> As classes globais e definições CSS foram movidas para `styles.css`. Todos os 8 HTMLs foram atualizados com `<link rel="stylesheet" href="styles.css">`.

### Prioridade Média

#### 3. Portal de Navegação (`index.html`) - ✅ CONCLUÍDO
> Foi desenvolvido um `index.html` servindo como ponto de entrada que agrega todas as ferramentas e unifica a experiência do utilizador.

#### 4. Completar `regras-calculo.md`
O `regras-calculo.md` (fonte da verdade) **não documenta**:
- A escada de penalização de garantia de bateria (`WS[]`)
- Os parâmetros `ry`, `rm`, `wk` por modelo
- Os parâmetros `step` e `jump` por modelo

Esses dados só existem no HANDOFF e nos HTMLs. A fonte da verdade deveria ser autocontida.

#### 5. Limpeza de Ficheiros Legacy
- `matrizes-km-granular.html` e `matrizes-km-granular-v2.html` estão obsoletos (apenas 3 modelos). Remover ou mover para pasta `legacy/`.
- `matrizes-consenso-final.md` já não é atualizado — considerar arquivar.

### Prioridade Baixa

#### 6. Expansão de Modelos
Outros EVs populares em Portugal usados que poderiam ser adicionados:
- **BYD Atto 3** (LFP, competitivo em preço)
- **MG4** (muito popular, preço baixo)
- **Volkswagen ID.3 / ID.4**
- **Peugeot e-208 / e-2008**

#### 7. Responsividade Mobile
Verificar e melhorar a responsividade dos 8 HTMLs para consulta em telemóvel (útil ao ver carros pessoalmente).

---

## 📋 CHECKLIST DE INTEGRIDADE (para o próximo agente)

Se precisares de verificar que todos os HTMLs estão consistentes, corre este comando:

```cmd
cmd /c "for %f in (modelo-estatistico-decisao-modelo.html ranking-melhor-opcao.html mapa-calor-minimizacao-custo.html comparativo-custo-mensal.html diagrama-referencia-ofertas.html matrizes-unificadas-granulares.html matrizes-km-granular-v3.html mega-matriz-todas-ofertas.html) do @echo --- %f --- & @findstr /C:tesla_lr %f > nul && echo tesla_lr: OK || echo tesla_lr: MISSING & @findstr /C:ioniq5_58 %f > nul && echo ioniq5_58: OK || echo ioniq5_58: MISSING"
```

Resultado esperado: **todos OK** para `tesla_lr` e `ioniq5_58` em todos os 8 ficheiros.
