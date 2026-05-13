// ==================== INITIALISATION ====================
function initMap() {
    if (typeof projets === 'undefined') {
        console.error("ERROR: Project data not loaded!");
        return;
    }
    
    console.log("INIT MAP - GOOGLE HYBRID WITH GLOW EFFECTS");
    console.log("Total projects:", projets.length);
    
    map = L.map('map').setView([31.862835361667987, -6.849775828544829], 5);
    
    L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        attribution: '&copy; <a href="https://www.google.com/maps/place/Mohammed+VI+Polytechnic+University/@32.220055,-7.9367607,151m/data=!3m1!1e3!4m10!1m2!2m1!1sum6p+benguerir!3m6!1s0xdaf7a3feab1f407:0xbd50c8e7902ffbf9!8m2!3d32.220055!4d-7.9359024!15sCg51bTZwIGJlbmd1ZXJpcpIBCnVuaXZlcnNpdHngAQA!16s%2Fg%2F11hzw2px2n?entry=ttu&g_ep=EgoyMDI2MDUwMi4wIKXMDSoASAFQAw%3D%3D">Google Maps</a> | <a href="https://sd.um6p.ma/">Sustainable Development</a>',
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(map);
    
    creerTousLesMarqueurs(projets);
    ameliorerVisibiliteMarqueurs();
    
    afficherFiltresTypes();
    afficherListeSousTypes();
    afficherTrajetsSection();
    mettreAJourStats();
    
    initialiserControlesCampus();
    
    document.getElementById('resetFilters')?.addEventListener('click', () => {
        currentTypeFilter = 'all';
        currentCampus = 'all';
        markersList.forEach(item => {
            if (map.hasLayer(item.marker)) {
                map.removeLayer(item.marker);
            }
        });
        afficherFiltresTypes();
        afficherListeSousTypes();
        effacerTousLesTrajets();
        document.querySelectorAll('.type-filter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.type-filter-btn[data-type="all"]')?.classList.add('active');
        mettreAJourStats();
    });
}

function initialiserControlesCampus() {
    let campusDiv = document.getElementById('campusControls');
    if(campusDiv) {
        campusDiv.innerHTML = `
            <div class="campus-radial">
                <div class="campus-radial-btn" id="campusRadialBtn">◉</div>
                <div class="campus-radial-menu" id="campusRadialMenu">
                    <div class="campus-radial-item" data-campus="Ben Guerir" data-name="Ben Guerir" id="btnBG"></div>
                    <div class="campus-radial-item" data-campus="Rabat" data-name="Rabat" id="btnRabat"></div>
                    <div class="campus-radial-item" data-campus="GEP" data-name="GEP" id="btnGEP"></div>
                    <div class="campus-radial-item" data-campus="AITTC" data-name="AITTC" id="btnAITTC"></div>
                    <div class="campus-radial-item" data-campus="ASARI Laayoune" data-name="ASARI Laayoune" id="btnASARI"></div>
                    <div class="campus-radial-item" data-campus="LYCÉE D'EXCELLENCE" data-name="LYCÉE D'EXCELLENCE" id="btnLycee"></div>
                    <div class="campus-radial-item" data-campus="DATA CENTER" data-name="DATA CENTER" id="btnDataCenter"></div>
                    <div class="campus-radial-item" data-campus="CLUB DE TIR" data-name="CLUB DE TIR" id="btnClubTir"></div>
                    <div class="campus-radial-item" data-campus="VILLAS DES CHERCHERUS" data-name="VILLAS CHERCHEURS" id="btnVillasChercheurs"></div>
                    <div class="campus-radial-item" data-campus="VILLAS MARGUERITTE" data-name="VILLAS MARGUERITTE" id="btnVillasMargueritte"></div>
                    <div class="campus-radial-item" data-campus="SMART BUILDING PARK" data-name="SMART BUILDING PARK" id="btnSmartPark"></div>
                </div>
            </div>
        `;
        
        const radialBtn = document.getElementById('campusRadialBtn');
        const radialMenu = document.getElementById('campusRadialMenu');
        
        radialBtn.addEventListener('click', () => {
            radialMenu.classList.toggle('open');
        });
        
        document.addEventListener('click', (e) => {
            if (!campusDiv.contains(e.target)) {
                radialMenu.classList.remove('open');
            }
        });
        
        document.getElementById('btnBG').onclick = () => recentrerBenGuerir();
        document.getElementById('btnRabat').onclick = () => recentrerRabat();
        document.getElementById('btnGEP').onclick = () => recentrerGEP();
        document.getElementById('btnAITTC').onclick = () => recentrerAITTC();
        document.getElementById('btnASARI').onclick = () => recentrerASARI();
        document.getElementById('btnLycee').onclick = () => recentrerLycee();
        document.getElementById('btnDataCenter').onclick = () => recentrerDataCenter();
        document.getElementById('btnClubTir').onclick = () => recentrerClubTir();
        document.getElementById('btnVillasChercheurs').onclick = () => recentrerVillasChercheurs();
        document.getElementById('btnVillasMargueritte').onclick = () => recentrerVillasMargueritte();
        document.getElementById('btnSmartPark').onclick = () => recentrerSmartPark();
    }
}