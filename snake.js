const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let score = 0;
let speed = 200;
let snake = [{ x: 10 * box, y: 10 * box }];
let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box,
};
let direction;

// Fungsi menggambar kotak
function drawBox(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, box, box);
}

// Fungsi menggambar canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gambar makanan
  drawBox(food.x, food.y, 'red');

  // Gambar snake
  for (let i = 0; i < snake.length; i++) {
    drawBox(snake[i].x, snake[i].y, i === 0 ? 'green' : 'white');
  }

  // Posisi kepala snake
  let headX = snake[0].x;
  let headY = snake[0].y;

  // Gerakan snake
  if (direction === 'LEFT') headX -= box;
  if (direction === 'UP') headY -= box;
  if (direction === 'RIGHT') headX += box;
  if (direction === 'DOWN') headY += box;

  // Cek apakah snake makan makanan
  if (headX === food.x && headY === food.y) {
    score++;
    document.querySelector('.score').innerText = `Score: ${score}`;
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box,
    };

    // Percepat permainan
    if (speed > 50) speed -= 10;
    clearInterval(game);
    game = setInterval(draw, speed);
  } else {
    snake.pop();
  }

  // Tambahkan kepala baru
  let newHead = { x: headX, y: headY };

  // Game over jika menabrak dinding atau diri sendiri
  if (
    headX < 0 ||
    headY < 0 ||
    headX >= canvas.width ||
    headY >= canvas.height ||
    snake.some((segment) => segment.x === headX && segment.y === headY)
  ) {
    alert(`Game Over! Skor Anda: ${score}`);
    document.location.reload();
  }

  snake.unshift(newHead);
}

// Kontrol gerakan
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
  if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});

// Mulai game
let game = setInterval(draw, speed);
