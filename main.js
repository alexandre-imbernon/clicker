// Variables globales
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


function buyshotgun() {
    if (score >= shotgunCost) {
        score -= shotgunCost;
        shotguns++;  
        shotgunCost = Math.round(shotgunCost * 1.5);
        shopSound.currentTime = 0;
        shopSound.play();

        // Update display
        updateDisplay();
        
        // Update tooltip content
        document.getElementById("shotgun-cost-tooltip").innerHTML = shotgunCost;
        
        // Update display
        updateDisplay();
        
        // Assign description with current shotgun cost to title attribute
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

        // Update display
        updateDisplay();

        // Update tooltip content
        document.getElementById("machinegun-cost-tooltip").innerHTML = machinegunCost;

        // Update display
        updateDisplay();
        
        // Assign description with current shotgun cost to title attribute
        machinegunImg.title = "MAC11 Submachine Gun (" + machinegunCost + "): Each shot deals 3 damage";
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
    if (shotguns) {
        score += 2;
        clickSoundShotGun.currentTime = 0;
        clickSoundGun.play();
    } else {
    clickSoundGun.currentTime = 0;
    clickSoundGun.play();
    }
    showBloodEffect(event); 
});

document.getElementById("monster2").addEventListener("click", function(event) {
    if (shotguns) {
        score += 2;
        clickSoundShotGun.currentTime = 0;
        clickSoundGun.play();
    } else {
    clickSoundGun.currentTime = 0;
    clickSoundGun.play();
    }
    showBloodEffect(event); 
});

machinegunImg.addEventListener("click", buymachinegun);
shotgunImg.addEventListener("click", buyshotgun);