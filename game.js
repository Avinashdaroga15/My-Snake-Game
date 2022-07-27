// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
const board = document.getElementById("board");
let speed = 3;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{x: 15, y: 15}];
let stone = {x: 10, y: 6};
let food = {x: 6, y: 7};
let cactusPos1 = {x:8,y:15}
let cactusPos2= {x:15,y:8}
let previousEventKey =" ";

// Game Functions
function main(currentTime){
    window.requestAnimationFrame(main);
    if((currentTime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = currentTime;
    gameEngine();
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        score = 0; 
        speed = 3;
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 15, y: 15}];
        scoreBox.innerHTML = "Score: " + score;
        musicSound.play();
    }
     
    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        speed++;
        score += 1;
   
        if(score>highscoreval){
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highscoreBox.innerHTML = "HighScore: " + highscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 20;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
        stone = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
        a = 2;
        b = 20;
        cactusPos1 = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }
    else if(snakeArr[0].y === stone.y && snakeArr[0].x ===stone.x){
          
        snakeArr.pop();
        let a = 2;
        let b = 20;
        speed--;
        score--;
        scoreBox.innerHTML = "Score: " + score;
        stone = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
        a = 2;
        b = 20;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }
    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake, Food and stone
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

    // display the stone
    stoneElement = document.createElement('div');
    stoneElement.style.gridRowStart = stone.y;
    stoneElement.style.gridColumnStart = stone.x;
    stoneElement.classList.add('stone')
    board.appendChild(stoneElement);
   
    // Display cactus 
    let cactusDiv1 = document.createElement('div');
    let cactus1 = document.createElement('img');
    cactus1.setAttribute('src','cactus.png');
    cactus1.style.maxWidth = "100%";
    cactus1.style.maxHeight = "100%";
    cactusDiv1.style.gridRowStart = cactusPos1.y;
    cactusDiv1.style.gridColumnStart = cactusPos1.x;
    cactusDiv1.appendChild(cactus1);
    board.appendChild(cactusDiv1);    

    let cactusDiv2 = document.createElement('div');
    let cactus2 = document.createElement('img');
    cactus2.setAttribute('src','cactus.png');
    cactus2.style.maxWidth = "100%";
    cactus2.style.maxHeight = "100%";
    cactusDiv2.style.gridRowStart = cactusPos2.y;
    cactusDiv2.style.gridColumnStart = cactusPos2.x;
    cactusDiv2.appendChild(cactus2);
    board.appendChild(cactusDiv2);   
}
function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 21 || snake[0].x <= 0 || snake[0].y >= 21 || snake[0].y <=0){
        return true;
    }

    if(snakeArr[0].y === cactusPos1.y && snakeArr[0].x ===cactusPos1.x||snakeArr[0].y === cactusPos2.y && snakeArr[0].x ===cactusPos2.x){
        return true;
    }
     return false;
}

function randomPosOfCactus(){
    let a = 2;
    let b = 20;
    cactusPos2 = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
}


// Main logic starts here
// musicSound.play();
let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval))
}
else{
    highscoreval = JSON.parse(highscore);
    highscoreBox.innerHTML = "HighScore: " + highscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    // musicSound.play();
    console.log(e.key,previousEventKey);
    switch (e.key) {
        case "ArrowUp":
            if(previousEventKey == "ArrowDown"){
                inputDir.x = 0;
                inputDir.y = 1;
                console.log("Hare Krsna");
                break;
            }else{
                inputDir.x = 0;
                inputDir.y = -1;
                previousEventKey=e.key;
                break;
            }
        case "ArrowDown":
            if(previousEventKey == "ArrowUp"){
                inputDir.x = 0;
                inputDir.y = -1;
                console.log("Hare Krsna");
                break;
            }else{
                inputDir.x = 0;
                inputDir.y = 1;
                previousEventKey=e.key;
                break;
            }

        case "ArrowLeft":
            if(previousEventKey == "ArrowRight"){
                inputDir.x = 1;
                inputDir.y = 0;
                console.log("Hare Krsna");
                break;
            }else{
                inputDir.x = -1;
                inputDir.y = 0;
                previousEventKey=e.key;
                break;
            }
            

        case "ArrowRight":
            if(previousEventKey == "ArrowLeft"){
                inputDir.x = -1;
                inputDir.y = 0;
                console.log("Hare Krsna");
                break;
            }else{
                inputDir.x = 1;
                inputDir.y = 0;
                previousEventKey=e.key;
                break;
            }          
        default:
            break;
    }

});
//random positioning of cactus
setInterval(randomPosOfCactus,5000)

// function fun(){  
//     document.getElementById("reset").reset();  
//   }   