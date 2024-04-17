// Récupérer l'état actuel de la partie depuis le localStorage (s'il existe)
let gameState = JSON.parse(localStorage.getItem('kittyClickerGameState')) || {
    points: 0,
    level: 1
};

// Fonction pour sauvegarder l'état de la partie dans le localStorage
function saveGameState() {
    localStorage.setItem('kittyClickerGameState', JSON.stringify(gameState));
}

// Fonction pour mettre à jour l'affichage de l'état de la partie
function updateUI() {
    document.getElementById('points').innerText = gameState.points;
    document.getElementById('level').innerText = gameState.level;
}

// Fonction pour gérer les clics sur la tête du chat
function clickOnCat() {
    // Rendre visible l'image des croquettes
    let croquettes = document.getElementById('croquettes');
    croquettes.style.display = 'inline-block';
    
    // Ajouter la classe pour l'effet de survol
    croquettes.classList.add('hover-effect');

    // Gérer l'ajout de points chaton et autres actions liées au clic
    gameState.points++; // Incrémenter le nombre de points
    saveGameState(); // Sauvegarder l'état de la partie après chaque clic
    updateUI(); // Mettre à jour l'affichage après chaque clic
    
    // Jouer le son
    document.getElementById('clickSound').play();
    
    // Masquer les croquettes après un délai
    setTimeout(function() {
        croquettes.style.display = 'none';
        // Supprimer la classe pour l'effet de survol
        croquettes.classList.remove('hover-effect');
    }, 200); // Délai de 0,5 seconde (500 millisecondes)
}

// Fonction pour acheter un niveau
function buyLevel() {
    let cost = 20 * gameState.level; // Coût du niveau actuel
    
    // Vérifier si le joueur a suffisamment de points pour acheter le niveau
    if (gameState.points >= cost) {
        // Acheter le niveau
        gameState.points -= cost; // Déduire le coût du niveau des points du joueur
        gameState.level++; // Augmenter le niveau
        saveGameState(); // Sauvegarder l'état de la partie après l'achat
        updateUI(); // Mettre à jour l'affichage après l'achat
    } else {
        alert("Vous n'avez pas assez de points pour acheter ce niveau !");
    }
}



// Fonction pour gérer l'achat d'un bonus
function buyToy(toy, cost) {
    // Vérifier si le joueur a suffisamment de points pour acheter le bonus
    if (gameState.points >= cost) {
        // Acheter le bonus
        gameState.points -= cost; // Déduire le coût du bonus des points du joueur
         
        // Ajouter le bonus en fonction du type de jouet
        switch (toy) {
            case 'Bonus':
                gameState.points += 2; // Ajouter 2 points à chaque clic
                break;
            // Ajouter d'autres cas pour d'autres types de jouets si nécessaire
        }       

        cost *= 2; // Doubler le coût du bonus pour le prochain achat
        saveGameState(); // Sauvegarder l'état de la partie après l'achat
        updateUI(); // Mettre à jour l'affichage après l'achat
        
        // Mettre à jour le texte du bouton pour refléter le nouveau bonus et coût
        let button = document.querySelector(`button[data-toy="${toy}"]`);
        let currentBonus = gameState.bonuses[toy];
        button.innerText = `${toy} +${currentBonus} (${cost} points)`;
    } else {
        alert("Vous n'avez pas assez de points pour acheter ce bonus !");
    }
}

// Fonction pour démarrer l'incrémentation automatique
function startAutomaticIncrement() {
    // Définir l'intervalle de temps entre chaque incrémentation en millisecondes (par exemple, 1000 ms = 1 seconde)
    let interval = 1000; // 1 seconde
    
    // Lancer l'incrémentation automatique à intervalle régulier
    setInterval(function() {
        // Ajouter 2 points au score à chaque incrémentation automatique
        gameState.points += 1;
        // Mettre à jour l'affichage du score
        updateUI();
    }, interval);
}

// Appeler la fonction pour démarrer l'incrémentation automatique au chargement de la page
startAutomaticIncrement();
// Initialiser l'affichage de l'état de la partie au chargement de la page
updateUI();
