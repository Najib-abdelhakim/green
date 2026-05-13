// ==================== POPUP ====================
function creerContenuPopup(projet) {
    let badgeHtml = '';
    if ((projet.type && projet.type.trim() !== "") || (projet.campus && projet.campus.trim() !== "")) {
        let typePart = (projet.type && projet.type.trim() !== "") ? projet.type : "";
        let campusPart = (projet.campus && projet.campus.trim() !== "") ? projet.campus : "";
        let separator = (typePart && campusPart) ? " · " : "";
        badgeHtml = `<div class="popup-badge">${typePart}${separator}${campusPart}</div>`;
    }
    
    let titleHtml = '';
    if (projet.nom && projet.nom.trim() !== "") titleHtml = `<h3>${projet.nom}</h3>`;
    
    let descriptionHtml = '';
    if (projet.description && projet.description.trim() !== "") descriptionHtml = `<div class="popup-description">${projet.description}</div>`;
    
    let complementHtml = '';
    if (projet.Informations_complémentaires && projet.Informations_complémentaires.trim() !== "") {
        complementHtml = `<div class="popup-footer"><div class="info-complementaire"><strong>Additional details :</strong><br>${projet.Informations_complémentaires}</div></div>`;
    }
    
    return `${titleHtml}${badgeHtml}${descriptionHtml}${complementHtml}`;
}

function hasImageValide(projet) {
    return (projet.image && projet.image.trim() !== "" && !projet.image.includes('flaticon'));
}