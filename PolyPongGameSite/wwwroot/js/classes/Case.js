class Case {
	
	//La fonction cuisson est geree par la carte (plus opti je pense)
	
	
	//Une classe qui décrit l'une des tuiles de la carte de jeu. En fonction de la tuile
	//la case peut avoir des propriétés différentes (basique pour sol, mur, et vide, mais
	//table a une fonction et un contenu en plus).
	//Les positionX et positionY sont comptees en tuile de jeu, pas en pixel.
	//positionX et positionY des int,fonction un string,contenu un Plat
  constructor (positionX,positionY,fonction,contenu){
    this.positionX = positionX;
    this.positionY = positionY;
    this.fonction = fonction;
	//sol, mur, vide. Si c'est une table elle a l'une des fonctions suivantes :
	//decoupe, cuissonSoupe, cuissonGrill,(autre cuissons),
    //livraison, evier, distributeurAssiette, distributeurIngredient(+type)
	
	//ne sert que pour les tables
	this.contenu = contenu;			//vaut un plat "vide" en temps normal
	
	//la suite ne sert que pour les plaques de cuisson et vaut false ou -1 sinon
	this.time = -1;
  }
}
