let panier = JSON.parse(localStorage.getItem("panier"));

const dataApi = fetch("http://localhost:3000/api/products")
  // pour la réponse retournée donne le résultat en json
  .then(reponse => reponse.json())
  .then(listeProduits => {

  	let produit = listeProduits[0];
  	let ids = Object.keys(panier);

  	let totalPrix = 0;
  	let totalProduit = 0;

  	for (let i = 0; i < ids.length; i ++) {
  		let couleurs = Object.keys(panier[ids[i]]);
  		for (let j = 0; j < couleurs.length; j ++){
  			let id = ids[i];
  			let color = couleurs[j];
  			let quantite = panier[id][color];

		  	for (let k = 0; k < listeProduits.length; k ++) {
		  		//console.log(listproduits[k]._id, id)
		  		if (listeProduits[k]._id == id) {
		  			produit = listeProduits[k];
		  		}
		  	}

			let article = document.createElement("article");
			article.className = "cart__item";
			article.setAttribute("data-id", id);
			article.setAttribute("data-color", color);

			let div1 = document.createElement("div");
			div1.className = "cart__item__img";

			let image = document.createElement("img");
			image.src = produit.imageUrl; 
			image.alt = produit.altTxt;

			div1.appendChild(image);

			let div2 = document.createElement("div");
			div2.className = "cart__item__content";


			let div2_1 = document.createElement("div");
			div2_1.className = "cart__item__content__description";

			let titre = document.createElement("h2");
			titre.textContent = produit.name;
			let couleur = document.createElement("p");
			couleur.textContent = color;
			let prix = document.createElement("p");
			prix.textContent = quantite*produit.price + " €";

			div2_1.appendChild(titre);
			div2_1.appendChild(couleur);
			div2_1.appendChild(prix);

			let div2_2 = document.createElement("div");
			div2_2.className = "cart__item__content__settings";

			let div2_2_1 = document.createElement("div");
			div2_2_1.className = "cart__item__content__settings__quantity";
			let q = document.createElement("p");
			q.textContent = "Qté : ";

			let input = document.createElement("input");
			input.type = "number";
			input.className = "itemQuantity";
			input.name = "itemQuantity";
			input.min = "1";
			input.max = "100";
			input.setAttribute("value", quantite);

			input.addEventListener("change", function() {
				totalProduit += (input.value-panier[id][color]);
				document.getElementById("totalQuantity").textContent = totalProduit;
				totalPrix += (input.value-panier[id][color])*produit.price;
				document.getElementById("totalPrice").textContent = totalPrix;
				panier[id][color] = input.value;
				localStorage.setItem("panier", JSON.stringify(panier));
				prix.textContent = input.value*produit.price + " €";
			})

			let div2_2_2 = document.createElement("div");
			div2_2_2.className = "cart__item__content__settings__delete";
			let supprimerItem = document.createElement("p");
			supprimerItem.className = "deleteItem";
			supprimerItem.textContent = "Supprimer";

			supprimerItem.onclick = function(){
				delete panier[id][color];
				localStorage.setItem("panier", JSON.stringify(panier));
				window.location.reload();
			}

			div2_2_2.appendChild(supprimerItem);

			div2_2_1.appendChild(q);
			div2_2_1.appendChild(input);

			div2_2.appendChild(div2_2_1);
			div2_2.appendChild(div2_2_2);

			div2.appendChild(div2_1);
			div2.appendChild(div2_2);

			article.appendChild(div1);
			article.appendChild(div2);
			document.getElementById("cart__items").appendChild(article);
			console.log(article);

			totalPrix += parseInt(prix.textContent);
			totalProduit += parseInt(input.value); 
		}

		document.getElementById("totalQuantity").textContent = totalProduit;
		document.getElementById("totalPrice").textContent = totalPrix;
	}	
  })
  .catch(function(error) {
    alert("error")
  });


/*---------Formulaire----------------
---------------------------------------------------------------------*/
let orderBouton = document.getElementById("order");
let regexName = /^(?=.{1,50}$)[a-z\u00C0-\u00FF]+(?:['-_.\s][a-z\u00C0-\u00FF]+)*$/i;
let regexLocation = /^[a-zA-Z0-9\u00C0-\u00FF\s,. '-]{3,}$/;
let regexEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

orderBouton.addEventListener("click", (e) => {
// Prépare l'obj contact pour la requête POST
    let contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
    };
     // on valide que le formulaire soit correctement rempli
    if (
	      (regexEmail.test(contact.email) == true) &
	      (regexName.test(contact.firstName) == true) &
	      (regexName.test(contact.lastName) == true) &
	      (regexLocation.test(contact.city) == true) &
	      (regexLocation.test(contact.address) == true)
	    ) {
     } else {
      // Avertir l'utilisateur qu'il n'a pas (ou mal) rempli les champs d'informations
      alert("Tous les champs d'informations doivent être correctement remplis");
    }
});
console.log(contact);

  		


// Vérifier que l'utilisateur rentre des informations conformes au formulaire de contact

  	

  	
    

    //fetch("http://localhost:3000/api/products/order");*/
