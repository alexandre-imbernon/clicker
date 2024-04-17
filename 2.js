var score = 0;

var cursorCost = 15 ;
var cursors = 0 ;
var grandmaCost = 100;
var grandmas = 0 ;

function buyCursor() {
    if (score >= cursorCost) {
        score = score - cursorCost ;
        cursors = cursors + 1 ;
        cursorCost = Math.round (cursorCost * 1.15);

        document.getElementById("score").innerHTML = score;
        document.getElementById("cursorcost").innerHTML = cursorCost ;
        document.getElementById("cursors").innerHTML = cursors;
    }
}

function buyGrandma() {
    if (score >= grandmaCost) {
        score = score - grandmaCost ;
        grandmas = grandmas + 1 ;
        grandmaCost = Math.round (grandmaCost * 1.15);

        document.getElementById("score").innerHTML = score;
        document.getElementById("grandmaCost").innerHTML = cursorCost ;
        document.getElementById("grandmas").innerHTML = cursors;
    }
}

function addToScore (amount) {
    score = score + amount ;
    document.getElementById("score").innerHTML = score;
}

setInterval ( function () {
    score = score + cursors;
    score = score + grandmas * 5;
    document.getElementById("score").innerHTML = score ;
} , 1000); 

