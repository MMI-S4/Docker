// Code pour créer une DB Mongo

// NB: Il faut installer auparavant MongoDB Community Server
// and MongoDB Compass pour gérer/contrôler sa base plus facilement
// Le serveur doit tourner pour ce qui suit... 

// On importe le module Mongo qui s'appelle mongoose.
// NB: on l'installe auparavant via npm install mongoose
var mongoose = require('mongoose');

//mongoose.set('useUnifiedTopology', true);

// On se connecte sur une base de données que l'on 
// va appeler mmiS4db et on ajoute un paramètre pour la compatibilité 
// avec d'éventuels anciens systèmes de parsing.
mongoose.connect('mongodb://localhost/mmis4db', { useNewUrlParser: true });

// On déclare la structure (schema) de la base de données qui
// sera créée la première fois que l'on lance le serveur
var Schema = mongoose.Schema;

// 1. On crée un nouveau modèle pour le player par exemple
var PlayerSchema = new Schema({
    userName: String,
    playerName: String
});

var Player = mongoose.model('Player', PlayerSchema);

//  2. On va ajouter des informations en dur...
// On entre donc un premier player.
Player.create(
    {
       userName: "Thibault",
       playerName: "Titi" 
    },   // callback pour forcer l'affichage du contenu...
    (error, player) => { 
        console.log("erreur obtenue: ")+error;
        console.log(player);
        // sortie de nodejs
        process.exit()
    }
);

// NB: Si on refait 1. et 2. avec un nouveau modèle
// Cela revient à créer une nouvelle table (model) et entrer
// de nouveaux enregistrements.

