let buttnDiv = document.createElement('div');
let buttn = document.createElement('button');
let bodyDiv = document.querySelector(".body");
buttn.setAttribute('id','statBtn');
buttn.textContent = "Start Game";
buttnDiv.appendChild(buttn);
bodyDiv.appendChild(buttnDiv)
