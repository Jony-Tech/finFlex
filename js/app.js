const users = JSON.parse(localStorage.getItem('information'));
const cardUser = document.querySelector('#cardUser');
const debitCardNumer = document.querySelector('#debitCardNumber');
const nameInfo = document.querySelector('.name');
const cardBalance = document.querySelector('#cardBalance');
const numberAccount = document.querySelector('.numberAccount');
const depositBtn = document.querySelector('.depositBtn');
const withdrawBtn = document.querySelector('.withdrawBtn');
const transferBtn = document.querySelector('.transferBtn');
const transactionsList = document.querySelector('.transactions');
const amountTransactionsList = document.querySelector('.amountTransactions');
const logOutbtn = document.querySelector('.logOut');


document.addEventListener('DOMContentLoaded', loadInfoUser);
depositBtn.addEventListener('click', () => {
    window.location.href = 'deposit.html';
});
withdrawBtn.addEventListener('click', () => {
    window.location.href = 'withdraw.html';
});
transferBtn.addEventListener('click', () =>{
    window.location.href = 'transfers.html';
});
logOutbtn.addEventListener('click', () =>{
    window.location.href = 'index.html';
});

function loadInfoUser(){
    users.forEach(element => {
        if(element.active){
            setInfoUser(element);
            setTransactions(element)
        }
    });
}

function setInfoUser(user){
    cardUser.textContent = user.name;
    nameInfo.textContent = user.name;
    debitCardNumer.textContent = debitNumber(user.debitCard);
    cardBalance.textContent = user.balance;
    numberAccount.textContent = user.numberAccount;
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
function setTransactions(user){
    user.transactions.forEach(transactions => {
        let transactionP = document.createElement('p');
        transactionP.textContent = transactions;
        transactionsList.appendChild(transactionP);
    });
    user.amountTransaction.forEach(transactions => {
        let transactionP = document.createElement('p');
        transactionP.textContent = transactions;
        if(transactions.includes('-')){
            transactionP.style.color = '#ce0b0b';
        }else{
            transactionP.style.color = '#059500';
        }
        amountTransactionsList.appendChild(transactionP);
    });
}



