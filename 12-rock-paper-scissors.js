
let score = JSON.parse(localStorage.getItem('score')) || {
  win: 0,
  loss: 0,
  tie: 0
}

updateScore();

//Reset Score
document.querySelector('.js-reset-score-btn').addEventListener('click', ()=>{
  resetScore();
})

function resetScore(){
localStorage.removeItem(score);
score.win = 0;
score.loss = 0;
score.tie = 0; 

alert(`Score was reset. Win: ${score.win},  Loss: ${score.loss},  Tie: ${score.tie}`)
updateScore();
}


function computerPick(){
let randomNumber = Math.random();

let computerMove = '';

if (randomNumber > 0 && randomNumber <= 0.33){
  computerMove = 'rock';
} if (randomNumber >0.33 && randomNumber <= 0.66 ){
  computerMove = 'paper'
}if (randomNumber > 0.66 && randomNumber < 1){
  computerMove = 'scissors';
}
return computerMove;
}

function updateScore(){
document.querySelector('.js-score').innerHTML = `Win: ${score.win},  Loss: ${score.loss},  Tie: ${score.tie}` 
}


let isAutoPlaying = false;
let intervalId;
const buttonElement = document.querySelector('.js-auto-play-btn');

buttonElement.addEventListener('click', ()=>{
  autoPlay();
})

function autoPlay(){
  if(!isAutoPlaying){
    buttonElement.innerHTML = 'Playing (click to stop)';
    buttonElement.classList.add('isPlaying')
   
    intervalId = setInterval(()=>{
    const playerMove = computerPick();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  
  }else{
    clearInterval(intervalId);
    isAutoPlaying = false;
    buttonElement.innerHTML = 'Auto Play';
    if(buttonElement.classList.contains('isPlaying')){
      buttonElement.classList.remove('isPlaying')
    }
  }
}

 
//Play game with keydowns
document.body.addEventListener('keydown',(event)=>{
  if(event.key === 'r') {
  playGame('rock');
  }else if(event.key === 'p'){
    playGame('paper')
  }else if(event.key === 's'){
    playGame('scissors')
  }
})


//Play game onclicks
document.querySelector('.js-rock-btn').addEventListener('click',()=>{
  playGame('rock');
})


document.querySelector('.js-paper-btn').addEventListener('click',()=>{
  playGame('paper');
})


document.querySelector('.js-scissors-btn').addEventListener('click',()=>{
  playGame('scissors');
})



function playGame(playerMove){
const computerMove = computerPick();

let result = '';
if (playerMove === computerMove){
  result = 'Tie'
  score.tie += 1;
}else if (
  (playerMove === 'rock' && computerMove === 'scissors')||
  (playerMove === 'paper' && computerMove === 'rock')||
  (playerMove === 'scissors' && computerMove === 'paper')
){
  result = 'You win';
  score.win += 1;
} else {
  result = 'You lose';
  score.loss += 1;
} 

document.querySelector('.js-picks').innerHTML = `Picks: You ${playerMove}. Computer  ${computerMove}`

document.querySelector('.js-picks').innerHTML = `You <img src="/Lesson10/images/${playerMove}-emoji.png" class="game-icon"> Computer <img src="/Lesson10//images/${computerMove}-emoji.png" class="game-icon">`

document.querySelector('.js-result').innerHTML = `Result: ${result}`

localStorage.setItem('score', JSON.stringify(score)); // stringify and save score to localStorage in one line.


updateScore();

return playerMove;

}





