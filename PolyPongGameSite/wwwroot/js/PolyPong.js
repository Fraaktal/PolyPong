"use strict";

//Crée la connexion au hub
var connection = new signalR.HubConnectionBuilder().withUrl("/PolyHub").build();
//https://192.168.1.13:45455/?userId=1

var canvas = document.getElementById("canvas");
var context = null;
if (canvas.getContext) {
    context = canvas.getContext('2d');
}

var gameId = "";
var playerId = "";
var isPlayerP2 = false;
var currentState = "WaitForConnexion";

var msg1 = "";
var msg2 = "";

var totalHeight = 0;
var totalWidth = 0;
displayCanvas();
window.addEventListener("resize", displayCanvas);
document.addEventListener('keydown', actionKeyCode);
document.addEventListener('keyup', actionKeyCodeUp);

var scoreJ1 = 0;
var scoreJ2 = 0;
var compteur = 0;
var pause = false;
var sombre = false;
var rebondRaquette = false;
var rebondBord = false;
var remiseEnJeu = false;


var balle = new Balle(canvas.width / 2, canvas.height / 2, 1, 3, Math.PI, 8);
var raquette1 = new Raquette(2 * canvas.height / 5, 4 * canvas.height / 5);
var raquette2 = new Raquette(2 * canvas.height / 5, 4 * canvas.height / 5);

var askForUpP1 = false;
var askForDownP1 = false;
var askForUpP2 = false;
var askForDownP2 = false;

connection.on("StartGame", function (isP1) {
    playGame();
});

connection.on("Player_Up", function (isP1) {
	if (isP1) {
		askForUpP1 = true;
		askForDownP1 = false;
	} else {
		askForUpP2 = true;
		askForDownP2 = false;
    }
});

connection.on("Player_Down", function (isP1) {
	if (isP1) {
		askForUpP1 = false;
        askForDownP1 = true;
	} else {
		askForUpP2 = false;
        askForDownP2 = true;
    }
});

connection.on("Player_StopMoving_Up", function (isP1) {
	if (isP1) {
		askForUpP1 = false;
	} else {
		askForUpP2 = false;
    }
});

