# Regras de Cálculo — Matrizes de Desvalorização v5.0 (2020 - 2025)

> **Este documento é a FONTE DA VERDADE para todos os cálculos das matrizes.**
> Qualquer alteração ao modelo deve ser refletida aqui primeiro.

---

## 1. Parâmetros Fixos

| Parâmetro | Valor |
|-----------|-------|
| Período de posse | **28 meses** |
| Data de compra | **Agosto/2026** |
| Data de venda | **Dezembro/2028** |
| Quilometragem mensal | **750 km/mês** |
| Km total adicionado | **21.000 km** (28 × 750) |
| Local | **Porto, Portugal** |
| Redutor LFP | **50%** (aplica-se a modelos com bateria LFP) |
| Anos de fabrico cobertos | **2020, 2021, 2022, 2023, 2024, 2025** |
| Regra de Validade | **Sem Custo Negativo:** `Preço_Compra` DEVE ser maior que `Revenda_Ajustada`. Combinações irrealistas onde `Preço_Compra ≤ Revenda_Ajustada` são marcadas como `—` (Irrealista). |

---

## 2. Preços de Compra Típicos de Mercado por Ano (Agosto/2026)

| Ano de Fabrico | Idade em Ago/2026 | Preço de Compra Típico / Referência | Faixa Realista no Mercado |
|----------------|-------------------|-----------------------------------|---------------------------|
| **2020** | 6 anos | **€21.000** | €18.000 – €24.000 |
| **2021** | 5 anos | **€24.000** | €21.000 – €27.000 |
| **2022** | 4 anos | **€26.000** | €23.000 – €29.000 |
| **2023** | 3 anos | **€29.000** | €26.000 – €33.000 |
| **2024** | 2 anos | **€33.000** | €30.000 – €37.000 |
| **2025** | 1 ano  | **€37.000** | €34.000 – €42.000 |

---

## 3. Fórmula Base

```
Diferença = Preço_Compra - Revenda_Ajustada

Se Diferença > 0:
    Depreciação_Mensal = round( Diferença / 28 )
Senão:
    Resultado = "—" (Irrealista / N/A)
```

Onde:
- `Revenda_Ajustada = max(0, Revenda_Base - Penalização_Garantia)`
- A Revenda_Base depende **exclusivamente** do modelo, ano de fabrico e quilometragem inicial.

---

## 4. Modelo de Revenda Base por Ano de Fabrico (em € na compra com 35.000 km)

| Modelo | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 |
|--------|------|------|------|------|------|------|
| **Tesla Model 3 SR/RWD LFP** | — | €18.300 | €19.800 | €21.500 | €24.500 | — |
| **Tesla Model 3 LR AWD** | — | €20.000 | €21.800 | €24.000 | €27.500 | — |
| **IONIQ 5 58 kWh Standard** | — | €13.500 | €15.000 | €17.000 | — | — |
| **IONIQ 5 63 kWh Facelift** | — | — | — | — | €20.000 | €23.500 |
| **IONIQ 5 Long Range** | — | €16.000 | €17.500 | €19.800 | €23.200 | — |
| **Kia EV6 58 kWh Air** | — | €14.000 | €15.500 | €17.500 | — | — |
| **Kia EV6 63 kWh Facelift** | — | — | — | — | €20.500 | — |
| **Kia EV6 LR 77.4 kWh** | — | €17.000 | €18.800 | €21.200 | — | — |
| **BMW i3 120Ah** | €14.000 | €15.200 | €16.800 | — | — | — |
| **BMW i3s 120Ah** | €15.200 | €16.500 | €18.200 | — | — | — |
| **Polestar 2 Standard 69 kWh** | — | €17.500 | €19.200 | €21.500 | — | — |
| **Polestar 2 LR Single 78 kWh** | — | €19.500 | €21.500 | €24.000 | — | — |
| **Cupra Born 58 kWh** | — | €14.800 | €16.200 | — | — | — |
| **Cupra Born 58 kWh e-Boost** | — | €15.800 | €17.200 | — | — | — |
| **Cupra Born LR 77 kWh** | — | — | €18.500 | €20.800 | €23.500 | — |
| **Megane E-Tech EV60** | — | €15.800 | €16.500 | €18.500 | €21.000 | — |

---

## 5. Histórico de Versões

| Versão | Data | Alterações |
|--------|------|------------|
| v1.0 | Jul/2026 | Modelo base com barreira 100k km e degradação por km |
| v2.0 | 22/Jul/2026 | Adicionada penalização de garantia de bateria e redutor LFP (50%) |
| v3.0 | 22/Jul/2026 | Expansão para cobrir **todos os anos de fabrico de 2021 a 2024** (12 variantes), novo HTML v3 com filtros |
| v3.1 | 22/Jul/2026 | Correção de valores negativos e preços realistas |
| v3.2 | 22/Jul/2026 | Ajuste IONIQ 5 2021 |
| v4.0 | 22/Jul/2026 | Expansão para 18 variantes (Tesla LR e IONIQ 5 58kWh) |
| v5.0 | 24/Jul/2026 | **Expansão para 47 Variantes (+25 Modelos):** Adicionados **BMW i3/i3s 120Ah** (2020-2022), **Kia EV6 58/63/77.4kWh** (2021-2024), **Polestar 2 SR/LR** (2021-2023), **Cupra Born 58/e-Boost/77kWh** (2021-2024), e expansão do **IONIQ 5** (58kWh 2023, 63kWh 2024-2025). |
