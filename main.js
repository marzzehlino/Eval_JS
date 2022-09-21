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