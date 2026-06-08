// FILTRES 

function appliquerFiltres() {
    console.log("appliquerFiltres - Campus:", currentCampus, "Type:", currentTypeFilter);
    
    if (!map || !markersList) return;
    
    let compteur = 0;
    
    markersList.forEach(item => {
        // Comparaison directe sans normalisation
        const matchCampus = (currentCampus === 'all' || item.projet.campus === currentCampus);
        const matchType = (currentTypeFilter === 'all' || item.projet.type === currentTypeFilter);
        
        if (matchCampus && matchType) {
            if (!map.hasLayer(item.marker)) {
                item.marker.addTo(map);
                compteur++;
            }
        } else {
            if (map.hasLayer(item.marker)) {
                map.removeLayer(item.marker);
            }
        }
    });
    
    console.log("Marqueurs affichés:", compteur);
    mettreAJourStats();
}

// Filtrer par campus
function filtrerParCampus(campus) {
    console.log("=== FILTRER PAR CAMPUS ===");
    console.log("Campus reçu:", campus);
    console.log("Ancien currentCampus:", currentCampus);
    
    currentCampus = campus;
    
    console.log("Nouveau currentCampus:", currentCampus);
    console.log("Projets disponibles:", projets.length);
    
    // Afficher les campus des projets pour déboguer
    const campusProjets = [...new Set(projets.map(p => p.campus))];
    console.log("Campus dans les projets:", campusProjets);
    
    appliquerFiltres();
    afficherFiltresTypes();
    afficherTrajetsSection();
    afficherListeSousTypes();
    effacerTousLesTrajets();
    
    // Mettre à jour l'affichage dans la sidebar
    const campusNameSpan = document.getElementById('campusName');
    if (campusNameSpan) {
        campusNameSpan.textContent = (campus === 'all') ? 'All' : campus;
    }
}

// Filtrer par type
function filtrerParType(type) {
    console.log("Filtrer par type:", type);
    currentTypeFilter = type;
    appliquerFiltres();
    afficherFiltresTypes();
    afficherTrajetsSection();
    afficherListeSousTypes();
    effacerTousLesTrajets();
}

// Afficher les boutons de filtres par type
function afficherFiltresTypes() {
    const container = document.getElementById('typesFilters');
    if (!container) return;
    
    // Récupérer les types uniques des projets (filtrés par campus actif)
    const typesUniques = new Set();
    projets.forEach(projet => {
        if (currentCampus === 'all' || projet.campus === currentCampus) {
            if (projet.type && projet.type.trim() !== "") {
                typesUniques.add(projet.type);
            }
        }
    });
    
    const typesArray = Array.from(typesUniques).sort();
    
    let html = '';
    const isAllActive = (currentTypeFilter === 'all');
    html += `<button class="type-filter-btn ${isAllActive ? 'active' : ''}" data-type="all">All</button>`;
    
    typesArray.forEach(type => {
        const isActive = (currentTypeFilter === type);
        const typeInfo = window.types ? window.types.find(t => t.nom === type) : null;
        const couleur = (typeInfo && typeInfo.couleur) ? typeInfo.couleur : '#01568b';
        
        html += `<button class="type-filter-btn ${isActive ? 'active' : ''}" 
                        data-type="${type}" 
                        style="${isActive ? `background: ${couleur} !important; color: white !important;` : ''}">
                    ${type}
                </button>`;
    });
    
    container.innerHTML = html;
    
    // Attacher les événements
    container.querySelectorAll('.type-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedType = btn.getAttribute('data-type');
            
            document.querySelectorAll('.type-filter-btn').forEach(b => {
                b.classList.remove('active');
                b.style.background = '';
                b.style.color = '';
            });
            btn.classList.add('active');
            
            if (selectedType !== 'all') {
                const typeInfo = window.types ? window.types.find(t => t.nom === selectedType) : null;
                if (typeInfo && typeInfo.couleur) {
                    btn.style.background = typeInfo.couleur;
                    btn.style.color = 'white';
                }
            } else {
                btn.style.background = '#3e6f8d';
                btn.style.color = 'white';
            }
            
            filtrerParType(selectedType);
        });
    });
}

