# Agent Handoff — Análise de Desvalorização de Veículos Elétricos

> **Documento de Transição / Handoff do Projeto**  
> **Data:** 22/Jul/2026  
> **Repositório GitHub:** https://github.com/tetobot247/carros

---

## 📜 HISTÓRICO E ESTRUTURA DO PROJETO

### Arquivos Principais

1. **`mega-matriz-todas-ofertas.html` (Mega-Matriz Granular Reunida com Filtro de Range de Preço)**
   - **Exibe TODOS os 12 modelos/anos (2021-2024) simultaneamente na mesma página**.
   - **Filtro Opcional de Range de Preço de Compra:** Permite filtrar livremente qualquer faixa de preço (€21k a €35k) via presets (`Todos`, `Económicos €21k-€25k`, `Intermédios €26k-€30k`, `Seminovos €31k-€35k`) ou seletores personalizados De/Até.
   - **Granularidade de €1.000 em €1.000:** 15 níveis de preço de compra &times; 17 colunas de quilometragem.
   - **Visão 1 (Tabela Cruzada Reunida):** Bloco por preço listando todas as marcas.
   - **Visão 2 (Feed Integral das 12 Matrizes):** Renderiza todas as 12 tabelas granulares.

2. **`mapa-calor-minimizacao-custo.html` (Mapa de Calor Mestre)**
   - Matrix visual de densidade sem filtros com 3.060 pontos de dados e tooltips em hover.

3. **`diagrama-referencia-ofertas.html` (Diagrama Mestre & Avaliador)**
   - Matriz 15x17 com widget avaliador de ofertas de mercado.

4. **`valores-revenda.json` (Base de Dados JSON)**
   - Estrutura JSON com dados completos das 12 variantes (2021-2024).

5. **`regras-calculo.md` (Fonte da Verdade)**
   - Especificação matemática completa do projeto v3.1.
