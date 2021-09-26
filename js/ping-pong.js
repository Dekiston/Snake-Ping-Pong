let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
document.getElementById("score").innerHTML = point;

const grid = 15;
const paddleHeight = grid * 5;
const maxPaddleY = canvas.width - grid - paddleHeight;
let paddleSpeed = 6;
let ballSpeed = 5;
