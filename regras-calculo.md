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
| Faixa de preço de compra no HTML | **€21.000 a €35.000** |

---

## 2. Fórmula Base

```
Depreciação_Mensal = round( (Preço_Compra - Revenda_Ajustada) / 28 )
```

Onde:
- `round()` = arredondamento padrão (0.5 arredonda para cima)
- `Revenda_Ajustada = max(0, Revenda_Base - Penalização_Garantia)`
- A Revenda_Base depende **exclusivamente** do modelo, ano de fabrico e quilometragem inicial (não do preço de compra)

---

## 3. Modelo de Revenda Base por Ano de Fabrico (em € na compra com 35.000 km)

A tabela abaixo resume a Revenda Base inicial (para 35.000 km na compra / 56.000 km na venda em Dez/2028) para cada modelo e ano de fabrico. Para quilometragens superiores, aplica-se a taxa de degradação por km:

| Modelo | 2021 | 2022 | 2023 | 2024 |
|--------|------|------|------|------|
| **Tesla Model 3 LFP** | €18.300 (55kWh) | €19.800 (60kWh) | €21.500 (60kWh) | €24.500 (Highland) |
| **IONIQ 5** | €17.000 (72.6kWh) | €17.500 (72.6kWh) | €19.800 (77.4kWh) | €23.200 (84kWh Facelift) |
| **Megane E-Tech EV60** | €15.800 | €16.500 | €18.500 (OpenR Link) | €21.000 (Gama 2024) |

### Taxas de Degradação por Quilometragem
- **Tesla Model 3**: €300 a €400 por 5.000 km (com salto de +€400/500 na barreira dos 100k km finais).
- **IONIQ 5 e Megane E-Tech**: €500 por 5.000 km (com salto de +€500/600 na barreira dos 100k km finais).

---

## 4. Sistema de Penalização de Garantia de Bateria

Calculado com base nos **meses de garantia de bateria restantes em Dezembro de 2028** (assumindo garantia padrão de 8 anos):

| Garantia Restante em Dez/2028 | Faixa | Penalização Base | Penalização c/ Redutor LFP (50%) |
|------------------------------|-------|------------------|----------------------------------|
| ≥ 24 meses (carros 2023 e 2024) | `≥24m` | **€0** | **€0** |
| 18 a 23 meses (carros 2022) | `18-23m` | **€750** | **€375** |
| 12 a 17 meses (Tesla 2021) | `12-17m` | **€1.500** | **€750** |
| 6 a 11 meses (IONIQ 5 / Megane 2021) | `6-11m` | **€2.000** | **€1.000** |
| 0 a 5 meses | `0-5m` | **€2.500** | **€1.250** |
| Expirada / Km > limite | `Expirada` | **€3.000** | **€1.500** |

---

## 5. Histórico de Versões

| Versão | Data | Alterações |
|--------|------|------------|
| v1.0 | Jul/2026 | Modelo base com barreira 100k km e degradação por km |
| v2.0 | 22/Jul/2026 | Adicionada penalização de garantia de bateria e redutor LFP (50%) |
| v3.0 | 22/Jul/2026 | Expansão para cobrir **todos os anos de fabrico de 2021 a 2024** (12 variantes), novo HTML v3 com filtros por ano/modelo, e atualização da base JSON |
