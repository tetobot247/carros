# Agent Handoff — Análise de Desvalorização de Veículos Elétricos

> **Documento de Transição / Handoff do Projeto**  
> **Data:** 22/Jul/2026  
> **Repositório GitHub:** https://github.com/tetobot247/carros

---

## 📜 HISTÓRICO E ESTRUTURA DO PROJETO

### Arquivos Principais

1. **`mega-matriz-todas-ofertas.html` (Mega-Matriz Granular Reunida com Estado Real da Garantia da Bateria)**
   - **Regra Estrita de Sinalização de Perda de Garantia da Bateria (`meses_restantes <= 0`):** O símbolo **⚡** é reservado EXCLUSIVAMENTE para situações em que a Garantia da Bateria esteja 100% expirada (0 meses).
   - **Garantia Activa em Todos os Veículos (2021-2024):** Como todos os veículos de 2021 a 2024 (com 8 anos de garantia da bateria) expiram em 2029 ou mais tarde, na venda em Dezembro/2028 todos mantêm garantia activa de fábrica (entre 11m e 39m restantes). Por isso, nenhum modelo é indevidamente marcado com `⚡` como "garantia expirada".
   - **Exibe TODOS os 12 modelos/anos (2021-2024) simultaneamente na mesma página**.
   - **Filtro de Faixa de Custo Médio Mensal (€/mês):** Permite filtrar instantaneamente o orçamento pretendido.

2. **`mapa-calor-minimizacao-custo.html` (Mapa de Calor Mestre)**
   - Matrix visual de densidade sem filtros com 3.060 pontos de dados, tooltips em hover e regra estrita de garantia expirada `⚡` (apenas se 0m).

3. **`diagrama-referencia-ofertas.html` (Diagrama Mestre & Avaliador)**
   - Matriz 15x17 com widget avaliador de ofertas de mercado.

4. **`valores-revenda.json` (Base de Dados JSON)**
   - Estrutura JSON com dados completos das 12 variantes (2021-2024).

5. **`regras-calculo.md` (Fonte da Verdade)**
   - Especificação matemática completa do projeto v3.1.
