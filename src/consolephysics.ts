// consolephysics
//  demo program of LocatePrint (https://github.com/abagames/LocatePrint)

/// <reference path="../typings/lodash/lodash.d.ts" />
/// <reference path="../typings/matter/matter-js.d.ts" />
/// <reference path="LocatePrint.ts" />
/// <reference path="../typings/GifCaptureCanvas/GifCaptureCanvas.d.ts" />

class ConsolePhysics {
	lp: LocatePrint;
	engine: Matter.Engine;
	consoleWidth: number;
	consoleHeight: number;
	textWidth: number;
	textHeight: number;
	textPoints: boolean[][][];
	textColors: number[][];
	textBackColors: number[][];
	textChars: string[];
	updateFunc: Function;
	currentColor: number;
	currentBackColor: number;

	isEnableCapture = false;
	gifCaptureCanvas: GifCaptureCanvas;
	ticks = 0;

	constructor() {
		this.lp = new LocatePrint();
		if (this.isEnableCapture) {
			this.gifCaptureCanvas = new GifCaptureCanvas();
		}
	}

	init() {
		var cw = this.lp.canvas.width;
		var ch = this.lp.canvas.height;
		this.engine = Matter.Engine.create({
			render: {
				controller: this.renderer,
				options: {
					width: cw,
					height: ch
				}
			}
		});
		this.consoleWidth = this.lp.consoleWidth;
		this.consoleHeight = this.lp.consoleHeight;
		this.textWidth = cw / this.consoleWidth;
		this.textHeight = ch / this.consoleHeight;
		this.textPoints = _.times(this.consoleWidth, () => {
			return _.times(this.consoleHeight, () => {
				return _.times(8, () => false);
			});
		});
		this.textColors = _.times(this.consoleWidth, () => {
			return _.times(this.consoleHeight, () => null);
		});
		this.textBackColors = _.times(this.consoleWidth, () => {
			return _.times(this.consoleHeight, () => null);
		});
		this.setTextChars();
	}

	setUpdateFunc(fn: Function) {
		this.updateFunc = fn;
	}

	setTextChars() {
		this.textChars = _.times(256, () => '.');
		this.textChars[0] = null;
		var patterns = [
			['(', '.-.-****'],
			[')', '-.-.****'],
			['-', '****.-.-'],
			['_', '****-.-.'],
			['Z', '----*..*'],
			['N', '----.**.'],
			['A', '**..----'],
			['L', '.-**---.'],
			['T', '--**.-.-'],
			['Y', '..**----'],
			['/', '-..-----'],
			['=', '.--.----'],
			['<', '------..'],
			['>', '----..--'],
			['F', '--.---.-'],
			['H', '....----'],
			['J', '-...----'],
			['V', '..------'],
			['\'', '-.----.-'],
			['`', '-.----.-'],
			[',', '--.--.--'],
			['(', '.-.-----'],
			[')', '-.-.----'],
			['-', '----.-.-'],
			['_', '-----.-.'],
		];
		_.forEach(patterns, (p) => {
			this.setTextChar(p[0], p[1]);
		})
	}

	setTextChar(c: string, pattern: string) {
		var wildNum = (pattern.match(new RegExp('\\*', 'g')) || []).length;
		_.times(wildNum * 2 + 1, () => {
			var ci = 0;
			var civ = 1;
			_.forEach(pattern, (p) => {
				if (p === '.' || (p === '*' && Math.random() < 0.3)) {
					ci += civ;
				}
				civ *= 2;
			});
			this.textChars[ci] = c;
		});
	}

	run() {
		Matter.Engine.run(this.engine);
	}

	renderer = {
		create: () => {
			return { controller: this.renderer };
		},
		world: (engine) => {
			this.draw(engine)
		}
	}

	draw(engine: Matter.Engine) {
		if (this.updateFunc) {
			this.updateFunc();
		}
		var render = engine.render;
		var world = engine.world;
		var event: any = {
			timestamp: engine.timing.timestamp
		};
		Matter.Events.trigger(render, 'beforeRender', event);
		var bodies = Matter.Composite.allBodies(<any>world);
		for (var ty = 0; ty < this.consoleHeight; ty++) {
			for (var tx = 0; tx < this.consoleWidth; tx++) {
				for (var i = 0; i < 8; i++) {
					this.textPoints[tx][ty][i] = false;
				}
				this.textColors[tx][ty] = null;
				this.textBackColors[tx][ty] = null;
			}
		}
		_.forEach(bodies, (body: any) => {
			if (body.vertices) {
				this.currentColor = body.color;
				this.currentBackColor = body.backColor;
				var fv: Matter.Vector;
				var pv: Matter.Vector;
				_.forEach(body.vertices, (vert: any) => {
					var v = (<any>Matter.Vector).create(vert.x, vert.y);
					if (pv) {
						this.drawLine(pv, v);
					} else {
						fv = v;
					}
					pv = v;
				});
				this.drawLine(pv, fv);
			}
		});
		this.lp.cls();
		for (var ty = 0; ty < this.consoleHeight; ty++) {
			for (var tx = 0; tx < this.consoleWidth; tx++) {
				this.drawTextChar(tx, ty);
			}
		}
		this.lp.update();
		if (this.isEnableCapture && (this.ticks % 3) === 0) {
			this.gifCaptureCanvas.capture(this.lp.fxCanvas);
		}		
		this.ticks++;
		Matter.Events.trigger(render, 'afterRender', event);
	}

