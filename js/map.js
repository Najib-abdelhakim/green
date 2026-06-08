// ==================== INITIALISATION ====================
function initMap() {
    // Vérifier si la carte existe déjà DANS LE DOM
    if (map && map._container) {
        console.log("Map already exists, skipping initMap");
        return;
    }
    
    if (typeof projets === 'undefined' || projets.length === 0) {
        console.log("Waiting for projects...");
        setTimeout(initMap, 200);
        return;
    }
    
    console.log("INIT MAP - Total projects:", projets.length);
    
    // Créer la carte
    map = L.map('map').setView([32.21586044359456, -7.939122882189408], 16);
    
    L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        attribution: '&copy; Google Maps',
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(map);
    
    creerTousLesMarqueurs(projets);
    ameliorerVisibiliteMarqueurs();
    
    afficherFiltresTypes();
    afficherListeSousTypes();
    afficherTrajetsSection();
    mettreAJourStats();
    
    if (typeof chargerCampus === 'function') {
        chargerCampus(); 
     }
    
    document.getElementById('resetFilters')?.addEventListener('click', () => {
        currentTypeFilter = 'all';
        currentCampus = 'all';
        markersList.forEach(item => {
            if (map.hasLayer(item.marker)) map.removeLayer(item.marker);
        });
        afficherFiltresTypes();
        afficherListeSousTypes();
        effacerTousLesTrajets();
        document.querySelectorAll('.type-filter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.type-filter-btn[data-type="all"]')?.classList.add('active');
        mettreAJourStats();
    });
}