"use strict";

//Crée la connexion au hub
var connection = new signalR.HubConnectionBuilder().withUrl("/PolyHub").build();
//https://192.168.1.13:45455/?userId=1

var gameId = "";
var playerId = "";
var isPlayerP2 = false;
var currentState = "WaitForConnexion";

var scoreJ1 = 0;
var scoreJ2 = 0;
var rebond = 0;
var pause = false;
var sombre = false;
var canvas = document.getElementById("canvas");
var longDemiRaquette = canvas.height / 10;
var context = null;

var msg1 = "";
var msg2 = "";

if (canvas.getContext) {
    context = canvas.getContext('2d');
}

var totalHeight = 0;
var totalWidth = 0;
displayCanvas();
window.addEventListener("resize", displayCanvas);

var balle = new Balle(canvas.width / 2, canvas.height / 2, 1, 3, Math.PI, 8);
var raquette1 = new Raquette(0, 4 * canvas.height / 10);
var raquette2 = new Raquette(0, 4 * canvas.height / 10);

connection.on("StartGame", function (isP1) {
    playGame();
});

connection.on("Player_Left", function (isP1) {
    //comportement tant que le joueur 1 envoie gauche
    //On check à chaque fois que l'info qu'on récupère concerne notre partie.

});

connection.on("Player_Right", function (isP1) {
   //comportement tant que le joueur 2 envoie droite

});

connection.on("Player_StopMoving", function (isP1) {
   //comportement tant que le joueur 1 arrete de bouger

});

connection.on("ConnectAndDisplayWaitingConnexionScreen", function (idPlayer, idGame, uniqueIdToDisplay, isP2) {
	gameId = idGame;
	playerId = idPlayer;
	isPlayerP2 = isP2;

	msg1 = "Connectez-vous avec l'App et entrez le code suivant";
    msg2 = uniqueIdToDisplay;
    currentState = "DisplayMessage";
    displayWaitingScreen();
});

connection.on("AppConnected", function () {

    msg1 = "En attente de l'adversaire";
    msg2 = "";
    currentState = "DisplayMessage";
    displayWaitingScreen();
});

//On démarre la connexion
connection.start().then(function () {
    console.log("Connexion établie");
    connection.invoke("AskForGame").catch(function (err) {
        return console.error(err.toString());
    });
}).catch(function (err) {
    return console.error(err.toString());
});

function displayWaitingScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.font = "bold 40pt Calibri,Geneva,Arial";
    context.fillStyle = "#2196F3";
    context.textAlign = 'center';
    context.fillText(msg1, totalWidth/2,totalHeight/2-50);
    context.fillText(msg2, totalWidth/2,totalHeight/2+10);
    context.restore();
}

//La fonction qui recupere les inputs clavier pour lancer les deplacements des raquettes
//(temporaire, pour le test)
function actionKeyCode(event) {
	if (event != undefined) {
        var touche = event.keyCode;
        //touche Z pour deplacer la raquette 1 vers le haut
        if (touche == 90 && !pause) {
            raquette1.deplaHaut();
        }
        //touche S pour deplacer la raquette 1 vers le bas
        if (touche == 83 && !pause) {
            raquette1.deplaBas();
        }
        //fleche HAUT pour deplacer la raquette 2 vers le haut
        if (touche == 38 && !pause) {
            raquette2.deplaHaut();
        }
        //fleche BAS pour deplacer la raquette 2 vers le bas
        if (touche == 40 && !pause) {
            raquette2.deplaBas();
        }
        //echap, mise en pause
        if (touche == 27) {
            pause = !pause;
            sombre = false;
        }
    }
}

function drawCoordinates(x, y, color, size) {
	context.fillStyle = color;
	context.beginPath();
	context.arc(x, y, size, 0, Math.PI * 2, true);
	context.fill();
}

function mouvBalle() {
	balle.positionX = balle.positionX + balle.vitesse * Math.cos(balle.angle);
	balle.positionY = balle.positionY + balle.vitesse * Math.sin(balle.angle);
}

function detecRebond(int) {
	if (int != 1 && (balle.positionY <= balle.taille || balle.positionY >= canvas.height - balle.taille)) {
		balle.calculRebond(true);
		//alert(int);
		return 1;
	}
	if (int != 2 && balle.positionX <= balle.taille + 25) {
		var posRaquette = canvas.height / 2 - raquette1.position;
		//alert(posRaquette + longDemiRaquette);
		//alert(posRaquette - longDemiRaquette);
		//alert(balle.positionY);
		if (posRaquette + longDemiRaquette >= balle.positionY && posRaquette - longDemiRaquette <= balle.positionY) {
			balle.calculRebond(false);
			//balle.angle = balle.angle + (posRaquette - balle.positionY)*Math.PI/2*longDemiRaquette;
		}
		return 2;
	}
	if (int != 3 && balle.positionX >= canvas.width - balle.taille - 25) {
		var posRaquette = canvas.height / 2 - raquette2.position;
		//alert(posRaquette + longDemiRaquette);
		//alert(posRaquette - longDemiRaquette);
		//alert(balle.positionY);
		if (posRaquette + longDemiRaquette >= balle.positionY && posRaquette - longDemiRaquette <= balle.positionY) {
			balle.calculRebond(false);
			//balle.angle = balle.angle + (posRaquette - balle.positionY)*Math.PI/2*longDemiRaquette;
		}
		return 3;
	}
	return 0;
}

function drawField() {
	context.fillStyle = "rgba(0,0,0,1)";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawRaquettes() {
	context.fillStyle = "rgba(255,255,255,1)";
	context.fillRect(25, longDemiRaquette + raquette1.position, 5, canvas.height / 5);
	context.fillRect(canvas.width - 30, longDemiRaquette + raquette2.position, 5, canvas.height / 5);
}

function displayCanvas() {
    totalHeight = window.innerHeight * 0.98;
    totalWidth = window.innerWidth * 0.98;
    context.canvas.height = totalHeight;
    context.canvas.width = totalWidth;
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (currentState == "DisplayMessage") {
        displayWaitingScreen();
    }
}

function playGame() {
    document.addEventListener('keydown', actionKeyCode);
    //fonction qui fait tourner le jeu
    setInterval(function () {
        if (!pause) {
            drawField();
            drawCoordinates(balle.positionX, balle.positionY, "#FFFFFF", balle.taille);
            drawRaquettes();
            mouvBalle();
            rebond = detecRebond(rebond);
            while (balle.angle < 0) {
                balle.angle += 360;
            }
            while (balle.angle > 360) {
                balle.angle -= 360;
            }
        }
        else if (!sombre) {
            context.fillStyle = "rgba(0,0,0,0.3)";
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.font = "100px Courrier";
            context.fillStyle = "red";
            context.textAlign = "center";
            context.fillText("P A U S E", canvas.width / 2, canvas.height / 2 + 20);
            sombre = true;
        }
    }, 10);
}