let panier = JSON.parse(localStorage.getItem("panier"));

const dataApi = fetch("http://localhost:3000/api/products")
  // pour la réponse retournée donne le résultat en json
  .then(reponse => reponse.json())
  .then(listProducts => {

  	let product = listProducts[0];
  	let ids = Object.keys(panier);

  	for (let i = 0; i < ids.lenght; i ++) {
  		let couleurs = Object.keys(panier[ids[i]]);
  		for (let j = 0; j < couleurs.lenght; j ++){
  			let id = ids[i];
  			let color = couleurs[j];
  			let quantité = panier[id][color];
  		}
  	}

  	for (let k = 0; k < listProducts.length; k ++) {
  		//console.log(listProducts[k]._id, id)
  		if (listProducts[k]._id == id) {
  			product = listProducts[k];
  		}
  	}

	let article = document.createElement("article");
	article.class = "cart__item";
	article.setAttribute("data-id", id);
	article.setAttribute("data-color", color);

	let div1 = document.createElement("div");
	div1.class = "cart__item__img";

	let image = document.createElement("img");
	image.src = product.imageUrl; 
	image.alt = product.altTxt;

	div1.appendChild(image);

	let div2 = document.createElement("div");
	div2.class = "cart__item__content";


	let div2_1 = document.createElement("div");
	div2_1.class = "cart__item__content__description";

	let titre = document.createElement("h2");
	titre.textContent = product.name;
	let couleur = document.createElement("p");
	couleur.textContent = color;
	let prix = document.createElement("p");
	prix.textContent = product.price;

	div2_1.appendChild(titre);
	div2_1.appendChild(couleur);
	div2_1.appendChild(prix);


	let div2_2 = document.createElement("div");
	div2_2.class = "cart__item__content__settings__quantity";


	let div2_2_1 = document.createElement("div");
	let q = document.createElement("p");
	q.textContent = "Qté : ";

	let input = document.createElement("input");
	input.type = "number";
	input.class = "itemQuantity";
	input.name = "itemQuantity";
	input.min = "1";
	input.max = "100";
	input.setAttribute("value", quantite);

	let div2_2_2 = document.createElement("div");
	div2_2_2.class = "cart__item__content__senttings__delete";
	let supprimerItem = document.createElement("p");
	supprimerItem.class = "deleteItem";
	supprimerItem.textContent = "Supprimer";

	div2_2_2.appendChild(supprimerItem);

	div2_2_1.appendChild(q);
	div2_2_1.appendChild(input);

	div2_2.appendChild(div2_2_1);
	div2_2.appendChild(div2_2_2);


	div2.appendChild(div2_1);
	div2.appendChild(div2_2);

	article.appendChild(div1);
	article.appendChild(div2);
	console.log(article);

});


	
  		


//Gérer la modification + suppression
//modification - (addEventListener de type change)
//méthode Element.closest() cibler le produit à supp ou modif

//-------------------------Passer la commande

//class formulaire{
	//constructor(input){
		//this.prenom = document.querySelector("firstName").value;
		//this.nom = document.querySelector("lastName").value;
		//this.adresse = document.querySelector("address").value;
		//this.ville = document.querySelector("city").value;
		//this.mail = document.querySelector("email").value;
		//this.boutonCommander = document.querySelector("order").value;
	//}
//}

//const prenom = formulaire.prenom;
	//if(/^[A-Za-z]{3,20}$/.test(prenom)){
		//console.log("ok");
	//}
	//else {
		//console.log("ko");
	//}

//const nom = document.getElmentById("lastName").value;
//const adresse = document.getElmentById("address").value;
//const ville = document.getElmentById("city").value;
//const mail = document.getElmentById("email").value;



