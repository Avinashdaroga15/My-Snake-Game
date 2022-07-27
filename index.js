let buttnDiv = document.createElement('div');
let buttn = document.createElement('button');
let bodyDiv = document.querySelector(".body");
let ancher = document.createElement('a');

// button creation
buttn.setAttribute('id','statBtn');
buttn.textContent = "Start Game";
ancher.setAttribute('href','game.html');
ancher.appendChild(buttn)
buttnDiv.appendChild(ancher);
bodyDiv.appendChild(buttnDiv);
