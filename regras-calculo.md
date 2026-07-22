# Regras de Cálculo — Matrizes de Desvalorização v3 (2021 - 2024)

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
| Anos de fabrico cobertos | **2021, 2022, 2023, 2024** |
| Regra de Validade | **Sem Custo Negativo:** `Preço_Compra` DEVE ser maior que `Revenda_Ajustada`. Combinações irrealistas onde `Preço_Compra ≤ Revenda_Ajustada` são marcadas como `—` (Irrealista). |

---

## 2. Preços de Compra Típicos de Mercado por Ano (Agosto/2026)

Em vez de aplicar uma tabela de preços de compra idêntica para todas as idades (o que causava valores de desvalorização negativos para carros de 2024 comprados a €21.000), o modelo define os **Preços de Compra Realistas de Mercado por Ano de Fabrico**:

| Ano de Fabrico | Idade em Ago/2026 | Preço de Compra Típico / Referência | Faixa Realista no Mercado |
|----------------|-------------------|-----------------------------------|---------------------------|
| **2021** | 5 anos | **€24.000** | €21.000 – €27.000 |
| **2022** | 4 anos | **€26.000** | €23.000 – €29.000 |
| **2023** | 3 anos | **€29.000** | €26.000 – €33.000 |
| **2024** | 2 anos | **€33.000** | €30.000 – €37.000 |

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

| Modelo | 2021 | 2022 | 2023 | 2024 |
|--------|------|------|------|------|
| **Tesla Model 3 LFP** | €18.300 (55kWh) | €19.800 (60kWh) | €21.500 (60kWh) | €24.500 (Highland) |
| **IONIQ 5** | €17.000 (72.6kWh) | €17.500 (72.6kWh) | €19.800 (77.4kWh) | €23.200 (84kWh Facelift) |
| **Megane E-Tech EV60** | €15.800 | €16.500 | €18.500 (OpenR Link) | €21.000 (Gama 2024) |

---

## 5. Histórico de Versões

| Versão | Data | Alterações |
|--------|------|------------|
| v1.0 | Jul/2026 | Modelo base com barreira 100k km e degradação por km |
| v2.0 | 22/Jul/2026 | Adicionada penalização de garantia de bateria e redutor LFP (50%) |
| v3.0 | 22/Jul/2026 | Expansão para cobrir **todos os anos de fabrico de 2021 a 2024** (12 variantes), novo HTML v3 com filtros |
| v3.1 | 22/Jul/2026 | **Correção de Valores Negativos:** Implementada proteção contra depreciação negativa (`Preço_Compra ≤ Revenda_Ajustada` assinalado como `—`), preços realistas de compra por ano de fabrico, e criação do dashboard unificado `comparativo-custo-mensal.html`. |
