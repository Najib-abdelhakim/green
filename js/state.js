// ==================== VARIABLES GLOBALES ====================
let map;
let markersList = [];
let currentCampus = 'all';
let mapInitialized = false; 
let currentTypeFilter = 'all';

// ==================== COULEURS ====================
const glowColors = {
    'Water': 'rgb(0, 149, 255)',
    'Engagement In Action': 'rgb(255, 102, 0)',
    'Waste': 'rgb(255, 43, 43)',
    'Biodiversity': 'rgb(0, 255, 0)',
    'Energy': 'rgb(255, 217, 0)',
    'Ecomobility': 'rgb(0, 251, 255)',
    'Buildings': 'rgb(132, 0, 255)',
    'Catering': 'rgb(255, 162, 0)'
};