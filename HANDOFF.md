# Agent Handoff — Análise de Desvalorização de Veículos Elétricos

> **Documento de Transição / Handoff do Projeto**  
> **Data:** 22/Jul/2026  
> **Repositório GitHub:** https://github.com/tetobot247/carros

---

## 📜 HISTÓRICO E ESTRUTURA DO PROJETO

### Arquivos Principais

1. **`mega-matriz-todas-ofertas.html` (NOVO - Mega-Matriz Granular Reunida de €1.000 em €1.000)**
   - **Granularidade Máxima de Preços:** 15 níveis de Preço de Compra (**€21.000, €22.000, €23.000, ..., €35.000**) &times; 17 colunas de Quilometragem (35k a 115k km).
   - **Exibe TODOS os 12 modelos/anos (2021-2024) simultaneamente na mesma página** (total de 3.060 pontos de dados calculados e validados).
   - **Visão 1 (Tabela Cruzada por Preço):** 15 seções de preço reunindo todos os modelos lado a lado.
   - **Visão 2 (Feed Integral das 12 Matrizes):** Renderiza todas as 12 tabelas granulares 15x17 completas.
   - **Navegação Direta:** Bar com chips atalhos para saltar diretamente para qualquer valor de preço de compra (€21k a €35k).

2. **`diagrama-referencia-ofertas.html` (Diagrama Mestre & Avaliador)**
   - Matriz 15x17 com widget avaliador de ofertas de mercado.

3. **`matrizes-unificadas-granulares.html` e `matrizes-km-granular-v3.html`**
   - Interfaces alternativas de visualização.

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
- **Passo de Preço:** €1.000 em €1.000 (€21k a €35k).
- **Sem Custo Negativo:** Se `Preço_Compra ≤ Revenda_Ajustada`, a célula exibe `—` (Irrealista).
