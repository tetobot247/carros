# Agent Handoff — Análise de Desvalorização de Veículos Elétricos

> **Documento de Transição / Handoff do Projeto**  
> **Data:** 22/Jul/2026  
> **Repositório GitHub:** https://github.com/tetobot247/carros

---

## 📜 HISTÓRICO E ESTRUTURA DO PROJETO

### Arquivos Principais

1. **`mega-matriz-todas-ofertas.html` (Mega-Matriz Granular Reunida com Abas e Highlight de Oferta Concreta)**
   - **Aba 1 (Matriz Completa & Filtro de Faixa):** Visão cruzada completa com filtro de faixa de orçamento (€/mês).
   - **Aba 2 (Simular & Destacar Oferta Concreta):** Formulário interativo para introduzir Modelo, Ano de Fabrico, Quilometragem de Compra e Preço de Compra Anunciado.
     - **Efeito Visual Highlight Gold Pulsante:** Aplica um contorno dourado animado com iluminação brilhante à célula exata da tabela e reduz a opacidade das restantes células.
     - **Banner Resumo:** Apresenta o custo mensal exato, valor de revenda estimado em 2028, garantia de bateria restante e botão de deslocamento suave (*smooth scroll*).

2. **`ranking-melhor-opcao.html` (Ranking da Melhor Opção & Menor Desvalorização)**
   - Visualização comparativa com Pódio Global, Mapa de Vencedores, Curvas de Retenção e Custo por Km.

3. **`mapa-calor-minimizacao-custo.html` (Mapa de Calor Mestre)**
   - Matrix visual de densidade sem filtros com 3.060 pontos de dados, tooltips em hover e avaliação dupla de garantia da bateria (Tempo & Km).

4. **`valores-revenda.json` (Base de Dados JSON)**
   - Estrutura JSON com dados completos das 12 variantes (2021-2024).

5. **`regras-calculo.md` (Fonte da Verdade)**
   - Especificação matemática completa do projeto v3.2.
