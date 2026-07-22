# Regras de Cálculo — Matrizes de Desvalorização v2

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

---

## 2. Fórmula Base

```
Depreciação_Mensal = round( (Preço_Compra - Revenda_Ajustada) / 28 )
```

Onde:
- `round()` = arredondamento padrão (0.5 arredonda para cima)
- `Revenda_Ajustada = max(0, Revenda_Base - Penalização_Garantia)`
- A Revenda_Base depende **exclusivamente** do modelo, ano e quilometragem inicial (não do preço de compra)

---

## 3. Valores de Revenda Base

Valores em euros. Todos são múltiplos de €100.
A coluna "km" refere-se à quilometragem **na compra** (Ago/2026). O km final na venda (Dez/2028) é km + 21.000.

### 3.1 Tesla M3 SR+ LFP (Dez/2021)

- **Taxa de degradação**: €300 / 5.000 km (abaixo da barreira)
- **Barreira 100k+**: salto extra de €400 entre 90k→95k km iniciais
- **Pós-barreira**: €400-500 / 5.000 km

| Km Inicial | Km Final | Revenda Base |
|-----------|----------|-------------|
| 35.000 | 56.000 | €18.300 |
| 40.000 | 61.000 | €18.000 |
| 45.000 | 66.000 | €17.700 |
| 50.000 | 71.000 | €17.400 |
| 55.000 | 76.000 | €17.100 |
| 60.000 | 81.000 | €16.800 |
| 65.000 | 86.000 | €16.500 |
| 70.000 | 91.000 | €16.200 |
| 75.000 | 96.000 | €15.900 |
| 80.000 | 101.000 | €15.600 |
| 85.000 | 106.000 | €15.300 |
| 90.000 | 111.000 | €15.000 |
| 95.000 | 116.000 | €14.300 |
| 100.000 | 121.000 | €13.900 |
| 105.000 | 126.000 | €13.500 |
| 110.000 | 131.000 | €13.000 |
| 115.000 | 136.000 | €12.500 |

### 3.2 IONIQ 5 72.6 kWh (Jul/2022)

- **Taxa de degradação**: €500 / 5.000 km (uniforme)
- **Barreira 100k+**: salto extra de €500 entre 90k→95k km iniciais

| Km Inicial | Km Final | Revenda Base |
|-----------|----------|-------------|
| 35.000 | 56.000 | €17.500 |
| 40.000 | 61.000 | €17.000 |
| 45.000 | 66.000 | €16.500 |
| 50.000 | 71.000 | €16.000 |
| 55.000 | 76.000 | €15.500 |
| 60.000 | 81.000 | €15.000 |
| 65.000 | 86.000 | €14.500 |
| 70.000 | 91.000 | €14.000 |
| 75.000 | 96.000 | €13.500 |
| 80.000 | 101.000 | €13.000 |
| 85.000 | 106.000 | €12.500 |
| 90.000 | 111.000 | €12.000 |
| 95.000 | 116.000 | €11.000 |
| 100.000 | 121.000 | €10.500 |
| 105.000 | 126.000 | €10.000 |
| 110.000 | 131.000 | €9.500 |
| 115.000 | 136.000 | €9.000 |

### 3.3 IONIQ 5 72.6 kWh (Nov/2021)

- Mesma taxa que o modelo 2022
- Revenda base €500 inferior ao 2022 (1 ano mais velho)

| Km Inicial | Km Final | Revenda Base |
|-----------|----------|-------------|
| 35.000 | 56.000 | €17.000 |
| 40.000 | 61.000 | €16.500 |
| 45.000 | 66.000 | €16.000 |
| 50.000 | 71.000 | €15.500 |
| 55.000 | 76.000 | €15.000 |
| 60.000 | 81.000 | €14.500 |
| 65.000 | 86.000 | €14.000 |
| 70.000 | 91.000 | €13.500 |
| 75.000 | 96.000 | €13.000 |
| 80.000 | 101.000 | €12.500 |
| 85.000 | 106.000 | €12.000 |
| 90.000 | 111.000 | €11.500 |
| 95.000 | 116.000 | €10.500 |
| 100.000 | 121.000 | €10.000 |
| 105.000 | 126.000 | €9.500 |
| 110.000 | 131.000 | €9.000 |
| 115.000 | 136.000 | €8.500 |

### 3.4 Megane E-Tech EV60 (Set/2022)

- Mesma taxa que o IONIQ 5 (€500 / 5.000 km)
- Revenda base €1.000 inferior ao IONIQ 5 2022

