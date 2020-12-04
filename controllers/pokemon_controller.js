var express = require("express");
var router = express.Router();
var pokemon = require("../models/pokemon.js");

// get all data in the db

router.get("/", function (req, res) {
  pokemon.selectAll(function (data) {
    var hbsObject = {
      pokemonParty:data,
    };
    res.render("index", hbsObject);
  });
});

// post new ones from user inputs

router.post("/api/pokemon", function (req, res) {
  pokemon.insertOne(
    ["pokeName", "pokeImage"],
    [req.body.pokeName,  req.body.pokeImage],
    function (result) {
      res.json({ id: result.insertId });
    }
  );
});

router.put("/api/pokemon/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  pokemon.updateOne(
    {
      devoured: true,
    },
    condition,
    function (result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

router.delete("/api/pokemon/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  pokemon.deleteOne(condition, function (result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
