const newSujet = document.getElementById("newSujet");
const createSujet = document.getElementById("createSujet");
const iconsDropBtn = document.getElementById("icons-dropBtn");
const iconMenuDrop = document.getElementById("iconMenu-Drop");
const flexForum = document.getElementById("forum-body");
const sendBtnCommentaire = document.getElementById("sendBtnCommentaire");

/*
  Liste d'icônes que j'utilise pour créer un sujet (Plus design)
  @author Anthony (fontawesome)
*/
let icons = [
    {icons_id: "fa-file", icons_name: "Fichier"},
    {icons_id : "fa-house", icons_name : "Maison"},
    {icons_id : "fa-music", icons_name : "Musique"},
    {icons_id : "fa-comments", icons_name : "Commentaires"},
]

/*
    Fonction qui permet de sélectionner une icône différentes sur la liste des icônes disponibles,
    elle affiche l'icône sélectionnée sur le DropDown;
    @author Anthony
    @param Key : La clé de l'icône correspondante.
*/
function selectIcon(select){
    let icon = icons[select]
    let txt = "";
    txt += "<i class='fa-solid "+icon.icons_id+"' id='iconDisplay' data-icon='"+select+"'></i>"
    iconsDropBtn.innerHTML = txt;
}

/*
    Fonction permettant d'afficher la liste des icônes disponibles dans le dropdown correspondant
    @author Anthony
*/
function rebuildIconDrop(){
    selectIcon(0);

    let icon = "";
    for (let index = 0; index < icons.length; index++) {
        icon += "<li><a class='fs-5 dropdown-item' onclick='selectIcon("+index+")'><i class='fa-solid "+icons[index].icons_id+" me-2'></i>"+icons[index].icons_name+"</a></li>"
    }
    iconMenuDrop.innerHTML = icon;
}

rebuildIconDrop();

/*
    Fonction permettant d'afficher le temps du dernier like/commentaire
    @author Anthony
    @param Date : date du dernier commentaire/likes;
    @return String : Temps du dernier commentaire (ex : Il y a 2 minutes);
*/
function reformDate(date){
    let dateNow = new Date();
    let dateCompare = Date.parse(date);

    var hours = Math.floor(Math.abs(dateNow - dateCompare) / 36e5);

    if (hours < 1) {
        var minutes = (dateNow - dateCompare) / 1000;
        minutes /= 60;
        return "Il y a "+Math.abs(Math.floor(minutes))+" minutes";

    } else {
        return "Il y a "+hours+" heures";
    }
}



/*
    Fonction qui permet d'afficher la liste des sujets/topics du forum
    @author Anthony
*/
function rebuildTopics(){
    let sujets = JSON.parse(localStorage.sujets);
    flexForum.innerHTML = "";
    for (let index = 0; index < sujets.length; index++) {
        buildSujet(sujets[index]); 
    } 
}

/*
    Fonction permettant d'ajouter un like sur un sujet/topic
    @author Anthony
    @param Key : Clé du sujet correspondant dans le tableau des sujets
*/
function addLike(idSujet){
    let sujets = JSON.parse(localStorage.sujets);
    let sessionUser = JSON.parse(sessionStorage.user);

    let newLike = {};
    newLike.auteur = sessionUser.pseudo;
    newLike.date = new Date();

    let arrayLikes = sujets[idSujet].likes;
    arrayLikes.push(newLike);

    localStorage.sujets = JSON.stringify(sujets);
    notifyUser("Votre like à été ajouté !");
    rebuildTopics();
    openSujet(sujets[idSujet]);
}

/*
    Fonction permettant d'ajouter un commentaire sur un sujet/topic
    elle vérifie également que le commentaire ne soit pas vide
    @author Anthony
    @param String : Le commentaire qu'un utilisateur a saisi
    @param Key : Clé du sujet correspondant dans le tableau des sujets
*/
function addCommentaire(commentaire, idSujet){
    if (commentaire != "") {
        let sujets = JSON.parse(localStorage.sujets);
        let sessionUser = JSON.parse(sessionStorage.user);

        let newCommentaire = {};
        newCommentaire.auteur = sessionUser.pseudo;
        newCommentaire.commentaire = commentaire;
        newCommentaire.date = new Date();

        let arrayCommentaire = sujets[idSujet].commentaires;
        arrayCommentaire.push(newCommentaire);

        localStorage.sujets = JSON.stringify(sujets);

        notifyUser("Votre commentaire à été ajouté !");
        rebuildTopics();
        openSujet(sujets[idSujet]);
    }
}

