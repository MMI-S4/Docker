const express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://mongodb/mmis4db', { useNewUrlParser: true });

var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
    userName: String,
    playerName: String
});
var Player = mongoose.model('Player', PlayerSchema);


let compteur = 0;

const app = express();

app.get('/', (req,res) => {
    compteur++;
    res.send("Bienvenue sur notre serveur pour client Unity");
});

app.get('/users/', (req,res) => {
    // vraies données au format JSON
    Player.find({}, function(err, players) {
        if (err){
            console.log(err)
            res.status(500)
            res.type('text/plain')
            res.send("pb dans l'execution de la requete mongodb\n" + err.stack);
         }
        else{
            res.json(players);
        }        
    });
});

// On prépare une route qui récupèrera/utilisera une variable id
app.get('/user/:id', (req,res) => {

    // vraies données au format JSON
    Player.findById(req.params.id, function(err, player) {
        if (err){
            console.log(err)
            res.status(500)
            res.type('text/plain')
            res.send("pb dans l'execution de la requete mongodb\n" + err.stack);
        }
        else{
            res.json(player);
        }        
    });
})

app.listen(3000, 
        () => { console.log("Serveur lancé avec nodemon sur le port 3000!");
});