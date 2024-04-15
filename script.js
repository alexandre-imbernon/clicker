// Déclaration de variables
let points = 0;
let manualClickValue = 1; // Valeur de clic manuel initiale
let autoClickValue = 0; // Valeur de clic automatique initiale
let coutManualClick = 25; // Prix initial pour acheter un clic manuel
let coutAutoClick = 50; // Prix initial pour acheter un clic automatique
let manualClickCounter = 0; // Variable pour stocker le nombre de clics manuels

// Fonction pour mettre à jour l'affichage des points
function afficherPoints() {
    document.getElementById("points").innerHTML = "Points: " + points;
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
        }, dureeBonus * 1000); // Convertit la durée en millisecondes

        afficherPoints(); // Met à jour l'affichage des points
    } else {
        alert("Vous n'avez pas assez de points pour acheter ce bonus !");
    }
}
document.getElementById("buy-auto-click-10-sec").addEventListener("click", acheterBonusAutoClick);