| Km Inicial | Km Final | Revenda Base |
|-----------|----------|-------------|
| 35.000 | 56.000 | €16.500 |
| 40.000 | 61.000 | €16.000 |
| 45.000 | 66.000 | €15.500 |
| 50.000 | 71.000 | €15.000 |
| 55.000 | 76.000 | €14.500 |
| 60.000 | 81.000 | €14.000 |
| 65.000 | 86.000 | €13.500 |
| 70.000 | 91.000 | €13.000 |
| 75.000 | 96.000 | €12.500 |
| 80.000 | 101.000 | €12.000 |
| 85.000 | 106.000 | €11.500 |
| 90.000 | 111.000 | €11.000 |
| 95.000 | 116.000 | €10.000 |
| 100.000 | 121.000 | €9.500 |
| 105.000 | 126.000 | €9.000 |
| 110.000 | 131.000 | €8.500 |
| 115.000 | 136.000 | €8.000 |

---

## 4. Penalização de Garantia de Bateria

### 4.1 Escala de Penalização

A penalização é um desconto fixo no valor de revenda, baseado nos meses de garantia de bateria restantes na data de venda (Dez/2028).

| Garantia Restante na Venda | Penalização Base |
|---------------------------|-----------------|
| ≥ 24 meses | €0 |
| 18-23 meses | €750 |
| 12-17 meses | €1.500 |
| 6-11 meses | €2.000 |
| 0-5 meses | €2.500 |
| Expirada (< 0 meses) | €3.000 |

### 4.2 Redutor LFP

Para modelos com bateria LFP, a penalização é reduzida em **50%**:
```
Penalização_Final = round(Penalização_Base × 0.5)
```
Justificação: baterias LFP têm durabilidade superior (300k+ km com degradação mínima), o que reduz o impacto psicológico da expiração da garantia no comprador.

### 4.3 Voiding por Quilometragem

Se o km final na venda **exceder o limite de km da garantia**, a garantia é considerada nula independentemente da data. Aplica-se a penalização máxima (€3.000, ou €1.500 com redutor LFP).

| Modelo | Limite Km Garantia |
|--------|-------------------|
| IONIQ 5 (2021/2022) | 160.000 km |
| Megane E-Tech | 160.000 km |
| Tesla M3 SR+ | 192.000 km |

> **Nota:** Nos cenários atuais (km final máximo = 136.000), nenhum carro atinge o limite.

### 4.4 Resultado por Modelo

| Modelo | Registo | Garantia | Expira | Meses Restantes | Faixa | Pen. Base | LFP? | **Pen. Final** | **€/mês** |
|--------|---------|----------|--------|----------------|-------|-----------|------|---------------|-----------|
| IONIQ 5 2022 | Jul/2022 | 8 anos | Jul/2030 | 19m | 18-23m | €750 | Não | **€750** | +€27 |
| IONIQ 5 2021 | Nov/2021 | 8 anos | Nov/2029 | 11m | 6-11m | €2.000 | Não | **€2.000** | +€71 |
| Megane 2022 | Set/2022 | 8 anos | Set/2030 | 21m | 18-23m | €750 | Não | **€750** | +€27 |
| Tesla M3 2021 | Dez/2021 | 8 anos | Dez/2029 | 12m | 12-17m | €1.500 | **Sim** | **€750** | +€27 |

---

## 5. Escala de Cores

Gradiente contínuo de verde (bom) a vermelho (mau), baseado no valor de depreciação mensal:

```
t = clamp((valor - 100) / 600, 0, 1)
R = round(255 × t)
G = round(255 × (1 - t))
B = 50
Cor = rgb(R, G, B)
```

| Valor | Cor | Significado |
|-------|-----|------------|
| €100 | rgb(0, 255, 50) | Excelente |
| €200 | rgb(43, 212, 50) | Bom |
| €300 | rgb(85, 170, 50) | Aceitável |
| €400 | rgb(128, 127, 50) | Caro |
| €500 | rgb(170, 85, 50) | Muito caro |
| €600 | rgb(212, 43, 50) | Péssimo |
| €700 | rgb(255, 0, 50) | Evitar |

---

## 6. O que NÃO está incluído

| Fator | Motivo da Exclusão |
|-------|--------------------|
| Custo de oportunidade / juros | Depende da situação financeira individual |
| Seguros e manutenção | Custos operacionais, não desvalorização |
| Obsolescência tecnológica | Decisão do utilizador: excluído por ser especulativo |
| Garantia estendida ICCU (IONIQ 5) | Decisão do utilizador: ignorado por incerteza |
| Inflação / variação do mercado | Modelo assume preços estáveis |

---

## 7. Histórico de Versões

| Versão | Data | Alterações |
|--------|------|------------|
| v1 | Jul/2026 | Modelo base com barreira 100k e degradação por km |
| v2 | 22/Jul/2026 | Adicionada penalização de garantia de bateria, redutor LFP, display de revenda e fatores |