connection.on("Player_StopMoving_Down", function (isP1) {
	if (isP1) {
		askForDownP1 = false;
	} else {
		askForDownP2 = false;
    }
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

function displayCanvas() {
    totalHeight = window.innerHeight * 0.98;
    totalWidth = window.innerWidth * 0.98;
    context.canvas.height = totalHeight;
    context.canvas.width = totalWidth;
    if (currentState == "DisplayMessage") {
        displayWaitingScreen();
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

function detecRebond() {
	if (!rebondBord && (balle.positionY <= balle.taille || balle.positionY >= canvas.height - balle.taille)) {
		balle.calculRebond(true);
		rebondBord = true;
		return false;
	}
	else if (rebondBord && balle.positionY <= balle.taille + canvas.height / 25 && balle.angle > Math.PI) {
		rebondBord = false;
		return false;
	}
	else if (rebondBord && balle.positionY >= canvas.height - balle.taille - canvas.height / 25 && balle.angle < Math.PI) {
		rebondBord = false;
		return false;
	}
	if (!rebondRaquette && balle.positionX <= balle.taille + canvas.width / 20 && balle.positionX >= canvas.width / 20) {
		if (raquette1.position <= balle.positionY && raquette1.position + canvas.height / 5 >= balle.positionY) {
			balle.calculRebond(false);
			rebondRaquette = true;
			balle.angle = balle.angle - (raquette1.position + canvas.height / 10 - balle.positionY) * Math.PI / 2 * canvas.height / 50000;
			while (balle.angle > Math.PI / 2 && balle.angle < Math.PI) {
                balle.angle += Math.PI / 20;
			}
			while (balle.angle < 3 * Math.PI / 2 && balle.angle > Math.PI / 2) {
                balle.angle -= Math.PI / 20;
			}
			return false;
		}
	}
	else if (balle.positionX <= balle.taille) {
		balle.miseEnJeu(canvas.width / 2, canvas.height / 2, 1, Math.PI);
		scoreJ2 += 1;
		return true;
	}
	else if (rebondRaquette && balle.positionX >= balle.taille + canvas.width / 20 + canvas.width / 25 && (balle.angle > 3 * Math.PI / 2 || balle.angle < Math.PI / 2)) {
		rebondRaquette = false;
		return false;
	}
	if (!rebondRaquette && balle.positionX >= canvas.width - balle.taille - canvas.width / 20 && balle.positionX <= canvas.width - canvas.width / 20) {
		if (raquette2.position <= balle.positionY && raquette2.position + canvas.height / 5 >= balle.positionY) {
			balle.calculRebond(false);
			rebondRaquette = true;
			balle.angle = balle.angle - (raquette2.position - canvas.height / 10 - balle.positionY) * Math.PI / 2 * canvas.height / 50000;
			while (balle.angle < Math.PI / 2) {
				balle.angle -= Math.PI / 20;
            }
			while (balle.angle > 3 * Math.PI / 2) {
				balle.angle += Math.PI / 20;
            }
			return false;
		}
	}
	else if (balle.positionX >= canvas.width - balle.taille) {
		balle.miseEnJeu(canvas.width / 2, canvas.height / 2, 1, 0);
		scoreJ1 += 1;
		return true;
	}
	else if (rebondRaquette && balle.positionX >= canvas.width - balle.taille - canvas.width / 20 - canvas.width / 25 && balle.angle < 3 * Math.PI / 2 && balle.angle > Math.PI / 2) {
		rebondRaquette = false;
		return false;
	}
	return false;
}

function drawField() {
	context.fillStyle = "rgba(0,0,0,1)";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawRaquettes() {
	context.fillStyle = "rgba(255,255,255,1)";
	context.fillRect(canvas.width / 20, raquette1.position, 5, canvas.height / 5);
	context.fillRect(canvas.width - canvas.width / 20, raquette2.position, 5, canvas.height / 5);
}

function draw() {
	drawField();
	drawCoordinates(balle.positionX, balle.positionY, "#FFFFFF", balle.taille);
	drawRaquettes();
}

//fonction qui fait tourner le jeu
function playGame() {
    setInterval(function () {
		if (!pause) {
			if (askForUpP1) {
                raquette1.deplaHaut();
			} 
			if (askForDownP1) {
                raquette1.deplaBas();
			}
            if (askForUpP2) {
				raquette2.deplaHaut();
			} 
			if (askForDownP2) {
                raquette2.deplaBas();
            }

            if (!remiseEnJeu) {
                draw();
                mouvBalle();
                remiseEnJeu = detecRebond();
            }
            while (balle.angle < 0) {
                balle.angle += 2 * Math.PI;
            }
            while (balle.angle > 2 * Math.PI) {
                balle.angle -= 2 * Math.PI;
            }
            if (remiseEnJeu) {
                compteur += 1;
                if (!sombre) {
                    context.fillStyle = "rgba(0,0,0,0.3)";
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    context.font = "80px Courrier";
                    context.fillStyle = "white";
                    context.textAlign = "center";
                    context.fillText(scoreJ1 + " / " + scoreJ2, canvas.width / 2, canvas.height / 2 + 20);
                    sombre = true;
                }
                if (compteur == 200) {
                    compteur = 0;
                    remiseEnJeu = false;
                    sombre = false;
                }
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

function actionKeyCode(event) {
    var touche = event.keyCode;
	//touche Z pour deplacer la raquette 1 vers le haut
	if (touche == 90 && !pause && !sombre) {
        askForUpP1 = true;
        askForDownP1 = false;
    }
	//touche S pour deplacer la raquette 1 vers le bas
	if (touche == 83 && !pause && !sombre) {
        askForUpP1 = false;
        askForDownP1 = true;
	}
	//fleche HAUT pour deplacer la raquette 2 vers le haut
	if (touche == 38 && !pause && !sombre) {
		askForUpP2 = true;
		askForDownP2 = false;
	}
	//fleche BAS pour deplacer la raquette 2 vers le bas
	if (touche == 40 && !pause && !sombre) {
		askForUpP2 = false;
		askForDownP2 = true;
	}
	//echap, mise en pause
	if (touche == 27) {
		if (pause) {
			draw();
		}
		pause = !pause;
		sombre = false;
	}
}

function actionKeyCodeUp(event) {
	var touche = event.keyCode;

	if (touche == 90 && !pause && !sombre) {
        askForUpP1 = false;
	}
	if (touche == 83 && !pause && !sombre) {
        askForDownP1 = false;
    }
	if (touche == 38 && !pause && !sombre) {
		askForUpP2 = false;
	}
	if (touche == 40 && !pause && !sombre) {
		askForDownP2 = false;
	}
}