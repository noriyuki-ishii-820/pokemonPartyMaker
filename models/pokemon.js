var orm = require("../config/orm.js");

var pokemon = {
  selectAll: function (cb) {
    orm.selectAll("pokemonParty", function (res) {
      cb(res);
    });
  },

  insertOne: function (cols, vals, cb) {
    orm.insertOne("pokemonParty", cols, vals, function (res) {
      cb(res);
    });
  },
  updateOne: function (objColVals, condition, cb) {
    orm.updateOne("pokemonParty", objColVals, condition, function (res) {
      cb(res);
    });
  },

  deleteOne: function (condition, cb) {
    orm.deleteOne("pokemonParty", condition, function (res) {
      cb(res);
    });
  },
};

module.exports = pokemon;
