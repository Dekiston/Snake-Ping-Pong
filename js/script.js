let point = 0;
    let maxpoint = 0;
    document.getElementById("score").innerHTML = point;
    document.getElementById("maxscore").innerHTML = maxpoint;

    let canvas = document.getElementById('game');
   
    let context = canvas.getContext('2d');
    
    let grid = 16;

    let count = 0;
    
    let snake = {
      
      x: 160,
      y: 160,
      
      dx: grid,
      dy: 0,
    
      cells: [],
      maxCells: 4
    };
    
    let food = {
        x: getRandomInt(0, 40) * grid,
        y: getRandomInt(0, 40) * grid
    };
    
    let foodtwoup = {};

    let foodcut = {};

    function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min)) + min; }

    function GetFood () {
      const x = getRandomInt (0, 10);
      console.log (x);
      switch (x) {
        case 0:
        case 1:
          foodcut = {};
          food = {};
          foodtwoup.x = getRandomInt(0, 40) * grid;
          foodtwoup.y = getRandomInt(0, 40) * grid;
          break;

        case 2:
          foodtwoup = {};
          food = {};
          foodcut.x = getRandomInt(0, 40) * grid;
          foodcut.y = getRandomInt(0, 40) * grid;
          break;
        
        default:
          foodtwoup = {};
          foodcut = {};
          food.x = getRandomInt(0, 40) * grid;
          food.y = getRandomInt(0, 40) * grid;
          break;
      }
    }
    
   
    function loop() {
      requestAnimationFrame(loop);
      if (++count < 4) { return; }
      
      count = 0;
     
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      snake.x += snake.dx;
      snake.y += snake.dy;
      
      if (snake.x < 0) { snake.x = canvas.width - grid; }
      else if (snake.x >= canvas.width) { snake.x = 0; }
      
      if (snake.y < 0) { snake.y = canvas.height - grid; }
      else if (snake.y >= canvas.height) { snake.y = 0; }
      
      snake.cells.unshift({ x: snake.x, y: snake.y });
      
      if (snake.cells.length > snake.maxCells) { snake.cells.pop(); }
      
      context.fillStyle = 'red';
      context.fillRect(food.x, food.y, grid - 1, grid - 1);

      context.fillStyle = 'blue';
      context.fillRect(foodcut.x, foodcut.y, grid - 1, grid - 1);

      context.fillStyle = 'yellow';
      context.fillRect(foodtwoup.x, foodtwoup.y, grid - 1, grid - 1);

      context.fillStyle = 'green';
      snake.cells.forEach(function (cell, index) {
        
      context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        
      if (cell.x === food.x && cell.y === food.y) {
          point++;
          document.getElementById("score").innerHTML = point;
          snake.maxCells++;
          GetFood();
        
        }

      if (cell.x === foodtwoup.x && cell.y === foodtwoup.y) {
            point += 3;
            document.getElementById("score").innerHTML = point;
            snake.maxCells += 3;
            GetFood();
          
          }
          
      if (cell.x === foodcut.x && cell.y === foodcut.y) {
            point -= 1;
            document.getElementById("score").innerHTML = point;
            snake.maxCells -= 2;
            snake.cells.pop();
            snake.cells.pop();
            GetFood();
          
      }

      for (let i = index + 1; i < snake.cells.length; i++) {
          if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            snake.x = 160;
            snake.y = 160;
            snake.cells = [];
            snake.maxCells = 4;
            snake.dx = grid;
            snake.dy = 0;
            if (maxpoint < point) { maxpoint = point; }
            point = 0;
            document.getElementById("maxscore").innerHTML = maxpoint;Z
            document.getElementById("score").innerHTML = point;

          }
        }
      });
    }

    
    
    document.addEventListener('keydown', function (e) {
      if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
      }
      
      else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
      }
      
      else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
      }
      
      else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
      }
    });
    
    requestAnimationFrame(loop);