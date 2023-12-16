const users = JSON.parse(localStorage.getItem('information'));
const depositBtn = document.querySelector('#depositBtn');
const depositAmount = document.querySelector('#depositAmount');
depositBtn.addEventListener('click', loadInfoUser);
function loadInfoUser(){
    users.forEach(user => {
        if(user.active){
            deposit(user)
        }
    });
}

function deposit(user){
    let deposit = Number(depositAmount.value);
    if(deposit > 10000){
        errorMessage('no mas de 10000');
    }else if(deposit < 1){
        errorMessage('no menor a  1');
    }else{
        let balance = Number(user.balance) + deposit ;
        update(balance);
        Swal.fire({
        title: "Successful operation",
        text: `$${deposit} have been successfully deposited`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500
    });
    }
}

function update(value){
    const updatedValance = users.map(user => {
        if(user.active){
            return {...user, balance: value}
        }
        return user
    });
    document.querySelector('.section-form').reset();
    localStorage.setItem('information', JSON.stringify(updatedValance));

}
function errorMessage(message){
    const pError = document.createElement('p');
    pError.textContent = message;
    pError.style.color = 'red'
    depositAmount.insertAdjacentElement('afterend', pError);
    depositAmount.classList.add('error');
    setTimeout(() => {
        pError.remove();
        depositAmount.classList.remove('error');
    }, 1000);
}