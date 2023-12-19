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
    document.addEventListener('DOMContentLoaded', () => {
        Swal.fire({
            title: "To use this function, it is necessary to have another account created to which the transfer can be made. If you have already created more than one account, use the card information or account number to proceed with the transfer.",
            icon: "info"
            });
    })
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

function updateBalance(newBalance, transactionType, amountType, cardNumber) {
    users = JSON.parse(localStorage.getItem('information'));
    const updatedUsers = users.map(user => {
        if ((action === 'transfer' && user.debitCard === cardNumber) || (action !== 'transfer' && user.active)) {
            const transaction = user.transactions;
            const newTransaction = [transactionType, ...transaction];
            const amountTransaction = user.amountTransaction;
            const newAmountTransaction = [amountType, ...amountTransaction];
            return { ...user, balance: newBalance, transactions: newTransaction, amountTransaction: newAmountTransaction};
        }
        return user;
    });
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
                updateBalance(balance, "Deposit", `+ $ ${enteredAmount}`);
            }else if(operationType === "withdrawn"){
                balance = Number(user.balance) - enteredAmount;
                updateBalance(balance, 'Withdrawal', `- $ ${enteredAmount}`);
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
    }else{
        let foundUser = false;
        users.forEach(toUser =>{
            if(cardNumber.value === toUser.numberAccount || cardNumber.value === toUser.debitCard){
                confirmMessageTransfer(user, toUser.name);
                foundUser = true;
            }
        });
        if(!foundUser){
            Swal.fire({
            title: "Error!",
            text: `User not found, please verify your details`,
            icon: "error"
            });
        }
    }
}
function confirmMessageTransfer(user, userName){
    Swal.fire({
        title: `Transfer to ${userName}`,
        text: `confirm transfer of ${enteredAmount} USD`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm"
        }).then((result) => {
        if (result.isConfirmed) {
                transferOperation(user);
            Swal.fire({
            title: "Successful operation!",
            text: `$${enteredAmount} has been transferred`,
            icon: "success"
            });
        }
    });
}
function transferOperation(user){
    users.forEach(toUser =>{
            if(cardNumber.value === toUser.numberAccount || cardNumber.value === toUser.debitCard){
                let transfer = Number(toUser.balance) + enteredAmount;
                balance = Number(user.balance) - enteredAmount;

                updateBalance(transfer, `Transfer of ${user.name}`, `+ $ ${enteredAmount}`, toUser.debitCard);
                action = false;
                updateBalance(balance, `Transfer to ${toUser.name}`, `- $ ${enteredAmount}`);
            }
    });
}
