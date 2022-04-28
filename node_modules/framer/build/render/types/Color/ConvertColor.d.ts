import { Color } from "./Color.js";
import type { ColorHSV, ColorHSVA, ColorRGB, ColorRGBA, ColorHSLA, ColorHSL } from "./types.js";
/**
 * @beta
 */
export declare namespace ConvertColor {
    function hueRotate(color: string, angle: number): string;
    function setAlpha(color: string, alpha: number): string;
    function getAlpha(color: string): number;
    function multiplyAlpha(color: string, alpha: number): string;
    function toHex(color: string): string;
    function toRgb(color: string): ColorRGBA;
    function toRgbString(color: string): string;
    function toHSV(color: string): ColorHSVA;
    function toHSL(color: string): ColorHSLA;
    function toHslString(color: string): string;
    function toHsvString(color: string): string;
    function hsvToHSLString(hsv: ColorHSV | ColorHSVA): string;
    function hsvToString(hsv: ColorHSV | ColorHSVA): string;
    function rgbaToString(color: ColorRGB | ColorRGBA): string;
    function hslToString(hsl: ColorHSL | ColorHSLA): string;
    function toColorPickerSquare(h: number): string;
    function isValid(color: string): boolean;
    function equals(a: Color | string, b: Color | string): boolean;
    function toHexOrRgbaString(input: string): string;
}
//# sourceMappingURL=ConvertColor.d.ts.map