class Recette {

  //Les ingredients possibles serviront à faire varier les plats lors de la creation de commandes
  //Par exemple pour faire un hamburger, on a besoin du pain et du steak, qui seront dans ingreIndi.
  //D'autres ingredients comme de la salade, du fromage ou des tomates seront dans ingrePoss.


  //name un string,ingreIndi et ingre Poss des tableaux d'Aliment (ou tableau(x) vide)
  constructor (name, ingreIndi, ingrePoss){
    this.name=name;				//le nom du plat
	this.ingreIndi= ingreIndi;		//liste de tous les ingredients indispensables pour ce plat
    this.ingrePoss= ingrePoss;		//liste de tous les ingredients que l'on peut y rajouter
  }
}