/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/samples";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
 * glfx.js
 * http://evanw.github.com/glfx.js/
 *
 * Copyright 2011 Evan Wallace
 * Released under the MIT license
 */
var fx = function () {
  function q(a, d, c) { return Math.max(a, Math.min(d, c)) } function w(b) { return { _: b, loadContentsOf: function (b) { a = this._.gl; this._.loadContentsOf(b) }, destroy: function () { a = this._.gl; this._.destroy() } } } function A(a) { return w(r.fromElement(a)) } function B(b, d) {
    var c = a.UNSIGNED_BYTE; if (a.getExtension("OES_texture_float") && a.getExtension("OES_texture_float_linear")) { var e = new r(100, 100, a.RGBA, a.FLOAT); try { e.drawTo(function () { c = a.FLOAT }) } catch (g) { } e.destroy() } this._.texture && this._.texture.destroy();
    this._.spareTexture && this._.spareTexture.destroy(); this.width = b; this.height = d; this._.texture = new r(b, d, a.RGBA, c); this._.spareTexture = new r(b, d, a.RGBA, c); this._.extraTexture = this._.extraTexture || new r(0, 0, a.RGBA, c); this._.flippedShader = this._.flippedShader || new h(null, "uniform sampler2D texture;varying vec2 texCoord;void main(){gl_FragColor=texture2D(texture,vec2(texCoord.x,1.0-texCoord.y));}"); this._.isInitialized = !0
  } function C(a, d, c) {
    this._.isInitialized &&
      a._.width == this.width && a._.height == this.height || B.call(this, d ? d : a._.width, c ? c : a._.height); a._.use(); this._.texture.drawTo(function () { h.getDefaultShader().drawRect() }); return this
  } function D() { this._.texture.use(); this._.flippedShader.drawRect(); return this } function f(a, d, c, e) { (c || this._.texture).use(); this._.spareTexture.drawTo(function () { a.uniforms(d).drawRect() }); this._.spareTexture.swapWith(e || this._.texture) } function E(a) { a.parentNode.insertBefore(this, a); a.parentNode.removeChild(a); return this }
  function F() { var b = new r(this._.texture.width, this._.texture.height, a.RGBA, a.UNSIGNED_BYTE); this._.texture.use(); b.drawTo(function () { h.getDefaultShader().drawRect() }); return w(b) } function G() { var b = this._.texture.width, d = this._.texture.height, c = new Uint8Array(4 * b * d); this._.texture.drawTo(function () { a.readPixels(0, 0, b, d, a.RGBA, a.UNSIGNED_BYTE, c) }); return c } function k(b) { return function () { a = this._.gl; return b.apply(this, arguments) } } function x(a, d, c, e, g, l, n, p) {
    var m = c - g, h = e - l, f = n - g, k = p - l; g = a - c + g - n; l =
      d - e + l - p; var q = m * k - f * h, f = (g * k - f * l) / q, m = (m * l - g * h) / q; return [c - a + f * c, e - d + f * e, f, n - a + m * n, p - d + m * p, m, a, d, 1]
  } function y(a) { var d = a[0], c = a[1], e = a[2], g = a[3], l = a[4], n = a[5], p = a[6], m = a[7]; a = a[8]; var f = d * l * a - d * n * m - c * g * a + c * n * p + e * g * m - e * l * p; return [(l * a - n * m) / f, (e * m - c * a) / f, (c * n - e * l) / f, (n * p - g * a) / f, (d * a - e * p) / f, (e * g - d * n) / f, (g * m - l * p) / f, (c * p - d * m) / f, (d * l - c * g) / f] } function z(a) {
    var d = a.length; this.xa = []; this.ya = []; this.u = []; this.y2 = []; a.sort(function (a, b) { return a[0] - b[0] }); for (var c = 0; c < d; c++)this.xa.push(a[c][0]), this.ya.push(a[c][1]);
    this.u[0] = 0; this.y2[0] = 0; for (c = 1; c < d - 1; ++c) { a = this.xa[c + 1] - this.xa[c - 1]; var e = (this.xa[c] - this.xa[c - 1]) / a, g = e * this.y2[c - 1] + 2; this.y2[c] = (e - 1) / g; this.u[c] = (6 * ((this.ya[c + 1] - this.ya[c]) / (this.xa[c + 1] - this.xa[c]) - (this.ya[c] - this.ya[c - 1]) / (this.xa[c] - this.xa[c - 1])) / a - e * this.u[c - 1]) / g } this.y2[d - 1] = 0; for (c = d - 2; 0 <= c; --c)this.y2[c] = this.y2[c] * this.y2[c + 1] + this.u[c]
  } function u(a, d) {
    return new h(null, a + "uniform sampler2D texture;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 coord=texCoord*texSize;" +
      d + "gl_FragColor=texture2D(texture,coord/texSize);vec2 clampedCoord=clamp(coord,vec2(0.0),texSize);if(coord!=clampedCoord){gl_FragColor.a*=max(0.0,1.0-length(coord-clampedCoord));}}")
  } function H(b, d) {
    a.brightnessContrast = a.brightnessContrast || new h(null, "uniform sampler2D texture;uniform float brightness;uniform float contrast;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);color.rgb+=brightness;if(contrast>0.0){color.rgb=(color.rgb-0.5)/(1.0-contrast)+0.5;}else{color.rgb=(color.rgb-0.5)*(1.0+contrast)+0.5;}gl_FragColor=color;}");
    f.call(this, a.brightnessContrast, { brightness: q(-1, b, 1), contrast: q(-1, d, 1) }); return this
  } function t(a) { a = new z(a); for (var d = [], c = 0; 256 > c; c++)d.push(q(0, Math.floor(256 * a.interpolate(c / 255)), 255)); return d } function I(b, d, c) {
    b = t(b); 1 == arguments.length ? d = c = b : (d = t(d), c = t(c)); for (var e = [], g = 0; 256 > g; g++)e.splice(e.length, 0, b[g], d[g], c[g], 255); this._.extraTexture.initFromBytes(256, 1, e); this._.extraTexture.use(1); a.curves = a.curves || new h(null, "uniform sampler2D texture;uniform sampler2D map;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);color.r=texture2D(map,vec2(color.r)).r;color.g=texture2D(map,vec2(color.g)).g;color.b=texture2D(map,vec2(color.b)).b;gl_FragColor=color;}");
    a.curves.textures({ map: 1 }); f.call(this, a.curves, {}); return this
  } function J(b) {
    a.denoise = a.denoise || new h(null, "uniform sampler2D texture;uniform float exponent;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;void main(){vec4 center=texture2D(texture,texCoord);vec4 color=vec4(0.0);float total=0.0;for(float x=-4.0;x<=4.0;x+=1.0){for(float y=-4.0;y<=4.0;y+=1.0){vec4 sample=texture2D(texture,texCoord+vec2(x,y)/texSize);float weight=1.0-abs(dot(sample.rgb-center.rgb,vec3(0.25)));weight=pow(weight,exponent);color+=sample*weight;total+=weight;}}gl_FragColor=color/total;}");
    for (var d = 0; 2 > d; d++)f.call(this, a.denoise, { exponent: Math.max(0, b), texSize: [this.width, this.height] }); return this
  } function K(b, d) {
    a.hueSaturation = a.hueSaturation || new h(null, "uniform sampler2D texture;uniform float hue;uniform float saturation;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float angle=hue*3.14159265;float s=sin(angle),c=cos(angle);vec3 weights=(vec3(2.0*c,-sqrt(3.0)*s-c,sqrt(3.0)*s-c)+1.0)/3.0;float len=length(color.rgb);color.rgb=vec3(dot(color.rgb,weights.xyz),dot(color.rgb,weights.zxy),dot(color.rgb,weights.yzx));float average=(color.r+color.g+color.b)/3.0;if(saturation>0.0){color.rgb+=(average-color.rgb)*(1.0-1.0/(1.001-saturation));}else{color.rgb+=(average-color.rgb)*(-saturation);}gl_FragColor=color;}");
    f.call(this, a.hueSaturation, { hue: q(-1, b, 1), saturation: q(-1, d, 1) }); return this
  } function L(b) {
    a.noise = a.noise || new h(null, "uniform sampler2D texture;uniform float amount;varying vec2 texCoord;float rand(vec2 co){return fract(sin(dot(co.xy,vec2(12.9898,78.233)))*43758.5453);}void main(){vec4 color=texture2D(texture,texCoord);float diff=(rand(texCoord)-0.5)*amount;color.r+=diff;color.g+=diff;color.b+=diff;gl_FragColor=color;}");
    f.call(this, a.noise, { amount: q(0, b, 1) }); return this
  } function M(b) {
    a.sepia = a.sepia || new h(null, "uniform sampler2D texture;uniform float amount;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float r=color.r;float g=color.g;float b=color.b;color.r=min(1.0,(r*(1.0-(0.607*amount)))+(g*(0.769*amount))+(b*(0.189*amount)));color.g=min(1.0,(r*0.349*amount)+(g*(1.0-(0.314*amount)))+(b*0.168*amount));color.b=min(1.0,(r*0.272*amount)+(g*0.534*amount)+(b*(1.0-(0.869*amount))));gl_FragColor=color;}");
    f.call(this, a.sepia, { amount: q(0, b, 1) }); return this
  } function N(b, d) {
    a.unsharpMask = a.unsharpMask || new h(null, "uniform sampler2D blurredTexture;uniform sampler2D originalTexture;uniform float strength;uniform float threshold;varying vec2 texCoord;void main(){vec4 blurred=texture2D(blurredTexture,texCoord);vec4 original=texture2D(originalTexture,texCoord);gl_FragColor=mix(blurred,original,1.0+strength);}");
    this._.extraTexture.ensureFormat(this._.texture); this._.texture.use(); this._.extraTexture.drawTo(function () { h.getDefaultShader().drawRect() }); this._.extraTexture.use(1); this.triangleBlur(b); a.unsharpMask.textures({ originalTexture: 1 }); f.call(this, a.unsharpMask, { strength: d }); this._.extraTexture.unuse(1); return this
  } function O(b) {
    a.vibrance = a.vibrance || new h(null, "uniform sampler2D texture;uniform float amount;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float average=(color.r+color.g+color.b)/3.0;float mx=max(color.r,max(color.g,color.b));float amt=(mx-average)*(-amount*3.0);color.rgb=mix(color.rgb,vec3(mx),amt);gl_FragColor=color;}");
    f.call(this, a.vibrance, { amount: q(-1, b, 1) }); return this
  } function P(b, d) {
    a.vignette = a.vignette || new h(null, "uniform sampler2D texture;uniform float size;uniform float amount;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float dist=distance(texCoord,vec2(0.5,0.5));color.rgb*=smoothstep(0.8,size*0.799,dist*(amount+size));gl_FragColor=color;}");
    f.call(this, a.vignette, { size: q(0, b, 1), amount: q(0, d, 1) }); return this
  } function Q(b, d, c) {
    a.lensBlurPrePass = a.lensBlurPrePass || new h(null, "uniform sampler2D texture;uniform float power;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);color=pow(color,vec4(power));gl_FragColor=vec4(color);}"); var e = "uniform sampler2D texture0;uniform sampler2D texture1;uniform vec2 delta0;uniform vec2 delta1;uniform float power;varying vec2 texCoord;" +
      s + "vec4 sample(vec2 delta){float offset=random(vec3(delta,151.7182),0.0);vec4 color=vec4(0.0);float total=0.0;for(float t=0.0;t<=30.0;t++){float percent=(t+offset)/30.0;color+=texture2D(texture0,texCoord+delta*percent);total+=1.0;}return color/total;}";
    a.lensBlur0 = a.lensBlur0 || new h(null, e + "void main(){gl_FragColor=sample(delta0);}"); a.lensBlur1 = a.lensBlur1 || new h(null, e + "void main(){gl_FragColor=(sample(delta0)+sample(delta1))*0.5;}"); a.lensBlur2 = a.lensBlur2 || (new h(null, e + "void main(){vec4 color=(sample(delta0)+2.0*texture2D(texture1,texCoord))/3.0;gl_FragColor=pow(color,vec4(power));}")).textures({ texture1: 1 }); for (var e =
      [], g = 0; 3 > g; g++) { var l = c + 2 * g * Math.PI / 3; e.push([b * Math.sin(l) / this.width, b * Math.cos(l) / this.height]) } b = Math.pow(10, q(-1, d, 1)); f.call(this, a.lensBlurPrePass, { power: b }); this._.extraTexture.ensureFormat(this._.texture); f.call(this, a.lensBlur0, { delta0: e[0] }, this._.texture, this._.extraTexture); f.call(this, a.lensBlur1, { delta0: e[1], delta1: e[2] }, this._.extraTexture, this._.extraTexture); f.call(this, a.lensBlur0, { delta0: e[1] }); this._.extraTexture.use(1); f.call(this, a.lensBlur2, { power: 1 / b, delta0: e[2] }); return this
  }
  function R(b, d, c, e, g, l) {
    a.tiltShift = a.tiltShift || new h(null, "uniform sampler2D texture;uniform float blurRadius;uniform float gradientRadius;uniform vec2 start;uniform vec2 end;uniform vec2 delta;uniform vec2 texSize;varying vec2 texCoord;" + s + "void main(){vec4 color=vec4(0.0);float total=0.0;float offset=random(vec3(12.9898,78.233,151.7182),0.0);vec2 normal=normalize(vec2(start.y-end.y,end.x-start.x));float radius=smoothstep(0.0,1.0,abs(dot(texCoord*texSize-start,normal))/gradientRadius)*blurRadius;for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec4 sample=texture2D(texture,texCoord+delta/texSize*percent*radius);sample.rgb*=sample.a;color+=sample*weight;total+=weight;}gl_FragColor=color/total;gl_FragColor.rgb/=gl_FragColor.a+0.00001;}");
    var n = c - b, p = e - d, m = Math.sqrt(n * n + p * p); f.call(this, a.tiltShift, { blurRadius: g, gradientRadius: l, start: [b, d], end: [c, e], delta: [n / m, p / m], texSize: [this.width, this.height] }); f.call(this, a.tiltShift, { blurRadius: g, gradientRadius: l, start: [b, d], end: [c, e], delta: [-p / m, n / m], texSize: [this.width, this.height] }); return this
  } function S(b) {
    a.triangleBlur = a.triangleBlur || new h(null, "uniform sampler2D texture;uniform vec2 delta;varying vec2 texCoord;" + s + "void main(){vec4 color=vec4(0.0);float total=0.0;float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec4 sample=texture2D(texture,texCoord+delta*percent);sample.rgb*=sample.a;color+=sample*weight;total+=weight;}gl_FragColor=color/total;gl_FragColor.rgb/=gl_FragColor.a+0.00001;}");
    f.call(this, a.triangleBlur, { delta: [b / this.width, 0] }); f.call(this, a.triangleBlur, { delta: [0, b / this.height] }); return this
  } function T(b, d, c) {
    a.zoomBlur = a.zoomBlur || new h(null, "uniform sampler2D texture;uniform vec2 center;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;" + s + "void main(){vec4 color=vec4(0.0);float total=0.0;vec2 toCenter=center-texCoord*texSize;float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=0.0;t<=40.0;t++){float percent=(t+offset)/40.0;float weight=4.0*(percent-percent*percent);vec4 sample=texture2D(texture,texCoord+toCenter*percent*strength/texSize);sample.rgb*=sample.a;color+=sample*weight;total+=weight;}gl_FragColor=color/total;gl_FragColor.rgb/=gl_FragColor.a+0.00001;}");
    f.call(this, a.zoomBlur, { center: [b, d], strength: c, texSize: [this.width, this.height] }); return this
  } function U(b, d, c, e) {
    a.colorHalftone = a.colorHalftone || new h(null, "uniform sampler2D texture;uniform vec2 center;uniform float angle;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;float pattern(float angle){float s=sin(angle),c=cos(angle);vec2 tex=texCoord*texSize-center;vec2 point=vec2(c*tex.x-s*tex.y,s*tex.x+c*tex.y)*scale;return(sin(point.x)*sin(point.y))*4.0;}void main(){vec4 color=texture2D(texture,texCoord);vec3 cmy=1.0-color.rgb;float k=min(cmy.x,min(cmy.y,cmy.z));cmy=(cmy-k)/(1.0-k);cmy=clamp(cmy*10.0-3.0+vec3(pattern(angle+0.26179),pattern(angle+1.30899),pattern(angle)),0.0,1.0);k=clamp(k*10.0-5.0+pattern(angle+0.78539),0.0,1.0);gl_FragColor=vec4(1.0-cmy-k,color.a);}");
    f.call(this, a.colorHalftone, { center: [b, d], angle: c, scale: Math.PI / e, texSize: [this.width, this.height] }); return this
  } function V(b, d, c, e) {
    a.dotScreen = a.dotScreen || new h(null, "uniform sampler2D texture;uniform vec2 center;uniform float angle;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;float pattern(){float s=sin(angle),c=cos(angle);vec2 tex=texCoord*texSize-center;vec2 point=vec2(c*tex.x-s*tex.y,s*tex.x+c*tex.y)*scale;return(sin(point.x)*sin(point.y))*4.0;}void main(){vec4 color=texture2D(texture,texCoord);float average=(color.r+color.g+color.b)/3.0;gl_FragColor=vec4(vec3(average*10.0-5.0+pattern()),color.a);}");
    f.call(this, a.dotScreen, { center: [b, d], angle: c, scale: Math.PI / e, texSize: [this.width, this.height] }); return this
  } function W(b) {
    a.edgeWork1 = a.edgeWork1 || new h(null, "uniform sampler2D texture;uniform vec2 delta;varying vec2 texCoord;" + s + "void main(){vec2 color=vec2(0.0);vec2 total=vec2(0.0);float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec3 sample=texture2D(texture,texCoord+delta*percent).rgb;float average=(sample.r+sample.g+sample.b)/3.0;color.x+=average*weight;total.x+=weight;if(abs(t)<15.0){weight=weight*2.0-1.0;color.y+=average*weight;total.y+=weight;}}gl_FragColor=vec4(color/total,0.0,1.0);}");
    a.edgeWork2 = a.edgeWork2 || new h(null, "uniform sampler2D texture;uniform vec2 delta;varying vec2 texCoord;" + s + "void main(){vec2 color=vec2(0.0);vec2 total=vec2(0.0);float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec2 sample=texture2D(texture,texCoord+delta*percent).xy;color.x+=sample.x*weight;total.x+=weight;if(abs(t)<15.0){weight=weight*2.0-1.0;color.y+=sample.y*weight;total.y+=weight;}}float c=clamp(10000.0*(color.y/total.y-color.x/total.x)+0.5,0.0,1.0);gl_FragColor=vec4(c,c,c,1.0);}");
    f.call(this, a.edgeWork1, { delta: [b / this.width, 0] }); f.call(this, a.edgeWork2, { delta: [0, b / this.height] }); return this
  } function X(b, d, c) {
    a.hexagonalPixelate = a.hexagonalPixelate || new h(null, "uniform sampler2D texture;uniform vec2 center;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 tex=(texCoord*texSize-center)/scale;tex.y/=0.866025404;tex.x-=tex.y*0.5;vec2 a;if(tex.x+tex.y-floor(tex.x)-floor(tex.y)<1.0)a=vec2(floor(tex.x),floor(tex.y));else a=vec2(ceil(tex.x),ceil(tex.y));vec2 b=vec2(ceil(tex.x),floor(tex.y));vec2 c=vec2(floor(tex.x),ceil(tex.y));vec3 TEX=vec3(tex.x,tex.y,1.0-tex.x-tex.y);vec3 A=vec3(a.x,a.y,1.0-a.x-a.y);vec3 B=vec3(b.x,b.y,1.0-b.x-b.y);vec3 C=vec3(c.x,c.y,1.0-c.x-c.y);float alen=length(TEX-A);float blen=length(TEX-B);float clen=length(TEX-C);vec2 choice;if(alen<blen){if(alen<clen)choice=a;else choice=c;}else{if(blen<clen)choice=b;else choice=c;}choice.x+=choice.y*0.5;choice.y*=0.866025404;choice*=scale/texSize;gl_FragColor=texture2D(texture,choice+center/texSize);}");
    f.call(this, a.hexagonalPixelate, { center: [b, d], scale: c, texSize: [this.width, this.height] }); return this
  } function Y(b) {
    a.ink = a.ink || new h(null, "uniform sampler2D texture;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 dx=vec2(1.0/texSize.x,0.0);vec2 dy=vec2(0.0,1.0/texSize.y);vec4 color=texture2D(texture,texCoord);float bigTotal=0.0;float smallTotal=0.0;vec3 bigAverage=vec3(0.0);vec3 smallAverage=vec3(0.0);for(float x=-2.0;x<=2.0;x+=1.0){for(float y=-2.0;y<=2.0;y+=1.0){vec3 sample=texture2D(texture,texCoord+dx*x+dy*y).rgb;bigAverage+=sample;bigTotal+=1.0;if(abs(x)+abs(y)<2.0){smallAverage+=sample;smallTotal+=1.0;}}}vec3 edge=max(vec3(0.0),bigAverage/bigTotal-smallAverage/smallTotal);gl_FragColor=vec4(color.rgb-dot(edge,edge)*strength*100000.0,color.a);}");
    f.call(this, a.ink, { strength: b * b * b * b * b, texSize: [this.width, this.height] }); return this
  } function Z(b, d, c, e) {
    a.bulgePinch = a.bulgePinch || u("uniform float radius;uniform float strength;uniform vec2 center;", "coord-=center;float distance=length(coord);if(distance<radius){float percent=distance/radius;if(strength>0.0){coord*=mix(1.0,smoothstep(0.0,radius/distance,percent),strength*0.75);}else{coord*=mix(1.0,pow(percent,1.0+strength*0.75)*radius/distance,1.0-percent);}}coord+=center;");
    f.call(this, a.bulgePinch, { radius: c, strength: q(-1, e, 1), center: [b, d], texSize: [this.width, this.height] }); return this
  } function $(b, d, c) {
    a.matrixWarp = a.matrixWarp || u("uniform mat3 matrix;uniform bool useTextureSpace;", "if(useTextureSpace)coord=coord/texSize*2.0-1.0;vec3 warp=matrix*vec3(coord,1.0);coord=warp.xy/warp.z;if(useTextureSpace)coord=(coord*0.5+0.5)*texSize;"); b = Array.prototype.concat.apply([], b); if (4 == b.length) b =
      [b[0], b[1], 0, b[2], b[3], 0, 0, 0, 1]; else if (9 != b.length) throw "can only warp with 2x2 or 3x3 matrix"; f.call(this, a.matrixWarp, { matrix: d ? y(b) : b, texSize: [this.width, this.height], useTextureSpace: c | 0 }); return this
  } function aa(a, d) {
    var c = x.apply(null, d), e = x.apply(null, a), c = y(c); return this.matrixWarp([c[0] * e[0] + c[1] * e[3] + c[2] * e[6], c[0] * e[1] + c[1] * e[4] + c[2] * e[7], c[0] * e[2] + c[1] * e[5] + c[2] * e[8], c[3] * e[0] + c[4] * e[3] + c[5] * e[6], c[3] * e[1] + c[4] * e[4] + c[5] * e[7], c[3] * e[2] + c[4] * e[5] + c[5] * e[8], c[6] * e[0] + c[7] * e[3] + c[8] * e[6],
    c[6] * e[1] + c[7] * e[4] + c[8] * e[7], c[6] * e[2] + c[7] * e[5] + c[8] * e[8]])
  } function ba(b, d, c, e) {
    a.swirl = a.swirl || u("uniform float radius;uniform float angle;uniform vec2 center;", "coord-=center;float distance=length(coord);if(distance<radius){float percent=(radius-distance)/radius;float theta=percent*percent*angle;float s=sin(theta);float c=cos(theta);coord=vec2(coord.x*c-coord.y*s,coord.x*s+coord.y*c);}coord+=center;");
    f.call(this, a.swirl, { radius: c, center: [b, d], angle: e, texSize: [this.width, this.height] }); return this
  } var v = {}; (function () {
    function a(b) {
      if (!b.getExtension("OES_texture_float")) return !1; var c = b.createFramebuffer(), e = b.createTexture(); b.bindTexture(b.TEXTURE_2D, e); b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST); b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST); b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE); b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
      b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, 1, 1, 0, b.RGBA, b.UNSIGNED_BYTE, null); b.bindFramebuffer(b.FRAMEBUFFER, c); b.framebufferTexture2D(b.FRAMEBUFFER, b.COLOR_ATTACHMENT0, b.TEXTURE_2D, e, 0); c = b.createTexture(); b.bindTexture(b.TEXTURE_2D, c); b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.LINEAR); b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR); b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE); b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE); b.texImage2D(b.TEXTURE_2D,
        0, b.RGBA, 2, 2, 0, b.RGBA, b.FLOAT, new Float32Array([2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])); var e = b.createProgram(), d = b.createShader(b.VERTEX_SHADER), g = b.createShader(b.FRAGMENT_SHADER); b.shaderSource(d, "attribute vec2 vertex;void main(){gl_Position=vec4(vertex,0.0,1.0);}"); b.shaderSource(g, "uniform sampler2D texture;void main(){gl_FragColor=texture2D(texture,vec2(0.5));}"); b.compileShader(d); b.compileShader(g); b.attachShader(e, d); b.attachShader(e,
          g); b.linkProgram(e); d = b.createBuffer(); b.bindBuffer(b.ARRAY_BUFFER, d); b.bufferData(b.ARRAY_BUFFER, new Float32Array([0, 0]), b.STREAM_DRAW); b.enableVertexAttribArray(0); b.vertexAttribPointer(0, 2, b.FLOAT, !1, 0, 0); d = new Uint8Array(4); b.useProgram(e); b.viewport(0, 0, 1, 1); b.bindTexture(b.TEXTURE_2D, c); b.drawArrays(b.POINTS, 0, 1); b.readPixels(0, 0, 1, 1, b.RGBA, b.UNSIGNED_BYTE, d); return 127 === d[0] || 128 === d[0]
    } function d() { } function c(a) {
      "OES_texture_float_linear" === a ? (void 0 === this.$OES_texture_float_linear$ && Object.defineProperty(this,
        "$OES_texture_float_linear$", { enumerable: !1, configurable: !1, writable: !1, value: new d }), a = this.$OES_texture_float_linear$) : a = n.call(this, a); return a
    } function e() { var a = f.call(this); -1 === a.indexOf("OES_texture_float_linear") && a.push("OES_texture_float_linear"); return a } try { var g = document.createElement("canvas").getContext("experimental-webgl") } catch (l) { } if (g && -1 === g.getSupportedExtensions().indexOf("OES_texture_float_linear") && a(g)) {
      var n = WebGLRenderingContext.prototype.getExtension, f = WebGLRenderingContext.prototype.getSupportedExtensions;
      WebGLRenderingContext.prototype.getExtension = c; WebGLRenderingContext.prototype.getSupportedExtensions = e
    }
  })(); var a; v.canvas = function () {
    var b = document.createElement("canvas"); try { a = b.getContext("experimental-webgl", { premultipliedAlpha: !1 }) } catch (d) { a = null } if (!a) throw "This browser does not support WebGL"; b._ = { gl: a, isInitialized: !1, texture: null, spareTexture: null, flippedShader: null }; b.texture = k(A); b.draw = k(C); b.update = k(D); b.replace = k(E); b.contents = k(F); b.getPixelArray = k(G); b.brightnessContrast = k(H);
    b.hexagonalPixelate = k(X); b.hueSaturation = k(K); b.colorHalftone = k(U); b.triangleBlur = k(S); b.unsharpMask = k(N); b.perspective = k(aa); b.matrixWarp = k($); b.bulgePinch = k(Z); b.tiltShift = k(R); b.dotScreen = k(V); b.edgeWork = k(W); b.lensBlur = k(Q); b.zoomBlur = k(T); b.noise = k(L); b.denoise = k(J); b.curves = k(I); b.swirl = k(ba); b.ink = k(Y); b.vignette = k(P); b.vibrance = k(O); b.sepia = k(M); return b
  }; v.splineInterpolate = t; var h = function () {
    function b(b, c) {
      var e = a.createShader(b); a.shaderSource(e, c); a.compileShader(e); if (!a.getShaderParameter(e,
        a.COMPILE_STATUS)) throw "compile error: " + a.getShaderInfoLog(e); return e
    } function d(d, l) { this.texCoordAttribute = this.vertexAttribute = null; this.program = a.createProgram(); d = d || c; l = l || e; l = "precision highp float;" + l; a.attachShader(this.program, b(a.VERTEX_SHADER, d)); a.attachShader(this.program, b(a.FRAGMENT_SHADER, l)); a.linkProgram(this.program); if (!a.getProgramParameter(this.program, a.LINK_STATUS)) throw "link error: " + a.getProgramInfoLog(this.program); } var c = "attribute vec2 vertex;attribute vec2 _texCoord;varying vec2 texCoord;void main(){texCoord=_texCoord;gl_Position=vec4(vertex*2.0-1.0,0.0,1.0);}",
      e = "uniform sampler2D texture;varying vec2 texCoord;void main(){gl_FragColor=texture2D(texture,texCoord);}"; d.prototype.destroy = function () { a.deleteProgram(this.program); this.program = null }; d.prototype.uniforms = function (b) {
        a.useProgram(this.program); for (var e in b) if (b.hasOwnProperty(e)) {
          var c = a.getUniformLocation(this.program, e); if (null !== c) {
            var d = b[e]; if ("[object Array]" == Object.prototype.toString.call(d)) switch (d.length) {
              case 1: a.uniform1fv(c, new Float32Array(d)); break;
              case 2: a.uniform2fv(c, new Float32Array(d)); break; case 3: a.uniform3fv(c, new Float32Array(d)); break; case 4: a.uniform4fv(c, new Float32Array(d)); break; case 9: a.uniformMatrix3fv(c, !1, new Float32Array(d)); break; case 16: a.uniformMatrix4fv(c, !1, new Float32Array(d)); break; default: throw "dont't know how to load uniform \"" + e + '" of length ' + d.length;
            } else if ("[object Number]" == Object.prototype.toString.call(d)) a.uniform1f(c, d); else throw 'attempted to set uniform "' + e + '" to invalid value ' + (d || "undefined").toString();
          }
        } return this
      }; d.prototype.textures = function (b) { a.useProgram(this.program); for (var c in b) b.hasOwnProperty(c) && a.uniform1i(a.getUniformLocation(this.program, c), b[c]); return this }; d.prototype.drawRect = function (b, c, e, d) {
        var f = a.getParameter(a.VIEWPORT); c = void 0 !== c ? (c - f[1]) / f[3] : 0; b = void 0 !== b ? (b - f[0]) / f[2] : 0; e = void 0 !== e ? (e - f[0]) / f[2] : 1; d = void 0 !== d ? (d - f[1]) / f[3] : 1; null == a.vertexBuffer && (a.vertexBuffer = a.createBuffer()); a.bindBuffer(a.ARRAY_BUFFER, a.vertexBuffer); a.bufferData(a.ARRAY_BUFFER, new Float32Array([b,
          c, b, d, e, c, e, d]), a.STATIC_DRAW); null == a.texCoordBuffer && (a.texCoordBuffer = a.createBuffer(), a.bindBuffer(a.ARRAY_BUFFER, a.texCoordBuffer), a.bufferData(a.ARRAY_BUFFER, new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]), a.STATIC_DRAW)); null == this.vertexAttribute && (this.vertexAttribute = a.getAttribLocation(this.program, "vertex"), a.enableVertexAttribArray(this.vertexAttribute)); null == this.texCoordAttribute && (this.texCoordAttribute = a.getAttribLocation(this.program, "_texCoord"), a.enableVertexAttribArray(this.texCoordAttribute));
        a.useProgram(this.program); a.bindBuffer(a.ARRAY_BUFFER, a.vertexBuffer); a.vertexAttribPointer(this.vertexAttribute, 2, a.FLOAT, !1, 0, 0); a.bindBuffer(a.ARRAY_BUFFER, a.texCoordBuffer); a.vertexAttribPointer(this.texCoordAttribute, 2, a.FLOAT, !1, 0, 0); a.drawArrays(a.TRIANGLE_STRIP, 0, 4)
      }; d.getDefaultShader = function () { a.defaultShader = a.defaultShader || new d; return a.defaultShader }; return d
  }(); z.prototype.interpolate = function (a) {
    for (var d = 0, c = this.ya.length - 1; 1 < c - d;) { var e = c + d >> 1; this.xa[e] > a ? c = e : d = e } var e = this.xa[c] -
      this.xa[d], g = (this.xa[c] - a) / e; a = (a - this.xa[d]) / e; return g * this.ya[d] + a * this.ya[c] + ((g * g * g - g) * this.y2[d] + (a * a * a - a) * this.y2[c]) * e * e / 6
  }; var r = function () {
    function b(b, c, d, f) {
      this.gl = a; this.id = a.createTexture(); this.width = b; this.height = c; this.format = d; this.type = f; a.bindTexture(a.TEXTURE_2D, this.id); a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR); a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR); a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE); a.texParameteri(a.TEXTURE_2D,
        a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE); b && c && a.texImage2D(a.TEXTURE_2D, 0, this.format, b, c, 0, this.format, this.type, null)
    } function d(a) { null == c && (c = document.createElement("canvas")); c.width = a.width; c.height = a.height; a = c.getContext("2d"); a.clearRect(0, 0, c.width, c.height); return a } b.fromElement = function (c) { var d = new b(0, 0, a.RGBA, a.UNSIGNED_BYTE); d.loadContentsOf(c); return d }; b.prototype.loadContentsOf = function (b) {
      this.width = b.width || b.videoWidth; this.height = b.height || b.videoHeight; a.bindTexture(a.TEXTURE_2D,
        this.id); a.texImage2D(a.TEXTURE_2D, 0, this.format, this.format, this.type, b)
    }; b.prototype.initFromBytes = function (b, c, d) { this.width = b; this.height = c; this.format = a.RGBA; this.type = a.UNSIGNED_BYTE; a.bindTexture(a.TEXTURE_2D, this.id); a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, b, c, 0, a.RGBA, this.type, new Uint8Array(d)) }; b.prototype.destroy = function () { a.deleteTexture(this.id); this.id = null }; b.prototype.use = function (b) { a.activeTexture(a.TEXTURE0 + (b || 0)); a.bindTexture(a.TEXTURE_2D, this.id) }; b.prototype.unuse = function (b) {
      a.activeTexture(a.TEXTURE0 +
        (b || 0)); a.bindTexture(a.TEXTURE_2D, null)
    }; b.prototype.ensureFormat = function (b, c, d, f) { if (1 == arguments.length) { var h = arguments[0]; b = h.width; c = h.height; d = h.format; f = h.type } if (b != this.width || c != this.height || d != this.format || f != this.type) this.width = b, this.height = c, this.format = d, this.type = f, a.bindTexture(a.TEXTURE_2D, this.id), a.texImage2D(a.TEXTURE_2D, 0, this.format, b, c, 0, this.format, this.type, null) }; b.prototype.drawTo = function (b) {
      a.framebuffer = a.framebuffer || a.createFramebuffer(); a.bindFramebuffer(a.FRAMEBUFFER,
        a.framebuffer); a.framebufferTexture2D(a.FRAMEBUFFER, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, this.id, 0); if (a.checkFramebufferStatus(a.FRAMEBUFFER) !== a.FRAMEBUFFER_COMPLETE) throw Error("incomplete framebuffer"); a.viewport(0, 0, this.width, this.height); b(); a.bindFramebuffer(a.FRAMEBUFFER, null)
    }; var c = null; b.prototype.fillUsingCanvas = function (b) { b(d(this)); this.format = a.RGBA; this.type = a.UNSIGNED_BYTE; a.bindTexture(a.TEXTURE_2D, this.id); a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, c); return this };
    b.prototype.toImage = function (b) { this.use(); h.getDefaultShader().drawRect(); var f = 4 * this.width * this.height, k = new Uint8Array(f), n = d(this), p = n.createImageData(this.width, this.height); a.readPixels(0, 0, this.width, this.height, a.RGBA, a.UNSIGNED_BYTE, k); for (var m = 0; m < f; m++)p.data[m] = k[m]; n.putImageData(p, 0, 0); b.src = c.toDataURL() }; b.prototype.swapWith = function (a) {
      var b; b = a.id; a.id = this.id; this.id = b; b = a.width; a.width = this.width; this.width = b; b = a.height; a.height = this.height; this.height = b; b = a.format; a.format =
        this.format; this.format = b
    }; return b
  }(), s = "float random(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}";
  v.gl = a;
  v.simpleShader = f;
  v.wrap = k;
  v.Shader = h;
  return v
}();
module.exports = fx;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// SKI GAME
//  demo program of LocatePrint (https://github.com/abagames/LocatePrint)
Object.defineProperty(exports, "__esModule", { value: true });
var lp = __webpack_require__(2);
var gcc = __webpack_require__(5);
var isKeyDown;
var ticks;
var score;
var sx;
var gateScore;
var isTitle;
var isGameOver;
var isEnableCapture = false;
var floor = Math.floor;
var random = Math.random;
window.onload = function () {
    // initialize LocatePrint
    lp.init();
    // align the display to center
    lp.setCanvasStyle('inline');
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
    isKeyDown = times(256, function () { return false; });
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
    if (isEnableCapture) {
        gcc.capture(lp.fxCanvas);
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
        var str = '[';
        for (var i = 0; i < l - 2; i++) {
            str += '-';
        }
        str += ']';
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
function times(n, func) {
    var result = [];
    for (var i = 0; i < n; i++) {
        result.push(func(i));
    }
    return result;
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// LocatePrint (https://github.com/abagames/LocatePrint)
//  display a console of an old home computer
Object.defineProperty(exports, "__esModule", { value: true });
var fx = __webpack_require__(0);
var colorshift_1 = __webpack_require__(3);
var scanlines_1 = __webpack_require__(4);
exports.scrollNone = 0;
exports.scrollAtLastChar = 1;
exports.scrollAtLastLine = 2;
exports.cursorX = 0;
exports.cursorY = 0;
var context;
var colorPalettes;
var fontName;
var texture;
var ticks = 0;
var texts;
var colors;
var backgroundColors;
var currentColor;
var currentBackgroundColor;
var textAreaPaddingX;
var textAreaPaddingY;
var textWidth;
var textHeight;
function init() {
    exports.fxCanvas = fx.canvas();
    exports.fxCanvas.colorShift = fx.wrap(colorshift_1.default);
    exports.fxCanvas.scanlines = fx.wrap(scanlines_1.default);
    exports.canvas = document.createElement('canvas');
    exports.canvas.width = 640;
    exports.canvas.height = 480;
    context = exports.canvas.getContext('2d');
    texture = exports.fxCanvas.texture(exports.canvas);
    colorPalettes =
        ['black', 'red', 'green', 'blue', 'yellow', 'magenta', 'cyan', 'white'];
    fontName = 'VT323'; //Small Fonts';
    currentColor = colorPalettes.length - 1;
    currentBackgroundColor = 0;
    console(40, 20);
    document.body.appendChild(exports.fxCanvas);
}
exports.init = init;
function setCanvasSize(width, height) {
    exports.canvas.width = width;
    exports.canvas.height = height;
}
exports.setCanvasSize = setCanvasSize;
function setCanvasStyle(style) {
    exports.fxCanvas.style = style;
}
exports.setCanvasStyle = setCanvasStyle;
function setColorPalettes(_colorPalettes) {
    if (_colorPalettes === void 0) { _colorPalettes = null; }
    colorPalettes = _colorPalettes;
    currentColor = _colorPalettes.length - 1;
    currentBackgroundColor = 0;
}
exports.setColorPalettes = setColorPalettes;
function setFontName(_fontName) {
    fontName = _fontName;
}
exports.setFontName = setFontName;
function update() {
    renderTexts();
    texture.loadContentsOf(exports.canvas);
    exports.fxCanvas.draw(texture).
        colorShift().
        scanlines(ticks * exports.canvas.height * 0.000005).
        bulgePinch(exports.canvas.width / 2, exports.canvas.height / 2, exports.canvas.width * 0.75, 0.12).
        vignette(0.25, 0.65).
        update();
    ticks++;
}
exports.update = update;
function console(width, height) {
    exports.consoleWidth = width;
    exports.consoleHeight = height;
    texts = times(width, function () { return times(height, function () { return null; }); });
    colors = times(width, function () { return times(height, function () { return 0; }); });
    backgroundColors = times(width, function () { return times(height, function () { return 0; }); });
    cls();
}
exports.console = console;
function locate(x, y) {
    exports.cursorX = clamp(Math.floor(x), 0, exports.consoleWidth - 1);
    exports.cursorY = clamp(Math.floor(y), 0, exports.consoleHeight - 1);
}
exports.locate = locate;
function print(text, scrollType) {
    if (scrollType === void 0) { scrollType = exports.scrollNone; }
    calcTextSize();
    forEach(text, function (c) {
        if (exports.cursorY >= exports.consoleHeight) {
            return false;
        }
        texts[exports.cursorX][exports.cursorY] = c;
        colors[exports.cursorX][exports.cursorY] = currentColor;
        backgroundColors[exports.cursorX][exports.cursorY] =
            currentBackgroundColor;
        exports.cursorX++;
        if (exports.cursorX >= exports.consoleWidth) {
            exports.cursorX = 0;
            exports.cursorY++;
            if ((scrollType !== exports.scrollNone &&
                exports.cursorY >= exports.consoleHeight)) {
                scroll(0, -1);
            }
        }
    });
    if (scrollType === exports.scrollAtLastLine &&
        exports.cursorY >= exports.consoleHeight - 1) {
        scroll(0, -1);
    }
    return this;
}
exports.print = print;
function color(foreground, background) {
    if (background === void 0) { background = 0; }
    currentColor = foreground;
    currentBackgroundColor = background;
}
exports.color = color;
function cls() {
    times(exports.consoleHeight, function (y) {
        times(exports.consoleWidth, function (x) {
            texts[x][y] = null;
        });
    });
    exports.cursorX = exports.cursorY = 0;
}
exports.cls = cls;
function scroll(offsetX, offsetY) {
    if (offsetY === void 0) { offsetY = 0; }
    var w = exports.consoleWidth;
    var h = exports.consoleHeight;
    var ntexts = times(w, function () { return times(h, function () { return null; }); });
    var ncolors = times(w, function () { return times(h, function () { return 0; }); });
    var nbackgroundColors = times(w, function () { return times(h, function () { return 0; }); });
    times(exports.consoleHeight, function (y) {
        var ny = y + offsetY;
        if (ny >= 0 && ny < exports.consoleHeight) {
            times(exports.consoleWidth, function (x) {
                var nx = x + offsetX;
                if (nx >= 0 && nx < exports.consoleWidth) {
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
    exports.cursorX = clamp(exports.cursorX + offsetX, 0, exports.consoleWidth - 1);
    exports.cursorY = clamp(exports.cursorY + offsetY, 0, exports.consoleHeight - 1);
}
exports.scroll = scroll;
function screen(x, y) {
    if (x < 0 || x >= exports.consoleWidth || y < 0 || y >= exports.consoleHeight) {
        return null;
    }
    return texts[x][y];
}
exports.screen = screen;
function calcTextSize() {
    textAreaPaddingX = exports.canvas.width * 0.05;
    textAreaPaddingY = exports.canvas.height * 0.05;
    textWidth =
        (exports.canvas.width - textAreaPaddingX * 2) / exports.consoleWidth;
    textHeight =
        (exports.canvas.height - textAreaPaddingY * 2) / exports.consoleHeight;
    context.font =
        Math.floor(textHeight * 1.3) + 'px ' + fontName;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
}
function renderTexts() {
    calcTextSize();
    context.fillStyle = colorPalettes[0];
    context.fillRect(textAreaPaddingX, textAreaPaddingY * 0.9, exports.canvas.width - textAreaPaddingX * 2, exports.canvas.height - textAreaPaddingY * 2 * 0.9);
    times(exports.consoleHeight, function (y) {
        times(exports.consoleWidth, function (x) {
            drawChar(x, y);
        });
    });
}
function drawChar(x, y) {
    var c = texts[x][y];
    if (!c) {
        return;
    }
    var px = (x + 0.5) * textWidth + textAreaPaddingX;
    var py = (y + 0.5) * textHeight + textAreaPaddingY;
    var bClr = backgroundColors[x][y];
    if (bClr > 0) {
        context.fillStyle = colorPalettes[bClr];
        context.fillRect(px - textWidth / 2, py - textHeight / 2, textWidth, textHeight);
    }
    if (c !== ' ') {
        var clr = colors[x][y];
        context.fillStyle = colorPalettes[clr];
        context.fillText(c, px, py);
    }
}
function clamp(v, min, max) {
    if (v < min) {
        return min;
    }
    else if (v > max) {
        return max;
    }
    else {
        return v;
    }
}
function times(n, func) {
    var result = [];
    for (var i = 0; i < n; i++) {
        result.push(func(i));
    }
    return result;
}
function forEach(array, func) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        result.push(func(array[i]));
    }
    return result;
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fx = __webpack_require__(0);
function colorShift() {
    var shader = new fx.Shader(null, '\
		uniform sampler2D texture;\
		uniform float texSizeX;\
		varying vec2 texCoord;\
		\
		void main() {\
			vec2 ofs = vec2(2.0 / texSizeX, 0.0);\
			vec4 pl = texture2D(texture, texCoord - ofs);\
			vec4 pc = texture2D(texture, texCoord);\
			vec4 pr = texture2D(texture, texCoord + ofs);\
			gl_FragColor = vec4(pl.r, pc.g, pr.b, pc.a);\
		}\
	');
    fx.simpleShader.call(this, shader, {
        texSizeX: this.width
    });
    return this;
}
exports.default = colorShift;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fx = __webpack_require__(0);
function scanlines(offset) {
    var shader = new fx.Shader(null, '\
		uniform sampler2D texture;\
		uniform float texSizeY;\
		uniform float offset;\
		varying vec2 texCoord;\
		\
		void main() {\
			vec4 p = texture2D(texture, texCoord);\
			float br = clamp(sin((texCoord.y + offset) / texSizeY * 50000.0) *\
				0.1 + 1.0, 0.0, 1.0);\
			p.rgb *= br;\
			gl_FragColor = p;\
		}\
	');
    fx.simpleShader.call(this, shader, {
        texSizeY: this.height,
        offset: offset
    });
    return this;
}
exports.default = scanlines;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["gcc"] = factory();
	else
		root["gcc"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var GIFEncoder = __webpack_require__(2);
	exports.options = {
	    scale: 0.5,
	    durationSec: 3,
	    keyCode: 67,
	    capturingFps: 20,
	    appFps: 60,
	    isAppendingImgElement: true,
	    quality: 10,
	    downloadFileName: null
	};
	var contextsNum;
	var contexts;
	var isCaptured;
	var index = 0;
	var frameCount = 0;
	var image = new Image();
	var isInfiniteDuration = false;
	function capture(element) {
	    frameCount++;
	    var capturePerFrame = exports.options.appFps / exports.options.capturingFps;
	    if (frameCount < capturePerFrame) {
	        return;
	    }
	    frameCount -= capturePerFrame;
	    if (!contexts) {
	        begin(element);
	    }
	    if (isInfiniteDuration) {
	        contexts.push(createContext(element));
	    }
	    contexts[index].drawImage(element, 0, 0);
	    if (!isInfiniteDuration) {
	        isCaptured[index] = true;
	    }
	    index++;
	    if (!isInfiniteDuration && index >= contextsNum) {
	        index = 0;
	    }
	}
	exports.capture = capture;
	function captureSvg(svgElm) {
	    var capturePerFrame = exports.options.appFps / exports.options.capturingFps;
	    if (frameCount + 1 < capturePerFrame) {
	        frameCount++;
	        return;
	    }
	    var svgXml = new XMLSerializer().serializeToString(svgElm);
	    image.src = "data:image/svg+xml;base64," + btoa(svgXml);
	    capture(image);
	}
	exports.captureSvg = captureSvg;
	function begin(element) {
	    if (isInfiniteDuration) {
	        contexts = [];
	    }
	    else {
	        contextsNum = exports.options.durationSec * exports.options.capturingFps;
	        contexts = times(contextsNum, function () { return createContext(element); });
	        isCaptured = times(contextsNum, function () { return false; });
	    }
	    document.addEventListener('keydown', function (e) {
	        if (e.keyCode == exports.options.keyCode) {
	            end();
	        }
	    });
	}
	function createContext(element) {
	    var cvs = document.createElement('canvas');
	    cvs.width = element.width * exports.options.scale;
	    cvs.height = element.height * exports.options.scale;
	    var ctx = cvs.getContext('2d');
	    ctx.scale(exports.options.scale, exports.options.scale);
	    return ctx;
	}
	function end() {
	    var encoder = new GIFEncoder();
	    encoder.setRepeat(0);
	    encoder.setDelay(1000 / exports.options.capturingFps);
	    encoder.setQuality(exports.options.quality);
	    encoder.start();
	    if (isInfiniteDuration) {
	        times(index - 1, function (i) {
	            encoder.addFrame(contexts[i]);
	        });
	    }
	    else {
	        var idx_1 = index;
	        times(contextsNum, function () {
	            if (isCaptured[idx_1]) {
	                encoder.addFrame(contexts[idx_1]);
	            }
	            idx_1++;
	            if (idx_1 >= contextsNum) {
	                idx_1 = 0;
	            }
	        });
	    }
	    encoder.finish();
	    if (exports.options.downloadFileName != null) {
	        encoder.download(exports.options.downloadFileName);
	        return null;
	    }
	    var binaryGif = encoder.stream().getData();
	    var imgElement = document.createElement('img');
	    imgElement.src = 'data:image/gif;base64,' + encode64(binaryGif);
	    if (exports.options.isAppendingImgElement) {
	        document.getElementsByTagName('body')[0].appendChild(imgElement);
	    }
	    return imgElement;
	}
	exports.end = end;
	function times(n, func) {
	    var result = [];
	    for (var i = 0; i < n; i++) {
	        result.push(func(i));
	    }
	    return result;
	}
	function setOptions(_options) {
	    for (var attr in _options) {
	        exports.options[attr] = _options[attr];
	    }
	    isInfiniteDuration = exports.options.durationSec <= 0;
	}
	exports.setOptions = setOptions;
	// https://github.com/antimatter15/jsgif/blob/master/b64.js
	function encode64(input) {
	    var output = "", i = 0, l = input.length, key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	    while (i < l) {
	        chr1 = input.charCodeAt(i++);
	        chr2 = input.charCodeAt(i++);
	        chr3 = input.charCodeAt(i++);
	        enc1 = chr1 >> 2;
	        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	        enc4 = chr3 & 63;
	        if (isNaN(chr2))
	            enc3 = enc4 = 64;
	        else if (isNaN(chr3))
	            enc4 = 64;
	        output = output + key.charAt(enc1) + key.charAt(enc2) + key.charAt(enc3) + key.charAt(enc4);
	    }
	    return output;
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * This class lets you encode animated GIF files
	 * Base class :  http://www.java2s.com/Code/Java/2D-Graphics-GUI/AnimatedGifEncoder.htm
	 * @author Kevin Weiner (original Java version - kweiner@fmsware.com)
	 * @author Thibault Imbert (AS3 version - bytearray.org)
	 * @author Kevin Kwok (JavaScript version - https://github.com/antimatter15/jsgif)
	 * @version 0.1 AS3 implementation
	 */

	GIFEncoder = function () {

	  for (var i = 0, chr = {}; i < 256; i++)
	    chr[i] = String.fromCharCode(i);

	  function ByteArray() {
	    this.bin = [];
	  }

	  ByteArray.prototype.getData = function () {
	    for (var v = '', l = this.bin.length, i = 0; i < l; i++)
	      v += chr[this.bin[i]];
	    return v;
	  };

	  ByteArray.prototype.writeByte = function (val) {
	    this.bin.push(val);
	  };

	  ByteArray.prototype.writeUTFBytes = function (string) {
	    for (var l = string.length, i = 0; i < l; i++)
	      this.writeByte(string.charCodeAt(i));
	  };

	  ByteArray.prototype.writeBytes = function (array, offset, length) {
	    for (var l = length || array.length, i = offset || 0; i < l; i++)
	      this.writeByte(array[i]);
	  };

	  var exports = {};
	  var width; // image size
	  var height;
	  var transparent = null; // transparent color if given
	  var transIndex; // transparent index in color table
	  var repeat = -1; // no repeat
	  var delay = 0; // frame delay (hundredths)
	  var started = false; // ready to output frames
	  var out;
	  var image; // current frame
	  var pixels; // BGR byte array from frame
	  var indexedPixels; // converted frame indexed to palette
	  var colorDepth; // number of bit planes
	  var colorTab; // RGB palette
	  var usedEntry = []; // active palette entries
	  var palSize = 7; // color table size (bits-1)
	  var dispose = -1; // disposal code (-1 = use default)
	  var closeStream = false; // close stream when finished
	  var firstFrame = true;
	  var sizeSet = false; // if false, get size from first frame
	  var sample = 10; // default sample interval for quantizer
	  var comment = "Generated by jsgif (https://github.com/antimatter15/jsgif/)"; // default comment for generated gif

		/**
		 * Sets the delay time between each frame, or changes it for subsequent frames
		 * (applies to last frame added)
		 * int delay time in milliseconds
		 * @param ms
		 */

	  var setDelay = exports.setDelay = function setDelay(ms) {
	    delay = Math.round(ms / 10);
	  };

		/**
		 * Sets the GIF frame disposal code for the last added frame and any
		 *
		 * subsequent frames. Default is 0 if no transparent color has been set,
		 * otherwise 2.
		 * @param code
		 * int disposal code.
		 */

	  var setDispose = exports.setDispose = function setDispose(code) {
	    if (code >= 0) dispose = code;
	  };

		/**
		 * Sets the number of times the set of GIF frames should be played. Default is
		 * 1; 0 means play indefinitely. Must be invoked before the first image is
		 * added.
		 *
		 * @param iter
		 * int number of iterations.
		 * @return
		 */

	  var setRepeat = exports.setRepeat = function setRepeat(iter) {
	    if (iter >= 0) repeat = iter;
	  };

		/**
		 * Sets the transparent color for the last added frame and any subsequent
		 * frames. Since all colors are subject to modification in the quantization
		 * process, the color in the final palette for each frame closest to the given
		 * color becomes the transparent color for that frame. May be set to null to
		 * indicate no transparent color.
		 * @param
		 * Color to be treated as transparent on display.
		 */

	  var setTransparent = exports.setTransparent = function setTransparent(c) {
	    transparent = c;
	  };


		/**
		 * Sets the comment for the block comment
		 * @param
		 * string to be insterted as comment
		 */

	  var setComment = exports.setComment = function setComment(c) {
	    comment = c;
	  };



		/**
		 * The addFrame method takes an incoming BitmapData object to create each frames
		 * @param
		 * BitmapData object to be treated as a GIF's frame
		 */

	  var addFrame = exports.addFrame = function addFrame(im, is_imageData) {

	    if ((im === null) || !started || out === null) {
	      throw new Error("Please call start method before calling addFrame");
	    }

	    var ok = true;

	    try {
	      if (!is_imageData) {
	        image = im.getImageData(0, 0, im.canvas.width, im.canvas.height).data;
	        if (!sizeSet) setSize(im.canvas.width, im.canvas.height);
	      } else {
	        if (im instanceof ImageData) {
	          image = im.data;
	          if (!sizeset || width != im.width || height != im.height) {
	            setSize(im.width, im.height);
	          } else {

	          }
	        } else if (im instanceof Uint8ClampedArray) {
	          if (im.length == (width * height * 4)) {
	            image = im;
	          } else {
	            console.log("Please set the correct size: ImageData length mismatch");
	            ok = false;
	          }
	        } else {
	          console.log("Please provide correct input");
	          ok = false;
	        }
	      }
	      getImagePixels(); // convert to correct format if necessary
	      analyzePixels(); // build color table & map pixels

	      if (firstFrame) {
	        writeLSD(); // logical screen descriptior
	        writePalette(); // global color table
	        if (repeat >= 0) {
	          // use NS app extension to indicate reps
	          writeNetscapeExt();
	        }
	      }

	      writeGraphicCtrlExt(); // write graphic control extension
	      if (comment !== '') {
	        writeCommentExt(); // write comment extension
	      }
	      writeImageDesc(); // image descriptor
	      if (!firstFrame) writePalette(); // local color table
	      writePixels(); // encode and write pixel data
	      firstFrame = false;
	    } catch (e) {
	      ok = false;
	    }

	    return ok;
	  };

		/**
		* @description: Downloads the encoded gif with the given name
		* No need of any conversion from the stream data (out) to base64
		* Solves the issue of large file sizes when there are more frames
		* and does not involve in creation of any temporary data in the process
		* so no wastage of memory, and speeds up the process of downloading
		* to just calling this function.
		* @parameter {String} filename filename used for downloading the gif
		*/

	  var download = exports.download = function download(filename) {
	    if (out === null || closeStream == false) {
	      console.log("Please call start method and add frames and call finish method before calling download");
	    } else {
	      filename = filename !== undefined ? (filename.endsWith(".gif") ? filename : filename + ".gif") : "download.gif";
	      var templink = document.createElement("a");
	      templink.download = filename;
	      templink.href = URL.createObjectURL(new Blob([new Uint8Array(out.bin)], { type: "image/gif" }));
	      templink.click();
	    }
	  }

		/**
		 * Adds final trailer to the GIF stream, if you don't call the finish method
		 * the GIF stream will not be valid.
		 */

	  var finish = exports.finish = function finish() {

	    if (!started) return false;

	    var ok = true;
	    started = false;

	    try {
	      out.writeByte(0x3b); // gif trailer
	      closeStream = true;
	    } catch (e) {
	      ok = false;
	    }

	    return ok;
	  };

		/**
		 * Resets some members so that a new stream can be started.
		 * This method is actually called by the start method
		 */

	  var reset = function reset() {

	    // reset for subsequent use
	    transIndex = 0;
	    image = null;
	    pixels = null;
	    indexedPixels = null;
	    colorTab = null;
	    closeStream = false;
	    firstFrame = true;
	  };

		/**
		 * * Sets frame rate in frames per second. Equivalent to
		 * <code>setDelay(1000/fps)</code>.
		 * @param fps
		 * float frame rate (frames per second)
		 */

	  var setFrameRate = exports.setFrameRate = function setFrameRate(fps) {
	    if (fps != 0xf) delay = Math.round(100 / fps);
	  };

		/**
		 * Sets quality of color quantization (conversion of images to the maximum 256
		 * colors allowed by the GIF specification). Lower values (minimum = 1)
		 * produce better colors, but slow processing significantly. 10 is the
		 * default, and produces good color mapping at reasonable speeds. Values
		 * greater than 20 do not yield significant improvements in speed.
		 * @param quality
		 * int greater than 0.
		 * @return
		 */

	  var setQuality = exports.setQuality = function setQuality(quality) {
	    if (quality < 1) quality = 1;
	    sample = quality;
	  };

		/**
		 * Sets the GIF frame size. The default size is the size of the first frame
		 * added if this method is not invoked.
		 * @param w
		 * int frame width.
		 * @param h
		 * int frame width.
		 */

	  var setSize = exports.setSize = function setSize(w, h) {

	    if (started && !firstFrame) return;
	    width = w;
	    height = h;
	    if (width < 1) width = 320;
	    if (height < 1) height = 240;
	    sizeSet = true;
	  };

		/**
		 * Initiates GIF file creation on the given stream.
		 * @param os
		 * OutputStream on which GIF images are written.
		 * @return false if initial write failed.
		 */

	  var start = exports.start = function start() {

	    reset();
	    var ok = true;
	    closeStream = false;
	    out = new ByteArray();
	    try {
	      out.writeUTFBytes("GIF89a"); // header
	    } catch (e) {
	      ok = false;
	    }

	    return started = ok;
	  };

	  var cont = exports.cont = function cont() {

	    reset();
	    var ok = true;
	    closeStream = false;
	    out = new ByteArray();

	    return started = ok;
	  };

		/**
		 * Analyzes image colors and creates color map.
		 */

	  var analyzePixels = function analyzePixels() {

	    var len = pixels.length;
	    var nPix = len / 3;
	    indexedPixels = [];
	    var nq = new NeuQuant(pixels, len, sample);

	    // initialize quantizer
	    colorTab = nq.process(); // create reduced palette

	    // map image pixels to new palette
	    var k = 0;
	    for (var j = 0; j < nPix; j++) {
	      var index = nq.map(pixels[k++] & 0xff, pixels[k++] & 0xff, pixels[k++] & 0xff);
	      usedEntry[index] = true;
	      indexedPixels[j] = index;
	    }

	    pixels = null;
	    colorDepth = 8;
	    palSize = 7;

	    // get closest match to transparent color if specified
	    if (transparent !== null) {
	      transIndex = findClosest(transparent);
	    }
	  };

		/**
		 * Returns index of palette color closest to c
		 */

	  var findClosest = function findClosest(c) {

	    if (colorTab === null) return -1;
	    var r = (c & 0xFF0000) >> 16;
	    var g = (c & 0x00FF00) >> 8;
	    var b = (c & 0x0000FF);
	    var minpos = 0;
	    var dmin = 256 * 256 * 256;
	    var len = colorTab.length;

	    for (var i = 0; i < len;) {
	      var dr = r - (colorTab[i++] & 0xff);
	      var dg = g - (colorTab[i++] & 0xff);
	      var db = b - (colorTab[i] & 0xff);
	      var d = dr * dr + dg * dg + db * db;
	      var index = i / 3;
	      if (usedEntry[index] && (d < dmin)) {
	        dmin = d;
	        minpos = index;
	      }
	      i++;
	    }
	    return minpos;
	  };

		/**
		 * Extracts image pixels into byte array "pixels
		 */

	  var getImagePixels = function getImagePixels() {
	    var w = width;
	    var h = height;
	    pixels = [];
	    var data = image;
	    var count = 0;

	    for (var i = 0; i < h; i++) {

	      for (var j = 0; j < w; j++) {

	        var b = (i * w * 4) + j * 4;
	        pixels[count++] = data[b];
	        pixels[count++] = data[b + 1];
	        pixels[count++] = data[b + 2];

	      }

	    }
	  };

		/**
		 * Writes Graphic Control Extension
		 */

	  var writeGraphicCtrlExt = function writeGraphicCtrlExt() {
	    out.writeByte(0x21); // extension introducer
	    out.writeByte(0xf9); // GCE label
	    out.writeByte(4); // data block size
	    var transp;
	    var disp;
	    if (transparent === null) {
	      transp = 0;
	      disp = 0; // dispose = no action
	    } else {
	      transp = 1;
	      disp = 2; // force clear if using transparent color
	    }
	    if (dispose >= 0) {
	      disp = dispose & 7; // user override
	    }
	    disp <<= 2;
	    // packed fields
	    out.writeByte(0 | // 1:3 reserved
	      disp | // 4:6 disposal
	      0 | // 7 user input - 0 = none
	      transp); // 8 transparency flag

	    WriteShort(delay); // delay x 1/100 sec
	    out.writeByte(transIndex); // transparent color index
	    out.writeByte(0); // block terminator
	  };

		/**
		 * Writes Comment Extention
		 */

	  var writeCommentExt = function writeCommentExt() {
	    out.writeByte(0x21); // extension introducer
	    out.writeByte(0xfe); // comment label
	    out.writeByte(comment.length); // Block Size (s)
	    out.writeUTFBytes(comment);
	    out.writeByte(0); // block terminator
	  };


		/**
		 * Writes Image Descriptor
		 */

	  var writeImageDesc = function writeImageDesc() {

	    out.writeByte(0x2c); // image separator
	    WriteShort(0); // image position x,y = 0,0
	    WriteShort(0);
	    WriteShort(width); // image size
	    WriteShort(height);

	    // packed fields
	    if (firstFrame) {
	      // no LCT - GCT is used for first (or only) frame
	      out.writeByte(0);
	    } else {
	      // specify normal LCT
	      out.writeByte(0x80 | // 1 local color table 1=yes
	        0 | // 2 interlace - 0=no
	        0 | // 3 sorted - 0=no
	        0 | // 4-5 reserved
	        palSize); // 6-8 size of color table
	    }
	  };

		/**
		 * Writes Logical Screen Descriptor
		 */

	  var writeLSD = function writeLSD() {

	    // logical screen size
	    WriteShort(width);
	    WriteShort(height);
	    // packed fields
	    out.writeByte((0x80 | // 1 : global color table flag = 1 (gct used)
	      0x70 | // 2-4 : color resolution = 7
	      0x00 | // 5 : gct sort flag = 0
	      palSize)); // 6-8 : gct size

	    out.writeByte(0); // background color index
	    out.writeByte(0); // pixel aspect ratio - assume 1:1
	  };

		/**
		 * Writes Netscape application extension to define repeat count.
		 */

	  var writeNetscapeExt = function writeNetscapeExt() {
	    out.writeByte(0x21); // extension introducer
	    out.writeByte(0xff); // app extension label
	    out.writeByte(11); // block size
	    out.writeUTFBytes("NETSCAPE" + "2.0"); // app id + auth code
	    out.writeByte(3); // sub-block size
	    out.writeByte(1); // loop sub-block id
	    WriteShort(repeat); // loop count (extra iterations, 0=repeat forever)
	    out.writeByte(0); // block terminator
	  };

		/**
		 * Writes color table
		 */

	  var writePalette = function writePalette() {
	    out.writeBytes(colorTab);
	    var n = (3 * 256) - colorTab.length;
	    for (var i = 0; i < n; i++) out.writeByte(0);
	  };

	  var WriteShort = function WriteShort(pValue) {
	    out.writeByte(pValue & 0xFF);
	    out.writeByte((pValue >> 8) & 0xFF);
	  };

		/**
		 * Encodes and writes pixel data
		 */

	  var writePixels = function writePixels() {
	    var myencoder = new LZWEncoder(width, height, indexedPixels, colorDepth);
	    myencoder.encode(out);
	  };

		/**
		 * Retrieves the GIF stream
		 */

	  var stream = exports.stream = function stream() {
	    return out;
	  };

	  var setProperties = exports.setProperties = function setProperties(has_start, is_first) {
	    started = has_start;
	    firstFrame = is_first;
	  };

	  return exports;

	};

	module.exports = GIFEncoder;

	/**
	 * This class handles LZW encoding
	 * Adapted from Jef Poskanzer's Java port by way of J. M. G. Elliott.
	 * @author Kevin Weiner (original Java version - kweiner@fmsware.com)
	 * @author Thibault Imbert (AS3 version - bytearray.org)
	 * @author Kevin Kwok (JavaScript version - https://github.com/antimatter15/jsgif)
	 * @version 0.1 AS3 implementation
	 */

	LZWEncoder = function () {

	  var exports = {};
	  var EOF = -1;
	  var imgW;
	  var imgH;
	  var pixAry;
	  var initCodeSize;
	  var remaining;
	  var curPixel;

	  // GIFCOMPR.C - GIF Image compression routines
	  // Lempel-Ziv compression based on 'compress'. GIF modifications by
	  // David Rowley (mgardi@watdcsu.waterloo.edu)
	  // General DEFINEs

	  var BITS = 12;
	  var HSIZE = 5003; // 80% occupancy

	  // GIF Image compression - modified 'compress'
	  // Based on: compress.c - File compression ala IEEE Computer, June 1984.
	  // By Authors: Spencer W. Thomas (decvax!harpo!utah-cs!utah-gr!thomas)
	  // Jim McKie (decvax!mcvax!jim)
	  // Steve Davies (decvax!vax135!petsd!peora!srd)
	  // Ken Turkowski (decvax!decwrl!turtlevax!ken)
	  // James A. Woods (decvax!ihnp4!ames!jaw)
	  // Joe Orost (decvax!vax135!petsd!joe)

	  var n_bits; // number of bits/code
	  var maxbits = BITS; // user settable max # bits/code
	  var maxcode; // maximum code, given n_bits
	  var maxmaxcode = 1 << BITS; // should NEVER generate this code
	  var htab = [];
	  var codetab = [];
	  var hsize = HSIZE; // for dynamic table sizing
	  var free_ent = 0; // first unused entry

	  // block compression parameters -- after all codes are used up,
	  // and compression rate changes, start over.

	  var clear_flg = false;

	  // Algorithm: use open addressing double hashing (no chaining) on the
	  // prefix code / next character combination. We do a variant of Knuth's
	  // algorithm D (vol. 3, sec. 6.4) along with G. Knott's relatively-prime
	  // secondary probe. Here, the modular division first probe is gives way
	  // to a faster exclusive-or manipulation. Also do block compression with
	  // an adaptive reset, whereby the code table is cleared when the compression
	  // ratio decreases, but after the table fills. The variable-length output
	  // codes are re-sized at this point, and a special CLEAR code is generated
	  // for the decompressor. Late addition: construct the table according to
	  // file size for noticeable speed improvement on small files. Please direct
	  // questions about this implementation to ames!jaw.

	  var g_init_bits;
	  var ClearCode;
	  var EOFCode;

	  // output
	  // Output the given code.
	  // Inputs:
	  // code: A n_bits-bit integer. If == -1, then EOF. This assumes
	  // that n_bits =< wordsize - 1.
	  // Outputs:
	  // Outputs code to the file.
	  // Assumptions:
	  // Chars are 8 bits long.
	  // Algorithm:
	  // Maintain a BITS character long buffer (so that 8 codes will
	  // fit in it exactly). Use the VAX insv instruction to insert each
	  // code in turn. When the buffer fills up empty it and start over.

	  var cur_accum = 0;
	  var cur_bits = 0;
	  var masks = [0x0000, 0x0001, 0x0003, 0x0007, 0x000F, 0x001F, 0x003F, 0x007F, 0x00FF, 0x01FF, 0x03FF, 0x07FF, 0x0FFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF];

	  // Number of characters so far in this 'packet'
	  var a_count;

	  // Define the storage for the packet accumulator
	  var accum = [];

	  var LZWEncoder = exports.LZWEncoder = function LZWEncoder(width, height, pixels, color_depth) {
	    imgW = width;
	    imgH = height;
	    pixAry = pixels;
	    initCodeSize = Math.max(2, color_depth);
	  };

	  // Add a character to the end of the current packet, and if it is 254
	  // characters, flush the packet to disk.
	  var char_out = function char_out(c, outs) {
	    accum[a_count++] = c;
	    if (a_count >= 254) flush_char(outs);
	  };

	  // Clear out the hash table
	  // table clear for block compress

	  var cl_block = function cl_block(outs) {
	    cl_hash(hsize);
	    free_ent = ClearCode + 2;
	    clear_flg = true;
	    output(ClearCode, outs);
	  };

	  // reset code table
	  var cl_hash = function cl_hash(hsize) {
	    for (var i = 0; i < hsize; ++i) htab[i] = -1;
	  };

	  var compress = exports.compress = function compress(init_bits, outs) {

	    var fcode;
	    var i; /* = 0 */
	    var c;
	    var ent;
	    var disp;
	    var hsize_reg;
	    var hshift;

	    // Set up the globals: g_init_bits - initial number of bits
	    g_init_bits = init_bits;

	    // Set up the necessary values
	    clear_flg = false;
	    n_bits = g_init_bits;
	    maxcode = MAXCODE(n_bits);

	    ClearCode = 1 << (init_bits - 1);
	    EOFCode = ClearCode + 1;
	    free_ent = ClearCode + 2;

	    a_count = 0; // clear packet

	    ent = nextPixel();

	    hshift = 0;
	    for (fcode = hsize; fcode < 65536; fcode *= 2)
	      ++hshift;
	    hshift = 8 - hshift; // set hash code range bound

	    hsize_reg = hsize;
	    cl_hash(hsize_reg); // clear hash table

	    output(ClearCode, outs);

	    outer_loop: while ((c = nextPixel()) != EOF) {
	      fcode = (c << maxbits) + ent;
	      i = (c << hshift) ^ ent; // xor hashing

	      if (htab[i] == fcode) {
	        ent = codetab[i];
	        continue;
	      }

	      else if (htab[i] >= 0) { // non-empty slot

	        disp = hsize_reg - i; // secondary hash (after G. Knott)
	        if (i === 0) disp = 1;

	        do {
	          if ((i -= disp) < 0)
	            i += hsize_reg;

	          if (htab[i] == fcode) {
	            ent = codetab[i];
	            continue outer_loop;
	          }
	        } while (htab[i] >= 0);
	      }

	      output(ent, outs);
	      ent = c;
	      if (free_ent < maxmaxcode) {
	        codetab[i] = free_ent++; // code -> hashtable
	        htab[i] = fcode;
	      }
	      else cl_block(outs);
	    }

	    // Put out the final code.
	    output(ent, outs);
	    output(EOFCode, outs);
	  };

	  // ----------------------------------------------------------------------------
	  var encode = exports.encode = function encode(os) {
	    os.writeByte(initCodeSize); // write "initial code size" byte
	    remaining = imgW * imgH; // reset navigation variables
	    curPixel = 0;
	    compress(initCodeSize + 1, os); // compress and write the pixel data
	    os.writeByte(0); // write block terminator
	  };

	  // Flush the packet to disk, and reset the accumulator
	  var flush_char = function flush_char(outs) {
	    if (a_count > 0) {
	      outs.writeByte(a_count);
	      outs.writeBytes(accum, 0, a_count);
	      a_count = 0;
	    }
	  };

	  var MAXCODE = function MAXCODE(n_bits) {
	    return (1 << n_bits) - 1;
	  };

	  // ----------------------------------------------------------------------------
	  // Return the next pixel from the image
	  // ----------------------------------------------------------------------------

	  var nextPixel = function nextPixel() {
	    if (remaining === 0) return EOF;
	    --remaining;
	    var pix = pixAry[curPixel++];
	    return pix & 0xff;
	  };

	  var output = function output(code, outs) {

	    cur_accum &= masks[cur_bits];

	    if (cur_bits > 0) cur_accum |= (code << cur_bits);
	    else cur_accum = code;

	    cur_bits += n_bits;

	    while (cur_bits >= 8) {
	      char_out((cur_accum & 0xff), outs);
	      cur_accum >>= 8;
	      cur_bits -= 8;
	    }

	    // If the next entry is going to be too big for the code size,
	    // then increase it, if possible.

	    if (free_ent > maxcode || clear_flg) {

	      if (clear_flg) {

	        maxcode = MAXCODE(n_bits = g_init_bits);
	        clear_flg = false;

	      } else {

	        ++n_bits;
	        if (n_bits == maxbits) maxcode = maxmaxcode;
	        else maxcode = MAXCODE(n_bits);
	      }
	    }

	    if (code == EOFCode) {

	      // At EOF, write the rest of the buffer.
	      while (cur_bits > 0) {
	        char_out((cur_accum & 0xff), outs);
	        cur_accum >>= 8;
	        cur_bits -= 8;
	      }

	      flush_char(outs);
	    }
	  };

	  LZWEncoder.apply(this, arguments);
	  return exports;
	};

	/*
	 * NeuQuant Neural-Net Quantization Algorithm
	 * ------------------------------------------
	 *
	 * Copyright (c) 1994 Anthony Dekker
	 *
	 * NEUQUANT Neural-Net quantization algorithm by Anthony Dekker, 1994. See
	 * "Kohonen neural networks for optimal colour quantization" in "Network:
	 * Computation in Neural Systems" Vol. 5 (1994) pp 351-367. for a discussion of
	 * the algorithm.
	 *
	 * Any party obtaining a copy of these files from the author, directly or
	 * indirectly, is granted, free of charge, a full and unrestricted irrevocable,
	 * world-wide, paid up, royalty-free, nonexclusive right and license to deal in
	 * this software and documentation files (the "Software"), including without
	 * limitation the rights to use, copy, modify, merge, publish, distribute,
	 * sublicense, and/or sell copies of the Software, and to permit persons who
	 * receive copies from any such party to do so, with the only requirement being
	 * that this copyright notice remain intact.
	 */

	/*
	 * This class handles Neural-Net quantization algorithm
	 * @author Kevin Weiner (original Java version - kweiner@fmsware.com)
	 * @author Thibault Imbert (AS3 version - bytearray.org)
	 * @author Kevin Kwok (JavaScript version - https://github.com/antimatter15/jsgif)
	 * @version 0.1 AS3 implementation
	 */

	NeuQuant = function () {

	  var exports = {};
	  var netsize = 256; /* number of colours used */

	  /* four primes near 500 - assume no image has a length so large */
	  /* that it is divisible by all four primes */

	  var prime1 = 499;
	  var prime2 = 491;
	  var prime3 = 487;
	  var prime4 = 503;
	  var minpicturebytes = (3 * prime4); /* minimum size for input image */

		/*
		 * Program Skeleton ---------------- [select samplefac in range 1..30] [read
		 * image from input file] pic = (unsigned char*) malloc(3*width*height);
		 * initnet(pic,3*width*height,samplefac); learn(); unbiasnet(); [write output
		 * image header, using writecolourmap(f)] inxbuild(); write output image using
		 * inxsearch(b,g,r)
		 */

		/*
		 * Network Definitions -------------------
		 */

	  var maxnetpos = (netsize - 1);
	  var netbiasshift = 4; /* bias for colour values */
	  var ncycles = 100; /* no. of learning cycles */

	  /* defs for freq and bias */
	  var intbiasshift = 16; /* bias for fractions */
	  var intbias = (1 << intbiasshift);
	  var gammashift = 10; /* gamma = 1024 */
	  var gamma = (1 << gammashift);
	  var betashift = 10;
	  var beta = (intbias >> betashift); /* beta = 1/1024 */
	  var betagamma = (intbias << (gammashift - betashift));

	  /* defs for decreasing radius factor */
	  var initrad = (netsize >> 3); /* for 256 cols, radius starts */
	  var radiusbiasshift = 6; /* at 32.0 biased by 6 bits */
	  var radiusbias = (1 << radiusbiasshift);
	  var initradius = (initrad * radiusbias); /* and decreases by a */
	  var radiusdec = 30; /* factor of 1/30 each cycle */

	  /* defs for decreasing alpha factor */
	  var alphabiasshift = 10; /* alpha starts at 1.0 */
	  var initalpha = (1 << alphabiasshift);
	  var alphadec; /* biased by 10 bits */

	  /* radbias and alpharadbias used for radpower calculation */
	  var radbiasshift = 8;
	  var radbias = (1 << radbiasshift);
	  var alpharadbshift = (alphabiasshift + radbiasshift);
	  var alpharadbias = (1 << alpharadbshift);

		/*
		 * Types and Global Variables --------------------------
		 */

	  var thepicture; /* the input image itself */
	  var lengthcount; /* lengthcount = H*W*3 */
	  var samplefac; /* sampling factor 1..30 */

	  // typedef int pixel[4]; /* BGRc */
	  var network; /* the network itself - [netsize][4] */
	  var netindex = [];

	  /* for network lookup - really 256 */
	  var bias = [];

	  /* bias and freq arrays for learning */
	  var freq = [];
	  var radpower = [];

	  var NeuQuant = exports.NeuQuant = function NeuQuant(thepic, len, sample) {

	    var i;
	    var p;

	    thepicture = thepic;
	    lengthcount = len;
	    samplefac = sample;

	    network = new Array(netsize);

	    for (i = 0; i < netsize; i++) {

	      network[i] = new Array(4);
	      p = network[i];
	      p[0] = p[1] = p[2] = (i << (netbiasshift + 8)) / netsize;
	      freq[i] = intbias / netsize; /* 1/netsize */
	      bias[i] = 0;
	    }
	  };

	  var colorMap = function colorMap() {

	    var map = [];
	    var index = new Array(netsize);

	    for (var i = 0; i < netsize; i++)
	      index[network[i][3]] = i;

	    var k = 0;
	    for (var l = 0; l < netsize; l++) {
	      var j = index[l];
	      map[k++] = (network[j][0]);
	      map[k++] = (network[j][1]);
	      map[k++] = (network[j][2]);
	    }

	    return map;
	  };

		/*
		 * Insertion sort of network and building of netindex[0..255] (to do after
		 * unbias)
		 * -------------------------------------------------------------------------------
		 */

	  var inxbuild = function inxbuild() {

	    var i;
	    var j;
	    var smallpos;
	    var smallval;
	    var p;
	    var q;
	    var previouscol;
	    var startpos;

	    previouscol = 0;
	    startpos = 0;
	    for (i = 0; i < netsize; i++) {

	      p = network[i];
	      smallpos = i;
	      smallval = p[1]; /* index on g */

	      /* find smallest in i..netsize-1 */
	      for (j = i + 1; j < netsize; j++) {

	        q = network[j];
	        if (q[1] < smallval) { /* index on g */
	          smallpos = j;
	          smallval = q[1]; /* index on g */
	        }
	      }
	      q = network[smallpos];

	      /* swap p (i) and q (smallpos) entries */
	      if (i != smallpos) {
	        j = q[0];
	        q[0] = p[0];
	        p[0] = j;
	        j = q[1];
	        q[1] = p[1];
	        p[1] = j;
	        j = q[2];
	        q[2] = p[2];
	        p[2] = j;
	        j = q[3];
	        q[3] = p[3];
	        p[3] = j;
	      }

	      /* smallval entry is now in position i */

	      if (smallval != previouscol) {

	        netindex[previouscol] = (startpos + i) >> 1;

	        for (j = previouscol + 1; j < smallval; j++) netindex[j] = i;

	        previouscol = smallval;
	        startpos = i;
	      }
	    }

	    netindex[previouscol] = (startpos + maxnetpos) >> 1;
	    for (j = previouscol + 1; j < 256; j++) netindex[j] = maxnetpos; /* really 256 */
	  };

		/*
		 * Main Learning Loop ------------------
		 */

	  var learn = function learn() {

	    var i;
	    var j;
	    var b;
	    var g;
	    var r;
	    var radius;
	    var rad;
	    var alpha;
	    var step;
	    var delta;
	    var samplepixels;
	    var p;
	    var pix;
	    var lim;

	    if (lengthcount < minpicturebytes) samplefac = 1;

	    alphadec = 30 + ((samplefac - 1) / 3);
	    p = thepicture;
	    pix = 0;
	    lim = lengthcount;
	    samplepixels = lengthcount / (3 * samplefac);
	    delta = (samplepixels / ncycles) | 0;
	    alpha = initalpha;
	    radius = initradius;

	    rad = radius >> radiusbiasshift;
	    if (rad <= 1) rad = 0;

	    for (i = 0; i < rad; i++) radpower[i] = alpha * (((rad * rad - i * i) * radbias) / (rad * rad));

	    if (lengthcount < minpicturebytes) step = 3;

	    else if ((lengthcount % prime1) !== 0) step = 3 * prime1;

	    else {

	      if ((lengthcount % prime2) !== 0) step = 3 * prime2;
	      else {
	        if ((lengthcount % prime3) !== 0) step = 3 * prime3;
	        else step = 3 * prime4;
	      }
	    }

	    i = 0;
	    while (i < samplepixels) {

	      b = (p[pix + 0] & 0xff) << netbiasshift;
	      g = (p[pix + 1] & 0xff) << netbiasshift;
	      r = (p[pix + 2] & 0xff) << netbiasshift;
	      j = contest(b, g, r);

	      altersingle(alpha, j, b, g, r);
	      if (rad !== 0) alterneigh(rad, j, b, g, r); /* alter neighbours */

	      pix += step;
	      if (pix >= lim) pix -= lengthcount;

	      i++;

	      if (delta === 0) delta = 1;

	      if (i % delta === 0) {
	        alpha -= alpha / alphadec;
	        radius -= radius / radiusdec;
	        rad = radius >> radiusbiasshift;

	        if (rad <= 1) rad = 0;

	        for (j = 0; j < rad; j++) radpower[j] = alpha * (((rad * rad - j * j) * radbias) / (rad * rad));
	      }
	    }
	  };

		/*
		 ** Search for BGR values 0..255 (after net is unbiased) and return colour
		 * index
		 * ----------------------------------------------------------------------------
		 */

	  var map = exports.map = function map(b, g, r) {

	    var i;
	    var j;
	    var dist;
	    var a;
	    var bestd;
	    var p;
	    var best;

	    bestd = 1000; /* biggest possible dist is 256*3 */
	    best = -1;
	    i = netindex[g]; /* index on g */
	    j = i - 1; /* start at netindex[g] and work outwards */

	    while ((i < netsize) || (j >= 0)) {

	      if (i < netsize) {
	        p = network[i];
	        dist = p[1] - g; /* inx key */

	        if (dist >= bestd) i = netsize; /* stop iter */

	        else {

	          i++;
	          if (dist < 0) dist = -dist;
	          a = p[0] - b;
	          if (a < 0) a = -a;
	          dist += a;

	          if (dist < bestd) {
	            a = p[2] - r;
	            if (a < 0) a = -a;
	            dist += a;

	            if (dist < bestd) {
	              bestd = dist;
	              best = p[3];
	            }
	          }
	        }
	      }

	      if (j >= 0) {

	        p = network[j];
	        dist = g - p[1]; /* inx key - reverse dif */

	        if (dist >= bestd) j = -1; /* stop iter */

	        else {

	          j--;
	          if (dist < 0) dist = -dist;
	          a = p[0] - b;
	          if (a < 0) a = -a;
	          dist += a;

	          if (dist < bestd) {
	            a = p[2] - r;
	            if (a < 0) a = -a;
	            dist += a;
	            if (dist < bestd) {
	              bestd = dist;
	              best = p[3];
	            }
	          }
	        }
	      }
	    }

	    return (best);
	  };

	  var process = exports.process = function process() {
	    learn();
	    unbiasnet();
	    inxbuild();
	    return colorMap();
	  };

		/*
		 * Unbias network to give byte values 0..255 and record position i to prepare
		 * for sort
		 * -----------------------------------------------------------------------------------
		 */

	  var unbiasnet = function unbiasnet() {

	    var i;
	    var j;

	    for (i = 0; i < netsize; i++) {
	      network[i][0] >>= netbiasshift;
	      network[i][1] >>= netbiasshift;
	      network[i][2] >>= netbiasshift;
	      network[i][3] = i; /* record colour no */
	    }
	  };

		/*
		 * Move adjacent neurons by precomputed alpha*(1-((i-j)^2/[r]^2)) in
		 * radpower[|i-j|]
		 * ---------------------------------------------------------------------------------
		 */

	  var alterneigh = function alterneigh(rad, i, b, g, r) {

	    var j;
	    var k;
	    var lo;
	    var hi;
	    var a;
	    var m;
	    var p;

	    lo = i - rad;
	    if (lo < -1) lo = -1;

	    hi = i + rad;
	    if (hi > netsize) hi = netsize;

	    j = i + 1;
	    k = i - 1;
	    m = 1;

	    while ((j < hi) || (k > lo)) {
	      a = radpower[m++];

	      if (j < hi) {
	        p = network[j++];

	        try {
	          p[0] -= (a * (p[0] - b)) / alpharadbias;
	          p[1] -= (a * (p[1] - g)) / alpharadbias;
	          p[2] -= (a * (p[2] - r)) / alpharadbias;
	        } catch (e) { } // prevents 1.3 miscompilation
	      }

	      if (k > lo) {
	        p = network[k--];

	        try {
	          p[0] -= (a * (p[0] - b)) / alpharadbias;
	          p[1] -= (a * (p[1] - g)) / alpharadbias;
	          p[2] -= (a * (p[2] - r)) / alpharadbias;
	        } catch (e) { }
	      }
	    }
	  };

		/*
		 * Move neuron i towards biased (b,g,r) by factor alpha
		 * ----------------------------------------------------
		 */

	  var altersingle = function altersingle(alpha, i, b, g, r) {

	    /* alter hit neuron */
	    var n = network[i];
	    n[0] -= (alpha * (n[0] - b)) / initalpha;
	    n[1] -= (alpha * (n[1] - g)) / initalpha;
	    n[2] -= (alpha * (n[2] - r)) / initalpha;
	  };

		/*
		 * Search for biased BGR values ----------------------------
		 */

	  var contest = function contest(b, g, r) {

	    /* finds closest neuron (min dist) and updates freq */
	    /* finds best neuron (min dist-bias) and returns position */
	    /* for frequently chosen neurons, freq[i] is high and bias[i] is negative */
	    /* bias[i] = gamma*((1/netsize)-freq[i]) */

	    var i;
	    var dist;
	    var a;
	    var biasdist;
	    var betafreq;
	    var bestpos;
	    var bestbiaspos;
	    var bestd;
	    var bestbiasd;
	    var n;

	    bestd = ~(1 << 31);
	    bestbiasd = bestd;
	    bestpos = -1;
	    bestbiaspos = bestpos;

	    for (i = 0; i < netsize; i++) {
	      n = network[i];
	      dist = n[0] - b;
	      if (dist < 0) dist = -dist;
	      a = n[1] - g;
	      if (a < 0) a = -a;
	      dist += a;
	      a = n[2] - r;
	      if (a < 0) a = -a;
	      dist += a;

	      if (dist < bestd) {
	        bestd = dist;
	        bestpos = i;
	      }

	      biasdist = dist - ((bias[i]) >> (intbiasshift - netbiasshift));

	      if (biasdist < bestbiasd) {
	        bestbiasd = biasdist;
	        bestbiaspos = i;
	      }

	      betafreq = (freq[i] >> betashift);
	      freq[i] -= betafreq;
	      bias[i] += (betafreq << gammashift);
	    }

	    freq[bestpos] += beta;
	    bias[bestpos] -= betagamma;
	    return (bestbiaspos);
	  };

	  NeuQuant.apply(this, arguments);
	  return exports;
	};


/***/ }
/******/ ])
});
;

/***/ })
/******/ ]);
//# sourceMappingURL=skigame.js.map