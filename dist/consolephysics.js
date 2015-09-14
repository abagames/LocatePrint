// consolephysics
//  demo program of LocatePrint (https://github.com/abagames/LocatePrint)
/// <reference path="../typings/lodash/lodash.d.ts" />
/// <reference path="../typings/matter/matter-js.d.ts" />
/// <reference path="LocatePrint.ts" />
/// <reference path="../typings/GifCaptureCanvas/GifCaptureCanvas.d.ts" />
var ConsolePhysics = (function () {
    function ConsolePhysics() {
        var _this = this;
        this.isEnableCapture = false;
        this.ticks = 0;
        this.renderer = {
            create: function () {
                return { controller: _this.renderer };
            },
            world: function (engine) {
                _this.draw(engine);
            }
        };
        this.lp = new LocatePrint();
        if (this.isEnableCapture) {
            this.gifCaptureCanvas = new GifCaptureCanvas();
        }
    }
    ConsolePhysics.prototype.init = function () {
        var _this = this;
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
        this.textPoints = _.times(this.consoleWidth, function () {
            return _.times(_this.consoleHeight, function () {
                return _.times(8, function () { return false; });
            });
        });
        this.textColors = _.times(this.consoleWidth, function () {
            return _.times(_this.consoleHeight, function () { return null; });
        });
        this.textBackColors = _.times(this.consoleWidth, function () {
            return _.times(_this.consoleHeight, function () { return null; });
        });
        this.setTextChars();
    };
    ConsolePhysics.prototype.setUpdateFunc = function (fn) {
        this.updateFunc = fn;
    };
    ConsolePhysics.prototype.setTextChars = function () {
        var _this = this;
        this.textChars = _.times(256, function () { return '.'; });
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
        _.forEach(patterns, function (p) {
            _this.setTextChar(p[0], p[1]);
        });
    };
    ConsolePhysics.prototype.setTextChar = function (c, pattern) {
        var _this = this;
        var wildNum = (pattern.match(new RegExp('\\*', 'g')) || []).length;
        _.times(wildNum * 2 + 1, function () {
            var ci = 0;
            var civ = 1;
            _.forEach(pattern, function (p) {
                if (p === '.' || (p === '*' && Math.random() < 0.3)) {
                    ci += civ;
                }
                civ *= 2;
            });
            _this.textChars[ci] = c;
        });
    };
    ConsolePhysics.prototype.run = function () {
        Matter.Engine.run(this.engine);
    };
    ConsolePhysics.prototype.draw = function (engine) {
        var _this = this;
        if (this.updateFunc) {
            this.updateFunc();
        }
        var render = engine.render;
        var world = engine.world;
        var event = {
            timestamp: engine.timing.timestamp
        };
        Matter.Events.trigger(render, 'beforeRender', event);
        var bodies = Matter.Composite.allBodies(world);
        for (var ty = 0; ty < this.consoleHeight; ty++) {
            for (var tx = 0; tx < this.consoleWidth; tx++) {
                for (var i = 0; i < 8; i++) {
                    this.textPoints[tx][ty][i] = false;
                }
                this.textColors[tx][ty] = null;
                this.textBackColors[tx][ty] = null;
            }
        }
        _.forEach(bodies, function (body) {
            if (body.vertices) {
                _this.currentColor = body.color;
                _this.currentBackColor = body.backColor;
                var fv;
                var pv;
                _.forEach(body.vertices, function (vert) {
                    var v = Matter.Vector.create(vert.x, vert.y);
                    if (pv) {
                        _this.drawLine(pv, v);
                    }
                    else {
                        fv = v;
                    }
                    pv = v;
                });
                _this.drawLine(pv, fv);
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
    };
    ConsolePhysics.prototype.drawLine = function (p1, p2) {
        var tx1 = Math.floor(p1.x / this.textWidth);
        var tx2 = Math.floor(p2.x / this.textWidth);
        if (tx1 > tx2) {
            this.calcTextPointsX(p2, p1, tx2 + 1, tx1);
        }
        else if (tx1 < tx2) {
            this.calcTextPointsX(p1, p2, tx1 + 1, tx2);
        }
        var ty1 = Math.floor(p1.y / this.textHeight);
        var ty2 = Math.floor(p2.y / this.textHeight);
        if (ty1 > ty2) {
            this.calcTextPointsY(p2, p1, ty2 + 1, ty1);
        }
        else if (ty1 < ty2) {
            this.calcTextPointsY(p1, p2, ty1 + 1, ty2);
        }
    };
    ConsolePhysics.prototype.calcTextPointsX = function (p1, p2, tx1, tx2) {
        var oy = (p2.y - p1.y) / (p2.x - p1.x);
        for (var tx = tx1; tx <= tx2; tx++) {
            var tpx = tx * this.textWidth;
            var tpy = (tpx - p1.x) * oy + p1.y;
            this.setTextPointY(tx - 1, tpy, 6);
            this.setTextPointY(tx, tpy, 4);
        }
    };
    ConsolePhysics.prototype.calcTextPointsY = function (p1, p2, ty1, ty2) {
        var ox = (p2.x - p1.x) / (p2.y - p1.y);
        for (var ty = ty1; ty <= ty2; ty++) {
            var tpy = ty * this.textHeight;
            var tpx = (tpy - p1.y) * ox + p1.x;
            this.setTextPointX(ty - 1, tpx, 2);
            this.setTextPointX(ty, tpx, 0);
        }
    };
    ConsolePhysics.prototype.setTextPointX = function (ty, px, index) {
        var tx = Math.floor(px / this.textWidth);
        var ox = px - tx * this.textWidth;
        var i = index;
        if (ox >= this.textWidth / 2) {
            i++;
        }
        this.setTextPoint(tx, ty, i);
    };
    ConsolePhysics.prototype.setTextPointY = function (tx, py, index) {
        var ty = Math.floor(py / this.textHeight);
        var oy = py - ty * this.textHeight;
        var i = index;
        if (oy >= this.textHeight / 2) {
            i++;
        }
        this.setTextPoint(tx, ty, i);
    };
    ConsolePhysics.prototype.setTextPoint = function (tx, ty, index) {
        if (tx < 0 || tx >= this.consoleWidth ||
            ty < 0 || ty >= this.consoleHeight) {
            return;
        }
        this.textPoints[tx][ty][index] = true;
        this.textColors[tx][ty] = this.currentColor;
        this.textBackColors[tx][ty] = this.currentBackColor;
    };
    ConsolePhysics.prototype.drawTextChar = function (tx, ty) {
        var points = this.textPoints[tx][ty];
        var ci = 0;
        var civ = 1;
        _.forEach(points, function (p) {
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
    };
    return ConsolePhysics;
})();
var cp;
var boxX = 0;
window.onload = function () {
    cp = new ConsolePhysics();
    cp.lp.style.display = 'inline';
    cp.setUpdateFunc(updateCp);
    cp.init();
    cp.run();
};
var ground;
function updateCp() {
    if (cp.ticks % 400 === 0) {
        Matter.World.clear(cp.engine.world);
        ground = Matter.Bodies.rectangle(320, 360, 620, 40, { isStatic: true });
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
        var box = Matter.Bodies.rectangle(boxX, -50, w, h);
        box.color = 0;
        box.backColor = Math.floor(Math.random() * 7 + 1);
        Matter.World.add(cp.engine.world, [box]);
        boxX += Math.random() * 100 - 50;
        if (boxX < 0) {
            boxX += 640;
        }
        else if (boxX >= 640) {
            boxX -= 640;
        }
    }
    if (cp.ticks % 400 === 350) {
        Matter.Body.setStatic(ground, false);
        Matter.Body.setInertia(ground, 10000);
        Matter.Body.setMass(ground, 1);
    }
}
//# sourceMappingURL=consolephysics.js.map