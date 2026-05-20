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
    
    // Générer le HTML des boutons
    let html = '';
    const isAllActive = (currentTypeFilter === 'all');
    html += `<button class="type-filter-btn ${isAllActive ? 'active' : ''}" data-type="all">All</button>`;
    
    typesArray.forEach(type => {
        const isActive = (currentTypeFilter === type);
        html += `<button class="type-filter-btn ${isActive ? 'active' : ''}" data-type="${type}">${type}</button>`;
    });
    
    container.innerHTML = html;
    
    // Attacher les événements
    container.querySelectorAll('.type-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedType = btn.getAttribute('data-type');
            
            document.querySelectorAll('.type-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            filtrerParType(selectedType);
        });
    });
}

/**
 * Affiche la liste des sous-types (projets) basée sur les filtres actuels
 */
function afficherListeSousTypes() {
    const container = document.getElementById('sousTypesList');
    if (!container) {
        console.log("sousTypesList container not found");
        return;
    }
    
    container.innerHTML = '';
    
    // Vérifier que projets existe et n'est pas vide
    if (typeof projets === 'undefined' || projets.length === 0) {
        console.log("No projects loaded yet");
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'sous-type-item';
        emptyMsg.innerHTML = `<div class="sous-type-noimg"></div>
            <div class="sous-type-info">
                <div class="sous-type-nom">Chargement...</div>
                <div class="sous-type-count">Patientez</div>
            </div>`;
        container.appendChild(emptyMsg);
        return;
    }
    
    console.log("Afficher liste des sous-types - Projets:", projets.length);
    
    const sousTypesMap = new Map();
    
    // Regrouper les projets par sous-type
    projets.forEach(projet => {
        if ((currentCampus !== 'all' && projet.campus !== currentCampus)) return;
        if ((currentTypeFilter !== 'all' && projet.type !== currentTypeFilter)) return;
        
        const sousType = projet.sousType || projet.sous_type || 'Autre';
        
        if (sousType && sousType.trim() !== "") {
            if (!sousTypesMap.has(sousType)) {
                sousTypesMap.set(sousType, {
                    nom: sousType,
                    icone: projet.icone || '',
                    count: 0
                });
            }
            sousTypesMap.get(sousType).count++;
        }
    });
    
    const sorted = Array.from(sousTypesMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    
    if (sorted.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'sous-type-item';
        emptyMsg.innerHTML = `<div class="sous-type-noimg"></div>
            <div class="sous-type-info">
                <div class="sous-type-nom">Aucun projet trouvé</div>
                <div class="sous-type-count">Essayez un autre filtre</div>
            </div>`;
        container.appendChild(emptyMsg);
        console.log("No sous-types found for current filters");
        return;
    }
    
    console.log("Sous-types trouvés:", sorted.length);
    
    // Créer les éléments
    for (let [nom, data] of sorted) {
        const item = document.createElement('div');
        item.className = 'sous-type-item';
        
        let imageHtml = '';
        const iconUrl = data.icone;
        
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
                <div class="sous-type-count">${data.count} projet(s)</div>
            </div>
            <div class="sous-type-arrow">→</div>
        `;
        
        item.addEventListener('click', (function(sousType, element) {
            return function(e) {
                e.stopPropagation();
                
                markersList.forEach(m => {
                    if (map.hasLayer(m.marker)) map.removeLayer(m.marker);
                });
                
                markersList.forEach(m => {
                    const projetSousType = m.projet.sousType || m.projet.sous_type;
                    if (projetSousType === sousType &&
                        (currentCampus === 'all' || m.projet.campus === currentCampus) &&
                        (currentTypeFilter === 'all' || m.projet.type === currentTypeFilter)) {
                        m.marker.addTo(map);
                    }
                });
                
                effacerTousLesTrajets();
                
                document.querySelectorAll('.sous-type-item').forEach(i => i.classList.remove('active'));
                element.classList.add('active');
                element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            };
        })(nom, item));
        
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