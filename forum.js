const newSujet = document.getElementById("newSujet");
const createSujet = document.getElementById("createSujet");
const iconsDropBtn = document.getElementById("icons-dropBtn");
const iconMenuDrop = document.getElementById("iconMenu-Drop");
const flexForum = document.getElementById("forum-body");
const sendBtnCommentaire = document.getElementById("sendBtnCommentaire");

let icons = [
    {icons_id: "fa-file", icons_name: "Fichier"},
    {icons_id : "fa-house", icons_name : "Maison"},
    {icons_id : "fa-music", icons_name : "Musique"},
    {icons_id : "fa-comments", icons_name : "Commentaires"},
]

function selectIcon(select){
    let icon = icons[select]
    let txt = "";
    txt += "<i class='fa-solid "+icon.icons_id+"' id='iconDisplay' data-icon='"+select+"'></i>"
    iconsDropBtn.innerHTML = txt;
}

function rebuildIconDrop(){
    selectIcon(0);

    let icon = "";
    for (let index = 0; index < icons.length; index++) {
        icon += "<li><a class='fs-5 dropdown-item' onclick='selectIcon("+index+")'><i class='fa-solid "+icons[index].icons_id+" me-2'></i>"+icons[index].icons_name+"</a></li>"
    }
    iconMenuDrop.innerHTML = icon;
}

rebuildIconDrop();

function notifyUser(){
 // A FAIRE : 

 /*
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
            <img src="..." class="rounded me-2" alt="...">
            <strong class="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
            Hello, world! This is a toast message.
            </div>
        </div>
    </div>
 */
}

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

        openSujet(sujets[idSujet])
    }
}

function openSujet(data){
    let titleSujet = document.getElementById("modalSujetLabel");
    let contenuSujet = document.getElementById("contenuSujetModal");
    const inputCommentaire = document.getElementById("floatingTextarea2");
    const commentaireSection = document.getElementById("commentaireBody")

    titleSujet.innerHTML = "<p><i class='fa-solid "+icons[data.icon].icons_id+" me-2'></i> - "+data.titre+"</p>"

    contenuSujet.innerHTML = "<p>"+data.contenu+"</p>"

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

function buildSujet(data) {
    let buttonSujet = document.createElement("button")
    buttonSujet.setAttribute("type", "button");
    buttonSujet.classList.add("btn", "btn-light");
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
        lastCommentaire.textContent = "Dernier commentaire : "+data.commentaires[data.commentaires.length - 1].auteur;
    } else {
        lastCommentaire.textContent = "Aucun commentaire !";
    }
    flexColumn2.appendChild(lastCommentaire);

    let lastLike = document.createElement("p");
    lastLike.classList.add("mb-0", "fs-6");
    lastLike.textContent = "Dernier like :";
    flexColumn2.appendChild(lastLike);

    flexForum.appendChild(buttonSujet)
    /*
    <div class="row">
        <div class="col-9">
            <div class="d-flex flex-row align-items-center">
                <i class="fa-solid fa-file m-4 bg-secondary p-4 rounded-circle"></i>
                <div class="d-flex flex-column justify-content-center">
                    <p class="mb-2 fw-bold fs-5">Incroyable</p>
                    <p class="mb-0 fs-6">Auteur</p>
                </div>
            </div>
        </div>
        <div class="col-3">
            <div class="d-flex flex-row align-items-center h-100">
                <div class="d-flex flex-column justify-content-center h-100">
                    <p class="mb-2 fw-bold fs-5">Dernier commentaire : il y'a deux heures</p>
                    <p class="mb-0 fs-6">Dernier like : il y'a une heure</p>
                </div>
            </div>
        </div>
    </div> */
}

function drawModal() {
    $("#staticBackdrop").modal('show');
}

newSujet.addEventListener("click", drawModal);

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
        document.location.reload();
    }
}

createSujet.addEventListener("click", createNewSujet);

window.addEventListener('load', (event) => {
    let sujets = [];

    if (localStorage.sujets != null) {
        sujets = JSON.parse(localStorage.sujets);
    } else {
        localStorage.sujets = JSON.stringify(sujets);
    }
    if (!userConnected()) {
        window.location.replace("index.html");
    } else {
        for (let index = 0; index < sujets.length; index++) {
            buildSujet(sujets[index]); 
        } 
    }
});