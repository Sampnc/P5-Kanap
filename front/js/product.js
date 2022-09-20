//------------------------------------------------------------------------
// Commentaire
//------------------------------------------------------------------------
const url = new URL (window.location.href);
console.log(url);
let id = url.searchParams.get("id");
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

  	alert(document.title);
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

	  let couleurs = product.colors;
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