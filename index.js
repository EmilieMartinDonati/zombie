
import Otter from "./Otter.js";
import Ghost from "./Ghost.js";

const question = document.getElementById("question_perso");
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const victory =  document.getElementById("victory");
const timeVictory = document.getElementById("timeVictory");
const died = document.getElementById("died");

const canvas = document.getElementById("other");
const ctx = canvas.getContext('2d');

let done = false;
let dead = false;

function openDoor() {
  question.style.visibility = "hidden";
  victory.style.visibility = "visible";
  done = true;

}


function displayQuizz () {

  question.style.visibility = "visible";
  console.log("display");
  canvas.style.opacity = "0.2";
  document.getElementById("homeCountDown").color = "red";
}


const Questions = [{
  id: 0,
  q: "In which discipline does Marie-Claude Pietragalla works?",
  a: [{ text: "Tennis", isCorrect: false },
      { text: "Marathon", isCorrect: false },
      { text: "Ballet", isCorrect: true },
      { text: "Sculpture", isCorrect: false }
  ]

},
{
  id: 1,
  q: "What is the capital of Thailand?",
  a: [{ text: "Lampang", isCorrect: false, isSelected: false },
      { text: "Phuket", isCorrect: false },
      { text: "Ayutthaya", isCorrect: false },
      { text: "Bangkok", isCorrect: true }
  ]

},
{
  id: 2,
  q: "What is the PH of the Coca Cola ?",
  a: [{ text: "2,8", isCorrect: false, isSelected: false },
      { text: "3,9", isCorrect: false },
      { text: "7", isCorrect: false },
      { text: "2,5", isCorrect: true }
  ]

},
{
  id: 3,
  q: "What's the name of Mozart's archenemy?",
  a: [{ text: "Verdi", isCorrect: false, isSelected: false },
      { text: "Bellini", isCorrect: false },
      { text: "Salieri", isCorrect: true },
      { text: "Wagner", isCorrect: false }
  ]

},

]

var start = true;

function iterate(id) {

var result = document.getElementsByClassName("result");
result[0].innerText = "";

const question = document.getElementById("question");

question.innerText = Questions[id].q;

const op1 = document.getElementById('op1');
const op2 = document.getElementById('op2');
const op3 = document.getElementById('op3');
const op4 = document.getElementById('op4');

op1.innerText = Questions[id].a[0].text;
op2.innerText = Questions[id].a[1].text;
op3.innerText = Questions[id].a[2].text;
op4.innerText = Questions[id].a[3].text;

op1.value = Questions[id].a[0].isCorrect;
op2.value = Questions[id].a[1].isCorrect;
op3.value = Questions[id].a[2].isCorrect;
op4.value = Questions[id].a[3].isCorrect;

var selected = "";

// Show selection for op1
op1.addEventListener("click", () => {
  selected = op1.value;
})

// Show selection for op2
op2.addEventListener("click", () => {
  selected = op2.value;
})

// Show selection for op3
op3.addEventListener("click", () => {
    selected = op3.value;
})

// Show selection for op4
op4.addEventListener("click", () => {
  selected = op4.value;
})

const submitAnswer = document.getElementsByClassName("submit_answer");

submitAnswer[0].addEventListener("click", () => {
  if (selected == "true") {
      start = false;
   if (id < 3) {
  id++;
  iterate(id);
  console.log(id);
}
  else if (id = 3) {
    openDoor();
  }
  }
  else {
      result[0].innerHTML = "Wrong answer. Please do better.";
      result[0].style.color = "violet";
  }
})
}

if (start) {
iterate("0");
}
var id = 0;



var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

disableScroll();

function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}


const modal = document.getElementById("modal");

const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", modalStartVisibilityHandler);
function modalStartVisibilityHandler() {
  modal.style.visibility = "hidden";
  play();
}

const modal2 = document.getElementById('modal2');

const restartBtn = document.getElementById("restart-btn");




function modalRestartVisibilityHandler() {
  modal2.style.visibility = "visible";
 canvas.style.opacity = 0.3;
 dead = true;
}

function refresh() {
  window.location.reload();
  // play();
}

restartBtn.addEventListener("click", refresh);

const points = document.getElementById("points");

//

