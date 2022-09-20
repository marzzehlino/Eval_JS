const newSujet = document.getElementById("newSujet")
const createSujet = document.getElementById("createSujet")

function drawModal() {
    $("#staticBackdrop").modal('show');
}

newSujet.addEventListener("click", drawModal);

function createNewSujet() {
    var sujet = {};
    sujet.titre;
    sujet.contenu;

    var titreInput = document.getElementById("titreInput");
    var contenuInput = document.getElementById("contenuInput");

    sujet.titre = titreInput.value;
    sujet.contenu = contenuInput.value
    var key = sujets.lenght || 0

    var sujets = JSON.parse(localStorage.sujets);
    Object.assign(sujets[key + 1], sujet)
    console.log(sujets)
}

createSujet.addEventListener("click", createNewSujet);

window.addEventListener('load', (event) => {
    sujets = {};
    if (localStorage.sujets != null) {
        sujets = localStorage.sujets;
    } else {
        localStorage.sujets = JSON.stringify(sujets);
    }
});