// LocatePrint (https://github.com/abagames/LocatePrint)
//  display a console of an old home computer

/// <reference path="../typings/lodash/lodash.d.ts" />
declare var fx: any;
declare var colorShift: any;
declare var scanlines: any;

class LocatePrint {
	scrollNone = 0;
	scrollAtLastChar = 1;
	scrollAtLastLine = 2;
	fxCanvas: any;
	style: CSSStyleDeclaration;
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
	colorPalettes: string[];
	fontName: string;
	texture: any;
	ticks = 0;
	consoleWidth: number;
	consoleHeight: number;
	cursorX = 0;
	cursorY = 0;
	texts: string[][];
	colors: number[][];
	backgroundColors: number[][];
	currentColor: number;
	currentBackgroundColor: number;
	textAreaPaddingX: number;
	textAreaPaddingY: number;
	textWidth: number;
	textHeight: number;

	constructor() {
		this.fxCanvas = fx.canvas();
		this.fxCanvas.colorShift = fx.wrap(colorShift);
		this.fxCanvas.scanlines = fx.wrap(scanlines);
		this.style = this.fxCanvas.style;
		this.canvas = document.createElement('canvas');
		this.canvas.width = 640;
		this.canvas.height = 480;
		this.context = this.canvas.getContext('2d');
		this.texture = this.fxCanvas.texture(this.canvas);
		this.update = this.update.bind(this);
		this.colorPalettes =
		['black', 'red', 'green', 'blue', 'yellow', 'magenta', 'cyan', 'white'];
		this.fontName = 'Small Fonts';
		this.currentColor = this.colorPalettes.length - 1;
		this.currentBackgroundColor = 0;
		this.console(40, 20);
		document.body.appendChild(this.fxCanvas);
	}

	setCanvasSize(width: number, height: number): LocatePrint {
		this.canvas.width = width;
		this.canvas.height = height;
		return this;
	}

	setColorPalettes(colorPalettes: string[] = null): LocatePrint {
		this.colorPalettes = colorPalettes;
		this.currentColor = colorPalettes.length - 1;
		this.currentBackgroundColor = 0;
		return this;
	}

	setFontName(fontName: string): LocatePrint {
		this.fontName = fontName;
		return this;
	}

	update(): LocatePrint {
		this.renderTexts();
		this.texture.loadContentsOf(this.canvas);
		this.fxCanvas.draw(this.texture).
			colorShift().
			scanlines(this.ticks * this.canvas.height * 0.000005).
			bulgePinch(this.canvas.width / 2, this.canvas.height / 2,
				this.canvas.width * 0.75, 0.12).
			vignette(0.25, 0.65).
			update();
		this.ticks++;
		return this;
	}

	console(width: number, height: number): LocatePrint {
		this.consoleWidth = width;
		this.consoleHeight = height;
		this.texts = _.times(width, () => _.times(height, () => null));
		this.colors = _.times(width, () => _.times(height, () => 0));
		this.backgroundColors = _.times(width, () => _.times(height, () => 0));
		this.cls();
		return this;
	}

	locate(x: number, y: number): LocatePrint {
		this.cursorX = this.clamp(Math.floor(x), 0, this.consoleWidth - 1);
		this.cursorY = this.clamp(Math.floor(y), 0, this.consoleHeight - 1);
		return this;
	}

	print(text: string, scrollType: number = this.scrollNone): LocatePrint {
		this.calcTextSize();
		_.forEach(text, (c: string) => {
			if (this.cursorY >= this.consoleHeight) {
				return false;
			}
			this.texts[this.cursorX][this.cursorY] = c;
			this.colors[this.cursorX][this.cursorY] = this.currentColor;
			this.backgroundColors[this.cursorX][this.cursorY] =
			this.currentBackgroundColor;
			this.cursorX++;
			if (this.cursorX >= this.consoleWidth) {
				this.cursorX = 0;
				this.cursorY++;
				if ((scrollType !== this.scrollNone &&
					this.cursorY >= this.consoleHeight)) {
					this.scroll(0, -1);
				}
			}
		});
		if (scrollType === this.scrollAtLastLine &&
			this.cursorY >= this.consoleHeight - 1) {
			this.scroll(0, -1);
		}
		return this;
	}

