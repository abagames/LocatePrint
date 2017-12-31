import * as lp from '../locate-print/index';
import * as gcc from 'gcc';

let snakeX = 0;
let snakeY = 0;
let snakeVx = 0;
let snakeVy = 0;
let snakePoss = [];
let itemX = 0;
let itemY = 0;
let itemScore = 100;

function startGame() {
  ticks = 0;
  isTitle = isGameOver = false;
  score = 0;
  lp.cls();
  lp.print(times(40, () => '#').join(''));
  times(18, () => {
    lp.print('#' + times(38, () => ' ').join('') + '#');
  });
  lp.print(times(40, () => '#').join(''));
  snakeX = 20;
  snakeY = 10;
  snakePoss = [];
  times(3, i => {
    const x = snakeX;
    const y = snakeY + 2 - i;
    snakePoss.push({ x, y });
    lp.locate(x, y);
    lp.print(i === 2 ? '@' : 'H');
  });
  addItem();
}

function addItem() {
  for (let i = 0; i < 100; i++) {
    itemX = randomInt(38) + 1;
    itemY = randomInt(18) + 1;
    if (lp.screen(itemX, itemY) === ' ') {
      break;
    }
  }
  lp.color(0, 7);
  lp.locate(itemX, itemY);
  lp.print('$');
  itemScore += 100;
}

const ways = [[-1, 0], [0, -1], [1, 0], [0, 1]];
let isPressing = false;

function updateGame() {
  snakeVx = snakeVy = 0;
  times(4, i => {
    if (isKeyDown[i + 37]) {
      snakeVx = ways[i][0];
      snakeVy = ways[i][1];
    }
  });
  if (snakeVx !== 0 || snakeVy !== 0) {
    if (!isPressing) {
      isPressing = true;
      for (let i = 0; i < 100; i++) {
        if (moveSnake() === false) {
          break;
        }
      }
    }
  } else {
    isPressing = false;
  }
  drawScore();
  itemScore = floor(itemScore * 0.99);
  if (itemScore <= 0) {
    itemScore = 1;
  }
  const iss = ` ${itemScore} `;
  lp.locate(20 - floor(iss.length / 2), 0);
  lp.print(iss);
  let wc = 0;
  times(4, i => {
    const rx = snakeX + ways[i][0];
    const ry = snakeY + ways[i][1];
    const rs = lp.screen(rx, ry);
    if ((rs !== ' ' && rs !== '$') || ry < 1) {
      wc++;
    }
  });
  if (wc >= 4) {
    startGameOver();
  }
}

function moveSnake() {
  const x = snakeX;
  const y = snakeY;
  const nx = x + snakeVx;
  const ny = y + snakeVy;
  let isMoving = true;
  let isGettingItem = false;
  const ns = lp.screen(nx, ny);
  if ((ns !== ' ' && ns !== '$') || ny < 1) {
    return false;
  }
  if ((snakeVx !== 0 && nx === itemX) || (snakeVy !== 0 && ny === itemY)) {
    if (lp.screen(nx, ny) === '$') {
      score += itemScore;
      addItem();
      isGettingItem = true;
    }
    isMoving = false;
  }
  lp.color(7);
  if (!isGettingItem) {
    const p = snakePoss[0];
    lp.locate(p.x, p.y);
    lp.print(' ');
    snakePoss.shift();
  }
  lp.locate(x, y);
  lp.print('H');
  snakePoss.push({ x: nx, y: ny });
  lp.locate(nx, ny);
  lp.print('@');
  snakeX = nx;
  snakeY = ny;
  return isMoving;
}

function updateTitle() {
  if (ticks === 1) {
    if (score > 0) {
      drawScore();
    }
    lp.locate(3, 1);
    lp.print(`
##@ #  #  ##  #  @ ####
#   ## # #  # # #  #
### ## # #  # ##   ###
  # # ## #### # #  #
### @ ## #  @ #  # ######@
`);
    lp.locate(10, 7);
    lp.print(`
   ### #  # @  ###@ @###
   #   #  # #  #     #
   ### #### #  ###   #
     # #  # #  #     #
@##### #  @ #  #     #
    

`);
  }
  if (ticks < 60) {
  } else {
    var t = ticks % 60;
    lp.color(7);
    lp.locate(10, 16);
    if (t === 0) {
      lp.print('PUSH SPACE TO START');
    } else if (t === 30) {
      lp.print('                   ');
    }
  }
  if (isKeyDown[32]) {
    startGame();
  }
}

function updateGameOver() {
  if (ticks === 1) {
    lp.color(0, 7);
    lp.locate(15, 9);
    lp.print("GAME OVER");
    drawScore();
  }
  if (ticks > 180) {
    startTitle();
  }
  if (isKeyDown[32]) {
    startGame();
  }
}

let isKeyDown: boolean[];
let isTitle = false;
let isGameOver = false;
let ticks = 0;
let score = 0;
const floor = Math.floor;
const random = Math.random;
const randomInt = (n) => floor(random() * n);

window.onload = () => {
  lp.init();
  isKeyDown = times(256, () => false);
  window.onkeydown = (e: KeyboardEvent) => {
    var kc = e.keyCode;
    isKeyDown[kc] = true;
    if (kc >= 37 && kc <= 40) {
      e.preventDefault();
    }
  };
  window.onkeyup = (e: KeyboardEvent) => {
    isKeyDown[e.keyCode] = false;
  };
  startTitle();
  update();
}

function update() {
  requestAnimationFrame(update);
  if (isTitle) {
    updateTitle();
  } else if (isGameOver) {
    updateGameOver();
  } else {
    updateGame();
  }
  lp.update();
  //gcc.capture(lp.fxCanvas);
  ticks++;
}

function startTitle() {
  ticks = 0;
  isTitle = true;
  lp.cls();
}

function startGameOver() {
  ticks = 0;
  isGameOver = true;
}

function drawScore() {
  lp.color(7);
  lp.locate(0, 0);
  lp.print('SCORE ' + score);
}

function times(n: number, func: Function) {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(func(i));
  }
  return result;
}
