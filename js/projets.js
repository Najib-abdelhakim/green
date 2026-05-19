// js/projets.js - Version Supabase
let projets = [];

async function chargerProjets() {
    console.log('Chargement des projets depuis Supabase...');
    
    try {
        projets = await getProjets();
        console.log(`${projets.length} projets chargés !`);
        
        // Démarrer la carte
        if (typeof initMap === 'function') {
            initMap();
        }
        
    } catch (error) {
        console.error('Erreur chargement:', error);
    }
}

// Démarrer le chargement
document.addEventListener('DOMContentLoaded', chargerProjets);