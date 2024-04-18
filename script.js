// Déclaration de variables
let points = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
let manualClickValue = localStorage.getItem('manualClickValue') ? parseInt(localStorage.getItem('manualClickValue')) : 1;
let autoClickValue = localStorage.getItem('autoClickValue') ? parseInt(localStorage.getItem('autoClickValue')) : 0;
let coutManualClick = localStorage.getItem('coutManualClick') ? parseInt(localStorage.getItem('coutManualClick')) : 25;
let coutAutoClick = localStorage.getItem('coutAutoClick') ? parseInt(localStorage.getItem('coutAutoClick')) : 50;
let manualClickCounter = localStorage.getItem('manualClickCounter') ? parseInt(localStorage.getItem('manualClickCounter')) : 0;

// Fonction pour mettre à jour l'affichage des points
function afficherPoints() {
    document.getElementById("points").innerHTML = "Points: " + points;
    localStorage.setItem('score', points); // Enregistrement du score dans le stockage local
}

// Fonction pour mettre à jour l'affichage de la valeur de clic automatique
function afficherAutoClickValue() {
    document.getElementById("auto-click-value").innerHTML = "Valeur de clic automatique: + " + autoClickValue;
}

// Fonction pour gérer le clic sur l'image de Yoshi (manuel)
function clicSurYoshi() {
    points += manualClickValue; // Ajoute des points en fonction de la valeur de clic manuel
    afficherPoints(); // Met à jour l'affichage des points
}

// Fonction pour gérer le clic automatique
function clicAutomatique() {
    points += autoClickValue; // Ajoute des points en fonction de la valeur de clic automatique
    points += 1; // Ajoute 1 point supplémentaire à chaque clic automatique
    afficherPoints(); // Met à jour l'affichage des points
}

// Fonction pour mettre à jour l'affichage du compteur de clics manuels
function afficherManualClickCounter() {
    document.getElementById("manual-click-counter").innerHTML = "Valeur de clic manuel: + " + manualClickCounter;
}

// Fonction pour acheter un élément de la boutique
function acheterElement(element) {
    let cout;
    if (element === "manual-click") {
        cout = coutManualClick;
        if (points >= cout) {
            points -= cout; // Dépense des points
            manualClickValue += 1; // Augmente la valeur de clic manuel
            manualClickCounter++; // Incrémente le compteur de clics manuels
            coutManualClick = Math.ceil(coutManualClick * 1.3); // Augmente le prix de 30 %
        } else {
            alert("Vous n'avez pas assez de points pour acheter cet élément !");
        }
    } else if (element === "auto-click") {
        cout = coutAutoClick;
        if (points >= cout) {
            points -= cout; // Dépense des points
            autoClickValue += 1; // Augmente la valeur de clic automatique
            // Démarre le clic automatique
            setInterval(clicAutomatique, 1000); // Appelle clicAutomatique() toutes les secondes
            coutAutoClick = Math.ceil(coutAutoClick * 1.3); // Augmente le prix de 30 %
        } else {
            alert("Vous n'avez pas assez de points pour acheter cet élément !");
        }
    }
    afficherPoints(); // Met à jour l'affichage des points
    afficherAutoClickValue(); // Met à jour l'affichage de la valeur de clic automatique
    afficherManualClickCounter(); // Met à jour l'affichage du compteur de clics manuels
    afficherPrixElements(); // Met à jour l'affichage des prix
    
    // Sauvegarder les données après l'achat d'un élément
    sauvegarderDonnees();
}

// Fonction pour afficher les prix des éléments de la boutique
function afficherPrixElements() {
    document.getElementById("buy-manual-click").innerHTML = "Acheter un clic manuel +1 oeuf à chaque achat (" + coutManualClick + " points)";
    document.getElementById("buy-auto-click").innerHTML = "Acheter un clic automatique +1 oeuf à chaque achat chaque seconde (" + coutAutoClick + " points)";
}

// Fonction pour créer un œuf
function creerOeuf(x, y) {
    const oeuf = document.createElement('div');
    oeuf.className = 'egg';
    oeuf.style.left = x + 'px';
    oeuf.style.top = y + 'px';
    document.getElementById('egg-container').appendChild(oeuf);

    // Supprimer l'œuf après un certain délai (par exemple, 1 seconde)
    setTimeout(function() {
        oeuf.remove();
    }, 1000);
}

// Associer la fonction creerOeuf à l'événement clic sur l'image de Yoshi
document.getElementById('yoshi').addEventListener('click', function(event) {
    creerOeuf(event.clientX, event.clientY); // Les coordonnées de l'événement sont passées pour placer l'œuf à cet endroit
});

// Associer la fonction pour animer Yoshi à l'événement clic sur l'image de Yoshi
document.getElementById('yoshi').addEventListener('click', function() {
    this.classList.toggle('clique'); // Ajoute ou supprime la classe 'clique' pour déclencher l'animation
});

// Événement lorsque le DOM est chargé
document.addEventListener("DOMContentLoaded", function() {
    // Charger le score depuis le stockage local
    afficherPoints(); // Met à jour l'affichage des points

    // Associer la fonction clicSurYoshi à l'événement clic sur l'image de Yoshi
    document.getElementById("yoshi").addEventListener("click", clicSurYoshi);

    // Bouton pour acheter un élément de la boutique
    document.getElementById("buy-manual-click").addEventListener("click", function() {
        acheterElement("manual-click"); // Coût pour acheter un clic manuel
    });

    document.getElementById("buy-auto-click").addEventListener("click", function() {
        acheterElement("auto-click"); // Coût pour acheter un clic automatique
    });

    // Afficher les prix initiaux des éléments de la boutique
    afficherPrixElements();
});

