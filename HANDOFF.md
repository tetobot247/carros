# Agent Handoff — Análise de Desvalorização de Veículos Elétricos

> **Documento de Transição / Handoff do Projeto**  
> **Data:** 22/Jul/2026  
> **Repositório GitHub:** https://github.com/tetobot247/carros

---

## 🚨 PONTO CRÍTICO / ISSUE CONHECIDO

**Os preços de compra dos carros nas matrizes atuais estão incorretos/irrealistas.**
* **Problema:** Nas matrizes v1, v2 e v3, as tabelas exibem uma grade uniforme de preços de compra (€21.000 a €35.000) aplicada a todas as quilometragens e modelos.
* **Impacto:** Vários cenários (ex: comprar um Tesla 2024 Highland com 35k km por €21.000) são irrealistas no mercado real de Portugal.
* **Próximo passo necessário:** Definir/corrigir uma matriz de preços de compra realistas baseados na quilometragem, ano e modelo (ou desativar/filtrar células irrealistas nas tabelas) e refletir essas alterações no `regras-calculo.md` e no JavaScript do `matrizes-km-granular-v3.html`.

---

## 📜 HISTÓRICO E ESTRUTURA DO PROJETO

### Arquivos Principais

1. **`matrizes-consenso-final.md`**
   - Consolidado inicial de críticas de 3 subagentes independentes.

2. **`matrizes-km-granular.html` (Versão 1)**
   - Visualização HTML inicial com tabelas estáticas.

3. **`matrizes-km-granular-v2.html` (Versão 2)**
   - Versão inicial com penalização de garantia de bateria e redutor LFP (50%).

4. **`matrizes-km-granular-v3.html` (Versão 3 — ATUAL)**
   - **Visualização interativa expandida cobrindo anos de fabrico de 2021 a 2024** (12 variantes de modelos).
   - **Filtros dinâmicos:** por Ano (2021, 2022, 2023, 2024) e por Modelo (Tesla Model 3, IONIQ 5, Megane E-Tech).
   - **Faixa de compra expandida:** €21.000 a €35.000.
   - Ranking dinâmico de Sweet Spots ajustável por filtro.

5. **`valores-revenda.json` (Base de Dados JSON)**
   - Estrutura JSON com dados completos das 12 variantes (2021-2024), estimativas de revenda base, penalizações de garantia e revenda ajustada por km.

6. **`regras-calculo.md` (Fonte da Verdade)**
   - Especificação matemática completa do projeto v3.0.

---

## 📐 REGRAS DE CÁLCULO E DECISÕES TOMADAS

### Parâmetros Base
- **Horizonte:** 28 meses (Agosto/2026 → Dezembro/2028).
- **Uso:** 750 km/mês (+21.000 km adicionados).
- **Local:** Porto, Portugal.
- **Anos Cobertos:** 2021, 2022, 2023, 2024.

---

## 📌 INSTRUÇÕES PARA O PRÓXIMO AGENTE
1. Ler este `HANDOFF.md` e o `regras-calculo.md`.
2. Rever a base `valores-revenda.json` e a UI em `matrizes-km-granular-v3.html`.
3. Ajustar os preços de compra para faixas realistas por modelo, ano e km.
