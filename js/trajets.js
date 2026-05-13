// ==================== TRAJETS ====================

/**
 * Affiche la section des trajets (GOLF CART et BUS)
 */
function afficherTrajetsSection() {
    const container = document.getElementById('trajetsSection');
    if (!container) return;
    container.innerHTML = '';
    
    // Filtrer les trajets selon le campus actuel
    const golfettesFiltrees = (typeof trajetsGolfette !== 'undefined' && trajetsGolfette)
        ? (currentCampus === 'all' ? [...trajetsGolfette] : trajetsGolfette.filter(t => t.campus === currentCampus))
        : [];
    
    const busFiltrees = (typeof trajetsBus !== 'undefined' && trajetsBus)
        ? (currentCampus === 'all' ? [...trajetsBus] : trajetsBus.filter(t => t.campus === currentCampus))
        : [];
    
    // Afficher les trajets GOLF CART
    if (golfettesFiltrees.length > 0) {
        const card = createTrajetCard('GOLF CART Pathway', 'golfetteContent');
        const content = card.querySelector('.type-content');
        
        golfettesFiltrees.forEach(t => {
            const item = createTrajetItem('G', t.nom, t.couleur);
            item.onclick = () => {
                effacerTousLesTrajets();
                afficherTrajetGolfette(t.id);
            };
            content.appendChild(item);
        });
        
        container.appendChild(card);
    }
    
    // Afficher les trajets BUS
    if (busFiltrees.length > 0) {
        const card = createTrajetCard('BUS Pathway', 'busContent');
        const content = card.querySelector('.type-content');
        
        busFiltrees.forEach(t => {
            const item = createTrajetItem('B', t.nom, t.couleur);
            item.onclick = () => {
                effacerTousLesTrajets();
                afficherTrajetBus(t.id);
            };
            content.appendChild(item);
        });
        
        container.appendChild(card);
    }
}

/**
 * Crée une carte de trajet (conteneur pour une catégorie)
 * @param {string} title - Titre de la carte
 * @param {string} contentId - ID pour le contenu
 * @returns {HTMLElement} - Élément carte
 */
function createTrajetCard(title, contentId) {
    const card = document.createElement('div');
    card.className = 'type-card';
    card.innerHTML = `
        <div class="type-header">
            <span class="type-nom">${title}</span>
            <span class="toggle-icon">⮛</span>
        </div>
        <div class="type-content" id="${contentId}"></div>
    `;
    
    const header = card.querySelector('.type-header');
    header.onclick = function() {
        this.classList.toggle('collapsed');
        this.nextElementSibling.classList.toggle('collapsed');
    };
    
    return card;
}

/**
 * Crée un élément de trajet (item de la liste)
 * @param {string} letter - Lettre à afficher (G ou B)
 * @param {string} nom - Nom du trajet
 * @param {string} couleur - Couleur du trajet
 * @returns {HTMLElement} - Élément item
 */
function createTrajetItem(letter, nom, couleur) {
    const item = document.createElement('div');
    item.className = 'sous-type-item';
    item.innerHTML = `
        <div class="trajet-icon">${letter}</div>
        <div class="sous-type-info">
            <div class="sous-type-nom">${nom}</div>
        </div>
        <div class="sous-type-arrow">→</div>
    `;
    
    const icon = item.querySelector('.trajet-icon');
    icon.style.setProperty('--trajet-color', couleur);
    
    return item;
}

/**
 * Affiche un trajet de golfette sur la carte
 * @param {string} trajetId - ID du trajet à afficher
 */
function afficherTrajetGolfette(trajetId) {
    if (typeof trajetsGolfette === 'undefined' || typeof arretsGolfette === 'undefined') return;
    
    // Cacher tous les marqueurs
    markersList.forEach(item => {
        if (map.hasLayer(item.marker)) map.removeLayer(item.marker);
    });
    
    // Cacher les trajets existants
    if (trajetBusActuel) map.removeLayer(trajetBusActuel);
    if (trajetActuel) map.removeLayer(trajetActuel);
    
    const trajet = trajetsGolfette.find(t => t.id === trajetId);
    if (!trajet) return;
    
    const points = [];
    trajet.arrets.forEach(id => {
        const arret = arretsGolfette.find(a => a.id === id);
        if (arret && arret.coords && arret.coords.length === 2) {
            points.push(arret.coords);
        }
    });
    
    if (points.length >= 2) {
        const contourBlanc = L.polyline(points, {
            color: "#FFFFFF",
            weight: 6,
            opacity: 0.95,
            lineCap: 'round',
            lineJoin: 'round'
        }).addTo(map);
        
        const traitCouleur = L.polyline(points, {
            color: trajet.couleur,
            weight: 2,
            opacity: 1,
            lineCap: 'round',
            lineJoin: 'round'
        }).addTo(map);
        
        trajetActuel = L.layerGroup([contourBlanc, traitCouleur]).addTo(map);
        map.fitBounds(L.latLngBounds(points));
    }
}

/**
 * Affiche un trajet de bus sur la carte
 * @param {string} trajetId - ID du trajet à afficher
 */
function afficherTrajetBus(trajetId) {
    if (typeof trajetsBus === 'undefined' || typeof arretsBus === 'undefined') return;
    
    // Cacher tous les marqueurs
    markersList.forEach(item => {
        if (map.hasLayer(item.marker)) map.removeLayer(item.marker);
    });
    
    // Cacher les trajets existants
    if (trajetActuel) map.removeLayer(trajetActuel);
    if (trajetBusActuel) map.removeLayer(trajetBusActuel);
    
    const trajet = trajetsBus.find(t => t.id === trajetId);
    if (!trajet) return;
    
    const points = [];
    trajet.arrets.forEach(id => {
        const arret = arretsBus.find(a => a.id === id);
        if (arret && arret.coords && arret.coords.length === 2) {
            points.push(arret.coords);
        }
    });
    
    if (points.length >= 2) {
        const contourBlanc = L.polyline(points, {
            color: "#FFFFFF",
            weight: 6,
            opacity: 0.95,
            lineCap: 'round',
            lineJoin: 'round'
        }).addTo(map);
        
        const traitCouleur = L.polyline(points, {
            color: trajet.couleur,
            weight: 2,
            opacity: 1,
            dashArray: "8,8",
            lineCap: 'round',
            lineJoin: 'round'
        }).addTo(map);
        
        trajetBusActuel = L.layerGroup([contourBlanc, traitCouleur]).addTo(map);
        map.fitBounds(L.latLngBounds(points));
    }
}

/**
 * Efface tous les trajets de la carte
 */
function effacerTousLesTrajets() {
    if (trajetActuel) {
        map.removeLayer(trajetActuel);
        trajetActuel = null;
    }
    if (trajetBusActuel) {
        map.removeLayer(trajetBusActuel);
        trajetBusActuel = null;
    }
}