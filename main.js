// Variables
var score = 0;
var weapons = {
    shotgun: { count: 0, cost: 15, damage: 3 },
    machinegun: { count: 0, cost: 75, damage: 3 }
};
var ruby = { active: false, cost: 100, duration: 15000 };
var bloodImages = [
    '../clicker/assets/bloodsplatter/blood1.png',
    '../clicker/assets/bloodsplatter/blood2.png',
    '../clicker/assets/bloodsplatter/blood3.png',
];

// DOM Elements
var shopSound = document.getElementById("shop-sound");
var clickSoundGun = document.getElementById("click-sound-gun");
var weaponElements = {
    shotgun: document.getElementById("shotgun-img"),
    machinegun: document.getElementById("machinegun-img")
};
var rubyElement = document.getElementById("ruby-img");

// Functions
function buyWeapon(weapon) {
    if (score >= weapons[weapon].cost) {
        score -= weapons[weapon].cost;
        weapons[weapon].count++;
        weapons[weapon].cost = Math.round(weapons[weapon].cost * 1.5);
        shopSound.currentTime = 0;
        shopSound.play();
        updateDisplay();
        weaponElements[weapon].title = weapon.charAt(0).toUpperCase() + weapon.slice(1) + " (" + weapons[weapon].cost + "): Each shot deals " + weapons[weapon].damage + " damage";
    }
}

function buyRuby() {
    if (score >= ruby.cost) {
        score -= ruby.cost;
        ruby.active = true;
        setTimeout(function() {
            ruby.active = false;
        }, ruby.duration);
        updateDisplay();
    }
}

function addToScore(amount) {
    score += amount;
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("score").innerHTML = score;
    document.getElementById("shotcost").innerHTML = weapons.shotgun.cost;
    document.getElementById("shotguns").innerHTML = weapons.shotgun.count;
    document.getElementById("machineguncost").innerHTML = weapons.machinegun.cost;
    document.getElementById("machineguns").innerHTML = weapons.machinegun.count;
}

function showBloodEffect(event) {
    var bloodImage = document.createElement('img');
    bloodImage.className = 'blood-effect';
    var randomIndex = Math.floor(Math.random() * bloodImages.length);
    var randomImage = bloodImages[randomIndex];
    bloodImage.src = randomImage;
    bloodImage.style.position = 'absolute';
    bloodImage.style.left = event.clientX + 'px';
    bloodImage.style.top = event.clientY + 'px';
    document.body.appendChild(bloodImage);
    setTimeout(function() {
        document.body.removeChild(bloodImage);
    }, 4000); 
}

function monsterClick(event) {
    var damage = weapons.shotgun.count ? weapons.shotgun.damage : 1;
    if (ruby.active) {
        damage *= 2; // Doubler les dégâts si le ruby est actif
    }
    score += damage;
    showBloodEffect(event); 
    clickSoundGun.currentTime = 0;
    clickSoundGun.play();
}

// Event Listeners
document.getElementById("monster1").addEventListener("click", monsterClick);
document.getElementById("monster2").addEventListener("click", monsterClick);
weaponElements.shotgun.addEventListener("click", function() { buyWeapon('shotgun'); });
weaponElements.machinegun.addEventListener("click", function() { buyWeapon('machinegun'); });
rubyElement.addEventListener("click", buyRuby);
