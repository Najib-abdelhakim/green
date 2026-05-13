// ==================== GOLF CART STOPS ====================
var arretsGolfette = [
    { id: "GOLF-01", coords: [32.217594, -7.937086] },
    { id: "GOLF-02", coords: [32.219548, -7.939168] },
    { id: "GOLF-03", coords: [32.219909, -7.938983] },
    { id: "GOLF-05", coords: [32.219979, -7.939342] },
    { id: "GOLF-06", coords: [32.218952, -7.940753] },
    { id: "GOLF-07", coords: [32.216153, -7.939091] },
    { id: "GOLF-08", coords: [32.216445, -7.939384] },
    { id: "GOLF-09", coords: [32.214414, -7.942075] },
    { id: "GOLF-10", coords: [32.216073, -7.939943] },
    { id: "GOLF-11", coords: [32.214856, -7.938757] },
    { id: "GOLF-12", coords: [32.214252, -7.939670] },
    { id: "GOLF-13", coords: [32.214051, -7.939464] },
    { id: "GOLF-14", coords: [32.213833, -7.939793] },
    // Rabat
    { id: "GOL-1", coords: [33.980053, -6.733953] },
    { id: "GOL-2", coords: [33.980425, -6.731994] },
    { id: "GOL-4", coords: [33.978717, -6.728802] },
    { id: "GOL-5", coords: [33.979644, -6.728094] },
    { id: "GOL-6", coords: [33.979135, -6.727110] },
    { id: "GOL-7", coords: [33.979214, -6.727040] },
    { id: "GOL-8", coords: [33.979728, -6.728033] },
    { id: "GOL-9", coords: [33.980663, -6.727351] },
    { id: "GOL-10", coords: [33.980293, -6.726601] },
    { id: "GOL-11", coords: [33.980333, -6.726525] },
    { id: "GOL-12", coords: [33.980717, -6.727294] },
    { id: "GOL-13", coords: [33.981353, -6.726824] },
    { id: "GOL-14", coords: [33.982602, -6.729229] },
    { id: "GOL-15", coords: [33.980006, -6.731167] },
    { id: "GOL-16", coords: [33.979500, -6.727591] },
    { id: "GOL-17", coords: [33.979422874361916, -6.727658203373228] },
    { id: "GOL-18", coords: [33.979645, -6.728086] },
    { id: "GOL-19", coords: [33.978240, -6.729183] },
    { id: "GOL-20", coords: [33.979192, -6.730999] },
    { id: "GOL-21", coords: [33.978723, -6.731355] },
    { id: "GOL-22", coords: [33.979010, -6.731937] },
    { id: "GOL-23", coords: [33.9809578906194, -6.73037998257016] }
];

// ==================== BUS STOPS ====================
var arretsBus = [
    { id: "BUS-01", coords: [32.214110, -7.937251] },
    { id: "BUS-02", coords: [32.215140, -7.938333] },
    { id: "BUS-03", coords: [32.217086, -7.935701] },
    { id: "BUS-04", coords: [32.219834, -7.938491] },
    { id: "BUS-05", coords: [32.216935, -7.942335] },
    { id: "BUS-06", coords: [32.213287, -7.938580] },
    { id: "BUS-07", coords: [32.214183, -7.937371] },
    { id: "BUS-08", coords: [32.214083, -7.937271] },
    { id: "BUS-09", coords: [32.211296, -7.940944] },
    { id: "BUS-10", coords: [32.211322, -7.941260] },
    { id: "BUS-11", coords: [32.211021, -7.941319] },
    { id: "BUS-12", coords: [32.210971, -7.940934] },
    { id: "BUS-13", coords: [32.209275, -7.939573] },
    { id: "BUS-14", coords: [32.209094, -7.939561] },
    { id: "BUS-15", coords: [32.209124, -7.939311] },
    { id: "BUS-16", coords: [32.209124, -7.937991] },
    { id: "BUS-17", coords: [32.210071, -7.937812] },
    { id: "BUS-18", coords: [32.210775, -7.937277] },
    { id: "BUS-19", coords: [32.211550, -7.936980] },
    { id: "BUS-20", coords: [32.212234, -7.937051] },
    { id: "BUS-21", coords: [32.213536, -7.937873] },
    // Rabat
    { id: "BUS-RB-01", coords: [33.984798, -6.730144] },
    { id: "BUS-RB-02", coords: [33.981129, -6.726009] },
    { id: "BUS-RB-03", coords: [33.982339, -6.7244645] }
];

// ==================== TRAJETS GOLFETTES ====================
var trajetsGolfette = [
    // Ben Guerir
    { id: "TRAJET-01", nom: "CCI", campus: "Ben Guerir", couleur: "#39FF14", arrets: ["GOLF-01", "GOLF-02", "GOLF-03", "GOLF-05", "GOLF-06"] },
    { id: "TRAJET-02", nom: "Conference Center", campus: "Ben Guerir", couleur: "#00FFFF", arrets: ["GOLF-01", "GOLF-07", "GOLF-08", "GOLF-09"] },
    { id: "TRAJET-03", nom: "SHBM", campus: "Ben Guerir", couleur: "#FF00FF", arrets: ["GOLF-01", "GOLF-07", "GOLF-08", "GOLF-10", "GOLF-11", "GOLF-12", "GOLF-13", "GOLF-14"] },
    // Rabat
    { id: "TRAJET-04", nom: "RABAT 1", campus: "Rabat", couleur: "#FF5E00", arrets: ["GOL-1", "GOL-2", "GOL-4", "GOL-5", "GOL-6", "GOL-7", "GOL-8", "GOL-9", "GOL-10", "GOL-11", "GOL-12", "GOL-13", "GOL-14", "GOL-15"] },
    { id: "TRAJET-05", nom: "RABAT 2", campus: "Rabat", couleur: "#fbff10", arrets: ["GOL-16", "GOL-17", "GOL-18", "GOL-19", "GOL-20", "GOL-21", "GOL-22", "GOL-23", "GOL-16"] }
];

// ==================== TRAJETS BUS ====================
var trajetsBus = [
    // Ben Guerir
    { id: "BUS-T1", nom: "CAMPUS 2", campus: "Ben Guerir", couleur: "#ff0000", arrets: ["BUS-01", "BUS-02", "BUS-03", "BUS-04", "BUS-05", "BUS-06", "BUS-07", "BUS-08", "BUS-09", "BUS-10", "BUS-11", "BUS-12", "BUS-13", "BUS-14", "BUS-15", "BUS-16", "BUS-17", "BUS-18", "BUS-19", "BUS-20", "BUS-21"] },
    // Rabat
    { id: "BUS-T2", nom: "RABAT 1", campus: "Rabat", couleur: "#0800ff", arrets: ["BUS-RB-01", "BUS-RB-02", "BUS-RB-03"] }
];

console.log("trajets.js chargé");