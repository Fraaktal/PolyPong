"use strict";

//Crée la connexion au hub
var connection = new signalR.HubConnectionBuilder().withUrl("/PolyHub").build();

var IdGame = 42; //todo Récupérer l'id de la partie en cours qui sera passé avec l'URL
var IdJ1 = 42; //todo Récupérer l'id du j1 qui sera passé avec l'URL
var IdJ2 = 42; //todo Récupérer l'id du j2 qui sera passé avec l'URL

connection.on("Player_Left", function (idPlayer, idGame) {
    //comportement tant que le joueur 1 envoie gauche
    //On check à chaque fois que l'info qu'on récupère concerne notre partie.
    if (idGame == IdGame) {
        
    }
});

connection.on("Player_Right", function (idPlayer, idGame) {
   //comportement tant que le joueur 2 envoie droite
   if (idGame == IdGame) {

   }
});

connection.on("Player_StopMoving", function (idPlayer, idGame) {
   //comportement tant que le joueur 1 arrete de bouger
   if (idGame == IdGame) {

   }
});

//Ce bout de code permet d'envoyer au serveur que la partie est terminée
//Il faut lui passer en paramettre id du joueur 1, l'id du joueur 2, le score du joueur 1 et celui du joueur 2
//Ces trois données sont des int
//connection.invoke("EndGame", idJ1,idJ2,scoreJ1,scoreJ2,IdGame).catch(function (err) {
//    return console.error(err.toString());
//});

//On démarre la connexion
connection.start().catch(function (err) {
    return console.error(err.toString());
});