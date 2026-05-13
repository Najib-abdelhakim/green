// ==================== EXPOSITION GLOBALE ====================
window.recentrerBenGuerir = recentrerBenGuerir;
window.recentrerRabat = recentrerRabat;
window.toggleSidebar = toggleSidebar;
window.recentrerGEP = recentrerGEP;
window.recentrerAITTC = recentrerAITTC;
window.recentrerASARI = recentrerASARI;
window.recentrerLycee = recentrerLycee;
window.recentrerDataCenter = recentrerDataCenter;
window.recentrerClubTir = recentrerClubTir;
window.recentrerVillasChercheurs = recentrerVillasChercheurs;
window.recentrerVillasMargueritte = recentrerVillasMargueritte;
window.recentrerSmartPark = recentrerSmartPark;

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded - Google Hybrid Map with Glow Effects");
    
    if(typeof projets !== 'undefined') {
        initMap();
    } else {
        let check = setInterval(() => {
            if(typeof projets !== 'undefined') {
                clearInterval(check);
                initMap();
            }
        }, 100);
    }
    
    document.getElementById('toggleSidebar')?.addEventListener('click', toggleSidebar);
});