DROP DATABASE IF EXISTS pokemonPartyMaker;
CREATE DATABASE pokemonPartyMaker;
USE pokemonPartyMaker;
CREATE TABLE pokemonParty (
    id INT AUTO_INCREMENT NOT NULL,
    pokeName varchar(300) NOT NULL,
    pokeImage varchar(300) NOT NULL,
    type1 varchar(300) NOT NULL,
    type2 varchar(300) NOT NULL,
    PRIMARY KEY (id)
);