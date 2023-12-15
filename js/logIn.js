const email = document.querySelector('#email');
const password = document.querySelector('#password');
const button = document.querySelector('.button');
let userInformation = JSON.parse(localStorage.getItem('information'));



if(document.querySelector('.button')){
    button.addEventListener('click', loginValidation);
}


function loginValidation(){
    const error = document.querySelector('#form p');
    if(error){
        error.remove();
    };
    let userFound = false;

    userInformation.forEach(value => {
        if (email.value === value.email || email.value === value.name) {
            email.classList.remove('error');
            userFound = true;

            if (password.value === value.password) {
                password.classList.remove('error');
                window.location.href = 'dashboard.html'
                update(value);
            } else {
                return errorMessage('incorrect password', password);
            }
        }
    });

    if (!userFound) {
        return errorMessage("this user doesn't exist", email)
    }
    
}

function update(value){
    const updateUser = userInformation.map(user =>{
        if(user.email === value.email || user.numberAccount === value.numberAccount){
            return {...user, active: true}; 
        }
            return user;
    });
    localStorage.setItem('information', JSON.stringify(updateUser));
}


function errorMessage(message, input){
    let pError = document.createElement('p')
    pError.textContent = message;
    pError.style.color = 'red';
    input.insertAdjacentElement('afterend', pError);
    input.classList.add('error')
}