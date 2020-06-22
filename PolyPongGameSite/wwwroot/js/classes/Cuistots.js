

//TODO gerer la derniere partie des if du cas pose, ou il faut gerer la pose sur des cases ingredients (recup le nom de l'ingredient de la case)


//Le personnage jouable des 2 joueurs. Il a un nom, une position, on sait ce qu'il
//tient dans ses mains, et dans quelle direction il regarde.
//Il est capable de prendre quelque chose et de le poser, ainsi que de decouper des
//aliments. La fonction cuisson sera geree par la case de cuisson en elle meme.
class Cuistots {
  constructor (name,posX,posY,contenuMain,direction){
	this.name=name;
    this.positionX=posX;
    this.positionY=posY;
    this.contenuMain=contenuMain;
    this.direction=direction;
  }
  
  //Une fonction qui permet de deplacer le cuisinier via une commande du clavier.
  //On change la direction vers laquelle le cuisinier regarde puis on effectue le
  //deplacement si cela est possible
  deplacement(touche,carte,autreCuistotX,autreCuistotY){
	if (touche == 38 || touche == 90){
		this.direction = "haut";	
		if (carte[(this.positionX-16)/32][(this.positionY-16)/32-1].fonction == "sol" && !(this.positionX == autreCuistotX && this.positionY - 32 == autreCuistotY)){
			this.positionY += -32;
			return true;
		}
		return false;
	}
	if (touche == 37 || touche == 81){
		this.direction = "gauche";
		if (carte[(this.positionX-16)/32-1][(this.positionY-16)/32].fonction == "sol" && !(this.positionX - 32 == autreCuistotX && this.positionY == autreCuistotY)){
			this.positionX += -32;
			return true;
		}
		return false;
	}
	if (touche == 40 || touche == 83){
		this.direction = "bas";
		if (carte[(this.positionX-16)/32][(this.positionY-16)/32+1].fonction == "sol" && !(this.positionX == autreCuistotX && this.positionY + 32 == autreCuistotY)){
			this.positionY += 32;
			return true;
		}
		return false;
	}
	if (touche == 39 || touche == 68){
		this.direction = "droite";
		if (carte[(this.positionX-16)/32+1][(this.positionY-16)/32].fonction == "sol" && !(this.positionX + 32 == autreCuistotX && this.positionY == autreCuistotY)){
			this.positionX += 32;
			return true;
		}
		return false;
	}
  }
  
