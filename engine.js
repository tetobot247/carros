/**
 * CarEngine v4.0 — Motor de Cálculo Partilhado
 * Fonte da verdade para todos os dashboards de desvalorização.
 * 18 variantes · 5 plataformas · Agosto/2026 → Dezembro/2028
 *
 * NOTA: Anteriormente, este código estava duplicado inline em cada HTML.
 * Agora é carregado uma vez via <script src="engine.js"></script>.
 */
(function() {
'use strict';

// ============ PARÂMETROS GLOBAIS ============
var M = 28;           // Meses de posse
var KPM = 750;        // Km por mês
var TKM = 21000;      // Km total adicionado (M × KPM)
var LFPR = 0.5;       // Redutor LFP (50%)

// ============ ESCADA DE PENALIZAÇÃO DE GARANTIA DE BATERIA ============
var WS = [
    {m: 24, p: 0},        // ≥24 meses restantes → sem penalização
    {m: 18, p: 750},      // 18-23 meses
    {m: 12, p: 1500},     // 12-17 meses
    {m: 6,  p: 2000},     // 6-11 meses
    {m: 0,  p: 2500},     // 0-5 meses
    {m: -999, p: 3000}    // Expirada
];
// Se carro é LFP e penalização > 0: penalização *= LFPR (50%)

// ============ FAIXAS DE QUILOMETRAGEM (×1000 km) ============
var KM = [35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115];

// ============ FAIXA DE PREÇOS DE COMPRA (€21k a €42k) ============
var PR = [];
for (var i = 21000; i <= 42000; i += 1000) PR.push(i);

// ============ NOMES DOS MESES ============
var MN = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

// ============ PREÇOS DE COMPRA REALISTAS POR ANO (Agosto/2026) ============
var REALISTIC_PRICES = {
    2021: 24000,
    2022: 26000,
    2023: 29000,
    2024: 33000
};

// ============ 18 VARIANTES DE VEÍCULOS ============
var CARS = [
    // --- TESLA MODEL 3 SR / RWD (LFP) ---
    {
        id: 'tesla_2021', n: 'Tesla Model 3 SR+ LFP', y: 2021, brand: 'tesla', lfp: true,
        ry: 2021, rm: 12, wy: 8, wk: 192000, b35: 18300, step: 300, jump: 400,
        s: 'Bateria LFP 55 kWh com elevada durabilidade. 12m de garantia restantes em Dez/2028 (-\u20AC750 com redutor LFP).'
    },
    {
        id: 'tesla_2022', n: 'Tesla Model 3 RWD LFP', y: 2022, brand: 'tesla', lfp: true,
        ry: 2022, rm: 6, wy: 8, wk: 192000, b35: 19800, step: 300, jump: 400,
        s: 'Bateria LFP 60 kWh e processador AMD Ryzen. 18m de garantia de bateria restantes em 2028.'
    },
    {
        id: 'tesla_2023', n: 'Tesla Model 3 RWD LFP', y: 2023, brand: 'tesla', lfp: true,
        ry: 2023, rm: 6, wy: 8, wk: 192000, b35: 21500, step: 350, jump: 400,
        s: 'Modelo 2023 pr\u00E9-Highland com excelente valor de revenda. 30m de garantia de bateria restante (sem penaliza\u00E7\u00E3o).'
    },
    {
        id: 'tesla_2024', n: 'Tesla Model 3 Highland', y: 2024, brand: 'tesla', lfp: true,
        ry: 2024, rm: 3, wy: 8, wk: 192000, b35: 24500, step: 400, jump: 500,
        s: 'Facelift Highland (insonoriza\u00E7\u00E3o superior, ecr\u00E3 traseiro). Garantia de bateria confort\u00E1vel at\u00E9 Mar/2032 (39m restantes).'
    },

    // --- TESLA MODEL 3 LONG RANGE AWD (NMC) ---
    {
        id: 'tesla_lr_2021', n: 'Tesla Model 3 LR AWD', y: 2021, brand: 'tesla_lr', lfp: false,
        ry: 2021, rm: 9, wy: 8, wk: 192000, b35: 20000, step: 350, jump: 450,
        s: 'Bateria NMC 75-82 kWh, Dual Motor AWD e maior autonomia. 9m de garantia de bateria restantes em Dez/2028 (-\u20AC2.500).'
    },
    {
        id: 'tesla_lr_2022', n: 'Tesla Model 3 LR AWD', y: 2022, brand: 'tesla_lr', lfp: false,
        ry: 2022, rm: 6, wy: 8, wk: 192000, b35: 21800, step: 350, jump: 450,
        s: 'AMD Ryzen com mais autonomia e tra\u00E7\u00E3o integral. 18m de garantia restantes (-\u20AC750).'
    },
    {
        id: 'tesla_lr_2023', n: 'Tesla Model 3 LR AWD', y: 2023, brand: 'tesla_lr', lfp: false,
        ry: 2023, rm: 6, wy: 8, wk: 192000, b35: 24000, step: 400, jump: 450,
        s: 'Autonomia ~630 km WLTP. 30m de garantia de bateria restante em 2028.'
    },
    {
        id: 'tesla_lr_2024', n: 'Tesla Model 3 Highland LR', y: 2024, brand: 'tesla_lr', lfp: false,
        ry: 2024, rm: 3, wy: 8, wk: 192000, b35: 27500, step: 450, jump: 550,
        s: 'Highland Long Range com autonomia m\u00E1xima de ~678 km WLTP e tra\u00E7\u00E3o integral. 39m de garantia restantes.'
    },

    // --- IONIQ 5 58 kWh (STANDARD RANGE) ---
    {
        id: 'ioniq5_58_2021', n: 'IONIQ 5 58 kWh Standard', y: 2021, brand: 'ioniq5_58', lfp: false,
        ry: 2021, rm: 11, wy: 8, wk: 160000, b35: 13500, step: 450, jump: 500,
        s: 'Bateria 58 kWh de entrada (autonomia urbana/mista). 11m de garantia de bateria restantes em 2028 (-\u20AC2.000).'
    },
    {
        id: 'ioniq5_58_2022', n: 'IONIQ 5 58 kWh Standard', y: 2022, brand: 'ioniq5_58', lfp: false,
        ry: 2022, rm: 7, wy: 8, wk: 160000, b35: 15000, step: 450, jump: 500,
        s: 'Bateria 58 kWh de entrada. 19m de garantia de bateria restantes em 2028 (-\u20AC750).'
    },

    // --- IONIQ 5 LONG RANGE ---
    {
        id: 'ioniq_2021', n: 'IONIQ 5 72.6 kWh', y: 2021, brand: 'ioniq5', lfp: false,
        ry: 2021, rm: 11, wy: 8, wk: 160000, b35: 16000, step: 500, jump: 500,
        s: 'Build inicial sem pr\u00E9-condicionamento. Apenas 11m de garantia de bateria na venda em Dez/2028 (penaliza\u00E7\u00E3o de -\u20AC2.000).'
    },
    {
        id: 'ioniq_2022', n: 'IONIQ 5 72.6 kWh', y: 2022, brand: 'ioniq5', lfp: false,
        ry: 2022, rm: 7, wy: 8, wk: 160000, b35: 17500, step: 500, jump: 500,
        s: 'Garantia standard expira em 2027. 19m de garantia de bateria restantes (-\u20AC750).'
    },
    {
        id: 'ioniq_2023', n: 'IONIQ 5 77.4 kWh', y: 2023, brand: 'ioniq5', lfp: false,
        ry: 2023, rm: 6, wy: 8, wk: 160000, b35: 19800, step: 500, jump: 500,
        s: 'Upgrade para bateria 77.4 kWh com maior autonomia e pr\u00E9-condicionamento de s\u00E9rie. 30m de garantia restantes.'
    },
    {
        id: 'ioniq_2024', n: 'IONIQ 5 84 kWh Facelift', y: 2024, brand: 'ioniq5', lfp: false,
        ry: 2024, rm: 3, wy: 8, wk: 160000, b35: 23200, step: 500, jump: 600,
        s: 'Facelift 2024 com bateria de 84 kWh e limpa-para-brisas traseiro. 39m de garantia de bateria restante em 2028.'
    },

    // --- MEGANE E-TECH ---
    {
        id: 'megane_2021', n: 'Megane E-Tech EV60', y: 2021, brand: 'megane', lfp: false,
        ry: 2021, rm: 12, wy: 8, wk: 160000, b35: 15800, step: 500, jump: 500,
        s: 'Primeira vaga de produ\u00E7\u00E3o. 12m de garantia de bateria restantes (-\u20AC1.500).'
    },
    {
        id: 'megane_2022', n: 'Megane E-Tech EV60', y: 2022, brand: 'megane', lfp: false,
        ry: 2022, rm: 9, wy: 8, wk: 160000, b35: 16500, step: 500, jump: 500,
        s: 'Bateria 60 kWh com carregamento 22 kW AC (trunfo em Portugal). 21m de garantia restantes.'
    },
    {
        id: 'megane_2023', n: 'Megane E-Tech EV60', y: 2023, brand: 'megane', lfp: false,
        ry: 2023, rm: 6, wy: 8, wk: 160000, b35: 18500, step: 500, jump: 500,
        s: 'Sistema OpenR Link Google integrado com atualiza\u00E7\u00F5es de software. 30m de garantia de bateria restantes em 2028.'
    },
    {
        id: 'megane_2024', n: 'Megane E-Tech EV60', y: 2024, brand: 'megane', lfp: false,
        ry: 2024, rm: 3, wy: 8, wk: 160000, b35: 21000, step: 500, jump: 600,
        s: 'Modelo recente com baixa idade em 2028 (4 anos de idade). 39m de garantia de bateria restante.'
    }
];

// ============ PLATAFORMAS (BRANDS) ============
var BRANDS = [
    { id: 'tesla', name: 'Tesla Model 3 SR/RWD (LFP)', color: '#ff453a', cars: [] },
    { id: 'tesla_lr', name: 'Tesla Model 3 Long Range (NMC)', color: '#ff9f0a', cars: [] },
    { id: 'ioniq5', name: 'Hyundai IONIQ 5 (Long Range)', color: '#64d2ff', cars: [] },
    { id: 'ioniq5_58', name: 'Hyundai IONIQ 5 58 kWh (Standard)', color: '#5ac8fa', cars: [] },
    { id: 'megane', name: 'Renault Megane E-Tech EV60', color: '#d070ff', cars: [] }
];

// Associar carros às plataformas
BRANDS.forEach(function(b) {
    b.cars = CARS.filter(function(c) { return c.brand === b.id; });
});

// ============ CORES POR BRAND (para rendering) ============
var BRAND_COLORS = {
    tesla:     { bg: 'rgba(255,69,58,0.25)',  border: 'rgba(255,69,58,0.5)',  text: '#ff453a', fill: '#ff453a' },
    tesla_lr:  { bg: 'rgba(255,159,10,0.25)', border: 'rgba(255,159,10,0.5)', text: '#ff9f0a', fill: '#ff9f0a' },
    ioniq5:    { bg: 'rgba(100,210,255,0.25)', border: 'rgba(100,210,255,0.5)', text: '#64d2ff', fill: '#64d2ff' },
    ioniq5_58: { bg: 'rgba(90,200,250,0.25)',  border: 'rgba(90,200,250,0.5)',  text: '#5ac8fa', fill: '#5ac8fa' },
    megane:    { bg: 'rgba(208,112,255,0.25)', border: 'rgba(208,112,255,0.5)', text: '#d070ff', fill: '#d070ff' }
};

// ============ FUNÇÕES DE CÁLCULO ============

/** Meses de garantia de bateria restantes na data de venda (Dez/2028) */
function wMonths(c) {
    return (c.ry + c.wy - 2028) * 12 + (c.rm - 12);
}

/** Penalização (€) baseada na garantia de bateria restante */
function wPenalty(c) {
    var m = wMonths(c);
    var p = 3000;
    for (var i = 0; i < WS.length; i++) {
        if (m >= WS[i].m) { p = WS[i].p; break; }
    }
    if (c.lfp && p > 0) p = Math.round(p * LFPR);
    return p;
}

/**
 * Revenda base (€) para um dado modelo e km de compra.
 * Parte de b35 (revenda @35k km) e subtrai c.step por cada faixa de 5k km.
 * Na transição 90k→95k (barreira psicológica dos 100k), acrescenta c.jump.
 *
 * @param {Object} c - Veículo
 * @param {number} k - Quilometragem de compra em milhares (ex: 35, 40, ...)
 */
function getBaseResale(c, k) {
    var idx = KM.indexOf(k);
    if (idx === -1) {
        // Fallback para km não-standard (usado pelo avaliador de ofertas)
        idx = Math.max(0, Math.min(KM.length - 1, Math.round((k - 35) / 5)));
    }
    var res = c.b35;
    for (var i = 0; i < idx; i++) {
        var currentKm = KM[i]; // km de partida deste step
        var drop = c.step + (currentKm === 90 ? c.jump : 0);
        res -= drop;
    }
    return res;
}

/**
 * Revenda ajustada (€) = revenda base - penalização de garantia.
 * Também aplica penalização por exceder o limite de km da garantia.
 */
function aResale(c, k) {
    var p = wPenalty(c);
    var fkm = k * 1000 + TKM;
    if (fkm > c.wk) {
        var kp = 3000;
        if (c.lfp) kp = Math.round(kp * LFPR);
        p = Math.max(p, kp);
    }
    return Math.max(0, getBaseResale(c, k) - p);
}

/**
 * Custo mensal de depreciação (€/mês).
 * Retorna null se o preço de compra ≤ revenda (combinação irrealista).
 */
function moVal(price, resale) {
    var diff = price - resale;
    if (diff <= 0) return null;
    return Math.round(diff / M);
}

/** Cor do heatmap verde→vermelho para um custo mensal */
function col(v) {
    if (v === null) return 'rgba(255,255,255,0.2)';
    var t = Math.max(0, Math.min(1, (v - 100) / 600));
    return 'rgb(' + Math.round(255 * t) + ',' + Math.round(255 * (1 - t)) + ',50)';
}

/** Formatar valor em euros (ex: fmt(18300) → "€18.300") */
function fmt(n) {
    return '\u20AC' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/** Data de expiração da garantia (ex: "Dez/2029") */
function wExpiry(c) {
    return MN[c.rm - 1] + '/' + (c.ry + c.wy);
}

/** Label descritivo da faixa de garantia */
function wLabel(c) {
    var m = wMonths(c);
    if (m >= 24) return '\u226524m (Sem Pen.)';
    if (m >= 18) return '18-23m';
    if (m >= 12) return '12-17m';
    if (m >= 6)  return '6-11m';
    if (m >= 0)  return '0-5m';
    return 'Expirada';
}

/**
 * Garantia efetiva considerando AMBOS os limites (tempo E quilometragem).
 * Retorna o mínimo entre os meses restantes por tempo e por km.
 */
function getEffectiveWarranty(c, buyKm) {
    var mTime = wMonths(c);
    var saleKm = buyKm * 1000 + TKM;
    var kmLeft = c.wk - saleKm;
    var mKm = Math.floor(kmLeft / 750);
    var effMonths = Math.min(mTime, mKm);
    return {
        mTime: mTime,
        saleKm: saleKm,
        kmLeft: kmLeft,
        effMonths: effMonths,
        limitingFactor: (mKm < mTime) ? 'Quilometragem' : 'Tempo'
    };
}

/** Badge HTML de garantia de bateria com cor e tooltip */
function getWarrantyBadge(c, buyKm) {
    var wObj = getEffectiveWarranty(c, buyKm || 35);
    var m = wObj.effMonths;
    if (m <= 0) return '<span class="w-badge-pill w-exp" title="Garantia Bateria Expirada">&#9889; 0m</span>';
    if (m < 6)  return '<span class="w-badge-pill w-6m" title="Garantia Bateria Cr\u00EDtica (<6m ou <4.5k km restantes)">&#9889; &lt;6m</span>';
    if (m < 12) return '<span class="w-badge-pill w-12m" title="Garantia Bateria Pr\u00F3xima do Fim (' + m + 'm equivalentes restantes)">&#9889; &lt;12m</span>';
    if (m < 18) return '<span class="w-badge-pill w-18m" title="Garantia Bateria Aten\u00E7\u00E3o (' + m + 'm equivalentes restantes)">&#9889; &lt;18m</span>';
    return '<span class="w-badge-pill w-ok" title="Garantia Bateria Confort\u00E1vel (' + m + 'm equivalentes restantes)">&check; &ge;18m</span>';
}

/** Encontrar um carro pelo ID */
function getCar(id) {
    for (var i = 0; i < CARS.length; i++) {
        if (CARS[i].id === id) return CARS[i];
    }
    return CARS[0];
}

// ============ EXPORTAR PARA GLOBAL ============
window.CarEngine = {
    // Parâmetros
    M: M, KPM: KPM, TKM: TKM, LFPR: LFPR,
    // Dados
    WS: WS, KM: KM, PR: PR, MN: MN,
    CARS: CARS, BRANDS: BRANDS,
    REALISTIC_PRICES: REALISTIC_PRICES,
    BRAND_COLORS: BRAND_COLORS,
    // Funções de cálculo
    wMonths: wMonths,
    wPenalty: wPenalty,
    getBaseResale: getBaseResale,
    aResale: aResale,
    moVal: moVal,
    col: col,
    fmt: fmt,
    wExpiry: wExpiry,
    wLabel: wLabel,
    getEffectiveWarranty: getEffectiveWarranty,
    getWarrantyBadge: getWarrantyBadge,
    getCar: getCar
};

})();
