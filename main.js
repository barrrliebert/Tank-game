//Deklarasi
const tank = document.getElementById('tank');
let posx = parseInt(getComputedStyle(tank).right, 10);
const bullet = document.getElementById('bullet');
const opponent = document.getElementById('opponent');

// Function to move the opponent towards the tank
function moveOpponent() {
  const opponentPos = parseInt(getComputedStyle(opponent).top, 10);
  opponent.style.top = (opponentPos + 25) + 'px'; // Increase the speed as needed
}

// Function to check for collision between two elements
function isCollision(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();
 
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

// Add this variable to store the score
let score = 0;

function handleCollision() {
  console.log('Opponent hit!');
  opponent.style.display = 'none';

  // Update the score
  score += 100;

  // Update the score display in the HTML
  document.getElementById('score').textContent = score;

  // Check if the player reached 500 points
  if (score === 500) {
    // Show SweetAlert when the score reaches 500
    Swal.fire({
      title: 'Congratulations!',
      text: 'You reached 500 points!',
      icon: 'success',
      confirmButtonText: 'Play Again!!!'
    }).then((result) => {
      // Check if the user clicked "OK"
      if (result.isConfirmed) {
        // Reload the page
        location.reload();
      }
    });
  }
}

// Add this variable to store the opponent interval
let opponentInterval;

// Function to generate a random position for the opponent
function generateRandomPosition() {
  const maxX = window.innerWidth - 50; // Adjust the value based on your game layout
  const randomX = Math.floor(Math.random() * maxX);
  return randomX + 'px';
}

// Function to spawn the opponent at a random position
function spawnOpponent() {
  const opponent = document.getElementById('opponent');
  opponent.style.top = '0px'; // Reset the opponent to the top
  opponent.style.left = generateRandomPosition();
  opponent.style.display = 'block';
}

// Start the opponent spawning interval
opponentInterval = setInterval(spawnOpponent, 3000); // Spawn opponent every 3 seconds

// Modify the tembak() function to check for collision after shooting
function tembak() {
  const shootSound = document.getElementById('shootSound');
  shootSound.currentTime = 0;
  shootSound.play();

  bullet.style.top = '-900px';

  setTimeout(() => {
    bullet.style.opacity = '0%';
    bullet.style.top = '0px';

    // Check for collision after bullet animation
    if (isCollision(bullet, opponent)) {
      handleCollision();
    }
  }, 300);

  bullet.style.opacity = '100%';
}


function loncat() {
  tank.style.top = '-250px'
  setTimeout(() => {
    tank.style.top = '0px'
  }, 800)

  bullet.style.top = '-250px'
  setTimeout(() => {
    bullet.style.top = '0px'
  }, 800)
}

function kekanan() {
  tank.style.right = (posx - 100) + "px";
  posx = parseInt(getComputedStyle(tank).right, 10);

  bullet.style.right = (posx - 1) + "px";
  posx = parseInt(getComputedStyle(bullet).right, 10);
}

function kekiri() {
  tank.style.right = (posx + 100) + "px";
  posx = parseInt(getComputedStyle(tank).right, 10);

  bullet.style.right = (posx + 1) + "px";
  posx = parseInt(getComputedStyle(bullet).right, 10);

}

// Event
document.addEventListener("keydown", function (event) {
  event.preventDefault();
  const key = event.key;
  switch (key) {

    case " ":
      loncat()
      break;

    case "ArrowLeft":
      kekiri()
      break;

    case "ArrowRight":
      kekanan()
      break;

    case "z":
      tembak()
      break;

  }
});
setInterval(moveOpponent, 15);