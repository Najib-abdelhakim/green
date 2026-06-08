//  EXPOSITION GLOBALE 

//  INITIALIZATION 
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded - Google Hybrid Map with Glow Effects");
    
        const toggleBtn = document.getElementById('toggleSidebar');
    if (toggleBtn) {
        toggleBtn.removeEventListener('click', toggleSidebar);
        toggleBtn.addEventListener('click', toggleSidebar);
        console.log("Événement toggleSidebar attaché");
    } else {
        console.error("Bouton toggleSidebar non trouvé");
    }
});

window.addEventListener('load', () => {
    const toggleBtn = document.getElementById('toggleSidebar');
    if (toggleBtn) {
        toggleBtn.removeEventListener('click', toggleSidebar);
        toggleBtn.addEventListener('click', toggleSidebar);
    }
    
    setTimeout(() => {
        if (typeof recentrerBenGuerir === 'function') {
            window.recentrerBenGuerir = recentrerBenGuerir;
            window.recentrerRabat = recentrerRabat;
            window.recentrerGEP = recentrerGEP;
            window.recentrerAITTC = recentrerAITTC;
            window.recentrerASARI = recentrerASARI;
            window.recentrerLycee = recentrerLycee;
            window.recentrerDataCenter = recentrerDataCenter;
            window.recentrerClubTir = recentrerClubTir;
            window.recentrerVillasChercheurs = recentrerVillasChercheurs;
            window.recentrerVillasMargueritte = recentrerVillasMargueritte;
            window.recentrerGSBP = recentrerGSBP;
            window.toggleSidebar = toggleSidebar;
            console.log("Fonctions exposées globalement");
        }
    }, 500);
    
    if (typeof chargerTrajetsSupabase === 'function') {
        console.log("Chargement des trajets depuis Supabase...");
        chargerTrajetsSupabase();
    }
});