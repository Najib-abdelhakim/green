// Version Supabase
let projets = [];

async function getProjets() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/projets?select=*`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        
        return data.map(p => ({
            id: p.id,
            nom: p.nom,
            description: p.description,
            coordinates: [parseFloat(p.latitude), parseFloat(p.longitude)],
            type: p.type,
            sousType: p.sous_type,
            campus: p.campus,
            image: p.image,
            icone: p.icone,
            informations_complementaires: p.informations_complementaires
        }));
        
    } catch (error) {
        console.error('Erreur getProjets:', error);
        return [];
    }
}

async function chargerProjets() {
    console.log('Chargement des projets...');
    
    try {
        projets = await getProjets();
        console.log(`${projets.length} projets chargés`);
        
        if (typeof initMap === 'function') {
            initMap();
        }
        
    } catch (error) {
        console.error('Erreur:', error);
    }
}

chargerProjets();
