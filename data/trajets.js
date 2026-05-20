// ==================== DONNÉES DES TRAJETS (100% Supabase) ====================
console.log("📁 Chargement des trajets depuis Supabase...");

var trajetsGolfette = [];
var trajetsBus = [];
var arretsGolfette = [];
var arretsBus = [];

async function chargerTrajetsSupabase() {
    console.log("🔄 Chargement depuis Supabase...");
    
    try {
        // 1. Charger les arrêts
        const arretsRes = await fetch(`${SUPABASE_URL}/rest/v1/arrets?select=*`, {
            headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
        });
        const arretsData = await arretsRes.json();
        
        arretsGolfette = arretsData.filter(a => a.id.startsWith('GOL')).map(a => ({ id: a.id, coords: [a.latitude, a.longitude] }));
        arretsBus = arretsData.filter(a => a.id.startsWith('BUS')).map(a => ({ id: a.id, coords: [a.latitude, a.longitude] }));
        
        // 2. Charger les trajets
        const trajetsRes = await fetch(`${SUPABASE_URL}/rest/v1/trajets?select=*`, {
            headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
        });
        const trajetsData = await trajetsRes.json();
        
        // 3. Charger les relations
        const relationsRes = await fetch(`${SUPABASE_URL}/rest/v1/trajets_arrets?select=*&order=ordre.asc`, {
            headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
        });
        const relationsData = await relationsRes.json();
        
        // 4. Construire les trajets
        trajetsGolfette = [];
        trajetsBus = [];
        
        for (const trajet of trajetsData) {
            const arrets = relationsData.filter(r => r.trajet_id === trajet.id).sort((a,b) => a.ordre - b.ordre).map(r => r.arret_id);
            const complet = { id: trajet.id, nom: trajet.nom, campus: trajet.campus, couleur: trajet.couleur, type: trajet.type, arrets: arrets };
            
            if (trajet.type === 'golfette') trajetsGolfette.push(complet);
            else trajetsBus.push(complet);
        }
        
        console.log(`✅ ${trajetsGolfette.length} golfettes, ${trajetsBus.length} bus`);
        if (typeof afficherTrajetsSection === 'function') afficherTrajetsSection();
        
    } catch(e) {
        console.error("❌ Erreur:", e);
    }
}

if (typeof SUPABASE_URL !== 'undefined') {
    chargerTrajetsSupabase();
}

console.log("✅ data/trajets.js chargé");