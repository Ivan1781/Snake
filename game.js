let cvs = document.getElementById("game");
let ctx = cvs.getContext("2d");

let box = 8;
let food = getRandomPosition();
let snake = [];

snake[0] = {
    x:9*box,
    y:10*box
}

let score=0;

let dir;

function play(timestamp){
    window.requestAnimationFrame(play);
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    ctx.fillRect(food.x, food.y, box, box);
    for(let i=0;i<snake.length;i++){
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.fillRect(snake[i].x, snake[i].y, box, box); 
    }

    let snakeX=snake[0].x;
    let snakeY=snake[0].y;
    let sc = document.getElementById("score");

    if(snakeX==food.x && snakeY==food.y){
        score++;
        sc.innerText = score;    
        food=getRandomPosition();
    }
    else{
        snake.pop();
    }

    if(dir == "left") snakeX -= 1;
    if(dir == "right") snakeX += 1;
    if(dir=="up") snakeY -= 1;
    if(dir=="down") snakeY += 1;

    let newHead = {
        x:snakeX,
        y:snakeY
    }
    if(newHead.x==300){
        newHead.x=1;
    }
    if(newHead.x==0){
        newHead.x=299;
    }
    if(newHead.y==1){
        newHead.y=299;
    }
    if(newHead.y==300){
        newHead.y=1;
    }

    snake.unshift(newHead);
}

document.addEventListener("keydown", setDirection);

function setDirection(event) {
    if(event.keyCode == 37 && dir != "right"){
        dir = "left";   
    }
    else if(event.keyCode == 38 && dir != "down"){
        dir = "up";
    }
    else if(event.keyCode == 39 && dir != "left"){
        dir = "right"; 
    }
    else if(event.keyCode==40 && dir != "up"){
        dir = "down";
     }
}

function getRandomPosition(){
    return {
        x:(Math.floor(Math.random()*300)),
        y:(Math.floor(Math.random()*300))
    }
}

window.requestAnimationFrame(play);
