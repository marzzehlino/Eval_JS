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

window.addEventListener('load', (event) => {
    let users = [];
    let sujets = {};


    if (localStorage.sujets != null) {
        sujets = JSON.parse(localStorage.sujets);
    } else {
        localStorage.sujets = JSON.stringify(sujets);
    }

    if (localStorage.users != null) {
        users = JSON.parse(localStorage.users);
    } else {
        localStorage.users = JSON.stringify(users);
    }

    if (userConnected()) {
        buildSpaceConnected()
    }
});