  //Une fonction qui va verifier contenuMain du cuisinier pour savoir si il prend ou
  //pose un objet, puis qui verifie si c'est possible, et prend ou pose l'objet
prendPose(carte){
	var platTempo = new Plat ([],false,false,false);
	var caseRegardee = new Case (i,j,"vide",platTempo);
	if (this.direction == "haut"){
		caseRegardee = carte[(this.positionX-16)/32][(this.positionY-16)/32-1];
	}
	else if (this.direction == "bas"){
		caseRegardee = carte[(this.positionX-16)/32][(this.positionY-16)/32+1];
	}
	else if (this.direction == "gauche"){
		caseRegardee = carte[(this.positionX-16)/32-1][(this.positionY-16)/32];
	}
	else if (this.direction == "droite"){
		caseRegardee = carte[(this.positionX-16)/32+1][(this.positionY-16)/32];
	}
	if (caseRegardee.fonction == "table"){
		//cas ou il y a une casserole sur la table
		if (caseRegardee.contenu.aUneCasserole){
			//cas ou l'on recupere le contenu de la casserole ou la casserole entiere
			if (!this.contenuMain.aUnePoele && this.contenuMain.contenu.length == 0){
				if (this.contenuMain.aUneCasserole){
					this.contenuMain.contenu = caseRegardee.contenu.contenu;
					caseRegardee.contenu = new Plat ([],false,false,true);
					caseRegardee.time = -1;
				}
				else if (!this.contenuMain.aUneAssiette){
					this.contenuMain = caseRegardee.contenu;
					caseRegardee.contenu = new Plat ([],false,false,false);
					caseRegardee.time = -1;
				}
				else if (this.contenuMain.aUneAssiette){
					this.contenuMain.contenu = caseRegardee.contenu.contenu;
					caseRegardee.contenu = new Plat ([],false,false,true);
					caseRegardee.time = -1;
				}
			}
			else if (caseRegardee.contenu.contenu.length != 0 && this.contenuMain.aUneAssiette && caseRegardee.contenu.contenu.length + this.contenuMain.contenu.length <= 5){
				this.contenuMain.contenu = this.contenuMain.contenu.concat(caseRegardee.contenu.contenu);
				caseRegardee.contenu = new Plat ([],false,false,true);
				caseRegardee.time = -1;
			}
			//cas ou l'on rajoute un ingredient dans une casserole
			//alert(caseRegardee.contenu.contenu.length);alert(this.contenuMain.contenu.length);alert(this.contenuMain.contenu[0].prepare);alert(his.contenuMain.contenu.length);alert(his.contenuMain.contenu.length);
			else if (caseRegardee.contenu.contenu.length == 0 && this.contenuMain.contenu.length == 1 && this.contenuMain.contenu[0].prepare && !this.contenuMain.contenu[0].cuit && this.contenuMain.contenu[0].name == "oignon") {
				caseRegardee.contenu.contenu = this.contenuMain.contenu;
				this.contenuMain.contenu = [];
				caseRegardee.time = 5;
			}
			
			else if (caseRegardee.contenu.contenu.length == 0 && this.contenuMain.contenu.length == 2 && this.contenuMain.contenu[0].prepare && !this.contenuMain.contenu[0].cuit && this.contenuMain.contenu[0].name == "oignon" && this.contenuMain.contenu[1].prepare && !this.contenuMain.contenu[1].cuit && this.contenuMain.contenu[1].name == "oignon") {
				caseRegardee.contenu.contenu = this.contenuMain.contenu;
				this.contenuMain.contenu = [];
				caseRegardee.time = 5;
			}
			
			else if (caseRegardee.contenu.contenu.length == 0 && this.contenuMain.contenu.length == 3 && this.contenuMain.contenu[0].prepare && !this.contenuMain.contenu[0].cuit && this.contenuMain.contenu[0].name == "oignon" && this.contenuMain.contenu[1].prepare && !this.contenuMain.contenu[1].cuit && this.contenuMain.contenu[1].name == "oignon" && this.contenuMain.contenu[2].prepare && !this.contenuMain.contenu[2].cuit && this.contenuMain.contenu[2].name == "oignon") {
				caseRegardee.contenu.contenu = this.contenuMain.contenu;
				this.contenuMain.contenu = [];
				caseRegardee.time = 5;
			}
			
			//cas ou l'on rajoute un autre ingrédient dans une casserole (si il y en a deja un dedans)
			else if (caseRegardee.contenu.contenu.length < 3 && caseRegardee.contenu.contenu.length != 0 && this.contenuMain.contenu.length == 1 && this.contenuMain.contenu[0].prepare && !this.contenuMain.contenu[0].cuit && this.contenuMain.contenu[0].name == caseRegardee.contenu.contenu[0].name){
				caseRegardee.contenu.contenu.push(this.contenuMain.contenu[0]);
				this.contenuMain.contenu = [];
				caseRegardee.time = 5;
			}
			
			else if (caseRegardee.contenu.contenu.length < 3 && caseRegardee.contenu.contenu.length != 0 && this.contenuMain.contenu.length == 2 && this.contenuMain.contenu[0].prepare && !this.contenuMain.contenu[0].cuit && this.contenuMain.contenu[0].name == caseRegardee.contenu.contenu[0].name && this.contenuMain.contenu[1].prepare && !this.contenuMain.contenu[1].cuit && this.contenuMain.contenu[1].name == "oignon"){
				caseRegardee.contenu.contenu.push(this.contenuMain.contenu[0]);
				this.contenuMain.contenu = [];
				caseRegardee.time = 5;
			}
		}
		//cas ou il y a unePoele sur la plaque de cuisson
		else if (caseRegardee.contenu.aUnePoele){
			//cas ou l'on recupere le contenu de la poele ou la poele entiere
			if (!this.contenuMain.aUneCasserole && this.contenuMain.contenu.length == 0){
				if (this.contenuMain.aUnePoele){
					this.contenuMain.contenu = caseRegardee.contenu.contenu;
					caseRegardee.contenu = new Plat ([],false,true,false);
					caseRegardee.time = -1;
				}
				else if (!this.contenuMain.aUneAssiette){
					this.contenuMain = caseRegardee.contenu;
					caseRegardee.contenu = new Plat ([],false,false,false);
					caseRegardee.time = -1;
				}
				else if (this.contenuMain.aUneAssiette){
					this.contenuMain.contenu = caseRegardee.contenu.contenu;
					caseRegardee.contenu = new Plat ([],false,true,false);
					caseRegardee.time = -1;
				}
			}
			//cas ou l'on recupere l'ingredient dans la poele avec une poele
			else if (caseRegardee.contenu.contenu.length != 0 && this.contenuMain.aUneAssiette && caseRegardee.contenu.contenu.length + this.contenuMain.contenu.length <= 5){
				this.contenuMain.contenu = this.contenuMain.contenu.concat(caseRegardee.contenu.contenu);
				caseRegardee.contenu = new Plat ([],false,true,false);
				caseRegardee.time = -1;
			}
			//cas ou l'on ajoute un ingredient dans une poele			il faut que la poele soit vide, que l'ingredient soit un steak prepare pas encore cuit
			else if (caseRegardee.contenu.contenu.length == 0 && this.contenuMain.contenu.length == 1 && this.contenuMain.contenu[0].prepare && !this.contenuMain.contenu[0].cuit && this.contenuMain.contenu[0].name == "steak") {
				caseRegardee.contenu.contenu = this.contenuMain.contenu;
				this.contenuMain = new Plat ([],this.contenuMain.aUneAssiette,this.contenuMain.aUnePoele,this.contenuMain.aUneCasserole);
				caseRegardee.time = 5;
			}
		}
		else if (caseRegardee.contenu.aUneAssiette){
			//cas ou l'on recupere le contenu de l'assiette
			if (this.contenuMain.contenu.length == 0){
				if (this.contenuMain.aUneAssiette){
					this.contenuMain = caseRegardee.contenu;
					caseRegardee.contenu = new Plat([],true,false,false);
				}
				else if (!this.contenuMain.aUneCasserole && !this.contenuMain.aUnePoele) {
					this.contenuMain = caseRegardee.contenu;
					caseRegardee.contenu = new Plat([],false,false,false);
				}
			}
			//cas ou l'on ajoute un ingredient dans une assiette			il faut que l'assiette ne soit pas totalement remplie
			else if (caseRegardee.contenu.contenu.length < 5 && this.contenuMain.contenu.length <= 5 - caseRegardee.contenu.contenu.length) {
				caseRegardee.contenu.contenu = caseRegardee.contenu.contenu.concat(this.contenuMain.contenu);
				this.contenuMain = new Plat ([],this.contenuMain.aUneAssiette,this.contenuMain.aUnePoele,this.contenuMain.aUneCasserole);
			}
		}
		//cas ou l'on recupere un aliment pose sur la table
		else if (caseRegardee.contenu.contenu.length == 1){
			if (this.contenuMain.aUneAssiette){
				if (this.contenuMain.contenu.length <= 4){
					this.contenuMain.contenu = this.contenuMain.contenu.concat(caseRegardee.contenu.contenu);
					caseRegardee.contenu = new Plat ([],false,false,false);
				}
			}
			else if (this.contenuMain.aUneCasserole){
				if (caseRegardee.contenu.contenu[0].name == "oignon" && caseRegardee.contenu.contenu[0].prepare && !caseRegardee.contenu.contenu[0].cuit){
					if (this.contenuMain.contenu.length <=3){
						this.contenuMain.contenu = this.contenuMain.contenu.concat(caseRegardee.contenu.contenu);
						caseRegardee.contenu = new Plat ([],false,false,false);
					}
				}
			}
			else if (this.contenuMain.aUnePoele && this.contenuMain.contenu.length == 0){
				if (caseRegardee.contenu.contenu[0].name == "steak" && caseRegardee.contenu.contenu[0].prepare && !caseRegardee.contenu.contenu[0].cuit){
					this.contenuMain.contenu.push(caseRegardee.contenu.contenu[0]);
					caseRegardee.contenu = new Plat ([],false,false,false);
				}
			}
			else {
				if (this.contenuMain.contenu.length == 0){
					this.contenuMain = caseRegardee.contenu;
					caseRegardee.contenu = new Plat ([],false,false,false);
				}
			}
		}
		// Si la table est vide, on peut y mettre une casserole, une poele ou une assiette, ou bien le contenu des mains du cuisinier
		else if (caseRegardee.contenu.contenu.length == 0){
			caseRegardee.contenu = this.contenuMain;
			this.contenuMain = new Plat([],false,false,false);
		}
	}
	else if (caseRegardee.fonction == "plaqueDeCuisson"){
		//cas ou il y a une casserole sur la plaque de cuisson
		if (caseRegardee.contenu.aUneCasserole){
			//cas ou l'on recupere le contenu de la casserole ou la casserole entiere
			if (!this.contenuMain.aUnePoele && this.contenuMain.contenu.length == 0){
				if (this.contenuMain.aUneCasserole){
					this.contenuMain.contenu = caseRegardee.contenu.contenu;
					caseRegardee.contenu = new Plat ([],false,false,true);
					caseRegardee.time = -1;
				}
				else if (!this.contenuMain.aUneAssiette){
					this.contenuMain = caseRegardee.contenu;
					caseRegardee.contenu = new Plat ([],false,false,false);
					caseRegardee.time = -1;
				}
				else if (this.contenuMain.aUneAssiette){
					this.contenuMain.contenu = caseRegardee.contenu.contenu;
					caseRegardee.contenu = new Plat ([],false,false,true);
					caseRegardee.time = -1;
				}
			}
			else if (caseRegardee.contenu.contenu.length != 0 && this.contenuMain.aUneAssiette && caseRegardee.contenu.contenu.length + this.contenuMain.contenu.length <= 5){
				this.contenuMain.contenu = this.contenuMain.contenu.concat(caseRegardee.contenu.contenu);
				caseRegardee.contenu = new Plat ([],false,false,true);
				caseRegardee.time = -1;
			}
			//cas ou l'on rajoute un ingredient dans une casserole
			//alert(caseRegardee.contenu.contenu.length);alert(this.contenuMain.contenu.length);alert(this.contenuMain.contenu[0].prepare);alert(his.contenuMain.contenu.length);alert(his.contenuMain.contenu.length);
			else if (caseRegardee.contenu.contenu.length == 0 && this.contenuMain.contenu.length == 1 && this.contenuMain.contenu[0].prepare && !this.contenuMain.contenu[0].cuit && this.contenuMain.contenu[0].name == "oignon") {
				caseRegardee.contenu.contenu = this.contenuMain.contenu;
				this.contenuMain.contenu = [];
				caseRegardee.time = 5;
			}
			
			else if (caseRegardee.contenu.contenu.length == 0 && this.contenuMain.contenu.length == 2 && this.contenuMain.contenu[0].prepare && !this.contenuMain.contenu[0].cuit && this.contenuMain.contenu[0].name == "oignon" && this.contenuMain.contenu[1].prepare && !this.contenuMain.contenu[1].cuit && this.contenuMain.contenu[1].name == "oignon") {
				caseRegardee.contenu.contenu = this.contenuMain.contenu;
				this.contenuMain.contenu = [];
				caseRegardee.time = 5;
			}
			
			else if (caseRegardee.contenu.contenu.length == 0 && this.contenuMain.contenu.length == 3 && this.contenuMain.contenu[0].prepare && !this.contenuMain.contenu[0].cuit && this.contenuMain.contenu[0].name == "oignon" && this.contenuMain.contenu[1].prepare && !this.contenuMain.contenu[1].cuit && this.contenuMain.contenu[1].name == "oignon" && this.contenuMain.contenu[2].prepare && !this.contenuMain.contenu[2].cuit && this.contenuMain.contenu[2].name == "oignon") {
				caseRegardee.contenu.contenu = this.contenuMain.contenu;
				this.contenuMain.contenu = [];
				caseRegardee.time = 5;
			}
			
			//cas ou l'on rajoute un autre ingrédient dans une casserole (si il y en a deja un dedans)
			else if (caseRegardee.contenu.contenu.length < 3 && caseRegardee.contenu.contenu.length != 0 && this.contenuMain.contenu.length == 1 && this.contenuMain.contenu[0].prepare && !this.contenuMain.contenu[0].cuit && this.contenuMain.contenu[0].name == caseRegardee.contenu.contenu[0].name){
				caseRegardee.contenu.contenu.push(this.contenuMain.contenu[0]);
				this.contenuMain.contenu = [];
				caseRegardee.time = 5;
			}
			
			else if (caseRegardee.contenu.contenu.length < 3 && caseRegardee.contenu.contenu.length != 0 && this.contenuMain.contenu.length == 2 && this.contenuMain.contenu[0].prepare && !this.contenuMain.contenu[0].cuit && this.contenuMain.contenu[0].name == caseRegardee.contenu.contenu[0].name && this.contenuMain.contenu[1].prepare && !this.contenuMain.contenu[1].cuit && this.contenuMain.contenu[1].name == "oignon"){
				caseRegardee.contenu.contenu.push(this.contenuMain.contenu[0]);
				this.contenuMain.contenu = [];
				caseRegardee.time = 5;
			}
		}
		//cas ou il y a unePoele sur la plaque de cuisson
		else if (caseRegardee.contenu.aUnePoele){
			//cas ou l'on recupere le contenu de la poele ou la poele entiere
			if (!this.contenuMain.aUneCasserole && this.contenuMain.contenu.length == 0){
				if (this.contenuMain.aUnePoele){
					this.contenuMain.contenu = caseRegardee.contenu.contenu;
					caseRegardee.contenu = new Plat ([],false,true,false);
					caseRegardee.time = -1;
				}
				else if (!this.contenuMain.aUneAssiette){
					this.contenuMain = new Plat (caseRegardee.contenu.contenu,caseRegardee.contenu.aUneAssiette,caseRegardee.contenu.aUnePoele,caseRegardee.contenu.aUneCasserole);
					caseRegardee.contenu = new Plat ([],false,false,false);
					caseRegardee.time = -1;
				}
				else if (this.contenuMain.aUneAssiette){
					this.contenuMain.contenu = caseRegardee.contenu.contenu;
					caseRegardee.contenu = new Plat ([],false,true,false);
					caseRegardee.time = -1;
				}
			}
			//cas ou l'on recupere l'ingredient dans la poele avec une poele
			else if (caseRegardee.contenu.contenu.length != 0 && this.contenuMain.aUneAssiette && caseRegardee.contenu.contenu.length + this.contenuMain.contenu.length <= 5){
				this.contenuMain.contenu = this.contenuMain.contenu.concat(caseRegardee.contenu.contenu);
				caseRegardee.contenu = new Plat ([],false,true,false);
				caseRegardee.time = -1;
			}
			//cas ou l'on ajoute un ingredient dans une poele			il faut que la poele soit vide, que l'ingredient soit un steak prepare pas encore cuit
			else if (caseRegardee.contenu.contenu.length == 0 && this.contenuMain.contenu.length == 1 && this.contenuMain.contenu[0].prepare && !this.contenuMain.contenu[0].cuit && this.contenuMain.contenu[0].name == "steak") {
				caseRegardee.contenu.contenu = this.contenuMain.contenu;
				this.contenuMain = new Plat ([],this.contenuMain.aUneAssiette,this.contenuMain.aUnePoele,this.contenuMain.aUneCasserole);
				caseRegardee.time = 5;
			}
		}
		// Si la plaque de cuisson est vide, on peut y remettre une casserole ou une poele
		else if (!caseRegardee.contenu.aUneCasserole && !caseRegardee.contenu.aUnePoele){
			//cas ou l'on remet une poele a sa place
			if (this.contenuMain.aUnePoele){
				caseRegardee.contenu = this.contenuMain;
				this.contenuMain = new Plat([],false,false,false);
				if (caseRegardee.contenu.contenu.length == 0){
					caseRegardee.time = -1;
				}
				else {
					caseRegardee.time = 5;
				}
			}
			//cas ou l'on remet une casserole a sa place
			else if (this.contenuMain.aUneCasserole){
				caseRegardee.contenu = this.contenuMain;
				this.contenuMain = new Plat([],false,false,false);
				if (caseRegardee.contenu.contenu.length == 0){
					caseRegardee.time = -1;
				}
				else {
					caseRegardee.time = 5;
				}
			}
		}
	}
	//une case decoupe ne peux pas contenir de contenant(assiette, poele ou casserole), donc si on en a un en main, on est forcémment en cas "prendre"
	else if (caseRegardee.fonction == "decoupe"){
		//cas ou l'on pose l'ingredient sur la case
		if (this.contenuMain.contenu.length == 1 && !this.contenuMain.contenu[0].cuit && caseRegardee.contenu.contenu.length == 0){
			caseRegardee.contenu.contenu = this.contenuMain.contenu;
			this.contenuMain.contenu = [];
		}
		//cas ou l'on prend l'objet depuis la case
		else if (caseRegardee.contenu.contenu.length != 0){
			//si l'on a une poele en main, il faut que l'aliment soit un steak prepare, et que l'on ai les mains vides (a part la poele)
			if (this.contenuMain.aUnePoele && this.contenuMain.contenu.length == 0 && caseRegardee.contenu.contenu[0].name == "steak" && caseRegardee.contenu.contenu[0].prepare){
				this.contenuMain.contenu.push(caseRegardee.contenu.contenu[0]);
				caseRegardee.contenu= new Plat([],false,false,false);
			}
			//si on a une casserole en main, il faut qu'elle ne soit pas pleine et que l'ingredient soit un oignon prepare
			else if (this.contenuMain.aUneCasserole && this.contenuMain.contenu.length < 3 && caseRegardee.contenu.contenu[0].name == "oignon" && caseRegardee.contenu.contenu[0].prepare){
				this.contenuMain.contenu.push(caseRegardee.contenu.contenu[0]);
				caseRegardee.contenu= new Plat([],false,false,false);
			}
			//si l'on a une assiette en main, il faut qu'elle ne soit pas pleine
			else if (this.contenuMain.aUneAssiette && this.contenuMain.contenu.length < 5){
				this.contenuMain.contenu.push(caseRegardee.contenu.contenu[0]);
				caseRegardee.contenu= new Plat([],false,false,false);
			}
			//si l'on a les mains totalement vide, on prend simplement l'ingredient
			else if (!this.contenuMain.aUneAssiette && !this.contenuMain.aUneCasserole && !this.contenuMain.aUnePoele && this.contenuMain.contenu.length == 0){
				this.contenuMain.contenu.push(caseRegardee.contenu.contenu[0]);
				caseRegardee.contenu= new Plat([],false,false,false);
			}
		}
	}
	else if (caseRegardee.fonction == "ingredient"){
		//cas ou l'on repose un ingredient dans un panier d'ingredients
		//on verifie si : il n'y a qu'un seul ingredient, 		qu'il est du meme type que la case ingredient,						 		et qu'il n'est pas modifie
		if (this.contenuMain.contenu.length == 1 && this.contenuMain.contenu[0].name == caseRegardee.contenu.contenu[0].name && !this.contenuMain.contenu[0].cuit && !this.contenuMain.contenu[0].prepare){
			this.contenuMain.contenu.pop();
		}
		// cas ou l'on prend l'ingredient depuis la case
		//cas ou l'on a une assiette en main (il ne faut pas depasser sa capacite max)      et cas ou l'on a les mains vides soit pas de contenants 
		else if (this.contenuMain.aUneAssiette && this.contenuMain.contenu.length < 5 || !this.contenuMain.aUneAssiette && !this.contenuMain.aUneCasserole && ! this.contenuMain.aUnePoele && this.contenuMain.contenu.length == 0){
		//on ne peut pas prendre un ingredient et le mettre dans une poele ou casserole car elles n'acceptent que les ingredients prepares
			this.contenuMain.contenu.push(caseRegardee.contenu.contenu[0]);
			//les lignes qui suivent évitent le fait que l'ingredient de la case et celui maintenant en main soient le meme objet et soient modifies en meme temps.
			var alimentTempo = new Aliment (caseRegardee.contenu.contenu[0].name,false,false);
			var PlatTempo = new Plat([],false,false,false);
			PlatTempo.contenu.push(alimentTempo);
			caseRegardee.contenu = PlatTempo;
		}
		
	}
	else if (caseRegardee.fonction == "livraison"){
		//pas de cas ou l'on prend un objet depuis cette case, car si quelque chose y est pose, il est envoye en salle
		if (this.contenuMain.aUneAssiette && !this.contenuMain.aUneCasserole && !this.contenuMain.aUnePoele){
			caseRegardee.contenu = this.contenuMain;
			this.contenuMain = new Plat([],false,false,false);
		}
	}
	else if (caseRegardee.fonction == "poubelle"){
		//la poubelle vide le contenu de la main mais seulement les aliments
		this.contenuMain= new Plat([],this.contenuMain.aUneAssiette,this.contenuMain.aUnePoele,this.contenuMain.aUneCasserole);
	}
	else if (caseRegardee.fonction == "evier"){
		//cas ou l'on repose une assiette
		if (this.contenuMain.aUneAssiette && this.contenuMain.contenu.length == 0){
			this.contenuMain.aUneAssiette = false;
		} 
		//on ne peut rendre une assiette dans l'evier que si on a les mains vides.
		else if (!this.contenuMain.aUneCasserole && !this.contenuMain.aUnePoele && this.contenuMain.contenu.length == 0){
			this.contenuMain.aUneAssiette = true;
		}
	}
	if (this.direction == "haut"){
		carte[(this.positionX-16)/32][(this.positionY-16)/32-1] = caseRegardee;
	}
	else if (this.direction == "bas"){
		carte[(this.positionX-16)/32][(this.positionY-16)/32+1] = caseRegardee;
	}
	else if (this.direction == "gauche"){
		carte[(this.positionX-16)/32-1][(this.positionY-16)/32] = caseRegardee;
	}
	else if (this.direction == "droite"){
		carte[(this.positionX-16)/32+1][(this.positionY-16)/32] = caseRegardee;
	}
	return true;
}
  
