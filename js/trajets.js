// FONCTIONS DES TRAJETS


// Variables pour stocker les trajets actifs sur la carte
var trajetActuel = null;
var trajetBusActuel = null;

/**
 * Affiche la section des trajets dans la sidebar
 */
function afficherTrajetsSection() {
    console.log("afficherTrajetsSection appelée");
    
    var container = document.getElementById('trajetsSection');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Filtrer par campus
    var golfettes = (typeof currentCampus !== 'undefined' && currentCampus !== 'all') 
        ? trajetsGolfette.filter(t => t.campus === currentCampus)
        : trajetsGolfette;
    
    var bus = (typeof currentCampus !== 'undefined' && currentCampus !== 'all')
        ? trajetsBus.filter(t => t.campus === currentCampus)
        : trajetsBus;
    
    // Afficher Golfettes
    if (golfettes.length > 0) {
        var card = document.createElement('div');
        card.className = 'type-card';
        card.innerHTML = `
            <div class="type-header">
                <span class="type-nom">GOLF CART Pathway</span>
                <span class="toggle-icon">▼</span>
            </div>
            <div class="type-content"></div>
        `;
        
        var content = card.querySelector('.type-content');
        
        golfettes.forEach(function(t) {
            var item = document.createElement('div');
            item.className = 'sous-type-item';
            item.style.cursor = 'pointer';
            item.style.margin = '8px 0';
            item.style.padding = '10px';
            item.style.background = '#f0f5f9';
            item.style.borderRadius = '10px';
            item.style.display = 'flex';
            item.style.alignItems = 'center';
            item.style.gap = '12px';
            item.innerHTML = `
                <div class="trajet-icon" style="background: ${t.couleur};">G</div>
                <div class="sous-type-info"><div class="sous-type-nom">${t.nom}</div></div>
                <div class="sous-type-arrow">→</div>
            `;
            item.onclick = (function(trajet) {
                return function() {
                    effacerTousLesTrajets();
                    afficherTrajetGolfette(trajet.id);
                };
            })(t);
            content.appendChild(item);
        });
        
        var header = card.querySelector('.type-header');
        header.onclick = function() {
            var contentDiv = this.nextElementSibling;
            if (contentDiv.style.display === 'none') {
                contentDiv.style.display = 'block';
            } else {
                contentDiv.style.display = 'none';
            }
        };
        
        container.appendChild(card);
    }
    
    // Afficher Bus
    if (bus.length > 0) {
        var card2 = document.createElement('div');
        card2.className = 'type-card';
        card2.innerHTML = `
            <div class="type-header">
                <span class="type-nom">BUS Pathway</span>
                <span class="toggle-icon">▼</span>
            </div>
            <div class="type-content"></div>
        `;
        
        var content2 = card2.querySelector('.type-content');
        
        bus.forEach(function(t) {
            var item = document.createElement('div');
            item.className = 'sous-type-item';
            item.style.cursor = 'pointer';
            item.style.margin = '8px 0';
            item.style.padding = '10px';
            item.style.background = '#f0f5f9';
            item.style.borderRadius = '10px';
            item.style.display = 'flex';
            item.style.alignItems = 'center';
            item.style.gap = '12px';
            item.innerHTML = `
                <div class="trajet-icon" style="background: ${t.couleur};">B</div>
                <div class="sous-type-info"><div class="sous-type-nom">${t.nom}</div></div>
                <div class="sous-type-arrow">→</div>
            `;
            item.onclick = (function(trajet) {
                return function() {
                    effacerTousLesTrajets();
                    afficherTrajetBus(trajet.id);
                };
            })(t);
            content2.appendChild(item);
        });
        
        var header2 = card2.querySelector('.type-header');
        header2.onclick = function() {
            var contentDiv = this.nextElementSibling;
            if (contentDiv.style.display === 'none') {
                contentDiv.style.display = 'block';
            } else {
                contentDiv.style.display = 'none';
            }
        };
        
        container.appendChild(card2);
    }
    
    console.log("Trajets affichés:", golfettes.length, "golfettes,", bus.length, "bus");
}

/**
 * Affiche un trajet golfette sur la carte
 */
function afficherTrajetGolfette(trajetId) {
    var trajet = trajetsGolfette.find(function(t) { return t.id === trajetId; });
    if (!trajet) return;
    if (typeof map === 'undefined' || !map) return;
    
    // Cacher les marqueurs
    if (typeof markersList !== 'undefined') {
        markersList.forEach(function(item) {
            if (map.hasLayer(item.marker)) map.removeLayer(item.marker);
        });
    }
    
    // Cacher les anciens trajets
    if (trajetActuel && map.hasLayer(trajetActuel)) map.removeLayer(trajetActuel);
    if (trajetBusActuel && map.hasLayer(trajetBusActuel)) map.removeLayer(trajetBusActuel);
    
    // Récupérer les points
    var points = [];
    trajet.arrets.forEach(function(id) {
        var arret = arretsGolfette.find(function(a) { return a.id === id; });
        if (arret && arret.coords) points.push(arret.coords);
    });
    
    if (points.length >= 2) {
        var traitCouleur = L.polyline(points, {
            color: trajet.couleur,
            weight: 5,
            opacity: 0.9,
            lineCap: 'round',
            lineJoin: 'round'
        }).addTo(map);
        
        trajetActuel = traitCouleur;
        map.fitBounds(L.latLngBounds(points));
    }
}

/**
 * Affiche un trajet bus sur la carte
 */
function afficherTrajetBus(trajetId) {
    var trajet = trajetsBus.find(function(t) { return t.id === trajetId; });
    if (!trajet) return;
    if (typeof map === 'undefined' || !map) return;
    
    // Cacher les marqueurs
    if (typeof markersList !== 'undefined') {
        markersList.forEach(function(item) {
            if (map.hasLayer(item.marker)) map.removeLayer(item.marker);
        });
    }
    
    // Cacher les anciens trajets
    if (trajetActuel && map.hasLayer(trajetActuel)) map.removeLayer(trajetActuel);
    if (trajetBusActuel && map.hasLayer(trajetBusActuel)) map.removeLayer(trajetBusActuel);
    
    // Récupérer les points
    var points = [];
    trajet.arrets.forEach(function(id) {
        var arret = arretsBus.find(function(a) { return a.id === id; });
        if (arret && arret.coords) points.push(arret.coords);
    });
    
    if (points.length >= 2) {
        var traitCouleur = L.polyline(points, {
            color: trajet.couleur,
            weight: 5,
            opacity: 0.9,
            dashArray: "8,8",
            lineCap: 'round',
            lineJoin: 'round'
        }).addTo(map);
        
        trajetBusActuel = traitCouleur;
        map.fitBounds(L.latLngBounds(points));
    }
}

/**
 * Efface tous les trajets de la carte
 */
function effacerTousLesTrajets() {
    if (trajetActuel && map && map.hasLayer(trajetActuel)) {
        map.removeLayer(trajetActuel);
        trajetActuel = null;
    }
    if (trajetBusActuel && map && map.hasLayer(trajetBusActuel)) {
        map.removeLayer(trajetBusActuel);
        trajetBusActuel = null;
    }
}
