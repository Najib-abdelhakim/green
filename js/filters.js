// ==================== FILTRES ====================

/**
 * Applique les filtres actuels (campus et type) aux marqueurs
 */
function appliquerFiltres() {
    console.log("appliquerFiltres appelé - Campus:", currentCampus, "Type:", currentTypeFilter);
    
    markersList.forEach(item => {
        const matchCampus = (currentCampus === 'all' || item.projet.campus === currentCampus);
        const matchType = (currentTypeFilter === 'all' || item.projet.type === currentTypeFilter);
        
        if (matchCampus && matchType) {
            if (!map.hasLayer(item.marker)) {
                item.marker.addTo(map);
            }
        } else {
            if (map.hasLayer(item.marker)) {
                map.removeLayer(item.marker);
            }
        }
    });
    
    mettreAJourStats();
}

/**
 * Filtre les marqueurs par campus et recentre la vue
 * @param {string} campus - Nom du campus à filtrer
 */
function filtrerParCampus(campus) {
    currentCampus = campus;
    appliquerFiltres();
    afficherFiltresTypes();
    afficherTrajetsSection();
    afficherListeSousTypes();
    effacerTousLesTrajets();
}

/**
 * Filtre les marqueurs par type thématique
 * @param {string} type - Type thématique à filtrer
 */
function filtrerParType(type) {
    currentTypeFilter = type;
    appliquerFiltres();
    afficherFiltresTypes();
    afficherTrajetsSection();
    afficherListeSousTypes();
    effacerTousLesTrajets();
}

/**
 * Affiche les boutons de filtres thématiques
 */
function afficherFiltresTypes() {
    const container = document.getElementById('typesFilters');
    if (!container) return;
    
    // Récupérer les types uniques pour le campus actuel
    const typesUniques = new Set();
    projets.forEach(projet => {
        if (currentCampus === 'all' || projet.campus === currentCampus) {
            if (projet.type && projet.type.trim() !== "") {
                typesUniques.add(projet.type);
            }
        }
    });
    
    const typesArray = Array.from(typesUniques).sort();
    
    // Générer le HTML des boutons (sans styles inline)
    let html = '';
    const isAllActive = (currentTypeFilter === 'all');
    html += `<button class="type-filter-btn ${isAllActive ? 'active' : ''}" data-type="all">All</button>`;
    
    typesArray.forEach(type => {
        const isActive = (currentTypeFilter === type);
        html += `<button class="type-filter-btn ${isActive ? 'active' : ''}" data-type="${type}">${type}</button>`;
    });
    
    container.innerHTML = html;
    
    // Attacher les événements
    container.addEventListener('click', (e) => {
        const btn = e.target.closest('.type-filter-btn');
        if (!btn) return;
        
        const selectedType = btn.getAttribute('data-type');
        
        // Mettre à jour les classes actives
        document.querySelectorAll('.type-filter-btn').forEach(b => {
            if (b.getAttribute('data-type') === selectedType) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });
        
        filtrerParType(selectedType);
    });
}

/**
 * Affiche la liste des sous-types (projets) basée sur les filtres actuels
 */
function afficherListeSousTypes() {
    const container = document.getElementById('sousTypesList');
    if (!container) return;
    
    container.innerHTML = '';
    const sousTypesMap = new Map();
    
    // Regrouper les projets par sous-type
    projets.forEach(projet => {
        if ((currentCampus !== 'all' && projet.campus !== currentCampus)) return;
        if ((currentTypeFilter !== 'all' && projet.type !== currentTypeFilter)) return;
        
        if (projet.sousType && projet.sousType.trim() !== "") {
            if (!sousTypesMap.has(projet.sousType)) {
                sousTypesMap.set(projet.sousType, {
                    nom: projet.sousType,
                    icone: projet.icone,
                    count: 0,
                    exempleIcone: projet.icone
                });
            }
            sousTypesMap.get(projet.sousType).count++;
        }
    });
    
    const sorted = Array.from(sousTypesMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    
    // Afficher message si aucun résultat
    if (sorted.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'sous-type-item';
        emptyMsg.innerHTML = `
            <div class="sous-type-noimg"></div>
            <div class="sous-type-info">
                <div class="sous-type-nom">No projects found</div>
                <div class="sous-type-count">Try another filter</div>
            </div>
        `;
        container.appendChild(emptyMsg);
        return;
    }
    
    // Créer les éléments de la liste
    for (let [nom, data] of sorted) {
        const item = document.createElement('div');
        item.className = 'sous-type-item';
        const projectText = data.count > 1 ? 'projets' : 'projet';
        
        // Image ou placeholder
        let imageHtml = '';
        const iconUrl = data.icone || data.exempleIcone;
        
        if (iconUrl && iconUrl !== "") {
            imageHtml = `<img src="${iconUrl}" onerror="this.src='img/DD.jpg'">`;
        } else {
            const firstLetter = nom.charAt(0).toUpperCase();
            imageHtml = `<div class="sous-type-noimg">${firstLetter}</div>`;
        }
        
        item.innerHTML = `
            ${imageHtml}
            <div class="sous-type-info">
                <div class="sous-type-nom">${nom}</div>
                <div class="sous-type-count">${data.count} ${projectText}</div>
            </div>
            <div class="sous-type-arrow">→</div>
        `;
        
        // Click: filtrer les marqueurs par sous-type
        item.addEventListener('click', (function(sousType, element) {
            return function(e) {
                e.stopPropagation();
                
                // Cacher tous les marqueurs
                markersList.forEach(m => {
                    if (map.hasLayer(m.marker)) map.removeLayer(m.marker);
                });
                
                // Afficher seulement ceux du sous-type sélectionné
                markersList.forEach(m => {
                    if (m.projet.sousType === sousType &&
                        (currentCampus === 'all' || m.projet.campus === currentCampus) &&
                        (currentTypeFilter === 'all' || m.projet.type === currentTypeFilter)) {
                        m.marker.addTo(map);
                    }
                });
                
                effacerTousLesTrajets();
                
                // Mettre à jour l'état actif
                document.querySelectorAll('.sous-type-item').forEach(i => {
                    i.classList.remove('active');
                });
                element.classList.add('active');
                element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            };
        })(nom, item));
        
        // Double-click: afficher l'icône en modal
        item.addEventListener('dblclick', (function(sousType, icon) {
            return function(e) {
                e.stopPropagation();
                const iconToShow = icon || 'img/DD.jpg';
                showIconModal(iconToShow, sousType);
            };
        })(nom, iconUrl));
        
        container.appendChild(item);
    }
}