  //Une fonction qui permet de decouper l'aliment devant le cuisinier, si c'est
  //possible (cad si il y a une table, s'il y a quelque chose dessus, si l'on peut
  //decouper l'aliment)
  //On verifie aussi que les mains du cuisinier sont vides (on ne decoupe pas les mains pleines !)
  decoupe(carte){
  if (this.contenuMain.contenu.length != 0 || this.contenuMain.aUneAssiette || this.contenuMain.aUnePoele || this.contenuMain.aUneCasserole){
			return false;
		}
		switch (this.direction){
			case ("haut") :
				var caseRegardee = carte[(this.positionX-16)/32][(this.positionY-16)/32-1]
				if (caseRegardee.fonction=="decoupe" && caseRegardee.contenu.contenu.length == 1 && !(caseRegardee.contenu.aUneAssiette || caseRegardee.contenu.aUneCasserole || caseRegardee.contenu.aUnePoele)) {
					carte[(this.positionX-16)/32][(this.positionY-16)/32-1].contenu.contenu[0].prepare=true;
					return true;
				}
				break;
			case ("bas") :
				var caseRegardee = carte[(this.positionX-16)/32][(this.positionY-16)/32+1]
				if (caseRegardee.fonction=="decoupe" && caseRegardee.contenu.contenu.length == 1 && !(caseRegardee.contenu.aUneAssiette || caseRegardee.contenu.aUneCasserole || caseRegardee.contenu.aUnePoele)) {
					carte[(this.positionX-16)/32][(this.positionY-16)/32+1].contenu.contenu[0].prepare=true;
					return true;
				}
				break;
			case ("gauche") :
				var caseRegardee = carte[(this.positionX-16)/32-1][(this.positionY-16)/32]
				if (caseRegardee.fonction=="decoupe" && caseRegardee.contenu.contenu.length == 1 && !(caseRegardee.contenu.aUneAssiette || caseRegardee.contenu.aUneCasserole || caseRegardee.contenu.aUnePoele)) {
					carte[(this.positionX-16)/32-1][(this.positionY-16)/32].contenu.contenu[0].prepare=true;
					return true;
				}
				break;
			case ("droite") :
				var caseRegardee = carte[(this.positionX-16)/32+1][(this.positionY-16)/32]
				if (caseRegardee.fonction=="decoupe" && caseRegardee.contenu.contenu.length == 1 && !(caseRegardee.contenu.aUneAssiette || caseRegardee.contenu.aUneCasserole || caseRegardee.contenu.aUnePoele)) {
					carte[(this.positionX-16)/32+1][(this.positionY-16)/32].contenu.contenu[0].prepare=true;
					return true;
				}
				break;
			default :
				return false;
		}
	  return false;
  }
}






