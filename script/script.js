let gameStart = false;
let canPlay = false;
let points = 0;
let tempo;
let tempo2;
const ground = document.getElementById("ground");
let score = document.getElementById("score");
let obstacle = document.getElementById("obstacle");
let player = document.getElementById("vocho");
let fail = document.getElementById("fail");

const submitNick = () => {
  const userName = document.getElementById("text");
  const name = userName.value;
  if (name !== "") {
    let user = document.getElementById("user");
    user.textContent = name;

    fadeOut();
  } else {
    const nickError = document.getElementById("nickError");
    nickError.style.visibility = "visible";
    nickError.style.animation = "fadeOut 3s";
    nickError.addEventListener("animationend", () => {
      nickError.style.visibility = "hidden";
    });
  }
};

const fadeOut = () => {
  const intro = document.getElementById("intro");
  intro.style.animation = "fadeOut 1.2s";
  intro.addEventListener("animationend", () => {
    intro.remove();
    canPlay = true;
    tempo = setInterval(() => {
      playerScore();
    }, 250);
  });
};

const playerAnimation = () => {
  player.style.animation = "spriteAnimation 0.25s steps(1) infinite";
};

const groundAnimation = () => {
  ground.style.animation = "groundAnimation 2s linear infinite";
};

const obstacleAnimation = () => {
  obstacle.style.animation = "obstacleAnimation 1.4s linear";
  obstacle.addEventListener("animationend", function(event) {
    obstacle.style.animation = "none";
  });
};

const playerJump = () => {
  player.style.animation = "jumpAnimation 0.65s";
  player.addEventListener("animationend", () => {
    playerAnimation();
  });
};

const playerScore = () => {
  points++;
  score.textContent = points;

};

const gameLoop = () => {
    if (playerCollision()) {

      canPlay=false;
      gameStart =false;
      fail.style.visibility = "visible";
      clearInterval(tempo);
      clearInterval(tempo2);
      ground.style.animation = 'none';
      player.style.animation = 'none';
      obstacle.style.animation = 'none';
      player.style.backgroundPosition = '-960px 0';
    }
    requestAnimationFrame(gameLoop);
};

const retry = () =>{
  player.style.backgroundPosition = '0 0';
  gameStart = true;
  canPlay = true;
  points = 0;
  fail.style.visibility = "hidden";
  groundAnimation();
  playerAnimation();
  tempo = setInterval(() => {
    playerScore();
  }, 250);
}

const playerCollision = () => {
const playerRect = player.getBoundingClientRect();
const obstacleRect = obstacle.getBoundingClientRect();

return (
    playerRect.x < obstacleRect.x + obstacleRect.width &&
    playerRect.x + playerRect.width > obstacleRect.x &&
    playerRect.y < obstacleRect.y + obstacleRect.height &&
    playerRect.y + playerRect.height > obstacleRect.y
);
};
document.addEventListener("keydown", function(event) {
  if (event.code === "Space") {
    if (canPlay) {
      if (!gameStart) {
        groundAnimation();
        playerAnimation();
        obstacleAnimation();
        gameStart = true;
        requestAnimationFrame(gameLoop);
      } else {
        tempo2 = setInterval(() => {
          obstacleAnimation();
        }, Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000);
        playerJump();
      }
    }
  }
});