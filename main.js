var score = 0;
var shotguns = 0;
var shotgunCost = 15;
var machineguns = 0;
var machinegunCost = 75;
var shotgunpoints = false;
var bloodImages = [
    '../clicker/assets/bloodsplatter/blood1.png',
    '../clicker/assets/bloodsplatter/blood2.png',
    '../clicker/assets/bloodsplatter/blood3.png',
];
var shopSound = document.getElementById("shop-sound");
var shotgunImg = document.getElementById("shotgun-img");
var machinegunImg = document.getElementById("machinegun-img");
var clickSoundGun = document.getElementById("click-sound-gun");
var clickSoundShotGun = document.getElementById("click-sound-shotgun");
var rubyActive = false;
var rubyCost = 100; // Définir le coût du ruby
var rubyDuration = 15000; // Durée de l'effet du ruby en millisecondes


function buyshotgun() {
    if (score >= shotgunCost) {
        score -= shotgunCost;
        shotguns++;  
        shotgunCost = Math.round(shotgunCost * 1.5);
        shopSound.currentTime = 0;
        shopSound.play();

        updateDisplay();
        
        document.getElementById("shotgun-cost-tooltip").innerHTML = shotgunCost;
        
        updateDisplay();
        
        shotgunImg.title = "Remington M1100-P (" + shotgunCost + "): Each shot deals 3 damage";
    }
}

function buymachinegun() {
    if (score >= machinegunCost){
        score -= machinegunCost;
        machineguns++;
        machinegunCost = Math.round(machinegunCost * 1.5);
        shopSound.currentTime = 0;
        shopSound.play();

        updateDisplay();

        document.getElementById("machinegun-cost-tooltip").innerHTML = machinegunCost;

        updateDisplay();
        
        machinegunImg.title = "MAC11 Submachine Gun (" + machinegunCost + "): Each shot deals 3 damage";
    }
}

function buyruby() {
    if (score >= rubyCost) {
        score -= rubyCost;
        rubyActive = true;
        setTimeout(function() {
            rubyActive = false;
        }, rubyDuration);
        updateDisplay();
    }
}

function addToScore(amount) {
    score += amount;
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("score").innerHTML = score;
    document.getElementById("shotcost").innerHTML = shotgunCost;
    document.getElementById("shotguns").innerHTML = shotguns;
    document.getElementById("machineguncost").innerHTML = machinegunCost;
    document.getElementById("machineguns").innerHTML = machineguns;
    
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


document.getElementById("monster1").addEventListener("click", function(event) {
    var damage = shotguns ? 2 : 1;
    if (rubyActive) {
        damage *= 2; // Doubler les dégâts si le ruby est actif
    }
    score += damage;
    showBloodEffect(event); 
    clickSoundGun.currentTime = 0;
    clickSoundGun.play();
});

document.getElementById("monster2").addEventListener("click", function(event) {
    var damage = shotguns ? 2 : 1;
    if (rubyActive) {
        damage *= 2; // Doubler les dégâts si le ruby est actif
    }
    score += damage;
    showBloodEffect(event); 
    clickSoundGun.currentTime = 0;
    clickSoundGun.play();
});

machinegunImg.addEventListener("click", buymachinegun);
shotgunImg.addEventListener("click", buyshotgun);
document.getElementById("ruby-img").addEventListener("click", buyruby); // Assurez-vous d'avoir un élément avec l'ID "ruby-img"
