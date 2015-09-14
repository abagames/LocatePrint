declare class LocatePrint {
	scrollNone: number;
	scrollAtLastChar: number;
	scrollAtLastLine: number;
	fxCanvas: any;
	style: CSSStyleDeclaration;
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
	consoleWidth: number;
	consoleHeight: number;

	constructor();
	setCanvasSize(width: number, height: number): LocatePrint;
	setColorPalettes(colorPalettes?: string[]): LocatePrint;
	setFontName(fontName: string): LocatePrint;
	update(): LocatePrint;
	console(width: number, height: number): LocatePrint;
	locate(x: number, y: number): LocatePrint;
	print(text: string, scrollType?: number): LocatePrint;
	color(foreground: number, background?: number): LocatePrint;
	cls(): LocatePrint;
	scroll(offsetX: number, offsetY?: number);
	screen(x: number, y: number): string;
}
