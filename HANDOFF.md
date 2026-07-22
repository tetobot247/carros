# Agent Handoff — Análise de Desvalorização de Veículos Elétricos

> **Documento de Transição / Handoff do Projeto**  
> **Data:** 22/Jul/2026  
> **Repositório GitHub:** https://github.com/tetobot247/carros

---

## 📜 HISTÓRICO E ESTRUTURA DO PROJETO

### Arquivos Principais

1. **`mega-matriz-todas-ofertas.html` (Mega-Matriz Granular Reunida com Garantia Dupla Tempo & Km)**
   - **Sistema Duplo de Expiração da Garantia da BATERIA HV (O que ocorrer primeiro: Anos ou Km):**
     - Avalia simultaneamente o limite de **Tempo (8 Anos)** e o limite de **Quilometragem do Odómetro (160.000 km / 192.000 km na Tesla)**.
     - Sinaliza o nível de proximidade real com base no fator mais restritivo:
       - 🛑 **`⚡ 0m`**: Expirada (0m ou odómetro excedido)
       - 🔴 **`⚡ <6m`**: Crítica (&lt; 6m ou &lt; 4.500 km para o limite)
       - 🟠 **`⚡ <12m`**: Próxima (&lt; 12m ou &lt; 9.000 km para o limite)
       - 🟡 **`⚡ <18m`**: Atenção (&lt; 18m ou &lt; 13.500 km para o limite)
       - 🟢 **`✔ >=18m`**: Confortável (&ge; 18m e &ge; 13.500 km para o limite)

2. **`mapa-calor-minimizacao-custo.html` (Mapa de Calor Mestre)**
   - Matrix visual de densidade sem filtros com 3.060 pontos de dados, tooltips em hover e avaliação dupla de garantia da bateria (Tempo & Km).

3. **`diagrama-referencia-ofertas.html` (Diagrama Mestre & Avaliador)**
   - Matriz 15x17 com widget avaliador de ofertas de mercado.

4. **`valores-revenda.json` (Base de Dados JSON)**
   - Estrutura JSON com dados completos das 12 variantes (2021-2024).

5. **`regras-calculo.md` (Fonte da Verdade)**
   - Especificação matemática completa do projeto v3.1.
