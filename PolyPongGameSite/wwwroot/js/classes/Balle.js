class Balle {

  //toutes les var d'entree sont des ints
  constructor (positionX, positionY, vitesse, vitesseMax, angle, taille){
		this.positionX = positionX;		//les positions sont en pixels dans le canvas
		this.positionY = positionY;
		this.vitesse = vitesse;	
		this.vitesseMax = vitesseMax;
		this.angle = angle;	
		this.taille = taille;
		this.compteur = 0;
	}
	
	//hauteur un booleen true si la collision est verticale, et false si elle est horizontale
	calculRebond(hauteur){
		//rebond sur les bords du plateau
		if (hauteur){
			this.angle = 2*Math.PI - this.angle;
			this.compteur += 1;
			if (compteur == 5 ){
				compteur = 0;
				if(this.vitesse <= this.vitesseMax){
					this.vitesse = this.vitesse * 1.2;
				}
			}
		}
		//rebond sur une raquette
		else {
			//augmentation de la vitesse pour plus de difficultee
			this.angle = Math.PI - this.angle;
			if(this.vitesse <= this.vitesseMax){
				this.vitesse = this.vitesse * 1.2;
			}
		}
	}
	miseEnJeu(positionX, positionY, vitesse, angle){
		this.positionX = positionX;		//les positions sont en pixels dans le canvas
		this.positionY = positionY;
		this.vitesse = vitesse;
		this.angle = angle;	
	}
}