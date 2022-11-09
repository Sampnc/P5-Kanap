/*Variables globales*/

//variable pour récupérer les éléments du panier
let panier = JSON.parse(localStorage.getItem("panier"));
console.log(panier);
//variables pour le total produit et le total prix
let totalProduit = 0;
let totalPrix = 0;

/*Fonctions*/

function modificationProduit(i, c, nb, prix, blocPrix) {
	totalProduit += (nb-panier[i][c]);
	document.getElementById("totalQuantity").textContent = totalProduit;
	totalPrix += (nb-panier[i][c])*prix;
	document.getElementById("totalPrice").textContent = totalPrix;
	panier[i][c] = nb;
	localStorage.setItem("panier", JSON.stringify(panier));
	blocPrix.textContent = nb*prix + " €";
}

function suppressionProduit(i, c) {
	delete panier[i][c];
	if (Object.keys(panier[i]).length == 0) {
		delete panier[i];
	}  //est vide*/
	if (Object.keys(panier).length == 0) {
		localStorage.removeItem('panier');
	}
	else {
		localStorage.setItem("panier", JSON.stringify(panier));
	}
	window.location.reload();
}

function affichageProduitPanier() {
	fetch("http://localhost:3000/api/products/")
	  // pour la réponse retournée donne le résultat en json
	  .then(reponse => reponse.json())
	  .then(listeProduits => {

	  	let produit = listeProduits[0];
	  	let ids = Object.keys(panier);

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

			  	// insertion bloc article du canapé
				let blocArticle = document.createElement("article");
				blocArticle.className = "cart__item";
				blocArticle.setAttribute("data-id", id);
				blocArticle.setAttribute("data-color", color);

				// insertion div du bloc image
				let div1 = document.createElement("div");
				div1.className = "cart__item__img";

				// insertion bloc image du canapé
				let blocImage = document.createElement("img");
				blocImage.src = produit.imageUrl; 
				blocImage.alt = produit.altTxt;

				div1.appendChild(blocImage);

				let div2 = document.createElement("div");
				div2.className = "cart__item__content";


				let div2_1 = document.createElement("div");
				div2_1.className = "cart__item__content__description";

				// insertion du nom du canapé
				let titre = document.createElement("h2");
				titre.textContent = produit.name;

				// insertion de la couleur du canapé
				let couleur = document.createElement("p");
				couleur.textContent = color;

				// insertion du prix du canapé
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

				// insertion des valeurs de quantité
				let input = document.createElement("input");
				input.type = "number";
				input.className = "itemQuantity";
				input.name = "itemQuantity";
				input.min = "1";
				input.max = "100";
				input.setAttribute("value", quantite);

				// modification de la quantité du produit par rapport au modèle et à la couleur
				input.addEventListener("change", function() {modificationProduit(id, color, input.value, produit.price, prix)});

				let div2_2_2 = document.createElement("div");
				div2_2_2.className = "cart__item__content__settings__delete";
				let supprimerObjet = document.createElement("p");
				supprimerObjet.className = "deleteItem";
				supprimerObjet.textContent = "Supprimer";

				// fonction pour supprimer un élément du panier
				supprimerObjet.onclick = function () {
					suppressionProduit(id, color);
				}

				div2_2_2.appendChild(supprimerObjet);

				div2_2_1.appendChild(q);
				div2_2_1.appendChild(input);

				div2_2.appendChild(div2_2_1);
				div2_2.appendChild(div2_2_2);

				div2.appendChild(div2_1);
				div2.appendChild(div2_2);

				blocArticle.appendChild(div1);
				blocArticle.appendChild(div2);
				document.getElementById("cart__items").appendChild(blocArticle);

				totalPrix += parseInt(prix.textContent);
				totalProduit += parseInt(input.value); 
			}

			// insertion du total des canapés
			document.getElementById("totalQuantity").textContent = totalProduit;
			// insertion du prix total du canapé
			document.getElementById("totalPrice").textContent = totalPrix;
		}	
  	})
  .catch(function(error) {
    alert("Votre panier est vide");
    window.location.href = "index.html";
  });
}

envoiServeur = async (contact, products) => {
  // Envoyer le formulaire de contact ainsi que le tableau "products" au back avec la méthode POST
    let reponse = await fetch("http://localhost:3000/api/products/order", {
	    method: "POST",
	    body: JSON.stringify( {contact:contact, products:products}),
	      headers: {"Content-Type": "application/json",
	      },
      });
      // validation du panier et du formulaire et redirigé vers la page confirmation avec le numéro de commande
      let result = await reponse.json();
      let orderId = result["orderId"];
      window.location.href = "confirmation.html?orderId="+orderId;
      sessionStorage.clear();
      localStorage.clear() ;
};


/*Code principal*/

/*---------Formulaire----------------
---------------------------------------------------------------------*/

// expression régulière pour validation du formulaire
let regexName = /^(?=.{1,50}$)[a-z\u00C0-\u00FF]+(?:['-_.\s][a-z\u00C0-\u00FF]+)*$/i;
let regexLocation = /^[a-zA-Z0-9\u00C0-\u00FF\s,. '-]{3,}$/;
let regexMail = /^[a-z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]{1,60}$/i;

document.querySelector(".cart__order__form__submit").addEventListener("click", (e) => {
	// Prépare l'obj contact pour la requête POST
    let contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
    }
    let products = Object.keys(panier);

    // on valide que le formulaire soit correctement rempli
    if (
	    (regexName.test(contact.firstName) == true) &&
	    (regexName.test(contact.lastName) == true) &&
	    (regexLocation.test(contact.address) == true) &&
	    (regexLocation.test(contact.city) == true) &&
	    (regexMail.test(contact.email) == true)) {
	    localStorage.setItem("contact", JSON.stringify(contact));

  		// Si le formulaire est correctement rempli, envoi de contact et products
	    envoiServeur(contact, products);
	    alert("Commande effectuée avec succès !");
	}
	// Avertir l'utilisateur qu'il n'a pas (ou mal) rempli les champs d'informations
 	else {
 		if (regexName.test(contact.firstName) == false) {
 				document.getElementById("firstNameErrorMsg").textContent = "Prénom invalide";
 			}
 		if (regexName.test(contact.lastName) == false) {
 				document.getElementById("lastNameErrorMsg").textContent = "Nom invalide";
 			}
 		if (regexLocation.test(contact.address) == false) {
 				document.getElementById("addressErrorMsg").textContent = "Adresse invalide";
 			}
 		if (regexLocation.test(contact.city) == false) {
 				document.getElementById("cityErrorMsg").textContent = "Nom de ville invalide";
 			}
 		if (regexName.test(contact.email) == false) {
 				document.getElementById("emailErrorMsg").textContent = "Adresse mail invalide";
 			}
    }

});
affichageProduitPanier();


