// scrolltext
//  demo program of LocatePrint (https://github.com/abagames/LocatePrint)

import * as lp from '../locate-print/index';

var ticks = 0;

window.onload = () => {
	// initialize LocatePrint
	lp.init();
	// align the display to center
	lp.setCanvasStyle('inline');
	// update the display in each frame
	requestAnimationFrame(update);
}

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
