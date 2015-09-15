// SKI GAME
//  demo program of LocatePrint (https://github.com/abagames/LocatePrint)
/// <reference path="../typings/lodash/lodash.d.ts" />
/// <reference path="LocatePrint.ts" />
/// <reference path="../typings/GifCaptureCanvas/GifCaptureCanvas.d.ts" />
var lp;
var isKeyDown;
var ticks;
var score;
var sx;
var gateScore;
var isTitle;
var isGameOver;
var isEnableCapture = false;
var gifCaptureCanvas;
var floor = Math.floor;
var random = Math.random;
window.onload = function () {
    // initialize LocatePrint
    lp = new LocatePrint();
    // align the display to center
    lp.style.display = 'inline';
    // set the pixel widht/height of the canvas
    // default: 640 x 480
    lp.setCanvasSize(640, 400);
    // set the color palettes (0: green, 1: white)
    // default: 0: black, 1: red, 2: blue 3: green
    //          4: yellow, 5: magenta, 6: cyan, 7: white
    lp.setColorPalettes(['green', 'white']);
    // set the character width/height of the console
    // default: 40 x 20
    lp.console(32, 16);
    isKeyDown = _.times(256, function () { return false; });
    window.onkeydown = function (e) {
        var kc = e.keyCode;
        isKeyDown[kc] = true;
        if (kc >= 37 && kc <= 40) {
            e.preventDefault();
        }
    };
    window.onkeyup = function (e) {
        isKeyDown[e.keyCode] = false;
    };
    if (isEnableCapture) {
        gifCaptureCanvas = new GifCaptureCanvas();
    }
    startTitle();
    requestAnimationFrame(updateFrame);
};
function updateFrame() {
    requestAnimationFrame(updateFrame);
    if (isTitle) {
        updateTitle();
    }
    else if (isGameOver) {
        updateGameOver();
    }
    else {
        updateGame();
    }
    lp.update();
    if (isEnableCapture && (ticks % 3) === 0) {
        gifCaptureCanvas.capture(lp.fxCanvas);
    }
    ticks++;
}
function startTitle() {
    ticks = 0;
    isTitle = true;
    // clear the console
    lp.cls();
}
function startGame() {
    ticks = 0;
    isTitle = isGameOver = false;
    score = 0;
    gateScore = 10;
    sx = 16;
    lp.cls();
}
function startGameOver() {
    ticks = 0;
    isGameOver = true;
}
function updateTitle() {
    if (ticks === 1 && score > 0) {
        drawScore();
    }
    if (ticks < 60) {
        var ts = 'SKI GAME'.substring(0, floor(ticks / 5));
        // set the character color
        // params: (foreground, background = 0)
        lp.color(0, 1);
        // set the cursor location x/y
        lp.locate(19 - ts.length, 5);
        // print the text
        lp.print(ts);
    }
    else {
        var t = ticks % 60;
        lp.color(1);
        lp.locate(6, 10);
        if (t === 0) {
            lp.print('PUSH SPACE TO START');
        }
        else if (t === 30) {
            lp.print('                   ');
        }
    }
    if (isKeyDown[32]) {
        startGame();
    }
}
function updateGame() {
    gateScore -= (gateScore - 10) * 0.01;
    var dfc = Math.sqrt(ticks * 0.002) + 1;
    if (ticks % floor(6 / dfc + 1) > 0) {
        return;
    }
    lp.locate(sx, 4);
    lp.color(1);
    lp.print('V');
    if (isKeyDown[37] && sx > 0) {
        sx--;
    }
    if (isKeyDown[39] && sx < 31) {
        sx++;
    }
    // scroll the console 
    lp.scroll(0, -1);
    lp.color(0, 1);
    // get the string on the console at the specific location x/y
    var cc = lp.screen(sx, 4);
    if (cc === '-') {
        lp.locate(sx + 1, 4);
        lp.print('+' + floor(gateScore));
        score += floor(gateScore);
        gateScore += 10;
    }
    else if (cc === '[' || cc === ']') {
        startGameOver();
        return;
    }
    lp.locate(sx, 4);
    lp.print('V');
    lp.color(1);
    if (random() > 0.6 + 0.3 / dfc) {
        var l = floor(random() * 5 + 4);
        var x = floor(random() * (33 - l));
        var str = '[' + _.repeat('-', l - 2) + ']';
        lp.locate(x, 15);
        lp.print(str);
    }
    drawScore();
}
function drawScore() {
    lp.color(1);
    lp.locate(0, 0);
    lp.print('SCORE ' + score);
}
function updateGameOver() {
    if (ticks === 1) {
        lp.color(0, 1);
        lp.locate(10, 7);
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
//# sourceMappingURL=skigame.js.map