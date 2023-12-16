const users = JSON.parse(localStorage.getItem('information'));
const cardUser = document.querySelector('#cardUser');
const debitCardNumer = document.querySelector('#debitCardNumber');
const nameInfo = document.querySelector('.name');
const cardBalance = document.querySelector('#cardBalance');
const depositBtn = document.querySelector('.depositBtn');

document.addEventListener('DOMContentLoaded', loadInfoUser);
depositBtn.addEventListener('click', () => {
    window.location.href = 'deposit.html';
});

function loadInfoUser(){
    users.forEach(element => {
        if(element.active){
            setInfoUser(element);
        }
    });
}

function setInfoUser(user){
    cardUser.textContent = user.name;
    nameInfo.textContent = user.name;
    debitCardNumer.textContent = debitNumber(user.debitCard);
    cardBalance.textContent = user.balance;
}

function debitNumber(user){
    let debitCard = [];
    for (let i = 0; i < user.length; i++) {
        if(i % 4 === 0 && i !== 0){
            debitCard.push(' ');
        }
            debitCard.push(user[i]);
    }
    return debitCard.join('')
}




