const userFlex = document.getElementById("userForm")

function pseudoAlreadyRegister(pseudo){
    let users = JSON.parse(localStorage.users)

    let resultFind = users.find( user => user.pseudo === pseudo);
    return typeof resultFind === 'object'; 
}

function mailAlreadyRegister(mail) {
    let users = JSON.parse(localStorage.users)

    let resultFind = users.find( user => user.mail === mail);
    return typeof resultFind === 'object'; 
}

function retrieveUser(identifiant){
    let users = JSON.parse(localStorage.users)

    let resultFind = users.find( user => (user.mail === identifiant || user.pseudo === identifiant));

    return resultFind;
}

function connectUser(user){
    sessionStorage.user = JSON.stringify(user);
    document.location.reload();
}

function disconnectUser(){
    sessionStorage.removeItem("user");
    document.location.reload();
}

function createNewUser(data){
    let users = JSON.parse(localStorage.users)

    const user = {}

    user.prenom = data.prenom;
    user.nom = data.nom;
    user.pseudo = data.pseudo;
    user.sexe = data.sexe;
    user.mail = data.mail;
    user.password = data.password;
    user.age = data.age;
    user.city = data.city;

    users.push(user)

    localStorage.users = JSON.stringify(users);
    document.location.reload();
}

function userConnected(){
    return sessionStorage.user != null;
}

function buildSpaceConnected() {
    let txt = "";
    txt += "<button type='button' class='btn btn-light' id='disconnectBtn'><i class='fa-solid fa-right-from-bracket me-2'></i>Se déconnecter</button>"
    userFlex.innerHTML = txt;

    const disconnectBtn = document.getElementById("disconnectBtn")
    disconnectBtn.addEventListener("click", disconnectUser);
}

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