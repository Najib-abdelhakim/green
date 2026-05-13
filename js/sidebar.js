// ==================== SIDEBAR ====================
function toggleSidebar() {
    let sidebar = document.getElementById('sidebar');
    let btn = document.getElementById('toggleSidebar');
    sidebar.classList.toggle('collapsed');
    btn.innerHTML = sidebar.classList.contains('collapsed') ? '⇥' : '⇤';
    
    afficherFiltresTypes();
    afficherTrajetsSection();
    afficherListeSousTypes();
    effacerTousLesTrajets();
    mettreAJourStats();
}