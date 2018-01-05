LocatePrint
======================

Display a console of an old home computer. (WebGL required)

### Demos

![consolephysics](http://abagames.github.io/LocatePrint/samples/consolephysics.gif)
[consolephysics](http://abagames.github.io/LocatePrint/samples/index.html?consolephysics)

![skigame](http://abagames.github.io/LocatePrint/samples/skigame.gif)
[skigame](http://abagames.github.io/LocatePrint/samples/index.html?skigame)

![scrolltext](http://abagames.github.io/LocatePrint/samples/scrolltext.gif) 
[scrolltext](http://abagames.github.io/LocatePrint/samples/index.html?scrolltext)

![snake-shift](http://abagames.sakura.ne.jp/18/snake-shift/screenshot.gif) 
[snake-shift](https://snake-shift.glitch.me/) / [(source)](https://github.com/abagames/snake-shift)

### Usage

* Load the font and the library.

```html
  <link href="https://fonts.googleapis.com/css?family=VT323" rel="stylesheet">
  <script src="locate-print/index.js"></script>
```

* Initialize locate-print.

```js
var ticks = 0;

window.onload = () => {
  // initialize LocatePrint
  lp.init();
  // update the display in each frame
  requestAnimationFrame(update);
}
```

* Set a color and print a text.

```js
function update() {
  requestAnimationFrame(update);
  // set a color of a text
  //  0: black, 1: red, 2: blue 3: green
  //  4: yellow, 5: magenta, 6: cyan, 7: white
  lp.color(ticks % 8);
  // print a text
  lp.print('Abc', lp.scrollAtLastChar);
  // set a foreground color and a background color
  lp.color(0, ticks % 8);
  lp.print('Def', lp.scrollAtLastChar);
  // 'update' should be called in each frame
  lp.update();
  ticks++;
}
```

### Commands

* setCanvasSize, setColorPalettes, console

```js
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
```

* cls

```js
  // clear the console
  lp.cls();
```

* color, locate, print

```js
  var ts = 'SKI GAME'.substring(0, floor(ticks / 5));
  // set the character color
  // params: (foreground, background = 0)
  lp.color(0, 1);
  // set the cursor location x/y
  lp.locate(19 - ts.length, 5);
  // print the text
  lp.print(ts);
```

* scroll, screen

```js
  // scroll the console 
  lp.scroll(0, -1);
  lp.color(0, 1);
  // get the string on the console at the specific location x/y
  var cc: string = lp.screen(sx, 4);
```

### Acknowledgement

* Libraries

[glfx.js](http://evanw.github.io/glfx.js/) /
[Matter.js](http://brm.io/matter-js/) /
[gif-capture-canvas](https://github.com/abagames/gif-capture-canvas)

* Articles

[WebGL Fake CRT Effect for HTML5 Games](http://www.zachstronaut.com/posts/2012/08/17/webgl-fake-crt-html5.html)

[Loading custom shaders](https://github.com/evanw/glfx.js/issues/9)
