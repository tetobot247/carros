# Agent Handoff — Análise de Desvalorização de Veículos Elétricos

> **Documento de Transição / Handoff do Projeto**  
> **Data:** 22/Jul/2026  
> **Repositório GitHub:** https://github.com/tetobot247/carros

---

## 📜 HISTÓRICO E ESTRUTURA DO PROJETO

### Arquivos Principais

1. **`diagrama-referencia-ofertas.html` (NOVO - Diagrama Mestre de Referência & Avaliador de Ofertas)**
   - **Diagrama Mestre de Referência:** Tabela 15x17 cobrindo todas as combinações de Preço de Compra (€21k a €35k) vs Quilometragem (35k a 115k km) para qualquer modelo/ano (2021-2024).
   - **Código de Cores de Qualidade do Negócio:**
     - 🟢 **Excelente:** `< €200/mês`
     - 🟢 **Bom:** `€200 - €275/mês`
     - 🟡 **Razoável:** `€275 - €350/mês`
     - 🟠 **Elevado:** `€350 - €450/mês`
     - 🔴 **Mau Negócio:** `> €450/mês`
   - **Avaliador Rápido de Ofertas (Widget):** Permite inserir qualquer anúncio de mercado (Modelo, Preço e Km) e dá um verdito instantâneo com destaque da célula exata no diagrama.

2. **`matrizes-unificadas-granulares.html` (Matriz Granular Unificada)**
   - Reúne todos os dados granulares com indicadores visuais de cor por marca (🔴 Tesla, 🔵 IONIQ 5, 🟣 Megane).

3. **`matrizes-km-granular-v3.html` (Versão 3 — Matrizes por Card)**
   - Visualização por cards dinâmicos.

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
