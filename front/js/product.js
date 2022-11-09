/*Variables globales*/

const url = new URL (window.location.href);
const id = url.searchParams.get("id");

/*Fonctions*/

function chargementProduit() {
	fetch(`http://localhost:3000/api/products/${id}`)
	  // pour la réponse retournée donne le résultat en json
	  .then(reponse => reponse.json())
	  .then(product => {
	  	
	    // insertion du nom du canapé dans l'onglet de la page
	  	(document.title);
	  	document.title = product.name;


	  	let a = document.createElement("a");
	  	a.href = "./product.html?id=" + product._id;

		// création du bloc article
	  	let article = document.createElement("article"); 

	  	// insertion image du canapé
	  	let image = document.createElement("img");
	  	image.src = product.imageUrl; 
	  	image.alt = product.altTxt;
	  	document.querySelector(".item__img").appendChild(image);

	  	// insertion du nom du canapé
	  	document.getElementById("title").textContent = product.name;

	  	//insertion du prix du canapé
	  	document.getElementById("price").textContent = product.price;

	  	// insertion description du canapé
	  	document.getElementById("description").textContent = product.description;

	  	// parcours du tableau de couleurs et insertion de celles-ci dans choix
	  	const couleurs = product.colors;
	  		for (let c = 0; c < couleurs.length; c ++) {
		  		let couleur = couleurs[c];
		  		let option = document.createElement("option");
		  		option.value = couleur;
		  		option.textContent = couleur;
		  		document.getElementById("colors").appendChild(option);
	  		}

	})
	  .catch(function(error) {
	    alert("Le produit n'existe pas.");
	  	window.location.href="index.html";
	});
};

// fonction qui ajoute le produit dans le panier
function ajoutProduit() {
	let quantite = parseInt(document.getElementById("quantity").value);
	let color = document.getElementById("colors").value;

	if (color != "" && quantite!=0 && quantite<100) {
		// ajout du choix quantité et de l'option couleur au clic
		let panier = JSON.parse(localStorage.getItem("panier"));
		if (panier==null) { //si le panier n'existe pas, on le crée
			panier = {}; 
		}

		if (panier.hasOwnProperty(id)) { //si le panier contient déjà un élément de cet Id
			if (panier[id].hasOwnProperty(color)) { //si le dictionnaire de l'id contient déjà cette couleur
				panier[id][color] += quantite;
			}
			else {
				panier[id][color] = quantite;
			}
		}
		else {
			panier[id]={};
			panier[id][color]=quantite;
		}
		localStorage.setItem("panier", JSON.stringify(panier));
		alert("Produit(s) envoyé(s) au panier")
	}
	else {
		alert("Pour valider cet article, vous devez choisir une couleur et une quantité entre 1 et 100");
	}
};

/*Code principal*/

chargementProduit();
document.getElementById("addToCart").onclick = function(){ajoutProduit()};