// LocatePrint (https://github.com/abagames/LocatePrint)
//  display a console of an old home computer
/// <reference path="../typings/lodash/lodash.d.ts" />
var LocatePrint = (function () {
    function LocatePrint() {
        this.scrollNone = 0;
        this.scrollAtLastChar = 1;
        this.scrollAtLastLine = 2;
        this.ticks = 0;
        this.cursorX = 0;
        this.cursorY = 0;
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
    LocatePrint.prototype.setCanvasSize = function (width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        return this;
    };
    LocatePrint.prototype.setColorPalettes = function (colorPalettes) {
        if (colorPalettes === void 0) { colorPalettes = null; }
        this.colorPalettes = colorPalettes;
        this.currentColor = colorPalettes.length - 1;
        this.currentBackgroundColor = 0;
        return this;
    };
    LocatePrint.prototype.setFontName = function (fontName) {
        this.fontName = fontName;
        return this;
    };
    LocatePrint.prototype.update = function () {
        this.renderTexts();
        this.texture.loadContentsOf(this.canvas);
        this.fxCanvas.draw(this.texture).
            colorShift().
            scanlines(this.ticks * this.canvas.height * 0.000005).
            bulgePinch(this.canvas.width / 2, this.canvas.height / 2, this.canvas.width * 0.75, 0.12).
            vignette(0.25, 0.65).
            update();
        this.ticks++;
        return this;
    };
    LocatePrint.prototype.console = function (width, height) {
        this.consoleWidth = width;
        this.consoleHeight = height;
        this.texts = _.times(width, function () { return _.times(height, function () { return null; }); });
        this.colors = _.times(width, function () { return _.times(height, function () { return 0; }); });
        this.backgroundColors = _.times(width, function () { return _.times(height, function () { return 0; }); });
        this.cls();
        return this;
    };
    LocatePrint.prototype.locate = function (x, y) {
        this.cursorX = this.clamp(Math.floor(x), 0, this.consoleWidth - 1);
        this.cursorY = this.clamp(Math.floor(y), 0, this.consoleHeight - 1);
        return this;
    };
    LocatePrint.prototype.print = function (text, scrollType) {
        var _this = this;
        if (scrollType === void 0) { scrollType = this.scrollNone; }
        this.calcTextSize();
        _.forEach(text, function (c) {
            if (_this.cursorY >= _this.consoleHeight) {
                return false;
            }
            _this.texts[_this.cursorX][_this.cursorY] = c;
            _this.colors[_this.cursorX][_this.cursorY] = _this.currentColor;
            _this.backgroundColors[_this.cursorX][_this.cursorY] =
                _this.currentBackgroundColor;
            _this.cursorX++;
            if (_this.cursorX >= _this.consoleWidth) {
                _this.cursorX = 0;
                _this.cursorY++;
                if ((scrollType !== _this.scrollNone &&
                    _this.cursorY >= _this.consoleHeight)) {
                    _this.scroll(0, -1);
                }
            }
        });
        if (scrollType === this.scrollAtLastLine &&
            this.cursorY >= this.consoleHeight - 1) {
            this.scroll(0, -1);
        }
        return this;
    };
    LocatePrint.prototype.color = function (foreground, background) {
        if (background === void 0) { background = 0; }
        this.currentColor = foreground;
        this.currentBackgroundColor = background;
        return this;
    };
    LocatePrint.prototype.cls = function () {
        var _this = this;
        _.times(this.consoleHeight, function (y) {
            _.times(_this.consoleWidth, function (x) {
                _this.texts[x][y] = null;
            });
        });
        this.cursorX = this.cursorY = 0;
        return this;
    };
    LocatePrint.prototype.scroll = function (offsetX, offsetY) {
        var _this = this;
        if (offsetY === void 0) { offsetY = 0; }
        var w = this.consoleWidth;
        var h = this.consoleHeight;
        var ntexts = _.times(w, function () { return _.times(h, function () { return null; }); });
        var ncolors = _.times(w, function () { return _.times(h, function () { return 0; }); });
        var nbackgroundColors = _.times(w, function () { return _.times(h, function () { return 0; }); });
        _.times(this.consoleHeight, function (y) {
            var ny = y + offsetY;
            if (ny >= 0 && ny < _this.consoleHeight) {
                _.times(_this.consoleWidth, function (x) {
                    var nx = x + offsetX;
                    if (nx >= 0 && nx < _this.consoleWidth) {
                        ntexts[nx][ny] = _this.texts[x][y];
                        ncolors[nx][ny] = _this.colors[x][y];
                        nbackgroundColors[nx][ny] = _this.backgroundColors[x][y];
                    }
                });
            }
        });
        this.texts = ntexts;
        this.colors = ncolors;
        this.backgroundColors = nbackgroundColors;
        this.cursorX = this.clamp(this.cursorX + offsetX, 0, this.consoleWidth - 1);
        this.cursorY = this.clamp(this.cursorY + offsetY, 0, this.consoleHeight - 1);
    };
    LocatePrint.prototype.screen = function (x, y) {
        if (x < 0 || x >= this.consoleWidth || y < 0 || y >= this.consoleHeight) {
            return null;
        }
        return this.texts[x][y];
    };
    LocatePrint.prototype.calcTextSize = function () {
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
    };
    LocatePrint.prototype.renderTexts = function () {
        var _this = this;
        this.calcTextSize();
        this.context.fillStyle = this.colorPalettes[0];
        this.context.fillRect(this.textAreaPaddingX, this.textAreaPaddingY * 0.9, this.canvas.width - this.textAreaPaddingX * 2, this.canvas.height - this.textAreaPaddingY * 2 * 0.9);
        _.times(this.consoleHeight, function (y) {
            _.times(_this.consoleWidth, function (x) {
                _this.drawChar(x, y);
            });
        });
    };
    LocatePrint.prototype.drawChar = function (x, y) {
        var c = this.texts[x][y];
        if (!c) {
            return;
        }
        var px = (x + 0.5) * this.textWidth + this.textAreaPaddingX;
        var py = (y + 0.5) * this.textHeight + this.textAreaPaddingY;
        var bClr = this.backgroundColors[x][y];
        if (bClr > 0) {
            this.context.fillStyle = this.colorPalettes[bClr];
            this.context.fillRect(px - this.textWidth / 2, py - this.textHeight / 2, this.textWidth, this.textHeight);
        }
        if (c !== ' ') {
            var clr = this.colors[x][y];
            this.context.fillStyle = this.colorPalettes[clr];
            this.context.fillText(c, px, py);
        }
    };
    LocatePrint.prototype.clamp = function (v, min, max) {
        if (v < min) {
            return min;
        }
        else if (v > max) {
            return max;
        }
        else {
            return v;
        }
    };
    return LocatePrint;
})();
//# sourceMappingURL=LocatePrint.js.map