/*
    Fonction permettant d'afficher le sujet que l'on souhaite
    @author Anthony
    @param Object : Données du sujet correspondant
*/
function openSujet(data){
    let titleSujet = document.getElementById("modalSujetLabel");
    let contenuSujet = document.getElementById("contenuSujetModal");
    const inputCommentaire = document.getElementById("floatingTextarea2");
    const commentaireSection = document.getElementById("commentaireBody")

    titleSujet.innerHTML = "<p><i class='fa-solid "+icons[data.icon].icons_id+" me-2'></i> - "+data.titre+"</p>"

    contenuSujet.innerHTML = "<p>"+data.contenu+"</p>"
    contenuSujet.innerHTML += "<div class='d-flex flex-row justify-content-end'><a href='#' class='fw-bold fs-5 color-pink' id='addLikesBtn'><i class='fa-solid fa-heart me-2'></i>"+data.likes.length+"</a></div>"

    const addLikesBtn = document.getElementById("addLikesBtn");
    addLikesBtn.onclick = function(event){addLike(data.id)}


    let commentairesTxt = ""
    for (let index = 0; index < data.commentaires.length; index++) {
        commentairesTxt += "<div class='row align-items-center justify-content-center'>"
            commentairesTxt += "<div class='col p-0'>"
                commentairesTxt += "<i class='fa-solid fa-user text-white m-2 bg-secondary p-4 rounded-circle mx-auto'></i>"
            commentairesTxt += "</div>"
            commentairesTxt += "<div class='col-11 p-0'>"
                commentairesTxt += "<div class='d-flex flex-column h-100 m-2'>"
                    commentairesTxt += "<p class='fw-bold fs-5 mb-1'>"+data.commentaires[index].auteur+"</p>"
                    commentairesTxt += "<p class='fs-6 mb-1'>"+data.commentaires[index].commentaire+"</p>"
                commentairesTxt += "</div>"
            commentairesTxt += "</div>"
        commentairesTxt += "</div>"
    }

    commentaireSection.innerHTML = commentairesTxt;

    sendBtnCommentaire.onclick = function(event){addCommentaire(inputCommentaire.value, data.id)}
    $("#modalSujet").modal('show');
}

/*
    Fonction permettant d'afficher un sujet/topic dans la listes du forum 
    @author Anthony
    @param Object : Données du sujet correspondant
*/
function buildSujet(data) {
    let buttonSujet = document.createElement("button")
    buttonSujet.setAttribute("type", "button");
    buttonSujet.classList.add("btn", "btn-light", "no-borders");
    buttonSujet.onclick = function(event){openSujet(data)}

    let row = document.createElement("div");
    row.classList.add('row');
    buttonSujet.appendChild(row)

    let col9 = document.createElement("div")
    col9.classList.add("col-9")
    row.appendChild(col9)

    let flexRow = document.createElement("div")
    flexRow.classList.add("d-flex", "flex-row", "align-items-center");
    col9.appendChild(flexRow);

    let icon = document.createElement("i")
    icon.classList.add("fa-solid", icons[data.icon].icons_id, "m-4", "bg-secondary", "p-4", "rounded-circle", "text-white");
    flexRow.appendChild(icon);

    let flexColumn = document.createElement("div");
    flexColumn.classList.add("d-flex", "flex-column", "justify-content-center", "align-items-start");
    flexRow.appendChild(flexColumn);

    let sujetTitre = document.createElement("p");
    sujetTitre.classList.add("mb-2", "fw-bold", "fs-5");
    sujetTitre.textContent = data.titre;
    flexColumn.appendChild(sujetTitre);

    let sujetAuteur = document.createElement("p");
    sujetAuteur.classList.add("mb-0", "fs-6");
    sujetAuteur.textContent = "Auteur : " +data.auteur;
    flexColumn.appendChild(sujetAuteur);

    let col3 = document.createElement("div")
    col3.classList.add("col-3")
    row.appendChild(col3)

    let flexRow2 = document.createElement("div")
    flexRow2.classList.add("d-flex", "flex-row", "align-items-center", "h-100");
    col3.appendChild(flexRow2);

    let flexColumn2 = document.createElement("div");
    flexColumn2.classList.add("d-flex", "flex-column", "justify-content-center", "align-items-start", "h-100");
    flexRow2.appendChild(flexColumn2);

    let lastCommentaire = document.createElement("p");
    lastCommentaire.classList.add("mb-2", "fw-bold", "fs-5");
    if (data.commentaires[data.commentaires.length - 1] != undefined) {
        lastCommentaire.textContent = "Dernier commentaire : "+reformDate(data.commentaires[data.commentaires.length - 1].date);
    } else {
        lastCommentaire.textContent = "Aucun commentaire !";
    }
    flexColumn2.appendChild(lastCommentaire);

    let lastLike = document.createElement("p");
    lastLike.classList.add("mb-0", "fs-6");
    if (data.likes[data.likes.length - 1] != undefined) {
        lastLike.textContent = "Dernier likes : "+reformDate(data.likes[data.likes.length - 1].date);
    } else {
        lastLike.textContent = "Aucun like !";
    }
    flexColumn2.appendChild(lastLike);

    flexForum.appendChild(buttonSujet)
}

