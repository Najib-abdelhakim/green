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
window.recentrerGSBP = recentrerGSBP;

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded - Google Hybrid Map with Glow Effects");
    
    // NE PAS appeler initMap ici - projets.js le fera
    
    document.getElementById('toggleSidebar')?.addEventListener('click', toggleSidebar);
});

// Charger les trajets après le chargement de la page
window.addEventListener('load', () => {
    if (typeof chargerTrajetsSupabase === 'function') {
        console.log("Chargement des trajets depuis Supabase...");
        chargerTrajetsSupabase();
    }
});