let buttnDiv = document.createElement('div');
let buttn = document.createElement('button');
let bodyDiv = document.querySelector(".body");
let container = document.getElementById('container');

//function for event listener
function startGame(){
    container.style.display = "none";
    secondVeiw();
}

function secondVeiw(){
    
}

// button creation
buttn.setAttribute('id','statBtn');
buttn.textContent = "Start Game";
buttnDiv.appendChild(buttn);
bodyDiv.appendChild(buttnDiv);

//event listener of join button
buttn.addEventListener("click",startGame);
