const express = require('express');

let compteur = 0;

const app = express();

app.get('/', (req,res) => {
    compteur++;
    res.send("Bienvenue sur notre serveur pour client Unity");
});

app.get('/users/', (req,res) => {

    // Données au format JSON
    var fakeData = {
        "username" : "titi",
        "victoires" : 42,
        "echecs" : 10000,
        "tableauTruc": [
            { name: "vie", value: 2.5 },
            { name: "experience", value: 7.1 },
            { name: "mana", value: 9000.001 }
        ]
    };
    
    // Exemple de retour montrant que les balises web et qu'une page complète
    // pourrait être générée:
    //res.send("<B>Liste des informations des utilisateurs connectés:</B><BR/>");
    
    // Renvoi direct des informations au format JSON
    // Intéressant lorsqu'on va les utiliser dans une autre application comme
    // Unity...
    res.json(fakeData);
});

// On prépare une route qui récupèrera/utilisera une variable id
app.get('/user/:id', (req,res) => {

    // Fausses données ("en dur") au format JSON
    var fakeData = {
        "userid" : req.params["id"],
        "victoires" : 42,
        "echecs" : 10000,
        "tableauTruc": [
            { name: "vie", value: 2.5 },
            { name: "experience", value: 7.1 },
            { name: "mana", value: 9000.001 }
        ]
    };

    res.json(fakeData);
})

app.listen(3000, 
        () => { console.log("Serveur lancé avec nodemon sur le port 3000!");
});