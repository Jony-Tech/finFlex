//deposit
let users = JSON.parse(localStorage.getItem('information'));
const depositBtn = document.querySelector('#depositBtn');
const amount = document.querySelector('#amount');
let enteredAmount;
let action;
let balance;
//withdraw
const withdrawBtn = document.querySelector('#withdrawBtn');
//transfer
const transfertBtn = document.querySelector('#transfertBtn');
const cardNumber = document.querySelector('#cardNumber');

if(depositBtn){
    depositBtn.addEventListener('click', loadInfoUser);
    action = 'deposit';
}else if(withdrawBtn){
    withdrawBtn.addEventListener('click', loadInfoUser);
    action = 'withdraw';
}else if(transfertBtn){
    transfertBtn.addEventListener('click', loadInfoUser);
    action = 'transfer';
}

function loadInfoUser(){
    users.forEach(user => {
        if(user.active){
            enteredAmount = Number(amount.value);
            if(action === 'deposit'){
                validateDeposit(user)
            }else if(action === 'withdraw'){
                validateWithdraw(user)
            }else if(action === 'transfer'){
                validateTransfer(user)
            }
        }
    });
}

function validateDeposit(user){
    
    if(enteredAmount > 10000){
        errorMessage('no mas de 10000', amount);
    }else if(enteredAmount < 1){
        errorMessage('Values less than 1 cannot be entered', amount);
    }else{
        confirmMessage(user, 'deposited');
        
    }
}

function updateBalance(newBalance, transactionType, cardNumber) {
    users = JSON.parse(localStorage.getItem('information'));
    const updatedUsers = users.map(user => {
        if ((action === 'transfer' && user.debitCard === cardNumber) || (action !== 'transfer' && user.active)) {
            const transaction = user.transactions;
            const newTransaction = [transactionType, ...transaction];
            return { ...user, balance: newBalance, transactions: newTransaction };
        }
        return user;
    });
    console.log(updatedUsers);
    document.querySelector('.section-form').reset();
    localStorage.setItem('information', JSON.stringify(updatedUsers));
}

function confirmMessage(user, operationType){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm"
        }).then((result) => {
        if (result.isConfirmed) {
            if(operationType === "deposited"){
                balance = Number(user.balance) + enteredAmount;
                updateBalance(balance, `$${enteredAmount} deposit`);
            }else if(operationType === "withdrawn"){
                balance = Number(user.balance) - enteredAmount;
                updateBalance(balance, `$${enteredAmount} withdrawal`);
            }else if(operationType === 'transferred'){
                transferOperation(user);
            }
            Swal.fire({
            title: "Successful operation!",
            text: `$${enteredAmount} has been succesfully ${operationType}`,
            icon: "success"
            });
        }
    });
}

function errorMessage(message, input){
    const pError = document.createElement('p');
    pError.textContent = message;
    pError.style.color = 'red'
    input.insertAdjacentElement('afterend', pError);
    input.classList.add('error');
    setTimeout(() => {
        pError.remove();
        input.classList.remove('error');
    }, 1000);
}

//validate withdraw
function validateWithdraw(user){
    if(enteredAmount < 1){
        errorMessage('Values less than 0 cannot be entered', amount);
    }else if(enteredAmount > user.balance){
        errorMessage("Insufficient funds for withdrawal", amount);
    }else{
        confirmMessage(user, 'withdrawn');
    }
}
//validate transfer
function validateTransfer(user){
    if(cardNumber.value.length < 10){
        errorMessage('Digits less than 10 cannot be entered', cardNumber);
    }else if(cardNumber.value.length >= 18){
        errorMessage('Digits more than 18 cannot be entered', cardNumber);
    }else if(enteredAmount < 1){
        errorMessage('Digits less than 0 cannot be entered', amount);
    }else if(enteredAmount > user.balance){
        errorMessage("Insufficient funds for transfer", amount)
    }
    else{
        confirmMessage(user, "transferred");   
    }
}
function transferOperation(user){
    users.forEach(cardNum =>{
            if(cardNumber.value === cardNum.numberAccount){
                let transfer = Number(cardNum.balance) + enteredAmount;
                balance = Number(user.balance) -enteredAmount;

                updateBalance(transfer, `${enteredAmount} transfer`, cardNum.debitCard);
                action = false;
                updateBalance(balance, `${enteredAmount} transfer`);
            }
    });
}
