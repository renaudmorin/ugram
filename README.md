# ugram-h2021-team-06

This repo contains both frontend and backend code of the ugram web application.

## Technologies Utilisées

* Frontend: React
* Backend: NestJS with TypeScript
* Preprocessor CSS: SASS
* Database: MongoDB
* CI/CD: Github actions
* Deployment method: Github actions
* Material-UI react
* Yarn Package Manager
* Fournisseur OAuth: Auth0
* Logging Frontend : Sentry 
* Logging Backend : Sentry et Cloudwatch (Voir annexe 3)


## Instructions pour utiliser l'application

Le front-end sera ensuite disponible à l'adresse suivante : https://ugram.link/  
Le back-end sera ensuite disponible à l'adresse suivante : https://api.ugram.link/    
Lien vers le swagger: https://api.ugram.link/api/


## Instructions frontend Livrable 3

### L'usager doit pouvoir réagir et commenter aux images d'un autre usager.   
Dans le feed/page principale, utilisez l'icône en forme de coeur en dessous de chaque image 
pour réagir à cette image. Même principe pour commenter, allez en dessous de l'image de votre choix
et tapez votre commentaire où il est écrit "add a comment" puis cliquez sur "Post".

### L'usager doit pouvoir consulter les réactions et commentaires sur l'une de ses images. L'usager doit pouvoir recevoir des notifications lorsqu'un usager réagit ou commente sur l'une de ses images.   
Lors que vous recevez une notification et que vous êtes présent sur le site, vous allez recevoir un message 
en bas à droite de la page. Sinon en tout temps vous pouvez aller sur la page des notifications en cliquant 
sur l'icône de notification dans la barre de navigation.   
l'icône ressemble à ceci :    
<img src="https://raw.githubusercontent.com/ant-design/ant-design-icons/5be2afd296636ab4cfec5d3a2793d6cd41b1789b/packages/icons-svg/svg/outlined/bell.svg" width="30" height="30"  alt="Bell"/>

### L’application doit gérer le resizing des images téléchargées et offrir les images en différents formats.  
L'application gère le resizing des images lorsque l'utilisateur va voir ses image dans son profile.
L'image sera resizé avec une largeur de 293px lorsqu'on la voit dans la grille d'image et sera resizé
avec une largeur de 436px lorsqu'on clique sur l'image pour voir ses détailles. L'image est
de la taille d'origine lorsqu'on la voit dans le feed/page principale.

### L'application doit produire des analytiques sur le comportement de ses usagers.   
Voir ANNEXE 2.

