//deposit
const users = JSON.parse(localStorage.getItem('information'));
const depositBtn = document.querySelector('#depositBtn');
const amount = document.querySelector('#amount');
let enteredAmount;
let action;
// depositBtn.addEventListener('click', loadInfoUser);

//withdraw
const withdrawBtn = document.querySelector('#withdrawBtn');

if(depositBtn){
    depositBtn.addEventListener('click', loadInfoUser);
    action = 'deposit';
}else if(withdrawBtn){
    withdrawBtn.addEventListener('click', loadInfoUser);
    action = 'withdraw';
}

function loadInfoUser(){
    users.forEach(user => {
        if(user.active){
            enteredAmount = Number(amount.value);
            if(action === 'deposit'){
                deposit(user)
            }else if(action === 'withdraw'){
                withdraw(user)
            } 
        }
    });
}

function deposit(user){
    
    if(enteredAmount > 10000){
        errorMessage('no mas de 10000');
    }else if(enteredAmount < 1){
        errorMessage('no menor a  1');
    }else{
        let balance = Number(user.balance) + enteredAmount;
        update(balance, `$${enteredAmount} deposit`, 'deposit');
        
    }
}

function update(value, transac, message){
    const updatedBalance = users.map(user => {
        if(user.active){
            let transaction = user.transactions;
            let newTransaction = [transac, ...transaction];
            Swal.fire({
                title: "Successful operation",
                text: `$${enteredAmount} have been successfully ${message}`,
                icon: "success"
            });
            return {...user, balance: value, transactions: newTransaction};
        }
        return user
    });
    document.querySelector('.section-form').reset();
    localStorage.setItem('information', JSON.stringify(updatedBalance));
}
function errorMessage(message){
    const pError = document.createElement('p');
    pError.textContent = message;
    pError.style.color = 'red'
    amount.insertAdjacentElement('afterend', pError);
    amount.classList.add('error');
    setTimeout(() => {
        pError.remove();
        amount.classList.remove('error');
    }, 1000);
}

//withdraw
function withdraw(user){
    if(enteredAmount < 1){
        errorMessage('Values less than 0 cannot be entered')
    }else if(enteredAmount > user.balance){
        errorMessage("Insufficient funds for withdrawal")
    }else{
        let balance = Number(user.balance) - enteredAmount;
        update(balance, `$${enteredAmount} withdrawal`, 'withdrawn');
    }
}