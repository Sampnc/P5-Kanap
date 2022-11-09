// Crée une nouvelle fiche produit pour chaque produit présent dans l'API
function affichageProduits(listeProduits) {
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

      //insertion des titres
      let titre = document.createElement("h3");
      titre.className = "produitName";
      titre.textContent = produit.name;
      article.appendChild(titre);

      //insertion des descriptions
      let description = document.createElement("p");
      description.className = "produitDescription";
      description.textContent = produit.description;
      article.appendChild(description);

      //insertion des liens dans la section items
      document.getElementById("items").appendChild(a);
    }
}

//Récupération des produits de l'api

fetch("http://localhost:3000/api/products")
    .then(reponse => reponse.json())
    .then(listeProduits => {
        affichageProduits(listeProduits);
  })
    .catch(function(err) {
    alert(erreur)
    // Une erreur est survenue
});



