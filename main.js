var score = 0;
var cursorCost = 15;
var cursors = 0;
var grandmaCost = 100;
var grandmas = 0;

function buyGrandma () {
    if (score >= grandmaCost){
        score = score - grandmaCost;
        grandmas = grandmas + 1;
        cursorCost = Math.round(grandmaCost * 1.15);

        document.getElementById("score").innerHTML = score;
        document.getElementById("grandmacost").innerHTML = cursorCost;
        document.getElementById("grandmas").innerHTML = grandmas;

    }
}

var machinegunImg = document.getElementById("machinegun-img");
machinegunImg.addEventListener("click", buyGrandma);

function addToScore(amount) {
    score = score + amount;
    document.getElementById("score").innerHTML = score;
}

setInterval(function() {
    score = Math.round(score + cursors * 0.5);
    score = score + grandmas * 5;
    document.getElementById("score").innerHTML = score;
}, 1000); // 1000ms / 1sec


// Sélectionnez l'élément d'image shotgun
var shotgunImg = document.getElementById("shotgun-img");

// Ajoutez un gestionnaire d'événements pour le clic sur l'image shotgun
shotgunImg.addEventListener("click", buyCursor);

// Sélectionnez l'élément audio et préchargez-le
var clickSound = document.getElementById("click-sound");
clickSound.load();

// Définissez une variable pour suivre si un clic a été effectué récemment
var isClicked = false;

// Fonction pour ajouter au score et jouer le son en boucle
function addToScore(amount) {
    // Vérifiez si un clic a été effectué récemment
    if (!isClicked) {
        score += amount;
        document.getElementById("score").innerHTML = score;

        // Rembobinez le son au début pour le réinitialiser
        clickSound.currentTime = 0;

        // Ajoutez un gestionnaire d'événements pour détecter la fin de la lecture du son
        clickSound.addEventListener('ended', function() {
            // Vérifiez à nouveau si un clic a été effectué récemment
            if (isClicked) {
                // Rembobinez le son au début et jouez-le à nouveau en boucle
                this.currentTime = 0;
                this.play();
            }
        }, false);

        // Jouez le son
        clickSound.play();

        // Définissez isClicked à true
        isClicked = true;

        // Réinitialisez isClicked à false après un certain délai (par exemple, 500ms)
        setTimeout(function() {
            isClicked = false;
        }, 500); // Délai en millisecondes
    }
}

function buyCursor() {
    if (score >= cursorCost) {
        score -= cursorCost;
        cursors++;
        addToScore(3);

        cursorCost = Math.round(cursorCost * 1.15);

        // Mettre à jour le contenu de l'info-bulle
        document.getElementById("cursor-cost-tooltip").innerHTML = cursorCost;

        // Mettre à jour l'affichage
        document.getElementById("score").innerHTML = score;
        document.getElementById("cursorcost").innerHTML = cursorCost;
        document.getElementById("cursors").innerHTML = cursors;
    }
}


// Sélectionnez l'élément audio pour le son du shop
var shopSound = document.getElementById("shop-sound");

// Sélectionnez l'image du shotgun
var shotgunImg = document.getElementById("shotgun-img");

// Ajoutez un gestionnaire d'événements pour le clic sur l'image du shotgun
shotgunImg.addEventListener("click", function() {
    // Jouez le son du shop
    shopSound.currentTime = 0; // Rembobinez le son au début pour le réinitialiser
    shopSound.play();
});

