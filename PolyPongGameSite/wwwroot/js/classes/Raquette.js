class Raquette {
	//position un int
  constructor (position, maximum){
		this.position = position;	//position est compté en pixel,
									//0 est la position au milieu,
									//le nombre est negatif en dessous,
									//positif au dessus
								
		this.deplacementHaut = false;	//sert pour modifier l'angle de la balle si la
		this.deplacementBas = false;	//raquette est en mouvement au moment du rebond
		this.max = maximum;	//amplitude du deplacement possible de la raquette
	}
	
	deplaHaut(){
		if (this.position > -this.max){
			this.position -= 5;
		}
	}
	
	deplaBas(){
		if (this.position < this.max){
			this.position += 5;
			this.vitesse = this.vitesse*1.2;
		}
	}
}