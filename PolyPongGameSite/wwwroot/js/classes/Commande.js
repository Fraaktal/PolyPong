class Commande {

  //name un string, plat un Plat, time un int positif
  constructor (name, plat, time){
    this.name = name;				//le nom du plat correspondant a la commande
	this.plat = plat;				//liste de tous les ingredients necessaires au plat, et de
									//l'etat dans lequel ils devront etre (cuit/cru, prepare ou non)
    this.time = time;				//temps restant pour preparer la commande.
  }
}