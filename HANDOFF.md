# Agent Handoff — Análise de Desvalorização de Veículos Elétricos

> **Documento de Transição / Handoff do Projeto**  
> **Data:** 22/Jul/2026  
> **Repositório GitHub:** https://github.com/tetobot247/carros

---

## 📜 HISTÓRICO E ESTRUTURA DO PROJETO

### Arquivos Principais

1. **`mapa-calor-minimizacao-custo.html` (NOVO - Mapa de Calor Mestre para Minimização de Custo)**
   - **Consolida TODOS os 3.060 pontos de dados numa única tela sem filtros:** 12 veículos (2021-2024) &times; 17 quilometragens &times; 15 níveis de preço de compra (€21k a €35k).
   - **Referências Visuais Puras (Pixels de Calor):** As células contêm micro-blocos de densidade de cor (verde-escuro para `<150€/mês`, verde-claro para `150-220€`, amarelo, laranja e vermelho).
   - **Tooltip Flutuante em Hover:** Revela instantaneamente o modelo, ano, preço de compra, quilometragem, revenda estimada em 2028, penalização de garantia e custo mensal exato.
   - **Leaderboard de Minimização:** Destaca o Top 5 de menores custos absolutos.

2. **`mega-matriz-todas-ofertas.html` (Mega-Matriz Granular de €1.000 em €1.000)**
   - Exibe a tabela completa com números de €21k a €35k reunidos por preço e por feed.

3. **`diagrama-referencia-ofertas.html` (Diagrama Mestre & Avaliador)**
   - Matriz 15x17 com widget avaliador de ofertas.

4. **`valores-revenda.json` (Base de Dados JSON)**
   - Estrutura JSON com dados completos das 12 variantes (2021-2024).

5. **`regras-calculo.md` (Fonte da Verdade)**
   - Especificação matemática completa do projeto v3.1.

---

## 📐 REGRAS DE CÁLCULO E DECISÕES TOMADAS

### Parâmetros Base
- **Horizonte:** 28 meses (Agosto/2026 → Dezembro/2028).
- **Uso:** 750 km/mês (+21.000 km adicionados).
- **Local:** Porto, Portugal.
- **Anos Cobertos:** 2021, 2022, 2023, 2024.
- **Sem Custo Negativo:** Se `Preço_Compra ≤ Revenda_Ajustada`, a célula exibe `—` (Irrealista).
