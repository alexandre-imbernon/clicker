var score = 0;
var shotgunCost = 15;
var shotguns = 0;
var machinegunCost = 50;
var machineguns = 0;
var bloodImages = [
    '../clicker/assets/bloodsplatter/blood1.png',
    '../clicker/assets/bloodsplatter/blood2.png',
    '../clicker/assets/bloodsplatter/blood3.png',
  ];

// Récupérer l'élément image du shotgun
var shotgunImg = document.getElementById("shotgun-img");

function buymachinegun () {
    if (score >= machinegunCost){
        score = score - machinegunCost;
        machineguns = machineguns + 1;
        shotgunCost = Math.round(machinegunCost * 1.15);

        document.getElementById("score").innerHTML = score;
        document.getElementById("machineguncost").innerHTML = shotgunCost;
        document.getElementById("machineguns").innerHTML = machineguns;

    }
}

var machinegunImg = document.getElementById("machinegun-img");
machinegunImg.addEventListener("click", buymachinegun);

function addToScore(amount) {
    score = score + amount;
    document.getElementById("score").innerHTML = score;
}

setInterval(function() {
    score = Math.round(score + shotguns * 0.5);
    score = score + machineguns * 5;
    document.getElementById("score").innerHTML = score;
}, 1000); // 1000ms / 1sec

// Ajoutez un gestionnaire d'événements pour le clic sur l'image shotgun
shotgunImg.addEventListener("click", buyshotgun);

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

function buyshotgun() {
    if (score >= shotgunCost) {
        score -= shotgunCost;
        shotguns++;
        addToScore(3);

        shotgunCost = Math.round(shotgunCost * 1.15);

        // Mettre à jour le contenu de l'info-bulle
        document.getElementById("shotgun-cost-tooltip").innerHTML = shotgunCost;

        // Mettre à jour l'affichage
        document.getElementById("score").innerHTML = score;
        document.getElementById("shotguncost").innerHTML = shotgunCost;
        document.getElementById("shotguns").innerHTML = shotguns;
    }
}

// Assigner la description avec le coût actuel du shotgun à l'attribut title
shotgunImg.title = "Remington M1100-P (" + shotgunCost + "): Chaque tir provoque 3 dégâts";

// Sélectionnez l'élément audio pour le son du shop
var shopSound = document.getElementById("shop-sound");

// Ajoutez un gestionnaire d'événements pour le clic sur l'image du shotgun
shotgunImg.addEventListener("click", function() {
    // Jouez le son du shop
    shopSound.currentTime = 0; // Rembobinez le son au début pour le réinitialiser
    shopSound.play();
});

function showBloodEffect(event) {
    // Créez un nouvel élément d'image
    var bloodImage = document.createElement('img');
    bloodImage.className = 'blood-effect';
    
    var randomIndex = Math.floor(Math.random() * bloodImages.length);
    var randomImage = bloodImages[randomIndex];
    
    // Définissez l'URL de l'image de l'effet de sang
    bloodImage.src = randomImage;
    
    // Positionnez l'image de l'effet de sang là où vous avez cliqué
    bloodImage.style.position = 'absolute';
    bloodImage.style.left = event.clientX + 'px';
    bloodImage.style.top = event.clientY + 'px';
    
    // Ajoutez l'image de l'effet de sang à la page
    document.body.appendChild(bloodImage);
    
    // Supprimez l'image de l'effet de sang après un certain temps
    setTimeout(function() {
      document.body.removeChild(bloodImage);
    }, 4000); 
  }


  
  