// UTILITAIRES 
function getGlowColor(type) {
    if (type && glowColors[type]) return glowColors[type];
    return 'rgba(255, 255, 0, 0.5)';
}

function getThemeActiveColor(type) {
    return themeActiveColors[type] || '#01568b';
}

function getTotalProjetsCount() {
    let count = 0;
    markersList.forEach(item => {
        if ((currentCampus === 'all' || item.projet.campus === currentCampus) &&
            (currentTypeFilter === 'all' || item.projet.type === currentTypeFilter)) {
            count++;
        }
    });
    return count;
}

function mettreAJourStats() {
    let countSpan = document.getElementById('projetCount');
    let campusSpan = document.getElementById('campusName');
    if(countSpan) countSpan.textContent = getTotalProjetsCount();
    if(campusSpan) campusSpan.textContent = currentCampus === 'all' ? 'All' : currentCampus;
}