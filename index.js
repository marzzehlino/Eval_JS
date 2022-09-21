const connectBtn = document.getElementById("connectBtn");
const registerBtn = document.getElementById("registerBtn");

function connectForm(){
    $("#connectModal").modal('show');
}

connectBtn.addEventListener("click", connectForm)

function registerForm(){
    $("#registerModal").modal('show');
}

registerBtn.addEventListener("click", registerForm)

function buildMessage(id, messageTxt, parent, input){
    let message = document.createElement("div")
    message.classList.add("form-text", "text-danger");
    message.setAttribute("id", id)

    let messageText = document.createTextNode(messageTxt);
    message.appendChild(messageText);

    parent.appendChild(message);

    input.setAttribute("aria-describedby", id)
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

    let resultFirstName = inputFirstName.value;
    let resultLastName = inputLastName.value;
    let resultPseudo = inputPseudo.value;
    let resultGender = document.querySelector('input[name=GenderRadio]:checked').value;
    let resultMail = inputMail.value;
    let resultPassword = document.getElementById("passwordInputRegister").value;
    let resultConfirmPassword = document.getElementById("confirmPasswordInputRegister").value;
    let resultAge = document.getElementById("ageInputRegister").value;
    let resultCity = document.getElementById("cityInputRegister").value;

    let mailSection = document.getElementById("mailSectionRegister");
    let firstNameSection = document.getElementById("firstNameSectionRegister");
    let lastNameSection = document.getElementById("lastNameSectionRegister");
    let pseudoSection = document.getElementById("pseudoSectionRegister");


    let mailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!mailRegex.test(resultMail)){
        buildMessage("emailHelp", "Votre mot de passe n'est pas valide !", mailSection, inputMail);
        
        return false;
    }
    if (resultFirstName == "" || resultLastName == "" || resultPseudo == "") {
        if (resultFirstName == "") {
            buildMessage("firstNameHelp", "Votre prénom ne doit pas être vide !", firstNameSection , inputFirstName);
        }
        if (resultLastName == "") {
            buildMessage("lastNameHelp", "Votre nom ne doit pas être vide !", lastNameSection, inputLastName);
        }

        if (resultPseudo == "") {
            buildMessage("pseudoHelp", "Votre pseudo ne doit pas être vide !", pseudoSection, inputPseudo);
        }

        return false;
    }
    if (resultConfirmPassword != resultPassword) {
        console.log("mdp ou confirmmdp non valide");
        return false;
    }

    if (resultAge != ""){
        if (resultAge < 1 || resultAge > 135) {
            return false;
        }
    }

    if (pseudoAlreadyRegister(resultPseudo) || mailAlreadyRegister(resultMail)) {
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
