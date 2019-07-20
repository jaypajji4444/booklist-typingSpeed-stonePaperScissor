window.addEventListener('load', onLoad);


const seconds=document.getElementById("seconds");
const currentWord=document.getElementById("current-word");
const wordInput=document.getElementById("word-input");
const message=document.getElementById("message");
const timeDisplay=document.getElementById("time");
const scoreDisplay=document.getElementById("score");

let isPlaying;

var levels={
    easy:5,
    medium:4,
    hard:3
}

var currentLevel=levels.easy;
var time=currentLevel;
var score=0;


const words = [
    'hat',
    'river',
    'lucky',
    'statue',
    'generate',
    'stubborn',
    'cocktail',
    'runaway',
    'joke',
    'developer',
    'establishment',
    'hero',
    'javascript',
    'nutrition',
    'revolver',
    'echo',
    'siblings',
    'investigate',
    'horrendous',
    'symptom',
    'laughter',
    'magic',
    'master',
    'space',
    'definition'
  ];



function onLoad()
{
    seconds.innerHTML=currentLevel;
    Wordchange(words);    // owrd first tym
    wordInput.addEventListener("input",checking);

     // Call countdown every second
  setInterval(timeRunOut, 1000);
  // Check game status
  setInterval(gameStatus, 50);
}








// fxn to show and change the word from array..
  function Wordchange(words)
  {
    var rand =Math.floor(Math.random()*words.length);
    //console.log(rand);
    var newWord=words[rand];  

    currentWord.innerHTML=newWord;

  }


// Start match
function checking() {
    if (wordMatching()) {
      isPlaying = true;
      time = currentLevel + 1;
      Wordchange(words);
      wordInput.value = '';
      score++;
    }
  
    // If score is -1, display 0
    if (score === -1) {
      scoreDisplay.innerHTML = 0;
    } else {
      scoreDisplay.innerHTML = score;
    }
  }



  
function wordMatching()
{
    
   var value= wordInput.value;
   if(value==currentWord.innerHTML)
   {
       message.innerHTML="Correct!!";
   
   return true;


     
   }

   else
   {
       message.innerHTML="";
       return false;
   }

}







// time run out

function timeRunOut()
{
if(time>0)
{
    time--;
}

else if(time===0)
{
//game khtm

isPlaying=false;
}


// time dispaly

timeDisplay.innerHTML=time;
}


// game Status checkking..

function gameStatus()
{
   // console.log(!isPlaying  ,time)
if(!isPlaying  && time===0)
{
    message.innerHTML="GameOver!!!!";
    score=-1;
}
}