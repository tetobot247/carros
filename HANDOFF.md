# Agent Handoff — Análise de Desvalorização de Veículos Elétricos

> **Documento de Transição / Handoff do Projeto**  
> **Data:** 22/Jul/2026  
> **Repositório GitHub:** https://github.com/tetobot247/carros

---

## 📜 HISTÓRICO E ESTRUTURA DO PROJETO

### Arquivos Principais

1. **`mega-matriz-todas-ofertas.html` (Mega-Matriz Granular Reunida com Filtro por Custo Médio Mensal €/mês)**
   - **Exibe TODOS os 12 modelos/anos (2021-2024) simultaneamente na mesma página**.
   - **Filtro de Faixa de Custo Médio Mensal (€/mês):** Permite filtrar instantaneamente o orçamento pretendido através de presets:
     - `Super Económico (< €200/mês)`
     - `Excelente (€200 - €300/mês)`
     - `Médio (€300 - €400/mês)`
     - `Superior (> €400/mês)`
     - Ou seletores personalizados de Custo Mínimo e Custo Máximo em €/mês.
   - **Atenuação Visual Instantânea:** As células dentro do orçamento pretendido mantêm o seu brilho colorido, enquanto células fora da faixa de custo ficam suavemente atenuadas, destacando imediatamente onde estão as melhores ofertas em todas as tabelas!
   - **Granularidade de €1.000 em €1.000:** 15 níveis de preço de compra &times; 17 colunas de quilometragem.

2. **`mapa-calor-minimizacao-custo.html` (Mapa de Calor Mestre)**
   - Matrix visual de densidade sem filtros com 3.060 pontos de dados e tooltips em hover.

3. **`diagrama-referencia-ofertas.html` (Diagrama Mestre & Avaliador)**
   - Matriz 15x17 com widget avaliador de ofertas de mercado.

4. **`valores-revenda.json` (Base de Dados JSON)**
   - Estrutura JSON com dados completos das 12 variantes (2021-2024).

5. **`regras-calculo.md` (Fonte da Verdade)**
   - Especificação matemática completa do projeto v3.1.
