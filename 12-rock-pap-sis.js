let score = JSON.parse(localStorage.getItem('score')) || {
  wins : 0,
  losses: 0,
  ties: 0
};

updateScoreElm();
/* if (!score){
score = {
  wins : 0,
  losses: 0,
  ties: 0

};
}
*/

let isAutoPlaying = false;
let intervalId;


function autoPlay(){
  if(!isAutoPlaying){
  intervalId = setInterval(() => {
    const playerMove = pickCompMove();
    playGame(playerMove);
  },1000);

  isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}


document.querySelector('.js-rock-button')
  .addEventListener('click', () =>{
    playGame('Rock');
  });

  document.querySelector('.js-paper-button')
  .addEventListener('click', () =>{
    playGame('Paper');
  });

  document.querySelector('.js-Scissor-button')
  .addEventListener('click', () =>{
    playGame('Scissor');
  });

  document.body.addEventListener('keydown',(event) => {
      if(event.key === 'r'){
        playGame('rock');
      } else if (event.key === 'p'){
        playGame('Paper');
      } else if (event.key === 's'){
        playGame('Scissor');
      }
  })


  function playGame(playerMove){
  const compMove = pickCompMove();
    let result = '';

if(playerMove === 'Scissor')
{
if (compMove === 'Rock'){
result = 'lose.';
} else if (compMove === 'Paper'){
result = 'won.';
} else if (compMove === 'Scissor'){
result = 'Tie.'
} 

} else if (playerMove === 'Paper'){
if (compMove === 'Rock'){
result = 'won.';
} else if (compMove === 'Paper'){
result = 'Tie.';
} else if (compMove === 'Scissor'){
result = 'lose.'
} 

} else if(playerMove === 'Rock'){
if (compMove === 'Rock'){
result = 'Tie.';
} else if (compMove === 'Paper'){
result = 'lose.'
} else if (compMove === 'Scissor'){
result = 'won.'
} 

}
if (result === 'won.'){
score.wins += 1;
} else if (result === 'lose.'){
score.losses += 1;
} else if (result === 'Tie.'){
score.ties += 1;
}

localStorage.setItem('score',JSON.stringify(score));
updateScoreElm();

document.querySelector('.js-result').innerHTML = `You ${result}`;
document.querySelector('.js-moves')
.innerHTML =` You picked
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${compMove}-emoji.png" class="move-icon">
computer picked`; 


}

function updateScoreElm(){

  document.querySelector('.js-score')
 .innerHTML = `wins:${score.wins}, losses:${score.losses}, Ties: ${score.ties}`;
};

function pickCompMove(){
  const randomNum = Math.random();
  let compMove = '';


if(randomNum >= 0 && randomNum < 1/3) {
compMove = 'Rock';
}  else if (randomNum >= 1/3 && randomNum < 2/3) {
compMove = 'Paper';
} else if (randomNum >= 2/3 && randomNum < 1) {
compMove = 'Scissor';
}
return compMove;
}