	color(foreground: number, background: number = 0): LocatePrint {
		this.currentColor = foreground;
		this.currentBackgroundColor = background;
		return this;
	}

	cls(): LocatePrint {
		_.times(this.consoleHeight, (y) => {
			_.times(this.consoleWidth, (x) => {
				this.texts[x][y] = null;
			});
		});
		this.cursorX = this.cursorY = 0;
		return this;
	}

	scroll(offsetX: number, offsetY: number = 0) {
		var w = this.consoleWidth;
		var h = this.consoleHeight;
		var ntexts = _.times(w, () => _.times(h, () => null));
		var ncolors = _.times(w, () => _.times(h, () => 0));
		var nbackgroundColors = _.times(w, () => _.times(h, () => 0));
		_.times(this.consoleHeight, (y) => {
			var ny = y + offsetY;
			if (ny >= 0 && ny < this.consoleHeight) {
				_.times(this.consoleWidth, (x) => {
					var nx = x + offsetX;
					if (nx >= 0 && nx < this.consoleWidth) {
						ntexts[nx][ny] = this.texts[x][y];
						ncolors[nx][ny] = this.colors[x][y];
						nbackgroundColors[nx][ny] = this.backgroundColors[x][y];
					}
				});
			}
		});
		this.texts = ntexts;
		this.colors = ncolors;
		this.backgroundColors = nbackgroundColors;
		this.cursorX = this.clamp(this.cursorX + offsetX,
			0, this.consoleWidth - 1);
		this.cursorY = this.clamp(this.cursorY + offsetY,
			0, this.consoleHeight - 1);
	}
	
	screen(x: number, y: number): string {
		if (x < 0 || x >= this.consoleWidth || y < 0 || y >= this.consoleHeight) {
			return null;
		}
		return this.texts[x][y];
	}

	calcTextSize() {
		this.textAreaPaddingX = this.canvas.width * 0.05;
		this.textAreaPaddingY = this.canvas.height * 0.05;
		this.textWidth =
		(this.canvas.width - this.textAreaPaddingX * 2) / this.consoleWidth;
		this.textHeight =
		(this.canvas.height - this.textAreaPaddingY * 2) / this.consoleHeight;
		this.context.font =
		Math.floor(this.textHeight / 2) * 2 + 'px ' + this.fontName;
		this.context.textAlign = 'center';
		this.context.textBaseline = 'middle';
	}

	renderTexts() {
		this.calcTextSize();
		this.context.fillStyle = this.colorPalettes[0];
		this.context.fillRect(this.textAreaPaddingX, this.textAreaPaddingY * 0.9,
			this.canvas.width - this.textAreaPaddingX * 2,
			this.canvas.height - this.textAreaPaddingY * 2 * 0.9);
		_.times(this.consoleHeight, (y) => {
			_.times(this.consoleWidth, (x) => {
				this.drawChar(x, y);
			});
		});
	}

	drawChar(x: number, y: number) {
		var c = this.texts[x][y];
		if (!c) {
			return;
		}
		var px = (x + 0.5) * this.textWidth + this.textAreaPaddingX;
		var py = (y + 0.5) * this.textHeight + this.textAreaPaddingY;
		var bClr = this.backgroundColors[x][y];
		if (bClr > 0) {
			this.context.fillStyle = this.colorPalettes[bClr];
			this.context.fillRect
				(px - this.textWidth / 2, py - this.textHeight / 2,
				this.textWidth, this.textHeight);
		}
		if (c !== ' ') {
			var clr = this.colors[x][y];
			this.context.fillStyle = this.colorPalettes[clr];
			this.context.fillText(c, px, py);
		}
	}

	clamp(v: number, min: number, max: number) {
		if (v < min) {
			return min;
		} else if (v > max) {
			return max;
		} else {
			return v;
		}
	}
}
