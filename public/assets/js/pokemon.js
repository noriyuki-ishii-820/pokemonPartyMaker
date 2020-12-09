//const { response } = require("express");

//const { response } = require("express");

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

    if($("ul li").length > 5) {
      alert("You cannot not add more Pokemon's. Please delete before ading more");
      return;
    }

    var userInput = $("#pokemonText").val().trim();

    if (userInput == "") {
      alert("Invalid input. Please try again!");
      location.reload();
    } else if (userInput == "mimikyu"){
      var userInput = "mimikyu-disguised";

    }

    console.log(userInput)

    
    var pokeURL = "https://pokeapi.co/api/v2/pokemon/" + userInput.toLowerCase();

    console.log(pokeURL)

    $.ajax({
      url: pokeURL,
      method: "GET",
    }).then(function (response) {
      var pokeName = response.name.charAt(0).toUpperCase() + response.name.slice(1);
      var pokeImage = response.sprites.front_default
      var type1 = response.types[0].type.name;

      if (response.types.length === 2) {
        var type2 = response.types[1].type.name;
      } else {
        var type2 = null;
      }

      if (document.getElementById("shiny").checked){
          var pokeImage = response.sprites.front_shiny
      }

      if (pokeName == "Mimikyu-disguised"){
        var pokeName = "Mimikyu";
      }

      var newPokemon = {
          pokeName: pokeName,
          pokeImage: pokeImage,
          type1: type1,
          type2: type2,
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


$(document).ready(function(){
  $("#pokemonText").keyup(function(){
      $("#result").html("");
      var searchField = $("#pokemonText").val();
      if (searchField.length > 4){
      $.getJSON("https://pokeapi.co/api/v2/pokemon/?limit=1200", function(data){
           for(i=0; i < data.results.length; i++){
             if(data.results[i].name.indexOf(searchField) != -1){
             console.log (data.results[i].name)
             $("#result").append('<li class="list-group-item link-class">' + data.results[i].name + '</li>');
           }
        }
      })
  }})

  $("#result").on("click",'li', function(){
    var click_pokemon = $(this).text();
    $("#pokemonText").val($.trim(click_pokemon));
    $("#result").html("")
  })

})