// Afficher la liste des sous-types
function afficherListeSousTypes() {
    const container = document.getElementById('sousTypesList');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!projets || projets.length === 0) {
        container.innerHTML = '<div class="sous-type-item"><div class="sous-type-info"><div class="sous-type-nom">Chargement...</div></div></div>';
        return;
    }
    
    const sousTypesMap = new Map();
    
    projets.forEach(projet => {
        // Appliquer le filtre campus
        if (currentCampus !== 'all' && projet.campus !== currentCampus) return;
        if (currentTypeFilter !== 'all' && projet.type !== currentTypeFilter) return;
        
        const sousType = projet.sous_type || projet.sousType || 'Autre';
        
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
        container.innerHTML = '<div class="sous-type-item"><div class="sous-type-info"><div class="sous-type-nom">Aucun projet trouvé</div></div></div>';
        return;
    }
    
    for (let [nom, data] of sorted) {
        const item = document.createElement('div');
        item.className = 'sous-type-item';
        
        let imageHtml = '';
        if (data.icone && data.icone !== "") {
            imageHtml = `<img src="${data.icone}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2250%22 height=%2250%22 viewBox=%220 0 24 24%22 fill=%22%2301568b%22%3E%3Cpath d=%22M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z%22/%3E%3C/svg%3E'">`;
        } else {
            const firstLetter = nom.charAt(0).toUpperCase();
            imageHtml = `<div class="sous-type-noimg">${firstLetter}</div>`;
        }
        
        item.innerHTML = `
            ${imageHtml}
            <div class="sous-type-info">
                <div class="sous-type-nom">${nom}</div>
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
                    const projetSousType = m.projet.sous_type || m.projet.sousType;
                    if (projetSousType === sousType &&
                        (currentCampus === 'all' || m.projet.campus === currentCampus) &&
                        (currentTypeFilter === 'all' || m.projet.type === currentTypeFilter)) {
                        m.marker.addTo(map);
                    }
                });
                
                effacerTousLesTrajets();
                
                document.querySelectorAll('.sous-type-item').forEach(i => i.classList.remove('active'));
                element.classList.add('active');
            };
        })(nom, item));
        
        item.addEventListener('dblclick', (function(sousType, icon) {
            return function(e) {
                e.stopPropagation();
                showIconModal(icon || '', sousType);
            };
        })(nom, data.icone));
        
        container.appendChild(item);
    }
}

// Mettre à jour les statistiques
function mettreAJourStats() {
    let compteur = 0;
    markersList.forEach(item => {
        const matchCampus = (currentCampus === 'all' || item.projet.campus === currentCampus);
        const matchType = (currentTypeFilter === 'all' || item.projet.type === currentTypeFilter);
        if (matchCampus && matchType) compteur++;
    });
    
    const countSpan = document.getElementById('projetCount');
    if (countSpan) countSpan.textContent = compteur;
}

// Réinitialiser tous les filtres
function resetFiltres() {
    currentCampus = 'all';
    currentTypeFilter = 'all';
    
    markersList.forEach(item => {
        if (!map.hasLayer(item.marker)) {
            item.marker.addTo(map);
        }
    });
    
    afficherFiltresTypes();
    afficherListeSousTypes();
    effacerTousLesTrajets();
    mettreAJourStats();
    
    const campusNameSpan = document.getElementById('campusName');
    if (campusNameSpan) campusNameSpan.textContent = 'All';
    
    document.querySelectorAll('.type-filter-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.style.background = '';
        btn.style.color = '';
    });
    const allBtn = document.querySelector('.type-filter-btn[data-type="all"]');
    if (allBtn) {
        allBtn.classList.add('active');
        allBtn.style.background = '#3e6f8d';
        allBtn.style.color = 'white';
    }
    
    console.log("Filtres réinitialisés");
}