function play () {
const homeCountDown = document.getElementById("homeCountDown");

function timerHome(limit) {
  return new Promise((resolve, reject) => {
    let count = 40;
    let id = setInterval(() => {
      count--;
      homeCountDown.textContent = count;
      timeVictory.textContent = 40 - count;
      died.textContent = 40 - count;
      if (count === limit ) resolve(id);
      if (done) resolve(id);
      if (dead) resolve(id);
    }, 1000);
  });
}

timerHome(0)
  .then((id) => {
    clearInterval(id);
    modalRestartVisibilityHandler();
  });


class Door {
  constructor(x, y) {
    this.x = 1300;
    this.y = 900;
    const img = new Image();
    img.src = './door.jpg';
    this.img = img;
    this.draw();
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, 50, 75);
  }
}


let ghostArray = [];

function generateGhosts () {
  ctx.save();
  let aGhost = new Ghost();
  aGhost.draw();
  ghostArray.push(aGhost);
}

for (var i = 0 ; i < 10 ; i++) {
  // ctx.save();
  generateGhosts();
}

// const aDoor = new Door();

let otterArray = [];

function generateOtters () {
    ctx.save();
    let anOtter = new Otter();
    anOtter.draw();
    otterArray.push(anOtter);
}

for (var i = 0 ; i < 3 ; i++) {
    // ctx.save();
    generateOtters();
}

const otterCounter = document.getElementById("otterCounter");

console.log(otterArray);

const otterDisplay = document.querySelectorAll("#otter_container div img");
const otterDisplayArr = Array.from(otterDisplay);


let countOtter = 0;
function pickOtters () {
  for (let i = 0 ; i < otterArray.length ; i ++) {
    if (otterArray[i].y - player.y < 70 && otterArray[i].x - player.x < 70 && otterArray[i].collected === false) {
      // console.log("rescued otters");
      countOtter += 1;
      otterDisplay[i].src = "./otterDrawing.jpg";
      otterArray[i].collected = true;
      console.log(otterArray[i]);
    }
  }
  otterCounter.textContent = countOtter;
}


function updateZombies() {
  updatePlayer();
  updatePrize();
  otterArray.forEach(otter => otter.draw());
  ghostArray.forEach(function (ghost) {
  ghost.draw();
  if (ghost.x > 1300 || ghost.y > 900 || ghost.x < 1 || ghost.y < 1) {
    ghost.move("minus");
  }
  else {
    ghost.move("plus");
  }
  if (((Math.abs(ghost.y - player.y) < 50) && (Math.abs(ghost.x - player.x) < 50))) {
        GameOver();
        stopFunction();
      }
    
    if (Math.abs(prize.y - player.y) < 100 && Math.abs(prize.x - player.x) < 100 && countOtter === 3) { 
      displayQuizz();
      stopFunction();
    }
});
}

const intervalId = setInterval(updateZombies, 70);

function stopFunction() {
  clearInterval(intervalId);
}

//Player.

class Player {
  constructor(x, y) {
    this.x = 30;
    this.y = 30;
    const imgPlayer = new Image();
    imgPlayer.src = './man-g8ee15bac5_640.png';
    this.img = imgPlayer;
    this.draw();
  }
  moveUp() {
    this.y -= 50;
  }
  moveDown() {
    this.y += 50;
  }
  moveLeft() {
    this.x -= 50;
  }
  moveRight() {
    this.x += 50;
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, 120, 120);
  }
}


const player = new Player();

document.addEventListener('keydown', e => {
  switch (e.keyCode) {
    case 38:
      player.moveUp();
      console.log('up', player);
      break;
    case 40:
      player.moveDown();
      console.log('down', player);
      break;
    case 37:
      player.moveLeft();
      console.log('left', player);
      break;
    case 39:
      player.moveRight();
      console.log('right', player);
      break;
  }
  updatePlayer();
});


function updatePlayer() {
  ctx.clearRect(0, 0, 1500, 1000);
  otterArray.forEach(otter => otter.draw());
  pickOtters();
  player.draw();
  prize.draw();
  ghostArray.forEach(ghost => ghost.draw());
  }

//
function GameOver() {
  ctx.clearRect(0, 0, 1500, 1000);
  modalRestartVisibilityHandler();
}

class Prize {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    const img = new Image();
    img.src = './geisha.png';
    this.img = img;
    this.draw();
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, 150, 150);
  }
}

const prize = new Prize(800, 800);

function updatePrize() {
  ctx.clearRect(0, 0, 1500, 1000);
  otterArray.forEach(otter => otter.draw());
  prize.draw();
  player.draw();
  ghostArray.forEach(ghost => ghost.draw());
}
}



export {ctx};

