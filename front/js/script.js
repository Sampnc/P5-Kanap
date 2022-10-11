//---------Récupération des produits de l'API----------------

const dataApi = fetch("http://localhost:3000/api/products/")
  // Pour la réponse retournée donne le résultat en json
  .then(reponse => reponse.json())
  .then(listeProduits => {

    //fonction feuilleProduit (listeProduits)
    // Affichage des produits
    for (let k = 0; k < listeProduits.length; k++) {
      let produit = listeProduits[k];

      // insertion du lien de chaque canapés
      let a = document.createElement("a");
      a.href = "product.html?id="+produit._id;

      // insertion des articles
      let article = document.createElement("article");
      a.appendChild(article);

      // insertion des images
      let image = document.createElement("img");
      image.src = produit.imageUrl;
      image.alt = produit.altTxt;
      article.appendChild(image);

      let titre = document.createElement("h3");
      titre.className = "produitName";
      titre.textContent = produit.name;
      article.appendChild(titre);

      let description = document.createElement("p");
      description.className = "produitDescription";
      description.textContent = produit.description;
      article.appendChild(description);

      document.getElementById("items").appendChild(a);
    }

  })
  .catch(function(err) {
    alert(error)
    // Une erreur est survenue
  });