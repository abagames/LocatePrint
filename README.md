LocatePoint
======================

Display a console of an old home computer.

![scrolltext](http://abagames.sakura.ne.jp/15/LocatePrint/scrolltext.gif) 
![skigame](http://abagames.sakura.ne.jp/15/LocatePrint/skigame.gif)

[play skigame](http://abagames.sakura.ne.jp/15/LocatePrint/skigame.html)

### Usage

* Include libraries to HTML.

```html
    <script src="libs/glfx/glfx.js"></script>
    <script src="shaders/colorshift.js"></script>
    <script src="shaders/scanlines.js"></script>
    <script src="LocatePrint.js"></script>
```

* Initialize LocatePrint.

```ts
var lp;
var ticks = 0;

window.onload = () => {
	// initialize LocatePrint
	lp = new LocatePrint();
	// update the display in each frame
	requestAnimationFrame(update);
}
```

* Set a color and print a text.

```ts
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

```ts
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

```ts
	// clear the console
	lp.cls();
```

* color, locate, print

```ts
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

```ts
	// scroll the console 
	lp.scroll(0, -1);
	lp.color(0, 1);
	// get the string on the console at the specific location x/y
	var cc: string = lp.screen(sx, 4);
```

### Acknowledgement

* Libraries

[glfx.js](http://evanw.github.io/glfx.js/) /
[lodash](https://lodash.com/) /
[GifCaptureCanvas](https://github.com/abagames/GifCaptureCanvas)

* Articles

[WebGL Fake CRT Effect for HTML5 Games](http://www.zachstronaut.com/posts/2012/08/17/webgl-fake-crt-html5.html)

[Loading custom shaders](https://github.com/evanw/glfx.js/issues/9)

License
----------
MIT
