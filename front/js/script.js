/*---------Récupération de l'id du produit via l' URL----------------
---------------------------------------------------------------------*/
const dataApi = fetch("http://localhost:3000/api/products/")
  // Pour la réponse retournée donne le résultat en json
  .then(reponse => reponse.json())
  .then(listeProduits => {

    // Boucle pour afficher chaque élément/produit de l'API
    for (let k = 0; k < listeProduits.length; k++) {
      let produit = listeProduits[k];

      let a = document.createElement("a");
      a.href = "product.html?id="+produit._id;

      let article = document.createElement("article"); //création du bloc article

      let image = document.createElement("img");
      image.src = produit.imageUrl;
      image.alt = produit.altTxt;

      let titre = document.createElement("h3");
      titre.className = "produitName";
      titre.textContent = produit.name;

      let description = document.createElement("p");
      description.className = "produitDescription";
      description.textContent = produit.description;

      article.appendChild(image);
      article.appendChild(titre);
      article.appendChild(description);
      a.appendChild(article);
      document.getElementById("items").appendChild(a);
    }

  })
  .catch(function(err) {
    alert(error)
    // Une erreur est survenue
  });