	drawLine(p1: Matter.Vector, p2: Matter.Vector) {
		var tx1 = Math.floor(p1.x / this.textWidth);
		var tx2 = Math.floor(p2.x / this.textWidth);
		if (tx1 > tx2) {
			this.calcTextPointsX(p2, p1, tx2 + 1, tx1);
		} else if (tx1 < tx2) {
			this.calcTextPointsX(p1, p2, tx1 + 1, tx2);
		}
		var ty1 = Math.floor(p1.y / this.textHeight);
		var ty2 = Math.floor(p2.y / this.textHeight);
		if (ty1 > ty2) {
			this.calcTextPointsY(p2, p1, ty2 + 1, ty1);
		} else if (ty1 < ty2) {
			this.calcTextPointsY(p1, p2, ty1 + 1, ty2);
		}
	}

	calcTextPointsX(p1: Matter.Vector, p2: Matter.Vector,
		tx1: number, tx2: number) {
		var oy = (p2.y - p1.y) / (p2.x - p1.x);
		for (var tx = tx1; tx <= tx2; tx++) {
			var tpx = tx * this.textWidth;
			var tpy = (tpx - p1.x) * oy + p1.y;
			this.setTextPointY(tx - 1, tpy, 6);
			this.setTextPointY(tx, tpy, 4);
		}
	}

	calcTextPointsY(p1: Matter.Vector, p2: Matter.Vector,
		ty1: number, ty2: number) {
		var ox = (p2.x - p1.x) / (p2.y - p1.y);
		for (var ty = ty1; ty <= ty2; ty++) {
			var tpy = ty * this.textHeight;
			var tpx = (tpy - p1.y) * ox + p1.x;
			this.setTextPointX(ty - 1, tpx, 2);
			this.setTextPointX(ty, tpx, 0);
		}
	}

	setTextPointX(ty: number, px: number, index: number) {
		var tx = Math.floor(px / this.textWidth);
		var ox = px - tx * this.textWidth;
		var i = index;
		if (ox >= this.textWidth / 2) {
			i++;
		}
		this.setTextPoint(tx, ty, i);
	}

	setTextPointY(tx: number, py: number, index: number) {
		var ty = Math.floor(py / this.textHeight);
		var oy = py - ty * this.textHeight;
		var i = index;
		if (oy >= this.textHeight / 2) {
			i++;
		}
		this.setTextPoint(tx, ty, i);
	}

	setTextPoint(tx: number, ty: number, index: number) {
		if (tx < 0 || tx >= this.consoleWidth ||
			ty < 0 || ty >= this.consoleHeight) {
			return;
		}
		this.textPoints[tx][ty][index] = true;
		this.textColors[tx][ty] = this.currentColor;
		this.textBackColors[tx][ty] = this.currentBackColor;
	}

	drawTextChar(tx: number, ty: number) {
		var points = this.textPoints[tx][ty];
		var ci = 0;
		var civ = 1;
		_.forEach(points, (p) => {
			if (p) {
				ci += civ;
			}
			civ *= 2;
		});
		var gc = this.textChars[ci];
		if (gc) {
			this.lp.color(this.textColors[tx][ty], this.textBackColors[tx][ty]);
			this.lp.locate(tx, ty);
			this.lp.print(gc);
		}
	}
}

var cp: ConsolePhysics;
var boxX = 0;

window.onload = () => {
	cp = new ConsolePhysics();
	cp.lp.style.display = 'inline';
	cp.setUpdateFunc(updateCp)
	cp.init();
	cp.run();
}

var ground: any;

function updateCp() {
	if (cp.ticks % 400 === 0) {
		(<any>Matter.World.clear)(cp.engine.world);
		ground = Matter.Bodies.rectangle
			(320, 360, 620, 40, { isStatic: true });
		ground.color = Math.floor(Math.random() * 7 + 1);
		ground.backColor = 0;
		Matter.World.add(cp.engine.world, [ground]);
		boxX = Math.random() * 400 + 120;
	}
	if (cp.ticks % 30 === 0 && cp.ticks % 400 <= 300) {
		var w = Math.random() * 20 + 20;
		var h = Math.random() * 100 + 100;
		if (Math.random() < 0.3) {
			var t = w;
			w = h;
			h = t;
		}
		var box: any = Matter.Bodies.rectangle(boxX, -50, w, h);
		box.color = 0;
		box.backColor = Math.floor(Math.random() * 7 + 1);
		Matter.World.add(cp.engine.world, [box]);
		boxX += Math.random() * 100 - 50;
		if (boxX < 0) {
			boxX += 640;
		} else if (boxX >= 640) {
			boxX -= 640;
		}
	}
	if (cp.ticks % 400 === 350) {
		(<any>Matter.Body).setStatic(ground, false);
		(<any>Matter.Body).setInertia(ground, 10000);
		(<any>Matter.Body).setMass(ground, 1);
	}
}