### Avancé: L'usager doit pouvoir rechercher par mot clé ou description avec autocomplétion   
Dans la barre de navigation, cliquez sur le bouton rechercher dans les icônes complètement à droite de la barre de navigation.    
Le bouton ressemble à ceci :    
![](https://raw.githubusercontent.com/feathericons/feather/a718a7e9c39447202f703783336e8ba1c8e32405/icons/search.svg)

### Avancé: L'usager doit pouvoir consulter les mots-clés les plus populaires 
Dans le haut du feed/page principale. Il a une boite avec le titre "Most popular hashtags".
Dans cette boite vous pouvez voir les mots-clés les plus populaires. Si vous laissez votre souris
sur un des mots-clés vous pouvez voir le nombre d'occurrence de ce mots-clés. Vous pouvez aussi 
cliquez sur un mots-clés afin d'afficher tous les images qui contiennent ce mots-clés.    

NOTE : Vous pouvez consulter plus de mots-clés avec un geste de "click and drag" de la droite vers la gauche
sur les mots-clés.

### Avancé: L'usager doit pouvoir prendre une photo avec sa webcam    
Allez dans votre profil et cliquez sur le bouton "Post using webcam".      


## Instructions frontend Livrable 2
### L'usager doit pouvoir s'authentifier dans l'application en utilisant un fournisseur OAuth connu. S'il ne possède pas de compte, l'usager doit pouvoir s'enregistrer dans l'application.
Lors de votre première connexion, il vous sera demandé de vous connecter.  
Cliquez sur "Log in / Sign up" et connectez-vous avec les informations nécessaires.  
Si vous n'avez pas de compte vous pouvez vous en créer un avec le bouton "sign up" dans la page de connexion
ou vous connecter avec votre compte Google.  
Comme oauth ne nous permet pas d'obtenir le numéro de téléphone, le profil créé via oauth n'aura pas de numéro de téléphone associé, 
l'utilisateur pourra évidemment en ajouter un par la suite.  

### L'usager doit pouvoir se déconnecter de l'application.
Une fois connecté, vous pouvez vous déconnecter en utilisant le bouton déconnexion dans les icons complètement à droite de 
la barre de navigation.   
Le bouton ressemble à ceci :  
![](https://raw.githubusercontent.com/feathericons/feather/a718a7e9c39447202f703783336e8ba1c8e32405/icons/log-out.svg)

### L'usager doit pouvoir supprimer son compte.
Allez dans votre profil. Cliquez sur "Edit Profile".  
Dans la page d'édition de profil vous avez l'option "delete my profile" qui vous permettra de supprimer votre compte.
Quand un profil est supprimé, tous les photos reliées à ce profil seront supprimées.

### L'usager doit pouvoir rechercher un autre usager.
Dans la barre de navigation du haut vous avez une barre de recherche au milieu qui vous permet de rechercher un autre usager

### L'usager doit pouvoir rechercher pour des images contenant un mot précis dans leur description ou un mot clé (hashtag) précis.
Dans la barre de navigation, cliquez sur le bouton rechercher dans les icons complètement à droite de la barre de navigation.    
Le bouton ressemble à ceci :    
![](https://raw.githubusercontent.com/feathericons/feather/a718a7e9c39447202f703783336e8ba1c8e32405/icons/search.svg)


## Instructions frontend Livrable 1
### L'usager doit pouvoir consulter son profil usager.
Pour aller à son profil l'usager peut utiliser le bouton profil dans la barre de navigation.     
le bouton ressemble à ceci :     
![](https://raw.githubusercontent.com/astrit/css.gg/8a6913598e4e2b10aaf69b9cb7e10e7213828965/icons/svg/profile.svg)

### L'usager doit pouvoir consulter ses images.
Allez dans votre profil et vous retrouverez toutes vos images dans la partie inférieure de la page de votre profil.

### L'usager doit pouvoir éditer son profil usager.
L'utilisateur doit aller dans son profil et par la suite clicker sur le bouton "edit profile". <br />

### L'usager doit pouvoir consulter la liste des usagers.
Cliquez sur la boussole dans la barre de navigation.     
Le bouton ressemble à ceci :     
![](https://raw.githubusercontent.com/atisawd/boxicons/731989b6353c98d3c82f8249b391ff9a3b80a569/svg/regular/bx-compass.svg)

### L'usager doit pouvoir consulter le profil d'un usager ainsi que ses images.
Simplement cliquer sur son nom d'utilisateur lorsque vous 
pouvez observer du contenu qui lui appartient ou dans le menu pour consulter la liste des usagers

### L'usager doit pouvoir téléverser une image avec ses champs
Allez dans votre profil et cliquez sur le bouton "Post a picture".

### L'usager doit pouvoir modifier les champs d'une de ses images
Allez dans votre profil et cliquez sur l'image que vous désirez modifier dans la liste de vos images.

### L'usager doit pouvoir supprimer une de ses images
Allez dans votre profil et cliquez sur l'icône "X" qui apparait lorsque vous mettez votre souris sur la partie
supérieure droite d'une de vos images.

### L'usager doit pouvoir consulter une liste d'images ordonnées par date, tout usager confondu
Lorsque vous ouvrez l'app vous êtes transporté à la page d'accueil de style "feed". Pour y retourner en tout temps 
clickez sur le logo Ugram ou sur le bouton "Home" présent dans la barre de navigation.
Le bouton "Home" ressemble à ceci :     
![](https://raw.githubusercontent.com/atisawd/boxicons/731989b6353c98d3c82f8249b391ff9a3b80a569/svg/regular/bx-home.svg)


## Instructions Backend

Un ficher Postman nommé "Ugram.postman_collection" est présent dans le root du projet 
pour vous faciliter la vie pour tester et comprendre le backend.

Voici un petit resumé des appels:
### Notifications
* POST /notification : Utilisé pour créer une notification
* GET /notification/ :notifId : Utilisé pour aller chercher une notification précise avec son Id
* PATCH /notification/ :notifId : Utilisé pour modifier une notification.
* DELETE /notification/ :notifId : Utilisé pour effacer une notification avec l'id de la notification
* GET /notifications : Utilisé pour aller chercher toutes les notifications
* GET /notifications/ :userId : Utilisé pour aller chercher toutes les notifications d'un utilisateur precis avec son Id
* PATCH /notifications/ :userId : Utilisé pour mettre les notifications d'un utilisateur precis avec son Id comme lu
* DELETE /notifications/ :userId : Utilisé pour effacer tous les notificatins relié à un utilisateur par son Id
* DELETE /picture/notifications/ :pictureId : Utilisé pour effacer tous les notificatins relié à une photo, utile lors le la suppression de photo


### Users
* POST /user : Utilisé pour créer un utilisateur(pas implémenté dans le frontend encore)
* GET /user/ :idDeLaBD : Utilisé pour aller chercher les informations d'un utilisateur precis
* PATCH /user/ :idDeLaBD : Utilisé pour modifier les informations d'un utilisateur
  (Utilisable avec tous ou qu'une partie des champs qu'on desire modifier)
* DELETE /user/ :idDeLaBD : Utilisé pour effacer un utilisateur(pas implémenté dans le frontend)
* GET /users : Utilisé pour aller chercher tous les utilisateurs
* GET /users?search=:username : Utilisé pour aller chercher tous les utilisateurs dont leur
  nom d'utilisateur contient les lettres contenues dans le ":username" 
* GET /users/ :username : Utilisé pour aller chercher un utilisateur ayant le nom d'utilisateur
  spécifié dans le " :username"
  
### Pictures
* POST /picture : Utilisé pour créer une Image
* GET /picture/ :idDeLaBD : Utilisé pour aller chercher les informations d'une image en particulier
* PATCH /picture/ :idDeLaBD : Utilisé pour modifier les informations d'une image en particulier
  (Utilisable avec tous ou qu'une partie des champs qu'on desire modifier)
* DELETE /picture/ :idDeLaBD : Utilisé pour effacer une image
* GET /pictures?desc=:mot&tag=:hashtag : Utilisé pour aller chercher tous les images.  
  "desc" est utilisé pour chercher les images donc la description contient le mot spécifié.  
  "tag" est utilisé pour chercher les images qui contient la hashtag  spécifiée.
* GET /pictures/ :IdDuUserDeLaBD?desc=:mot&tag=:hashtag: Utilisé pour aller cherchez tous les images donc le propriétaire est
  l'utilisateur avec id de BD contenu dans " :IdDuUserDeLaBD".  
  "desc" est utilisé pour chercher les images donc la description contient le mot spécifié.  
  "tag" est utilisé pour chercher les images qui contient la hashtag spécifiée.
* GET /pictures/hashtags/:limit: Utilisé pour obtenir la liste des hastags les plus populaires.
  "limit" est utilisé pour indiquer le nombre de résultat maximal. Laisser vide pour ne pas limiter ce nombre.
* GET /pictures/matchingdescriptions?desc=:mot&limit=:limit: Utilisé pour obtenir la liste des descriptions des images dont
  la description contient le texte contenu dans le paramètre desc.  
  "desc" est utilisé pour chercher les images donc la description contient le mot spécifié.
  "limit" est utilisé pour indiquer le nombre de résultats maximal. Laisser vide pour ne pas limiter ce nombre.
* GET /pictures/matchinghashtags?hashtag=:hashtag&limit=:limit: Utilisé pour obtenir la liste des mots clés dans les images dont
  le mot contient le texte contenu dans le paramètre hashtag.
  "tag" est utilisé pour chercher les images qui contient la hashtag spécifiée.
  "limit" est utilisé pour indiquer le nombre de résultats maximal. Laisser vide pour ne pas limiter ce nombre.
* POST /picture/:id/reaction : Utilisé pour réagir à une image.
* DELETE /picture/:id/reaction : Utilisé pour enlever une réaction à une image.
* POST /picture/:id/comment : Utilisé pour ajouter un commentaire à une image. 


## NOTES
### Warning hors de notre control
Le message suivant s'affiche lorsqu'on accède au component pour téléverser une image dans la page profil de l'utilisateur:
`react_devtools_backend.js:2430 Warning: componentWillReceiveProps has been renamed, and is not recommended for use.
See https://reactjs.org/link/unsafe-component-lifecycles for details.`

Nous utilisons le package [react-images-upload](https://www.npmjs.com/package/react-images-upload) pour permettre à l'utilisateur de téléverser une image,
qui lui, cause cet avertissement. Nous avons essayé de mettre à jour le package et d'aller voir sur leur repo si une 
mise à jour allait régler ceci sans rien trouver. Plusieurs utilisateurs mentionnent avoir ce même warning sans réponse des développeurs [voir ici](https://github.com/JakeHartnell/react-images-upload/issues/199).
Alors nous vous demandons de pardonner cette avertissement qui est hors de notre contrôle.

## ANNEXE 1 : Monitoring et métriques   
Nous avons décidé d'aller avec cloudwatch pour ce qui est monitoring et métriques.        

Voici notre dashboard cloudwatch pour notre backend :   
![](https://ugram-team-6.s3.ca-central-1.amazonaws.com/Images-ReadeMe/backend+dashboards.png)

Voici notre dashboard cloudwatch pour notre frontend :    
![](https://ugram-team-6.s3.ca-central-1.amazonaws.com/Images-ReadeMe/front-end+number+of+500.png)

Pour la base de donné on a décidé d'utiliser le dashboard intégré dans mongo DB Atlas :   
![](https://ugram-team-6.s3.ca-central-1.amazonaws.com/Images-ReadeMe/mongo_mertrics.png)

Nous avons aussi mis en fonction des alarmes dans cloudwatch pour nous notifier en cas de problèmes :    
Liste des alarmes :    
![](https://ugram-team-6.s3.ca-central-1.amazonaws.com/Images-ReadeMe/Alarms.png)
Détails d'une alarme pour montrer qu'un courriel est bien envoyé à un membre de l'équipe :    
![](https://ugram-team-6.s3.ca-central-1.amazonaws.com/Images-ReadeMe/Alarm1.png)
![](https://ugram-team-6.s3.ca-central-1.amazonaws.com/Images-ReadeMe/Alarm2.png)

## ANNEXE 2 : Analytiques
Nous avons utilisé Google Analytics pour cette partie du projet. Voici l'image de notre dashboard:
![](https://ugram-team-6.s3.ca-central-1.amazonaws.com/Images-ReadeMe/google+analytics-+dashboard.png)

## ANNEXE 3 : Logging backend
Lorsqu'on download les logs cloudwatch de notre Elastic Beanstalk et qu'on va dans le fichier Web.stdout.log:
![](https://ugram-team-6.s3.ca-central-1.amazonaws.com/Images-ReadeMe/Logging.png)

Nos issues Dans Sentry :
![](https://ugram-team-6.s3.ca-central-1.amazonaws.com/Images-ReadeMe/sentry-issues.png)
Détailles d'une issue:
![](https://ugram-team-6.s3.ca-central-1.amazonaws.com/Images-ReadeMe/sentry-issue-detail.png)


