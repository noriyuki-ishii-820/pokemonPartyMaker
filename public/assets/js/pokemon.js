//const { post } = require("../../../controllers/pokemon_controller");

$(function () {

  $(".delete").on("click", function (event) {
    event.preventDefault();
    var id = $(this).attr("data-id");
    
    if(confirm("Are you sure to delete this Pokemon from your team?")){
      $.ajax("/api/pokemon/" + id, {
        type: "DELETE",
      }).then(function () {
        console.log("Deleted!");
        location.reload();
      });
    } else {
      return;
    }
  });

  $(".create-form").on("submit", function (event) {
    event.preventDefault();

    var userInput = $("#pokemonText").val().trim();
    
    var pokeURL = "https://pokeapi.co/api/v2/pokemon/" + userInput.toLowerCase();

    console.log(pokeURL)
    if (userInput == "") {
      alert("Invalid input. Please try again!");
      location.reload();
    }

    $.ajax({
      url: pokeURL,
      method: "GET",
    }).then(function (response) {
      var pokeName = response.name.charAt(0).toUpperCase() + response.name.slice(1);
      var pokeImage = response.sprites.front_default
      console.log(pokeName)
      console.log(pokeImage)

      var newPokemon = {
          pokeName: pokeName,
          pokeImage: pokeImage,
      }

       $.ajax("/api/pokemon", {
         type: "POST",
         data: newPokemon
       }).then(function(){
          console.log("success")
          location.reload();
       })
    })
  })
});