document.getElementById('yoshi').addEventListener('click', function() {
    let audio = document.getElementById('yoshi-click-sound');
    audio.play();
});

// Fonction pour sauvegarder les données dans le stockage local
function sauvegarderDonnees() {
    localStorage.setItem('score', points);
    localStorage.setItem('manualClickValue', manualClickValue);
    localStorage.setItem('autoClickValue', autoClickValue);
    localStorage.setItem('coutManualClick', coutManualClick);
    localStorage.setItem('coutAutoClick', coutAutoClick);
    localStorage.setItem('manualClickCounter', manualClickCounter);
}

// Charger les données depuis le stockage local
function chargerDonnees() {
    points = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
    manualClickValue = localStorage.getItem('manualClickValue') ? parseInt(localStorage.getItem('manualClickValue')) : 1;
    autoClickValue = localStorage.getItem('autoClickValue') ? parseInt(localStorage.getItem('autoClickValue')) : 0;
    coutManualClick = localStorage.getItem('coutManualClick') ? parseInt(localStorage.getItem('coutManualClick')) : 25;
    coutAutoClick = localStorage.getItem('coutAutoClick') ? parseInt(localStorage.getItem('coutAutoClick')) : 50;
    manualClickCounter = localStorage.getItem('manualClickCounter') ? parseInt(localStorage.getItem('manualClickCounter')) : 0;
}

// Charger les données lors du chargement de la page
chargerDonnees();

// Fonction pour acheter un bonus de clic automatique
function acheterBonusAutoClick() {
    const coutBonus = 100;
    const dureeBonus = 15; // Durée du bonus en secondes
    const pointsParSeconde = 10;

    if (points >= coutBonus) {
        points -= coutBonus; // Dépense des points pour acheter le bonus

        // Ajoute des points chaque seconde pendant la durée du bonus
        const interval = setInterval(function() {
            points += pointsParSeconde;
            afficherPoints(); // Met à jour l'affichage des points
        }, 1000);

        // Arrête d'ajouter des points après la durée du bonus
        setTimeout(function() {
            clearInterval(interval); // Arrête l'interval
            afficherImagesBonus(); // Affiche à nouveau les images bonus après la fin du bonus
        }, dureeBonus * 1000); // Convertit la durée en millisecondes

        afficherPoints(); // Met à jour l'affichage des points
    } else {
        alert("Vous n'avez pas assez de points pour acheter ce bonus !");
    }
}

document.getElementById("buy-auto-click-10-sec").addEventListener("click", acheterBonusAutoClick);

// Fonction pour afficher les images bonus
function afficherImagesBonus() {
    const bonus1 = document.getElementById("bonus1");
    const bonus2 = document.getElementById("bonus2");

    // Afficher les images bonus
    bonus1.style.display = "block";
    bonus2.style.display = "block";

    // Définir une nouvelle position aléatoire pour chaque image bonus
    positionAleatoire(bonus1);
    positionAleatoire(bonus2);
}

// Fonction pour faire disparaître et réapparaître une image bonus
function toggleBonusVisibility(bonusId, pointsGagnes) {
    // Rend invisible l'image bonus en ajoutant une classe CSS
    document.getElementById(bonusId).classList.add('invisible');

    // Programme l'apparition de l'image bonus après 20 secondes
    setTimeout(function() {
        // Rend l'image bonus visible en supprimant la classe CSS
        document.getElementById(bonusId).classList.remove('invisible');
    }, 20000); // 20 secondes (en millisecondes)

    // Ajoute les points gagnés et affiche le message correspondant
    points += pointsGagnes;
    afficherPoints();
    afficherMessage("Vous avez gagné " + pointsGagnes + " oeufs !");
}

// Ajoute des écouteurs d'événements aux images bonus pour appeler la fonction toggleBonusVisibility() lorsqu'elles sont cliquées
document.getElementById('bonus1').addEventListener('click', function() {
    toggleBonusVisibility('bonus1', 20); // Appelle la fonction pour faire disparaître et réapparaître l'image bonus 1 et ajouter 20 points
});

document.getElementById('bonus2').addEventListener('click', function() {
    toggleBonusVisibility('bonus2', 50); // Appelle la fonction pour faire disparaître et réapparaître l'image bonus 2 et ajouter 50 points
});


// Fonction pour afficher un message
function afficherMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.innerText = message;
    // Affiche le message pendant 3 secondes
    setTimeout(function() {
        messageElement.innerText = '';
    }, 3000);
}

// Fonction pour acheter un bonus de clic automatique permanent de 20 points par seconde
function acheterBonusAutoClick20Permanent() {
    const coutBonus = 700;

    if (points >= coutBonus) {
        points -= coutBonus; // Dépense des points pour acheter le bonus
        autoClickValue += 20; // Augmente la valeur de clic automatique de 20 points par seconde
        afficherAutoClickValue(); // Met à jour l'affichage de la valeur de clic automatique
        afficherPoints(); // Met à jour l'affichage des points
    } else {
        alert("Vous n'avez pas assez de points pour acheter ce bonus !");
    }
}

// Associer la fonction à l'événement clic sur le bouton correspondant
document.getElementById("buy-auto-click-20-sec").addEventListener("click", acheterBonusAutoClick20Permanent);
