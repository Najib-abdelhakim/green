// ==================== MODAL POUR ICÔNE ====================

/**
 * Affiche un modal avec l'icône du projet en grand
 * @param {string} iconUrl - URL de l'icône à afficher
 * @param {string} projectName - Nom du projet
 */
function showIconModal(iconUrl, projectName) {
    // Supprimer le modal existant s'il y en a un
    const existingModal = document.getElementById('iconModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Créer le modal
    const modal = document.createElement('div');
    modal.id = 'iconModal';
    modal.className = 'icon-modal';
    
    // Générer le contenu (sans styles inline)
    let imageHtml = '';
    if (iconUrl) {
        imageHtml = `<img src="${iconUrl}" alt="${projectName}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/2991/2991231.png'">`;
    } else {
        imageHtml = `<div class="icon-modal-placeholder">📌</div>`;
    }
    
    modal.innerHTML = `
        <div class="icon-modal-close">&times;</div>
        <div class="icon-modal-content">
            ${imageHtml}
            <div class="icon-modal-title">${projectName || 'Icône du projet'}</div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Afficher le modal avec animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Fermer au clic sur le fond ou sur la croix
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('icon-modal-close')) {
            closeModal(modal);
        }
    });
    
    // Fermer avec la touche Echap
    const escHandler = function(e) {
        if (e.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', escHandler);
        }
    };
    
    document.addEventListener('keydown', escHandler);
}

/**
 * Ferme le modal avec animation
 * @param {HTMLElement} modal - Élément modal à fermer
 */
function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
        if (modal && modal.parentNode) {
            modal.remove();
        }
    }, 300);
}