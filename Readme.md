# Initiation à Docker

## Création serveur MongoDB à l'aide d'un conteneur 

Le sous dossier [mongodb](mongodb) explique comment 
faire tourner localement un serveur MongoDB en utilisant un conteneur Docker.

## Création d'une image Docker pour la partie Node.js

Le sous dossier [nodejs](nodejs) explique comment 
construire une image Docker pour la partie Node.js du projet et 
comment faire tourner localement ce serveur en utilisant un conteneur Docker.

## Mise en relation du serveur nodejs avec le serveur MongoDb

Par défaut chaque container s'exécute de façon isolée. 
Le serveur nodejs ne peut donc pas se connecter à la base mongodb 
en utilisant l'adresse *localhost* (par ex. `mongodb://localhost/mmis4db`), 
puisque tout fonctionne comme si le serveur *mongodb* et le serveur *nodejs* 
étaient sur deux machines différentes. En particulier les deux containers ont
des adresses IP différentes.

Pour que le conteneur *nodejs* puisse accéder au conteneur *mongodb*, 
il faut donc que les deux conteneurs soient placés dans le même sous-réseau 
(pas dans deux sous-réseaux isolés l'un  de l'autre) et que le conteneur *nodejs* 
connaisse l'adresse IP utilisée par le conteneur *mongodb*.

À cet effet, lors de la création et du démarrage d'un conteneur, 
on peut utiliser l'option `--link <nom conteneur>` pour lier un conteneur à un autre 
et permettre d'y accéder en utilisant le nom de celui-ci.

Dans le cas de nos deux conteneurs, cela signifie 
qu'il faut démarrer d'abord le conteneur *mongodb*, 
puis démarrer le serveur *nodejs* en le liant au serveur *mongodb*
au moyen de l'option `--link` :

```bash
# demarrage normal du serveur mongo (cf Readme du dossier mongodb)
docker run -d --name mongodb  -v 'C:\Users\Stephane\mongodb\':'/data/db' -p 27017:27017 mongo:5.0.6

# demarrage du serveur nodejs en utilisant l'option --link <nom conteneur>
docker run -d --name monserveur --link mongodb -p 3000:3000  stalb/mmis4serveur:v1
```

Le serveur *nodejs* peut alors contacter le conteneur *mongodb* 
en utilisant le nom de celui-ci (c'est à dire « **mongodb** »). 

Dans le serveur *nodejs*, on utilisera donc la commande 
`mongoose.connect('mongodb://mongodb/mmis4db')`, 
pour se connecter sur le serveur *mongodb*,
et pas `mongoose.connect('mongodb://localhost/mmis4db')`  
comme cela serait le cas pour un serveur local.

## Utilisation de `docker compose`

Quand on a plusieurs conteneurs qui doivent interagir 
les uns avec les autres, et donc être démarrés 
(arrêtés et souvent mis à jours) simultanément, 
utiliser la commande `docker run` pour les démarrer n'est pas très pratique.

Dans ce genre de cas, il est souvent plus pratique d'utiliser `docker compose`.
Cette commande utilise un fichier `compose.yml` ou 
[`docker-compose.yml`](docker-compose.yml) pour décrire les conteneurs 
à créer simultanément (images à utiliser, ports à mapper, volumes à monter, etc.).

La commande `docker compose` permet alors 
de les démarrer simultanément (commande [`docker compose up -d`](https://docs.docker.com/compose/reference/up/)), 
de les arrêter simultanément (commande [`docker compose down`]()https://docs.docker.com/compose/reference/down/), 
voire, si certaines des images doivent être construites localement, 
de construire celles-ci (commande [`docker compose build`](https://docs.docker.com/compose/reference/build/)).

Dans notre cas, le fichier [docker-compose.yml](docker-compose.yml),
décrit deux `services` (chaque service sera fournit par un conteneur) 
à démarrer simultanément : un service *mongodb* et un service *nodejs*.

Si les services sont associés au même sous-réseau, 
il est également possible à un service d'accéder aux autres 
en utilisant le nom déclaré pour chacun des services. 

En utilisant le fichier [docker-compose.yml](docker-compose.yml) fourni,
il est donc possible de démarrer les deux conteneurs (*mongodb* et *nodejs*)
avec :

```bash
docker compose up -d
```

De la même façon, si vous modifiez les sources du serveur *nodejs*, 
il suffira d'utiliser 
[`docker compose build`](https://docs.docker.com/compose/reference/build/) 
pour construire la nouvelle image 
et d'utiliser la commande 
[`docker compose up -d`](https://docs.docker.com/compose/reference/up/) 
pour recréer les conteneurs 
dont l'image (ou la configuration) aurait été modifiée : 

```bash
# reconstruction des images localement (dans notre cas le serveur nodejs) 
docker compose build

# redemarrage des conteneurs dont l'image a changé
docker compose up -d
```

## Liens

- transparents sur Dockers : [Docker.pdf](Docker.pdf)
- documentation Docker : https://docs.docker.com/
- manuel de référence pour les fichiers *Dockerfile* : 
  https://docs.docker.com/engine/reference/builder/
- manuel de référence des commandes `docker` : 
  https://docs.docker.com/engine/reference/commandline/docker/
- manuel de référence pour les fichiers *docker-compose* : 
  https://docs.docker.com/compose/compose-file/compose-file-v3/
- manuel de référence des commandes `docker compose` : 
  https://docs.docker.com/compose/reference/