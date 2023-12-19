const email = document.querySelector('#email');
const password = document.querySelector('#password');
const button = document.querySelector('.button');
let userInformation = JSON.parse(localStorage.getItem('information'));
const deleteBtn = document.querySelector('.delete')

button.addEventListener('click', loginValidation);
deleteBtn.addEventListener("click",deleteConfirm )
function deleteConfirm(){
    Swal.fire({
        title: "Are you sure you want to delete all accounts?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm"
        }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('information');
            Swal.fire({
            title: "Successful operation!",
            text: "all accounts have been deleted",
            icon: "success"
            });
        }
    });
}
function loginValidation(){
    const error = document.querySelector('#form p');
    if(error){
        error.remove();
    };
    let userFound = false;

    try {
        userInformation.forEach(value => {
        if (email.value === value.email || email.value === value.name) {
            email.classList.remove('error');
            userFound = true;

            if (password.value === value.password) {
                password.classList.remove('error');
                window.location.href = 'mainPanel.html'
                update(value);
            } else {
                errorMessage('incorrect password', password);
            }
        }
        if (!userFound) {
        errorMessage("this user doesn't exist", email);
        }
    });
    } catch (error) {
        errorMessage("this user doesn't exist", email);
    }

    
    
}

function update(value){
    const updateUser = userInformation.map(user =>{
        if(user.email === value.email || user.numberAccount === value.numberAccount){
            return {...user, active: true}; 
        }
            return {...user, active: false} ;
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