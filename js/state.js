// = VARIABLES GLOBALES
let map;
let markersList = [];
let currentCampus = 'all';
let mapInitialized = false; 
let currentTypeFilter = 'all';
let glowColors = {};
let types = [];

// CHARGER LES COULEURS DEPUIS SUPABASE 
async function chargerCouleursDepuisSupabase() {
    try {
        if (typeof SUPABASE_URL === 'undefined' || typeof SUPABASE_ANON_KEY === 'undefined') {
            console.error('Supabase non configure');
            return;
        }
        
        const response = await fetch(`${SUPABASE_URL}/rest/v1/types?select=nom,couleur`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });
        
        if (response.ok) {
            types = await response.json();
            window.types = types;  // Exposer globalement
            
            types.forEach(type => {
                if (type.nom && type.couleur) {
                    const hex = type.couleur;
                    const r = parseInt(hex.slice(1,3), 16);
                    const g = parseInt(hex.slice(3,5), 16);
                    const b = parseInt(hex.slice(5,7), 16);
                    glowColors[type.nom] = `rgb(${r}, ${g}, ${b})`;
                }
            });
            console.log('Couleurs chargees depuis Supabase:', glowColors);
            console.log('Types charges:', types.length);
        } else {
            console.error('Erreur chargement types:', response.status);
        }
    } catch (error) {
        console.error('Erreur chargement couleurs:', error);
    }
}

if (typeof SUPABASE_URL !== 'undefined' && typeof SUPABASE_ANON_KEY !== 'undefined') {
    chargerCouleursDepuisSupabase();
} else {
    console.error('Supabase non configure');
}