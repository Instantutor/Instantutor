import { Color } from "./Color.js";
import { hsvToStr, stringToObject } from "./converters.js";
/**
 * @beta
 */
export var ConvertColor;
(function (ConvertColor) {
    function hueRotate(color, angle) {
        return Color.toHslString(Color.hueRotate(Color(color), angle));
    }
    ConvertColor.hueRotate = hueRotate;
    function setAlpha(color, alpha) {
        return Color.toRgbString(Color.alpha(Color(color), alpha));
    }
    ConvertColor.setAlpha = setAlpha;
    function getAlpha(color) {
        const obj = stringToObject(color);
        return obj ? obj.a : 1;
    }
    ConvertColor.getAlpha = getAlpha;
    function multiplyAlpha(color, alpha) {
        return Color.toRgbString(Color.multiplyAlpha(Color(color), alpha));
    }
    ConvertColor.multiplyAlpha = multiplyAlpha;
    function toHex(color) {
        return Color.toHexString(Color(color)).toUpperCase();
    }
    ConvertColor.toHex = toHex;
    function toRgb(color) {
        return Color.toRgb(Color(color));
    }
    ConvertColor.toRgb = toRgb;
    function toRgbString(color) {
        return Color.toRgbString(Color(color));
    }
    ConvertColor.toRgbString = toRgbString;
    function toHSV(color) {
        return Color.toHsv(Color(color));
    }
    ConvertColor.toHSV = toHSV;
    function toHSL(color) {
        return Color.toHsl(Color(color));
    }
    ConvertColor.toHSL = toHSL;
    function toHslString(color) {
        return Color.toHslString(Color(color));
    }
    ConvertColor.toHslString = toHslString;
    function toHsvString(color) {
        return Color.toHsvString(Color(color));
    }
    ConvertColor.toHsvString = toHsvString;
    function hsvToHSLString(hsv) {
        return Color.toHslString(Color(hsvToStr(hsv.h, hsv.s, hsv.v, hsv.a)));
    }
    ConvertColor.hsvToHSLString = hsvToHSLString;
    function hsvToString(hsv) {
        return hsvToStr(hsv.h, hsv.s, hsv.v);
    }
    ConvertColor.hsvToString = hsvToString;
    function rgbaToString(color) {
        return Color.toRgbString(Color(color));
    }
    ConvertColor.rgbaToString = rgbaToString;
    function hslToString(hsl) {
        return Color.toRgbString(Color(hsl));
    }
    ConvertColor.hslToString = hslToString;
    function toColorPickerSquare(h) {
        return Color.toRgbString(Color({ h, s: 1, l: 0.5, a: 1 }));
    }
    ConvertColor.toColorPickerSquare = toColorPickerSquare;
    function isValid(color) {
        return Color(color).isValid !== false;
    }
    ConvertColor.isValid = isValid;
    function equals(a, b) {
        if (typeof a === "string") {
            a = Color(a);
        }
        if (typeof b === "string") {
            b = Color(b);
        }
        return Color.equal(a, b);
    }
    ConvertColor.equals = equals;
    function toHexOrRgbaString(input) {
        const color = Color(input);
        return color.a !== 1 ? Color.toRgbString(color) : Color.toHexString(color);
    }
    ConvertColor.toHexOrRgbaString = toHexOrRgbaString;
})(ConvertColor || (ConvertColor = {}));
//# sourceMappingURL=ConvertColor.js.map