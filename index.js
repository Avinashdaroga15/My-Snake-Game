let buttnDiv = document.createElement('div');
let buttn = document.createElement('button');
let bodyDiv = document.querySelector(".body");
let container = document.getElementById('container-1');

//function for event listener
function startGame(){
    container.style.display = "none";
    secondView();
}

function secondView(){
    
}

// button creation
buttn.setAttribute('id','statBtn');
buttn.textContent = "Start Game";
buttnDiv.appendChild(buttn);
bodyDiv.appendChild(buttnDiv);

//event listener of join button
buttn.addEventListener("click",startGame);
