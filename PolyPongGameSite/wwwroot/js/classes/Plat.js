class Plat {
	
  //contenu un tableau d'Aliment (ou vide), assiette, poele et casserole des booleens
  constructor (contenu,assiette,poele,casserole){
    this.contenu = contenu;				//les aliments contenus dans le plat
	this.aUneAssiette = assiette;		//vaut true si il y a une assiette
	this.aUnePoele = poele;				//vaut true si il y a une poele
	this.aUneCasserole = casserole;		//vaut true si il y a une casserole
  }
}

//par defaut, le plat est toujours vide. Sur chaque table on a un plat vide
//qui peut etre remplace par un plat rempli si on en a un en main


//si l'on rajoute d'autres contenants, penser à les rajouter dans les fonctions
//qui sont annulées si on a un contenant en main (prendPose, decoupe)