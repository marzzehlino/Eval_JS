const newSujet = document.getElementById("newSujet");
const createSujet = document.getElementById("createSujet");

function drawModal() {
    $("#staticBackdrop").modal('show');
}

newSujet.addEventListener("click", drawModal);

function createNewSujet() {
    const sujet = {};
    sujet.titre;
    sujet.contenu;

    const titreInput = document.getElementById("titreInput");
    const contenuInput = document.getElementById("contenuInput");

    sujet.titre = titreInput.value;
    sujet.contenu = contenuInput.value
    const key = sujets.lenght || 0

    const sujets = JSON.parse(localStorage.sujets);
    Object.assign(sujets[key + 1], sujet)
    console.log(sujets)
}

createSujet.addEventListener("click", createNewSujet);