"use strict";

//Crée la connexion au hub
var connection = new signalR.HubConnectionBuilder().withUrl("/PolyHub").build();

connection.on("Player_Left", function (idPlayer, idGame) {
    //comportement tant que le joueur 1 envoie gauche
    //On check à chaque fois que l'info qu'on récupère concerne notre partie.

});

connection.on("Player_Right", function (idPlayer, idGame) {
   //comportement tant que le joueur 2 envoie droite

});

connection.on("Player_StopMoving", function (idPlayer, idGame) {
   //comportement tant que le joueur 1 arrete de bouger

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

var totalHeight = 0;
var totalWidth = 0;
displayCanvas();

function displayCanvas() {

    totalHeight = window.innerHeight * 0.997;
    totalWidth = window.innerWidth * 0.999;

    context.canvas.height = totalHeight;
    context.canvas.width = totalWidth;
}

window.addEventListener("resize", displayCanvas);