/*
    Fonction permettant d'afficher le Modal pour créer un nouveau sujet
    @author Anthony (doc Bootstrap)
*/
function drawModal() {
    $("#staticBackdrop").modal('show');
}

newSujet.addEventListener("click", drawModal);

function addInformations(){
    let sessionUser = JSON.parse(sessionStorage.user);

    let infoUser = document.createElement("p")
    infoUser.classList.add("mb-0", "me-4")
    let date = new Date(Date.parse(sessionUser.lastConnexion));
    infoUser.textContent = "Connecter en tant que : "+sessionUser.pseudo+" | Dernière connexion : "+date.getDate()+"/"+(date.getMonth() + 1)+" à "+date.getHours()+":"+date.getUTCMinutes();
    userFlex.insertBefore(infoUser, userFlex.children[0])
}
/*
    Fonction permettant de créer un sujet/topic en remplissant
    le formulaire correspondant, elle vérifie également que les champs ne soit pas vide
    @author Anthony
*/
function createNewSujet() {
    const titreInput = document.getElementById("titreInput");
    const contenuInput = document.getElementById("contenuInput");
    const iconDisplay = document.getElementById("iconDisplay");

    if (titreInput.value != "" && contenuInput.value != "") {
        let sujets = JSON.parse(localStorage.sujets);
        let sessionUser = JSON.parse(sessionStorage.user);

        const sujet = {};
        sujet.icon;
        sujet.titre;
        sujet.contenu;

        sujet.id = sujets.length;
        sujet.icon = iconDisplay.dataset.icon;
        sujet.titre = titreInput.value;
        sujet.contenu = contenuInput.value;
        sujet.auteur = sessionUser.pseudo;
        sujet.commentaires = [];
        sujet.likes = [];

        sujets.push(sujet)

        localStorage.sujets = JSON.stringify(sujets);

        notifyUser("Votre sujet : <span class='fw-bold'>"+sujet.titre+"</span> a été créer !");
        $("#staticBackdrop").modal("hide");
        rebuildTopics();
    }
}

createSujet.addEventListener("click", createNewSujet);

/*
    Fonction qui permet d'alerter l'utilisateur qu'il n'est pas connecté
    quand il accède à la page Forum
    @author Anthony
*/
function alertUserNotConnected(){
    flexForum.innerHTML = ""; // Reset

    let txt = "";
    txt += "<div class='alert alert-danger d-flex align-items-center mb-0' role='alert'>"
        txt += "<div class='spinner-border text-danger me-3' role='status'>"
            txt += "<span class='visually-hidden'>Loading...</span>"
        txt += "</div>"
        txt += "<div class='fs-4 fw-bold'>Vous devez être connecté ! Redirection ...</div>"
    txt += "</div>"

    flexForum.innerHTML = txt;
}
/*
    Au chargement de la page, on initialise les données des sujets/topics
    & on renvoie l'utilisateur sur la page principal si il n'est pas connecté
    @author Anthony
*/
window.addEventListener('load', (event) => {
    let sujets = [];

    if (localStorage.sujets != null) {
        sujets = JSON.parse(localStorage.sujets);
    } else {
        localStorage.sujets = JSON.stringify(sujets);
    }
    if (!userConnected()) {
        alertUserNotConnected();
        setTimeout(() => {
            window.location.replace("index.html");
        }, 3000);
    } else {
        addInformations();
        rebuildTopics();
    }
});