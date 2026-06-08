// GESTION DYNAMIQUE DES CAMPUS 

let campusData = [];

// Charger les campus depuis Supabase
async function chargerCampus() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/campus?select=*`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });
        if (response.ok) {
            campusData = await response.json();
            construireMenuCampus();
            console.log('Campus chargés:', campusData.length);
        }
    } catch(e) {
        console.error('Erreur chargement campus:', e);
    }
}

// Construire le menu radial
function construireMenuCampus() {
    let campusDiv = document.getElementById('campusControls');
    if(!campusDiv) return;
    
    if(campusData.length === 0) {
        campusDiv.innerHTML = '<div class="campus-radial"><div class="campus-radial-btn" id="campusRadialBtn">◉</div></div>';
        return;
    }
    
    let menuHtml = `
        <div class="campus-radial">
            <div class="campus-radial-btn" id="campusRadialBtn">◉</div>
            <div class="campus-radial-menu" id="campusRadialMenu">
    `;
    
    campusData.forEach(campus => {
        menuHtml += `
            <div class="campus-radial-item" 
                 data-campus="${campus.nom}" 
                 data-name="${campus.nom}"
                 data-lat="${campus.latitude || 0}"
                 data-lng="${campus.longitude || 0}"
                 data-zoom="${campus.zoom || 15}"
                 style="background: ${campus.couleur}; border-radius: 50%; width: 48px; height: 48px;">
            </div>
        `;
    });
    
    menuHtml += `</div></div>`;
    campusDiv.innerHTML = menuHtml;
    
    const radialBtn = document.getElementById('campusRadialBtn');
    const radialMenu = document.getElementById('campusRadialMenu');
    
    if(radialBtn) {
        radialBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if(radialMenu) radialMenu.classList.toggle('open');
        });
    }
    
    document.removeEventListener('click', fermerMenuCampus);
    document.addEventListener('click', fermerMenuCampus);
    
    document.querySelectorAll('.campus-radial-item').forEach(btn => {
        // Tooltip manuel au survol
        btn.addEventListener('mouseenter', (e) => {
            const nom = btn.getAttribute('data-name');
            const tooltip = document.createElement('div');
            tooltip.className = 'campus-tooltip-manual';
            tooltip.textContent = nom;
            tooltip.style.position = 'fixed';
            const rect = btn.getBoundingClientRect();
            tooltip.style.left = (rect.left - 10) + 'px';
            tooltip.style.top = (rect.top + rect.height/2) + 'px';
            tooltip.style.transform = 'translate(-100%, -50%)';
            tooltip.style.background = 'rgba(0,0,0,0.9)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '6px 14px';
            tooltip.style.borderRadius = '25px';
            tooltip.style.fontSize = '13px';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.style.zIndex = '10002';
            tooltip.style.fontFamily = 'system-ui, sans-serif';
            tooltip.style.pointerEvents = 'none';
            document.body.appendChild(tooltip);
            btn._tooltip = tooltip;
        });
        
        btn.addEventListener('mouseleave', () => {
            if(btn._tooltip) {
                btn._tooltip.remove();
                btn._tooltip = null;
            }
        });
        
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const lat = parseFloat(btn.dataset.lat);
            const lng = parseFloat(btn.dataset.lng);
            const zoom = parseInt(btn.dataset.zoom);
            const campus = btn.dataset.campus;
            
            console.log("Campus cliqué:", campus);
            console.log("Lat:", lat, "Lng:", lng, "Zoom:", zoom);
            
            // Récupérer la carte
            let carte = null;
            if (typeof map !== 'undefined' && map && typeof map.setView === 'function') {
                carte = map;
            } else if (window.map && typeof window.map.setView === 'function') {
                carte = window.map;
            }
            
            if (carte && typeof carte.setView === 'function') {
                if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0) {
                    carte.setView([lat, lng], zoom);
                    console.log("Zoom OK");
                } else {
                    const projet = projets.find(p => p.campus === campus);
                    if (projet && projet.coordinates) {
                        carte.setView(projet.coordinates, 15);
                        console.log("Zoom sur projet:", projet.nom);
                    }
                }
            } else {
                console.error("Carte non trouvée!");
            }
            
            if (typeof window.filtrerParCampus === 'function') {
                window.filtrerParCampus(campus);
            }
            
            if(radialMenu) radialMenu.classList.remove('open');
        });
    });
}

function fermerMenuCampus(e) {
    const campusDiv = document.getElementById('campusControls');
    const radialMenu = document.getElementById('campusRadialMenu');
    if (campusDiv && radialMenu && !campusDiv.contains(e.target)) {
        radialMenu.classList.remove('open');
    }
}

window.rafraichirMenuCampus = function() {
    chargerCampus();
};

if (typeof SUPABASE_URL !== 'undefined') {
    chargerCampus();
}