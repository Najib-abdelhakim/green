// MARQUEURS 

/**
 * Crée un marqueur avec effet de lueur et popup pour un projet
 * @param {Object} projet - Les données du projet
 * @returns {L.Marker} - Le marqueur Leaflet créé
 */
function creerMarqueurAvecInfos(projet) {
    const iconUrl = projet.icone && projet.icone !== "" ? projet.icone : '';
    const glowColor = getGlowColor(projet.type);
    const markerId = projet.id || Math.random().toString(36);
    
    // Créer l'icône avec les styles inline nécessaires (dégradés dynamiques)
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
            <div class="marker-container" data-id="${markerId}">
                <div class="marker-glow" style="background: radial-gradient(circle, ${glowColor} 0%, ${glowColor.replace('0.7', '0.4')} 50%, rgba(255,255,255,0) 60%);"></div>
                <div class="marker-pulse" style="background: radial-gradient(circle, ${glowColor.replace('0.7', '0.4')} 0%, rgba(255,255,0,0) 100%);"></div>
                ${iconUrl ? `<img src="${iconUrl}" class="marker-image" alt="Icône">` : ''}
            </div>
        `,
        iconSize: [80, 80],
        popupAnchor: [0, -40],
        className: 'glow-marker'
    });
    
    const marker = L.marker(projet.coordinates, { icon: customIcon });
    const textContent = creerContenuPopup(projet);
    
    // Définir le contenu du popup
    if (!hasImageValide(projet)) {
        marker.bindPopup(`<div class="popup-content-text">${textContent}</div>`, { 
            maxWidth: 450, 
            minWidth: 350 
        });
    } else {
        marker.bindPopup(`
            <div class="popup-layout-vertical">
                <div class="popup-image-top">
                    <img src="${projet.image}" alt="${projet.nom || 'Image'}">
                </div>
                <div class="popup-content-text">${textContent}</div>
            </div>
        `, { 
            maxWidth: 300, 
            minWidth: 200 
        });
    }
    
    return marker;
}

/**
 * Améliore la visibilité des marqueurs avec des effets au survol
 */
function ameliorerVisibiliteMarqueurs() {
    markersList.forEach(item => {
        if (item.marker._icon) {
            const glowDiv = item.marker._icon.querySelector('.marker-glow');
            if (glowDiv) {
                glowDiv.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            }
        }
    });
}

/**
 * Crée tous les marqueurs à partir des données projets
 * @param {Array} projetsData - Liste des projets
 */
function creerTousLesMarqueurs(projetsData) {
    projetsData.forEach(proj => {
        if (proj.coordinates && proj.coordinates.length === 2) {
            const marker = creerMarqueurAvecInfos(proj);
            markersList.push({ marker: marker, projet: proj });
        }
    });
}