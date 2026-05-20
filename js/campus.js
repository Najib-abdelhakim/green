// ==================== CAMPUS ACTIONS ====================
function initialiserControlesCampus() {
    let campusDiv = document.getElementById('campusControls');
    if(!campusDiv) return;
    
    campusDiv.innerHTML = `
        <div class="campus-radial">
            <div class="campus-radial-btn" id="campusRadialBtn">◉</div>
            <div class="campus-radial-menu" id="campusRadialMenu">
                <div class="campus-radial-item" data-campus="Ben Guerir" data-name="Ben Guerir" id="btnBG"></div>
                <div class="campus-radial-item" data-campus="Rabat" data-name="Rabat" id="btnRabat"></div>
                <div class="campus-radial-item" data-campus="GEP" data-name="GEP" id="btnGEP"></div>
                <div class="campus-radial-item" data-campus="AITTC" data-name="AITTC" id="btnAITTC"></div>
                <div class="campus-radial-item" data-campus="ASARI Laayoune" data-name="ASARI Laayoune" id="btnASARI"></div>
                <div class="campus-radial-item" data-campus="LYCÉE D\'EXCELLENCE" data-name="LYCÉE D\'EXCELLENCE" id="btnLycee"></div>
                <div class="campus-radial-item" data-campus="DATA CENTER" data-name="DATA CENTER" id="btnDataCenter"></div>
                <div class="campus-radial-item" data-campus="CLUB DE TIR" data-name="CLUB DE TIR" id="btnClubTir"></div>
                <div class="campus-radial-item" data-campus="VILLAS DES CHERCHERUS" data-name="VILLAS CHERCHEURS" id="btnVillasChercheurs"></div>
                <div class="campus-radial-item" data-campus="VILLAS MARGUERITTE" data-name="VILLAS MARGUERITTE" id="btnVillasMargueritte"></div>
                <div class="campus-radial-item" data-campus="GSBP" data-name="GSBP" id="btnGSBP"></div>
            </div>
        </div>
    `;
    
    const radialBtn = document.getElementById('campusRadialBtn');
    const radialMenu = document.getElementById('campusRadialMenu');
    
    if(radialBtn) {
        radialBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            radialMenu.classList.toggle('open');
        });
    }
    
    document.addEventListener('click', (e) => {
        if (!campusDiv.contains(e.target)) {
            radialMenu.classList.remove('open');
        }
    });
    
    if(document.getElementById('btnBG')) document.getElementById('btnBG').onclick = () => recentrerBenGuerir();
    if(document.getElementById('btnRabat')) document.getElementById('btnRabat').onclick = () => recentrerRabat();
    if(document.getElementById('btnGEP')) document.getElementById('btnGEP').onclick = () => recentrerGEP();
    if(document.getElementById('btnAITTC')) document.getElementById('btnAITTC').onclick = () => recentrerAITTC();
    if(document.getElementById('btnASARI')) document.getElementById('btnASARI').onclick = () => recentrerASARI();
    if(document.getElementById('btnLycee')) document.getElementById('btnLycee').onclick = () => recentrerLycee();
    if(document.getElementById('btnDataCenter')) document.getElementById('btnDataCenter').onclick = () => recentrerDataCenter();
    if(document.getElementById('btnClubTir')) document.getElementById('btnClubTir').onclick = () => recentrerClubTir();
    if(document.getElementById('btnVillasChercheurs')) document.getElementById('btnVillasChercheurs').onclick = () => recentrerVillasChercheurs();
    if(document.getElementById('btnVillasMargueritte')) document.getElementById('btnVillasMargueritte').onclick = () => recentrerVillasMargueritte();
    if(document.getElementById('btnGSBP')) document.getElementById('btnGSBP').onclick = () => recentrerGSBP();
}

function recentrerBenGuerir() {
    map.setView([32.21581806243076, -7.93940766677296], 16);
    filtrerParCampus('Ben Guerir');
}

function recentrerRabat() {
    map.setView([33.98077935537, -6.72924130237], 17);
    filtrerParCampus('Rabat');
}

function recentrerGEP() {
    map.setView([32.221600083, -7.92746093660], 18);
    filtrerParCampus('GEP');
}

function recentrerAITTC() {
    map.setView([32.2191598586631, -7.89091311143900], 17);
    filtrerParCampus('AITTC');
}

function recentrerASARI() {
    map.setView([27.178419194697753, -13.383511877580803], 18);
    filtrerParCampus('ASARI Laayoune');
}

function recentrerLycee() {
    map.setView([32.206609350487135, -7.938522820743328], 17);
    filtrerParCampus('LYCÉE D\'EXCELLENCE');
}

function recentrerDataCenter() {
    map.setView([32.222442811283386, -7.929971736835424], 18);
    filtrerParCampus('DATA CENTER');
}

function recentrerClubTir() {
    map.setView([32.21441145338921, -7.896276898813682], 18);
    filtrerParCampus('CLUB DE TIR');
}

function recentrerVillasChercheurs() {
    map.setView([32.21416197175289, -7.935632290149962], 17);
    filtrerParCampus('VILLAS DES CHERCHERUS');
}

function recentrerVillasMargueritte() {
    map.setView([32.207957189483906, -7.9297955845621635], 18);
    filtrerParCampus('VILLAS MARGUERITTE');
}

function recentrerGSBP() {
    map.setView([32.219282401083916, -7.931681038871657], 18);
    filtrerParCampus('GSBP');
}