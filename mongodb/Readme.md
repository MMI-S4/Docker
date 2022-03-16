# Création d'un serveur MongoDB à l'aide d'un conteneur 

Des images docker créées par les auteurs du projet *MongoDB* 
sont déjà mises à disposition sur docker hub : https://hub.docker.com/_/mongo

## Création d'un serveur MongoDB à partir des images officielles mises à disposition sur docker hub

Il est possible d'utiliser les images mises à disposition 
sur docker hub pour lancer un serveur MongoDB dans un conteneur docker 
en utilisant la commande `docker run`. 

```bash
docker run -d --name mongodb  -v 'C:\Users\Stephane\mongodb\':'/data/db' -p 27017:27017 mongo:5.0.6 
```

Cela crée un nouveau conteneur à partir de l'image `mongo:5.0.6`. 
Le nom de ce conteneur est *mongodb* (utilisation de l'option `--name`). 
Il est lancé en arrière plan (utilisation de l'option `-d`).

Afin de pouvoir accéder localement au serveur mongodb, 
on a aussi *mappé* le port *27017* de la machine locale avec 
le port *27017* du conteneur (utilisation de l'option `-p 27017:27017`).

Enfin pour ne pas repartir avec un base vide 
à chaque fois que l'on recréera le conteneur MongoDB, 
on monte aussi un répertoire de la machine locale (**C:\\Users\\Stephane\\mongodb\\**) 
sur le dossier du conteneur (**/data/db**) qui contient la base de données.

Une fois le conteneur MongoDB créé et lancé, la base est alors accessible, 
par exemple en utilisant [mongodb-compass](https://www.mongodb.com/products/compass), 
via l'url *mongodb://localhost/mmis4db*.

Le script [dbcreate.js](dbcreate.js), qui vous a été donné par Thibault Carron, 
peut ainsi être utilisée pour initialiser la base...

```bash
npm install # installation mongoose
node dbcreate.js
```

Le script [testupdate.js](testupdate.js), donné également par Thibault Carron, 
vous montre lui comment rechercher et modifier des éléments de la base MongoDB...

```bash
node testupdate.js # replacer dans testupdate.js le player_id par celui de l'ojbet créé précédemment
```

## Liens

- documentation Docker : https://docs.docker.com/
- manuel de référence des commandes `docker` : 
  https://docs.docker.com/engine/reference/commandline/docker/
- manuel de référence de la commandes `docker run` : 
  https://docs.docker.com/engine/reference/commandline/run/
- dépôt pour les images officielles MongoDB sur docker hub :
  https://hub.docker.com/_/mongo 