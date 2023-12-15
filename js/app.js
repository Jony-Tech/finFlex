//dashboard
const users = JSON.parse(localStorage.getItem('information'));
const name = document.querySelector('#userName');

// userActive();
document.addEventListener('DOMContentLoaded', loadInfoUser)

function loadInfoUser(){
    users.forEach(element => {
        if(element.active){
            return setInfoUser(element);
        }
    });
}

function setInfoUser(user){
    name.textContent = user.name;
}


function userActive(){
    const updateUser = users.map(user => {
        if(user.active){
            return {...user, active:false}
        }
        return user;
    });
    localStorage.setItem('information', JSON.stringify(updateUser));
}


