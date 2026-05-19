// js/db.js - Configuration Supabase

const SUPABASE_URL = 'https://vskyxicpihysyjmbknur.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_K6abscoYeOw-DgT7v2fQJA_jLYqdQIG';  // ← Colle ta publishable key ici

// ========== LIRE les projets ==========
async function getProjets() {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/projets?select=*`, {
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
    });
    
    if (!response.ok) {
        console.error('Erreur Supabase:', await response.text());
        return [];
    }
    
    const data = await response.json();
    
    // Convertir au format attendu par ta carte
    return data.map(p => ({
        ...p,
        coordinates: [parseFloat(p.latitude), parseFloat(p.longitude)]
    }));
}

// ========== AJOUTER un projet ==========
async function addProjet(projet) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/projets`, {
        method: 'POST',
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(projet)
    });
    return response.ok;
}

// ========== MODIFIER un projet ==========
async function updateProjet(id, projet) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/projets?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(projet)
    });
    return response.ok;
}

// ========== SUPPRIMER un projet ==========
async function deleteProjet(id) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/projets?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
    });
    return response.ok;
}

// ========== LIRE les types (couleurs) ==========
async function getTypes() {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/types?select=*`, {
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
    });
    return await response.json();
}