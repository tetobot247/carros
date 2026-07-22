# Agent Handoff — Análise de Desvalorização de Veículos Elétricos

> **Documento de Transição / Handoff do Projeto**  
> **Data:** 22/Jul/2026  
> **Repositório GitHub:** https://github.com/tetobot247/carros

---

## 🚨 PONTO CRÍTICO / ISSUE CONHECIDO

**Os preços de compra dos carros nas matrizes atuais estão incorretos/irrealistas.**
* **Problema:** As tabelas exibem uma grade uniforme de preços de compra (€21.000 a €35.000) aplicada a todas as quilometragens e modelos.
* **Impacto:** Vários cenários (ex: comprar um Tesla 2024 Highland com 35k km por €21.000) são irrealistas no mercado real de Portugal.
* **Próximo passo necessário:** Definir/corrigir uma matriz de preços de compra realistas baseados na quilometragem, ano e modelo (ou desativar/filtrar células irrealistas nas tabelas) e refletir essas alterações no `regras-calculo.md` e no JavaScript dos HTMLs.

---

## 📜 HISTÓRICO E ESTRUTURA DO PROJETO

### Arquivos Principais

1. **`matrizes-unificadas-granulares.html` (NOVO - Matriz Granular Unificada)**
   - Reúne **todos os dados granulares completos** numa única matriz de comparação.
   - **Elementos visuais por modelo:** Badges e indicadores de cor neon distintos por marca (🔴 Tesla = Vermelho Neon, 🔵 IONIQ 5 = Azul Elétrico, 🟣 Megane = Roxo Neon).
   - Alternância entre **Tabela Cruzada Unificada** (todos os modelos como linhas e km como colunas) e **Matrizes Granulares Lado a Lado** (Split View).

2. **`matrizes-km-granular-v3.html` (Versão 3 — Matrizes Granulares por Card)**
   - Visualização com cards por modelo e filtros dinâmicos de ano/marca.

3. **`valores-revenda.json` (Base de Dados JSON)**
   - Estrutura JSON com dados completos das 12 variantes (2021-2024), estimativas de revenda base, penalizações de garantia e revenda ajustada por km.

4. **`regras-calculo.md` (Fonte da Verdade)**
   - Especificação matemática completa do projeto v3.1.

---

## 📐 REGRAS DE CÁLCULO E DECISÕES TOMADAS

### Parâmetros Base
- **Horizonte:** 28 meses (Agosto/2026 → Dezembro/2028).
- **Uso:** 750 km/mês (+21.000 km adicionados).
- **Local:** Porto, Portugal.
- **Anos Cobertos:** 2021, 2022, 2023, 2024.
- **Sem Custo Negativo:** Se `Preço_Compra ≤ Revenda_Ajustada`, a célula exibe `—` (Irrealista).

---

## 📌 INSTRUÇÕES PARA O PRÓXIMO AGENTE
1. Ler este `HANDOFF.md` e o `regras-calculo.md`.
2. Verificar a nova página `matrizes-unificadas-granulares.html`.
3. Ajustar os preços de compra para faixas realistas por modelo, ano e km.
