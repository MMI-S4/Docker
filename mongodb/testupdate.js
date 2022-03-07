// Code pour modifier un enregistrement dans une DB Mongo

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

// 1. On crée le modèle pour le player par exemple
var PlayerSchema = new Schema({
    userName: String,
    playerName: String
});

var Player = mongoose.model('Player', PlayerSchema);

// Pour rechercher des données dans la base:
// Je récupère via Compass un id et ensuite je change le 
// userName: 

var player_id = '6231a0ca077a5f13aa644989';
Player.findByIdAndUpdate(player_id, { playerName: 'Toto' },
                            function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated playerName : ", docs);
        // sortie de nodejs
        process.exit()

    }
});

