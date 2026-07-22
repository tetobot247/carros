# Agent Handoff — Análise de Desvalorização de Veículos Elétricos

> **Documento de Transição / Handoff do Projeto**  
> **Data:** 22/Jul/2026  
> **Repositório GitHub:** https://github.com/tetobot247/carros

---

## 🚨 PONTO CRÍTICO / ISSUE CONHECIDO

**Os preços de compra dos carros nas matrizes atuais estão incorretos/irrealistas.**
* **Problema:** Nas matrizes v1 e v2 (`matrizes-km-granular.html` e `matrizes-km-granular-v2.html`), a tabela utiliza uma faixa genérica e uniforme de preços de compra (€21.000 a €27.000) aplicada a todas as quilometragens e modelos.
* **Impacto:** Muitos cenários (ex: comprar um IONIQ 5 2022 com 35k km por €21.000) são irrealistas no mercado real de Portugal.
* **Próximo passo necessário:** Definir/corrigir uma matriz de preços de compra realistas baseados na quilometragem e no modelo (ou desativar/filtrar células irrealistas nas tabelas) e refletir essas alterações no `regras-calculo.md` e no JavaScript do `matrizes-km-granular-v2.html`.

---

## 📜 HISTÓRICO E ESTRUTURA DO PROJETO

### Arquivos Principais

1. **`matrizes-consenso-final.md`**
   - Consolidado inicial de críticas de 3 subagentes independentes.
   - Analisa liquidez do mercado PT (105 dias para vender), barreira dos 100k km, e expiração de garantias.
   - Destaca o Tesla Model 3 (2021) como a compra mais sólida ("sweet spot").

2. **`matrizes-km-granular.html` (Versão 1)**
   - Visualização HTML inicial com tabelas estáticas/hardcoded.

3. **`regras-calculo.md` (Fonte da Verdade)**
   - Ficheiro markdown com a especificação matemática completa do projeto.
   - Define a fórmula base, tabelas de revenda base (obtidas por engenharia reversa), regra de redutor LFP (50%), e escala de penalização de garantia de bateria.

4. **`matrizes-km-granular-v2.html` (Versão 2)**
   - Versão atualizada e dinâmica (gerada via JavaScript).
   - **Funcionalidades da v2:**
     - Aplicação da penalização de garantia de bateria por tempo restante na data de venda (Dez/2028).
     - Aplicação do redutor LFP de 50% para modelos LFP (Tesla Model 3).
     - Caixas informativas de garantia (`wbox`) e fatores de desvalorização em cada card.
     - Novas linhas nas tabelas: "Revenda €k" e "Depr % @25k".
     - Ranking de sweet spots atualizado dinamicamente.

5. **`valores-revenda.json` (Base de Dados JSON)**
   - Estrutura de dados em JSON contendo todas as estimativas de revenda base, penalizações de garantia e revenda ajustada por modelo e quilometragem.

---

## 📐 REGRAS DE CÁLCULO E DECISÕES TOMADAS

### Parâmetros Base
- **Horizonte:** 28 meses (Agosto/2026 → Dezembro/2028).
- **Uso:** 750 km/mês (+21.000 km adicionados).
- **Local:** Porto, Portugal.

### Decisões do Utilizador (Validadas em 22/Jul/2026)
1. **Datas de Registo Estimadas:**
   - IONIQ 5 (2022): Jul/2022
   - IONIQ 5 (2021): Nov/2021
   - Megane E-Tech (2022): Set/2022
   - Tesla Model 3 SR+ LFP (2021): Dez/2021
2. **Redutor LFP:** Aplica-se 50% de redução na penalização de garantia a todos os veículos com bateria LFP (atualmente apenas o Tesla).
3. **Garantia ICCU (IONIQ 5):** Ignorada/não aplicada a garantia estendida de 15 anos por incerteza de cobertura fora do componente ICCU.
4. **Obsolescência Tecnológica:** Excluída dos cálculos a pedido do utilizador.
5. **Escala de Penalização de Garantia (Bateria 8 anos):**
   - ≥ 24 meses restantes em Dez/2028: **€0**
   - 18 a 23 meses: **-€750**
   - 12 a 17 meses: **-€1.500** (Tesla fica em -€750 devido ao redutor LFP)
   - 6 a 11 meses: **-€2.000** (IONIQ 5 2021 penalizado fortemente)
   - 0 a 5 meses: **-€2.500**
   - Expirada / Km excede limite: **-€3.000** (-€1.500 com redutor LFP)

---

## 🎯 RESUMO DE IMPACTO (v1 vs v2)

| Modelo | Penalização Aplicada | Impacto/mês | Novo Ranking |
|--------|---------------------|-------------|--------------|
| **Tesla M3 SR+ LFP (2021)** | -€750 (LFP) | +€27/mês | 🥇 1º Lugar (€123/mês melhor cenário) |
| **IONIQ 5 72.6 kWh (2022)** | -€750 | +€27/mês | 🥈 2º Lugar (€152/mês melhor cenário) |
| **Megane E-Tech EV60 (2022)** | -€750 | +€27/mês | 🥉 3º Lugar (€188/mês melhor cenário) |
| **IONIQ 5 72.6 kWh (2021)** | -€2.000 | +€71/mês | 4º Lugar (€214/mês melhor cenário - caiu) |

---

## 📌 INSTRUÇÕES PARA O PRÓXIMO AGENTE
1. Ler este `HANDOFF.md` e o `regras-calculo.md`.
2. Solicitado pelo utilizador: rever e corrigir a estrutura de **Preços de Compra** por modelo e km.
3. Atualizar `regras-calculo.md` com a nova tabela/regra de preço de compra.
4. Atualizar o array `PR` ou matriz de preços no `matrizes-km-granular-v2.html`.
