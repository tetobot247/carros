# Agent Handoff — Análise de Desvalorização de Veículos Elétricos

> **Documento de Transição / Handoff do Projeto**  
> **Data:** 22/Jul/2026  
> **Repositório GitHub:** https://github.com/tetobot247/carros

---

## 📜 HISTÓRICO E ESTRUTURA DO PROJETO

### Arquivos Principais

1. **`modelo-estatistico-decisao-modelo.html` (Modelo Estatístico & Probabilístico de Decisão do Elétrico Ideal)**
   - **Análise Quantitativa Global por Plataforma (Modelo como um todo):** Agrupa e avalia as 3 famílias (Tesla Model 3, Hyundai IONIQ 5, Renault Megane E-Tech) agregando todas as variantes de 2021 a 2024.
   - **Simulação de Monte Carlo de 10.000 Iterações:** Avalia estocasticamente a probabilidade de vitória em qualquer combinação aleatória de orçamento e quilometragem.
     - 🥇 **Tesla Model 3:** **97.7% de probabilidade de vitória** (Custo médio $\mu = 365$ €/mês, Sharpe Ratio = 0.77).
     - 🥈 **Hyundai IONIQ 5:** **1.5% de probabilidade de vitória** (Custo médio $\mu = 489$ €/mês, Sharpe Ratio = 0.05).
     - 🥉 **Renault Megane E-Tech:** **0.7% de probabilidade de vitória** (Custo médio $\mu = 522$ €/mês, Sharpe Ratio = -0.11).
   - **Estatística Descritiva Robusta:** Apresenta Média ($\mu$), Mediana ($Q_2$), Desvio Padrão ($\sigma$), Intervalo Interquartil (IQR), Margem 80% Probabilística (P10-P90), Rácio de Sharpe Financeiro e Fronteira de Eficiência de Pareto.

2. **`mega-matriz-todas-ofertas.html` (Mega-Matriz Granular Reunida com Abas e Highlight de Oferta Concreta)**
   - **Aba 1 (Matriz Completa & Filtro de Faixa):** Visão cruzada completa com filtro de faixa de orçamento (€/mês).
   - **Aba 2 (Simular & Destacar Oferta Concreta):** Formulário interativo para introduzir Modelo, Ano de Fabrico, Quilometragem de Compra e Preço de Compra Anunciado com destaque gold animado.

3. **`ranking-melhor-opcao.html` (Ranking da Melhor Opção & Menor Desvalorização)**
   - Visualização comparativa com Pódio Global, Mapa de Vencedores, Curvas de Retenção e Custo por Km.

4. **`mapa-calor-minimizacao-custo.html` (Mapa de Calor Mestre)**
   - Matrix visual de densidade sem filtros com 3.060 pontos de dados.

5. **`valores-revenda.json` (Base de Dados JSON)**
   - Estrutura JSON com dados completos das 12 variantes (2021-2024).

6. **`regras-calculo.md` (Fonte da Verdade)**
   - Especificação matemática completa do projeto v3.2.
