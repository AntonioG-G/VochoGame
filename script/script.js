let gameStart = false;
let points = 0;
let obstacle = document.getElementById("obstacle");
let player = document.getElementById("vocho");

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
  });
};

const playerAnimation = () => {
  player.style.animation = "spriteAnimation 0.25s steps(1) infinite";
};

const groundAnimation = () => {
  const ground = document.getElementById("ground");
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
  let score = document.getElementById("score");
  points++;
  score.textContent = points;
};

const gameLoop = () => {
    if (playerCollision()) {
      alert("¡Colisión detectada!");
    }
    requestAnimationFrame(gameLoop);
  };

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
    if (!gameStart) {
      groundAnimation();
      playerAnimation();
      obstacleAnimation();
      setInterval(() => {
        playerScore();
      }, 250);
      gameStart = true;
      requestAnimationFrame(gameLoop);
    } else {
      setInterval(() => {
        obstacleAnimation();
      }, Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000);
      playerJump();
    }
  }
});
