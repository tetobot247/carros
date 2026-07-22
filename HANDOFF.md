# Agent Handoff — Análise de Desvalorização de Veículos Elétricos

> **Documento de Transição / Handoff do Projeto**  
> **Data:** 22/Jul/2026  
> **Repositório GitHub:** https://github.com/tetobot247/carros

---

## 📜 HISTÓRICO E ESTRUTURA DO PROJETO

### Arquivos Principais

1. **`mega-matriz-todas-ofertas.html` (Mega-Matriz Granular Reunida com Indicador da Garantia da BATERIA HV ⚡)**
   - **Foco Exclusivo na GARANTIA DA BATERIA (Alta Voltagem - 8 Anos / 160k-192k km):** Todos os textos, legendas, badges e tooltips especificam expressamente que a penalização e o símbolo subtil **⚡** decorrem da perda/expiração da Garantia da Bateria de Alta Voltagem na data de revenda (Dez/2028), desconsiderando a garantia geral do veículo (que expira muito mais cedo).
   - **Exibe TODOS os 12 modelos/anos (2021-2024) simultaneamente na mesma página**.
   - **Filtro de Faixa de Custo Médio Mensal (€/mês):** Permite filtrar instantaneamente o orçamento pretendido.

2. **`mapa-calor-minimizacao-custo.html` (Mapa de Calor Mestre)**
   - Matrix visual de densidade sem filtros com 3.060 pontos de dados, tooltips em hover e indicador subtil de Garantia da Bateria ⚡.

3. **`diagrama-referencia-ofertas.html` (Diagrama Mestre & Avaliador)**
   - Matriz 15x17 com widget avaliador de ofertas de mercado.

4. **`valores-revenda.json` (Base de Dados JSON)**
   - Estrutura JSON com dados completos das 12 variantes (2021-2024).

5. **`regras-calculo.md` (Fonte da Verdade)**
   - Especificação matemática completa do projeto v3.1.
