const connectBtn = document.getElementById("connectBtn");
const registerBtn = document.getElementById("registerBtn");
const registerFormSend = document.getElementById("registerSendForm");
const sendConnectForm = document.getElementById("sendConnectForm");

let buildMessages = [];

function connectForm(){
    $("#connectModal").modal('show');
}

connectBtn.addEventListener("click", connectForm)

function registerForm(){
    $("#registerModal").modal('show');
}

registerBtn.addEventListener("click", registerForm)

function clearMessages(array){
    array.forEach(element => {
        element.remove();
    });
    array = [];
}

function buildMessage(id, messageTxt, parent, input){
    let message = document.createElement("div")
    message.classList.add("form-text", "text-danger");
    message.setAttribute("id", id)

    let messageText = document.createTextNode(messageTxt);
    message.appendChild(messageText);

    parent.appendChild(message);

    input.setAttribute("aria-describedby", id)

    buildMessages.push(message);
}

function registerNewUser(){
    let user = {};
    user.prenom;
    user.nom;
    user.pseudo;
    user.sexe;
    user.mail;
    user.password;
    user.age;
    user.city;

    let inputFirstName = document.getElementById("firstNameRegister");
    let inputLastName = document.getElementById("lastNameRegister");
    let inputMail = document.getElementById("mailInputRegister");
    let inputPseudo = document.getElementById("pseudoRegister");
    let inputPassword = document.getElementById("passwordInputRegister");
    let inputConfirmPassword = document.getElementById("confirmPasswordInputRegister");
    let inputAge = document.getElementById("ageInputRegister");

    let resultFirstName = inputFirstName.value;
    let resultLastName = inputLastName.value;
    let resultPseudo = inputPseudo.value;
    let resultGender = document.querySelector('input[name=GenderRadio]:checked').value;
    let resultMail = inputMail.value;
    let resultPassword = inputPassword.value;
    let resultConfirmPassword = inputConfirmPassword.value;
    let resultAge = inputAge.value;
    let resultCity = document.getElementById("cityInputRegister").value;

    let mailSection = document.getElementById("mailSectionRegister");
    let firstNameSection = document.getElementById("firstNameSectionRegister");
    let lastNameSection = document.getElementById("lastNameSectionRegister");
    let pseudoSection = document.getElementById("pseudoSectionRegister");
    let passwordSection = document.getElementById("passwordSectionRegister");
    let ageSection = document.getElementById("ageSectionRegister")


    let mailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    clearMessages(buildMessages)

    if (!mailRegex.test(resultMail)){
        buildMessage("emailHelp", "Votre adresse e-mail n'est pas valide !", mailSection, inputMail);
        
        return false;
    }
    if (resultFirstName == "" || resultLastName == "" || resultPseudo == "") {
        if (resultFirstName == "") {
            buildMessage("firstNameHelp", "Ce champ ne doit pas être vide !", firstNameSection, inputFirstName);
        }
        if (resultLastName == "") {
            buildMessage("lastNameHelp", "Ce champ ne doit pas être vide !", lastNameSection, inputLastName);
        }

        if (resultPseudo == "") {
            buildMessage("pseudoHelp", "Ce champ ne doit pas être vide !", pseudoSection, inputPseudo);
        }

        return false;
    }

    if (resultConfirmPassword !== resultPassword) {
        buildMessage("passwordHelp", "Les champs ne sont pas identiques !", passwordSection, inputConfirmPassword);
        return false;
    }

    if (resultAge != ""){
        if (resultAge < 1 || resultAge > 135) {
            buildMessage("ageHelp", "Votre âge doit être compris entre 1 et 135 !", ageSection, inputAge);
            return false;
        }
    }

    if (pseudoAlreadyRegister(resultPseudo) || mailAlreadyRegister(resultMail)) {
        if (pseudoAlreadyRegister(resultPseudo)){
            buildMessage("pseudoHelp2", "Ce pseudo est déjà utilisé !", pseudoSection, inputPseudo);
        }
        if (mailAlreadyRegister(resultMail)) {
            buildMessage("emailHelp2", "Cette adresse e-mail est déjà utilisée !", mailSection, inputMail);
        }
        return false;
    }
    
    user.prenom = resultFirstName;
    user.nom = resultLastName;
    user.pseudo = resultPseudo;
    user.mail = resultMail;
    user.sexe = resultGender;
    user.password = resultPassword;
    user.age = resultAge;
    user.city = resultCity;

    
    createNewUser(user)
}

registerFormSend.addEventListener("click", registerNewUser)

function tryConnectUser() {
    let identifiantInput = document.getElementById("identifiantInput");
    let passwordInput = document.getElementById("passwordInputConnect");

    let identifiantSection = document.getElementById("identifiantSectionConnect");
    let passwordSection = document.getElementById("passwordSectionConnect");

    clearMessages(buildMessages);

    if (identifiantInput.value == "" || passwordInput.value == "") {
        if (identifiantInput.value == ""){
            buildMessage("emailHelp", "Votre identifiant ne doit pas être vide !", identifiantSection, identifiantInput);
        }
        if (passwordInput.value == "") {
            buildMessage("passwordHelp", "Votre mot de passe ne doit pas être vide !", passwordSection, passwordInput);
        }
        return false
    }

    if (typeof retrieveUser(identifiantInput.value) === 'object'){
        let user = retrieveUser(identifiantInput.value);
        if (passwordInput.value == user.password) {
            connectUser(user)
        } else {
            console.log(user.password, passwordInput.value)
            buildMessage("passwordHelp", "Votre mot de passe n'est pas valide !", passwordSection, passwordInput);
        }
    } else {
        buildMessage("emailHelp2", "Nous ne trouvons pas cet identifiant !", identifiantSection, identifiantInput);
    }
}

sendConnectForm.addEventListener("click", tryConnectUser)