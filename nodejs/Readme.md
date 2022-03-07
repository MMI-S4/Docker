# Construction image docker du serveur nodejs

## Construction de l'image docker pour la partie serveur Node.js

Pour construire l'image docker du serveur Node.js, 
on a ajouté un fichier [Dockerfile](Dockerfile)
qui décrit les étapes de la construction de l'image 
(chaque ligne du fichier Dockerfile correspond à une étape) :
- on part d'une image nodejs existante : https://hub.docker.com/_/node
- on définit un répertoire de travail : */src*
- puis on copy les fichiers *package.json* et *package-lock.json* dans ce dossier
- on peut alors exécuter la commande `npm clean-install` 
  pour installer les dépendances du projet node
- on copie enfin le reste des sources du serveur Node.js
- et on indique la commande de démarrage du serveur : `npm start`

La construction de l'image peut alors se faire 
en utilisant la commande `docker build` dans le dossier nodejs  : 

```bash
docker build --tag stalb/mmis4serveur:v0 .
```

## Création et lancement du conteneur à partir de l'image créée

Une fois l'imagé créée il est possible de l'utiliser 
pour lancer le serveur Node.js correspondant 
dans un conteneur docker, en utilisant la commande `docker run`. 

```bash
docker run -d -p 3000:3000 --name monserveur stalb/mmis4serveur:v0 
```

Cela créée un nouveau conteneur à partir de l'image `stalb/mmis4serveur:v0`. 
Le nom de ce conteneur est *monserveur* (utilisation de l'option `--name`). 
Il est alors lancé en arrière plan (utilisation de l'option `-d`) en 
*mappant* le port *3000* de la machine locale avec le port *3000* du conteneur 
(utilisation de l'option `-p 3000:3000`).

On peut alors accéder au server Node.js sur http://localhost:3000

## Envoi sur **docker hub**

On peut également envoyer l'image construite sur [docker hub](https://hub.docker.com/) 
ou un autre dépôt d'images (*registry*) docker en utilisant la commande `docker push`. 

```bash
docker push stalb/mmis4serveur:v0
```

À noter qu'il est nécessaire de disposer au préalable d'un compte sur le dépôt d'images docker 
(et de s'̂être connecté au dépôt en utilisant la commande `docker login`).

Dans le cas de docker hub (le dépôt d'images utilisé par défaut), 
le nom de l'image, doit correspondre au nom du compte, dans l'exemple *stalb*, 
suivi du nom du dépôt à utiliser, *mmis4serveur* et du tag (la version) de l'image, *v0* : 
*stalb/mmis4serveur:v0*. 

L'image devient alors accessible sur docker hub : 
https://hub.docker.com/r/stalb/mmis4serveur

## Liens

- documentation Docker : https://docs.docker.com/
- manuel de référence pour les fichiers Dockerfile : 
  https://docs.docker.com/engine/reference/builder/
- manuel de référence des commandes `docker` : 
  https://docs.docker.com/engine/reference/commandline/docker/
- manuel de référence de la commandes `docker run` : 
  https://docs.docker.com/engine/reference/commandline/run/
- manuel de référence de la commandes `docker build` : 
  https://docs.docker.com/engine/reference/commandline/build/
- dépôt pour les images officielles Node.js sur docker hub :
  https://hub.docker.com/_/node

