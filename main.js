const userFlex = document.getElementById("userForm")
const mainPage = document.getElementById("mainPage")

/*
    Fonction permettant de retrouver un utilisateur via son pseudo dans la liste des utilisateurs
    @author Anthony
    @param String : Pseudo utilisateur à checker
    @return (true | false) si l'objet utilisateur est retrouver
*/
function pseudoAlreadyRegister(pseudo){
    let users = JSON.parse(localStorage.users)

    let resultFind = users.find( user => user.pseudo === pseudo);
    return typeof resultFind === 'object'; 
}

/*
    Fonction permettant de retrouver un utilisateur via son mail dans la liste des utilisateurs
    @author Anthony
    @param String : Mail utilisateur à checker
    @return (true | false) si l'objet utilisateur est retrouver
*/
function mailAlreadyRegister(mail) {
    let users = JSON.parse(localStorage.users)

    let resultFind = users.find( user => user.mail === mail);
    return typeof resultFind === 'object'; 
}

/*
    Fonction permettant de retrouver un utilisateur via son pseudo ou son mail dans la liste des utilisateurs
    @author Anthony
    @param String : Identifiant(Mail | Pseudo) de l'utilisateur
    @return (Object) : L'utilisateur
*/
function retrieveUser(identifiant){
    let users = JSON.parse(localStorage.users)

    let resultFind = users.find( user => (user.mail === identifiant || user.pseudo === identifiant));

    return resultFind;
}

/*
    Fonction permettant de connecter l'utilisateur (Envoi des données dans le sessionStorage)
    @author Anthony
    @param Object : Utilisateur
*/
function connectUser(user){
    sessionStorage.user = JSON.stringify(user);
    notifyUser("Vous allez vous connecter !");
    $("#connectModal").modal("hide");
    setTimeout(() => {
        document.location.reload();
    }, 2000);
    
}

/*
    Fonction permettant de déconnecter l'utilisateur (On enlève les données du sessionStorage)
    @author Anthony
*/
function disconnectUser(){
    sessionStorage.removeItem("user");
    notifyUser("Vous allez être déconnecter..");
    setTimeout(() => {
        document.location.reload();
    }, 2000);
}

/*
    Fonction permettant de créer un nouveau utilisateur (en l'ajoutant dans le localStorage)
    @author Anthony
    @param Object : données saisies lors de l'inscription
*/
function createNewUser(data){
    let users = JSON.parse(localStorage.users)

    const user = data;

    users.push(user)

    localStorage.users = JSON.stringify(users);

    notifyUser("Votre inscription a bien été pris en compte !");
    $("#registerModal").modal("hide");
    setTimeout(() => {
        document.location.reload();
    }, 2000);
}

/*
    Fonction permettant de savoir si l'utilisateur est connecté
    @author Anthony
    @return (true | false) : sessionStorage vide ou non?
*/
function userConnected(){
    return sessionStorage.user != null;
}

/*
    Fonction permettant de remplacer les boutons : "Se connecter" & "S'inscrire" par "Se déconnecter"
    @author Anthony
*/
function buildSpaceConnected() {
    let txt = "";
    txt += "<button type='button' class='btn btn-light' id='disconnectBtn'><i class='fa-solid fa-right-from-bracket me-2'></i>Se déconnecter</button>"
    userFlex.innerHTML = txt;

    const disconnectBtn = document.getElementById("disconnectBtn")
    disconnectBtn.addEventListener("click", disconnectUser);
}

/*
    Fonction permettant d'afficher une popup sans gêner la navigation sur le site
    @author Anthony
    @param String : Message que l'on souhaite affiché
*/
function notifyUser(message){
    const toastLiveExample = document.getElementById('liveToast')
    const toastMessage = document.getElementById("notifyMessage")
    toastMessage.innerHTML = message

    const toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
}

/*
    Au chargement de la page, on initialise les données users
    & on créer l'espace de l'utilisateur connecté si ce dernier est connecté;
    @author Anthony
*/
window.addEventListener('load', (event) => {
    let users = [];

    if (localStorage.users != null) {
        users = JSON.parse(localStorage.users);
    } else {
        localStorage.users = JSON.stringify(users);
    }

    if (userConnected()) {
        buildSpaceConnected()
    }
});