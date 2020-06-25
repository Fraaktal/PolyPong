class Raquette {
	//position un int
  constructor (position, max){
		this.position = position;	//position est compté en pixel,
									//0 est la position au milieu,
									//le nombre est negatif en dessous,
									//positif au dessus
								
		this.deplacementHaut = false;	//sert pour modifier l'angle de la balle si la
		this.deplacementBas = false;	//raquette est en mouvement au moment du rebond
		this.max = max;	//amplitude du deplacement possible de la raquette
	}
	
	deplaHaut(){
		if (this.position >= this.max/50){
			this.position -= this.max/40;
		}
	}
	
	deplaBas(){
		if (this.position < this.max){
			this.position += this.max/40;
		}
	}
}