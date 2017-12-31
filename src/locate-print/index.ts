// LocatePrint (https://github.com/abagames/LocatePrint)
//  display a console of an old home computer

import * as fx from 'glfx';
import colorShift from './shaders/colorshift';
import scanlines from './shaders/scanlines';

export const scrollNone = 0;
export const scrollAtLastChar = 1;
export const scrollAtLastLine = 2;
export let fxCanvas: any;
export let canvas: HTMLCanvasElement;
export let consoleWidth: number;
export let consoleHeight: number;
export let cursorX = 0;
export let cursorY = 0;
let context: CanvasRenderingContext2D;
let colorPalettes: string[];
let fontName: string;
let texture: any;
let ticks = 0;
let texts: string[][];
let colors: number[][];
let backgroundColors: number[][];
let currentColor: number;
let currentBackgroundColor: number;
let textAreaPaddingX: number;
let textAreaPaddingY: number;
let textWidth: number;
let textHeight: number;

export function init() {
	fxCanvas = fx.canvas();
	fxCanvas.colorShift = fx.wrap(colorShift);
	fxCanvas.scanlines = fx.wrap(scanlines);
	fxCanvas.id = 'locate-print-canvas';
	canvas = document.createElement('canvas');
	canvas.width = 640;
	canvas.height = 480;
	context = canvas.getContext('2d');
	texture = fxCanvas.texture(canvas);
	colorPalettes =
		['black', 'red', 'green', 'blue', 'yellow', 'magenta', 'cyan', 'white'];
	fontName = 'VT323';
	currentColor = colorPalettes.length - 1;
	currentBackgroundColor = 0;
	console(40, 20);
	document.body.appendChild(fxCanvas);
}

export function setCanvasSize(width: number, height: number) {
	canvas.width = width;
	canvas.height = height;
}

export function setCanvasStyle(style: string) {
	fxCanvas.style = style;
}

export function setColorPalettes(_colorPalettes: string[] = null) {
	colorPalettes = _colorPalettes;
	currentColor = _colorPalettes.length - 1;
	currentBackgroundColor = 0;
}

export function setFontName(_fontName: string) {
	fontName = _fontName;
}

export function update() {
	renderTexts();
	texture.loadContentsOf(canvas);
	fxCanvas.draw(texture).
		colorShift().
		scanlines(ticks * canvas.height * 0.000005).
		bulgePinch(canvas.width / 2, canvas.height / 2,
		canvas.width * 0.75, 0.12).
		vignette(0.25, 0.65).
		update();
	ticks++;
}

export function console(width: number, height: number) {
	consoleWidth = width;
	consoleHeight = height;
	texts = times(width, () => times(height, () => null));
	colors = times(width, () => times(height, () => 0));
	backgroundColors = times(width, () => times(height, () => 0));
	cls();
}

export function locate(x: number, y: number) {
	cursorX = clamp(Math.floor(x), 0, consoleWidth - 1);
	cursorY = clamp(Math.floor(y), 0, consoleHeight - 1);
}

export function print(text: string, scrollType: number = scrollNone) {
	calcTextSize();
	const cx = cursorX;
	forEach(text, (c: string) => {
		if (c === '\n') {
			cursorX = cx;
			cursorY++;
		}
		if (cursorY >= consoleHeight) {
			return false;
		}
		texts[cursorX][cursorY] = c;
		colors[cursorX][cursorY] = currentColor;
		backgroundColors[cursorX][cursorY] =
			currentBackgroundColor;
		cursorX++;
		if (cursorX >= consoleWidth) {
			cursorX = 0;
			cursorY++;
			if ((scrollType !== scrollNone &&
				cursorY >= consoleHeight)) {
				scroll(0, -1);
			}
		}
	});
	if (scrollType === scrollAtLastLine &&
		cursorY >= consoleHeight - 1) {
		scroll(0, -1);
	}
	return this;
}

export function color(foreground: number, background: number = 0) {
	currentColor = foreground;
	currentBackgroundColor = background;
}

export function cls() {
	times(consoleHeight, (y) => {
		times(consoleWidth, (x) => {
			texts[x][y] = null;
		});
	});
	cursorX = cursorY = 0;
}

export function scroll(offsetX: number, offsetY: number = 0) {
	var w = consoleWidth;
	var h = consoleHeight;
	var ntexts = times(w, () => times(h, () => null));
	var ncolors = times(w, () => times(h, () => 0));
	var nbackgroundColors = times(w, () => times(h, () => 0));
	times(consoleHeight, (y) => {
		var ny = y + offsetY;
		if (ny >= 0 && ny < consoleHeight) {
			times(consoleWidth, (x) => {
				var nx = x + offsetX;
				if (nx >= 0 && nx < consoleWidth) {
					ntexts[nx][ny] = texts[x][y];
					ncolors[nx][ny] = colors[x][y];
					nbackgroundColors[nx][ny] = backgroundColors[x][y];
				}
			});
		}
	});
	texts = ntexts;
	colors = ncolors;
	backgroundColors = nbackgroundColors;
	cursorX = clamp(cursorX + offsetX,
		0, consoleWidth - 1);
	cursorY = clamp(cursorY + offsetY,
		0, consoleHeight - 1);
}

export function screen(x: number, y: number): string {
	if (x < 0 || x >= consoleWidth || y < 0 || y >= consoleHeight) {
		return null;
	}
	return texts[x][y];
}

function calcTextSize() {
	textAreaPaddingX = canvas.width * 0.05;
	textAreaPaddingY = canvas.height * 0.05;
	textWidth =
		(canvas.width - textAreaPaddingX * 2) / consoleWidth;
	textHeight =
		(canvas.height - textAreaPaddingY * 2) / consoleHeight;
	context.font =
		Math.floor(textHeight * 1.3) + 'px ' + fontName;
	context.textAlign = 'center';
	context.textBaseline = 'middle';
}

function renderTexts() {
	calcTextSize();
	context.fillStyle = colorPalettes[0];
	context.fillRect(textAreaPaddingX, textAreaPaddingY * 0.9,
		canvas.width - textAreaPaddingX * 2,
		canvas.height - textAreaPaddingY * 2 * 0.9);
	times(consoleHeight, (y) => {
		times(consoleWidth, (x) => {
			drawChar(x, y);
		});
	});
}

function drawChar(x: number, y: number) {
	var c = texts[x][y];
	if (!c) {
		return;
	}
	var px = (x + 0.5) * textWidth + textAreaPaddingX;
	var py = (y + 0.5) * textHeight + textAreaPaddingY;
	var bClr = backgroundColors[x][y];
	if (bClr > 0) {
		context.fillStyle = colorPalettes[bClr];
		context.fillRect
			(px - textWidth / 2, py - textHeight / 2,
			textWidth, textHeight);
	}
	if (c !== ' ') {
		var clr = colors[x][y];
		context.fillStyle = colorPalettes[clr];
		context.fillText(c, px, py);
	}
}

function clamp(v: number, min: number, max: number) {
	if (v < min) {
		return min;
	} else if (v > max) {
		return max;
	} else {
		return v;
	}
}

function times(n: number, func: Function) {
	let result = [];
	for (let i = 0; i < n; i++) {
		result.push(func(i));
	}
	return result;
}

function forEach(array: any[] | string, func: Function) {
	let result = [];
	for (let i = 0; i < array.length; i++) {
		result.push(func(array[i]));
	}
	return result;
}
