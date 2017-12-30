declare module "locate-print" {
	export const scrollNone: number;
	export const scrollAtLastChar: number;
	export const scrollAtLastLine: number;
	export let fxCanvas: any;
	export let canvas: HTMLCanvasElement;
	export let context: CanvasRenderingContext2D;
	export let consoleWidth: number;
	export let consoleHeight: number;
	export let cursorX: number;
	export let cursorY: number;

	export function init();
	export function setCanvasSize(width: number, height: number);
	export function setCanvasStyle(style: string);
	export function setColorPalettes(colorPalettes?: string[]);
	export function setFontName(fontName: string);
	export function update();
	export function console(width: number, height: number);
	export function locate(x: number, y: number);
	export function print(text: string, scrollType?: number);
	export function color(foreground: number, background?: number);
	export function cls();
	export function scroll(offsetX: number, offsetY?: number);
	export function screen(x: number, y: number): string;
}
