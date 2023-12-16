const userName = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');
const button = document.querySelector('.button');
const form = document.querySelector('#form');
let userInformation = JSON.parse(localStorage.getItem('information')) || [];

userName.addEventListener('keyup', signUpValidation);
email.addEventListener('keyup', signUpValidation);
password.addEventListener('keyup', signUpValidation);
confirmPassword.addEventListener('keyup', signUpValidation);
button.addEventListener('click', createAccount)

buttonDisabled();
function buttonDisabled(){
    button.disabled = true;
    button.id = 'button'
}


function signUpValidation(e){
    const error = document.querySelector('#form p');
    if(error){
        error.remove();
    };
    if(e.target.type === 'text'){
        let user = userName.value.trimStart();
        if(user.length <= 0){
            errorMessage('invalid user name', userName);
        }else{
            userName.classList.remove('error');
            addValidation(userName);
        }

    }else if(e.target.type === 'email'){
        if(email.value.includes('@') && email.value.includes('.') && email.value.length > 6){
            email.classList.remove('error');
            addValidation(email);
        }else{
            errorMessage('invalid email', email);
        }

    }else if(e.target.type === 'password'){
        if(password.value.length <= 5){
            errorMessage('minimum is 6 characters', password);
        }else if(confirmPassword.value === ''){
            confirmPassword.classList.remove('error');
            addValidation(password);
        }
        else if(password.value !== confirmPassword.value){
            errorMessage("password doesn't match", confirmPassword);
        }else{
            confirmPassword.classList.remove('error');
            password.classList.remove('error');
            addValidation(confirmPassword);
        }
    }
    if(userName.classList.value === 'validated' && email.classList.value === 'validated' && confirmPassword.classList.value === 'validated'){
        button.removeAttribute('id');
        button.disabled = false;
    }
}

function errorMessage(message, input){
    const pError = document.createElement('p');
    pError.textContent = message;
    pError.style.color = 'red'
    input.insertAdjacentElement('afterend', pError);
    input.classList.add('error');
}
function addValidation(input){
    input.classList.add('validated')
}
function createAccount(){
    let information = {
        name: userName.value,
        email: email.value,
        password: password.value,
        balance: 50,
        numberAccount: createNumber('numberCard'),
        debitCard: createNumber('debitCard'),
        active: false,
    }
    Swal.fire({
        title: "Welcome!",
        text: "Your account has been successfully created!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
    });
    setTimeout(() => {
        window.location.href = "index.html"
    }, 1500);
    userInformation.push(information)
    localStorage.setItem('information', JSON.stringify(userInformation));
}
function createNumber(card){
    let accountNumber = [];
    if(card === 'numberCard'){
        for (let i = 0; i < 10; i++) {
        accountNumber.push(Math.round(Math.random() * 9));
        }  
    }else{
        for (let i = 0; i < 16; i++) {
        accountNumber.push(Math.round(Math.random() * 9));
        }
    }  
    return accountNumber.join('')
}
