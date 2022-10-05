/*---------Récupération de l'id du produit via l' URL----------------
---------------------------------------------------------------------*/
//la variable url récupère l'url de la page
const url = new URL (window.location.href);
console.log(url);
// la variable id va récupérer la valeur du paramètre id
const id = url.searchParams.get("id");
console.log(id);

const dataApi = fetch("http://localhost:3000/api/products")
  .then(reponse => reponse.json())
  .then(listeProduits => {

  	let produit = listeProduits[0];

  	for (let k = 0; k < listeProduits.length; k ++) {
  		//console.log(listeProduits[k]._id, id)
  		if (listeProduits[k]._id == id) {
  			produit = listeProduits[k];
  		}
  	}
  	
  	document.title = produit.name;	

  	let a = document.createElement("a");
	a.href = "./product.html?id=" + produit._id;

	let article = document.createElement("article");      

	let image = document.createElement("img");
	image.src = produit.imageUrl; 
	image.alt = produit.altTxt;
	document.querySelector(".item__img").appendChild(image);

	document.getElementById("title").textContent = produit.name;

	document.getElementById("price").textContent = produit.price;
	  
	document.getElementById("description").textContent = produit.description;

	const couleurs = produit.colors;
	  for (let c = 0; c < couleurs.length; c ++) {
	  	let couleur = couleurs[c];
	  	let option = document.createElement("option");
	  	option.value = couleur;
	  	option.textContent = couleur;
	  	document.getElementById("colors").appendChild(option);
	  }

  })
  .catch(function(error) {
    alert(error)
  });

//choix des quantités et couleurs dynamiques au click de la commande
document.getElementById("addToCart").onclick = function(){

	let color = document.getElementById("colors").value;
	console.log(color);

	let quantite = parseInt(document.getElementById("quantity").value);
	console.log(quantite);

	if (color != "" && quantite!=0) {
		/*---------Local Storage----------------
		---------------------------------------------------------------------*/
		let panier = JSON.parse(localStorage.getItem("panier"));
		if (panier==null) { //si le panier n'existe pas, on le crée
			panier = {};
		}

		if (panier.hasOwnProperty(id)) { //si le panier contient déjà un élément de cet Id
			if (panier[id].hasOwnProperty(color)) { //si le dictionnaire de l'id contient déjà cette couleur
				panier[id][color] += quantite;
			console.log(panier);
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
		alert("Article(s) ajouté(s) au panier");
		console.log(panier);
	}
	else {
		alert("Pour valider cet article, vous devez choisir une couleur et une quantité entre 1 et 100");
	}
}