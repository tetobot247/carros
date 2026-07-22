# Agent Handoff — Análise de Desvalorização de Veículos Elétricos

> **Documento de Transição / Handoff do Projeto**  
> **Data:** 22/Jul/2026  
> **Repositório GitHub:** https://github.com/tetobot247/carros

---

## 📜 HISTÓRICO E ESTRUTURA DO PROJETO

### Arquivos Principais

1. **`mega-matriz-todas-ofertas.html` (Mega-Matriz Granular Reunida com Indicadores Progressivos da Garantia da BATERIA HV)**
   - **Indicadores Visuais Progressivos de Proximidade do Fim de Garantia:**
     - 🛑 **`⚡ 0m`**: Expirada (0 meses)
     - 🔴 **`⚡ <6m`**: Crítica (&lt; 6 meses restantes)
     - 🟠 **`⚡ <12m`**: Próxima (&lt; 12 meses restantes)
     - 🟡 **`⚡ <18m`**: Atenção (&lt; 18 meses restantes)
     - 🟢 **`✔ >=18m`**: Confortável (&ge; 18 meses restantes)
   - **Exibe TODOS os 12 modelos/anos (2021-2024) simultaneamente na mesma página**.
   - **Filtro de Faixa de Custo Médio Mensal (€/mês):** Permite filtrar instantaneamente o orçamento pretendido.

2. **`mapa-calor-minimizacao-custo.html` (Mapa de Calor Mestre)**
   - Matrix visual de densidade sem filtros com 3.060 pontos de dados, tooltips em hover e indicadores progressivos de proximidade de fim de garantia.

3. **`diagrama-referencia-ofertas.html` (Diagrama Mestre & Avaliador)**
   - Matriz 15x17 com widget avaliador de ofertas de mercado.

4. **`valores-revenda.json` (Base de Dados JSON)**
   - Estrutura JSON com dados completos das 12 variantes (2021-2024).

5. **`regras-calculo.md` (Fonte da Verdade)**
   - Especificação matemática completa do projeto v3.1.
