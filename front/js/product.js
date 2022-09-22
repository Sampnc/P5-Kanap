//------------------------------------------------------------------------
// Commentaire
//------------------------------------------------------------------------
const url = new URL (window.location.href);
console.log(url);
const id = url.searchParams.get("id");
console.log(id);

const dataApi = fetch("http://localhost:3000/api/products")
  // pour la réponse retournée donne le résultat en json
  .then(reponse => reponse.json())
  .then(listProducts => {

  	let product = listProducts[0];

  	for (let k = 0; k < listProducts.length; k ++) {
  		//console.log(listProducts[k]._id, id)
  		if (listProducts[k]._id == id) {
  			product = listProducts[k];
  		}
  	}

  	(document.title);
  	document.title = product.name;

	  let a = document.createElement("a");
	  a.href = "./product.html?id=" + product._id;
	  console.log(a);

	  let article = document.createElement("article");      

	  let image = document.createElement("img");
	  image.src = product.imageUrl; 
	  image.alt = product.altTxt;
	  document.querySelector(".item__img").appendChild(image);

	  document.getElementById("title").textContent = product.name;

	  document.getElementById("price").textContent = product.price;
	  
	  document.getElementById("description").textContent = product.description;

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
    alert(error)
  });

 
document.getElementById("addToCart").onclick = function(){

let quantite = parseInt(document.getElementById("quantity").value);
console.log(quantite);


let color = document.getElementById("colors").value;
console.log(color);

  //------- LE LOCAL STORAGE --------

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
console.log(panier);

}