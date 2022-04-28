import { modulate, isNumeric, numberFromString } from "./Utils.js";
import { rgbToRgb, rgbToHsl as rgbToHslConverter, hslToRgb, rgbToHex, rgbToHsluv, rgbToHsv, rgbaFromHusl, stringToObject, hsvToRgb, } from "./converters.js";
import { ColorFormat, ColorMixModelType, } from "./types.js";
import { cssNames } from "./CSSNames.js";
export { Color };
const cache = new Map();
/**
 * The Color function can be used to define colors, either as a string value or as an object. All colors
 * are converted to a Color object with `r, g, b`, `h, s, l` and an `a` value.
 * There are also various helpers on the Color function for working with,
 * modifying and detecting colors.
 *
 * ```jsx
 * // HEX
 * const blue = Color("#0099FF")
 *
 * // RGB
 * const blue = Color("rgb(0, 153, 255)")
 * const blue = Color(0, 153, 255)
 * const blue = Color({r: 0, g: 153, b: 255})
 * const blue = Color({r: 0, g: 153, b: 255, a: 1})
 *
 * // HSL
 * const blue = Color("hsl(204, 100%, 50%)")
 * const blue = Color({h: 204, s: 1, l: 0.5})
 * const blue = Color({h: 204, s: 1, l: 0.5, a: 1})
 * ```
 * @public
 */
function Color(color, r, g, b) {
    if (typeof color === "string") {
        let c = cache.get(color);
        if (c)
            return c;
        c = createColor(color);
        if (c === undefined)
            return { ...Color("black"), isValid: false };
        cache.set(color, c); // TODO: should be frozen?
        return c;
    }
    const created = createColor(color, r, g, b);
    return created !== undefined ? created : { ...Color("black"), isValid: false };
}
function createColor(color, r, g, b) {
    if (color === "")
        return undefined;
    const colorData = getCompleteColorStrategy(color, r, g, b);
    if (colorData) {
        const newColor = {
            r: colorData.r,
            g: colorData.g,
            b: colorData.b,
            a: colorData.a,
            h: colorData.h,
            s: colorData.s,
            l: colorData.l,
            initialValue: typeof color === "string" && colorData.format !== ColorFormat.HSV ? color : undefined,
            roundA: Math.round(100 * colorData.a) / 100,
            format: colorData.format,
            mix: Color.mix,
            toValue: () => Color.toRgbString(newColor),
        };
        return newColor;
    }
    else {
        return undefined;
    }
}
/**
 * @public
 */
(function (Color) {
    /**
     * Formats a Color object into a readable string for debugging.
     *
     * @remarks
     * ```jsx
     * const blue = Color("#0099FF")
     *
     * Color.inspect(blue)
     * ```
     *
     * @param color - The Color object to format
     * @param initialValue - A canonical hex string to be used instead of an rgba() value.
     */
    function inspect(color, initialValue) {
        if (color.format === ColorFormat.HSL) {
            return `<${color.constructor.name} h:${color.h} s:${color.s} l:${color.l} a:${color.a}>`;
        }
        else if (color.format === ColorFormat.HEX || color.format === ColorFormat.NAME) {
            return `<${color.constructor.name} "${initialValue}">`;
        }
        else {
            return `<${color.constructor.name} r:${color.r} g:${color.g} b:${color.b} a:${color.a}>`;
        }
    }
    Color.inspect = inspect;
    /**
     * Checks if the value is a valid color object or color string. Returns true or false.
     *
     * @remarks
     * ```jsx
     * Color.isColor("#0099FF") // true
     * Color.isColor(Color("#0099FF")) // true
     * ```
     *
     * @param color - The potential color value to validate
     */
    function isColor(color) {
        if (typeof color === "string") {
            return Color.isColorString(color);
        }
        else {
            return Color.isColorObject(color);
        }
    }
    Color.isColor = isColor;
    /**
     * Checks if the value is a valid color string. Returns true or false.
     *
     * @remarks
     * ```jsx
     * Color.isColorString("#0099FF") // true
     * ```
     *
     * @param color - A string representing a color
     */
    function isColorString(colorString) {
        if (typeof colorString === "string") {
            return stringToObject(colorString) !== false;
        }
        return false;
    }
    Color.isColorString = isColorString;
    /**
     * Checks if the value is a valid Color object. Returns true or false.
     *
     * @remarks
     * ```jsx
     * const blue = Color("#0099FF")
     *
     * Color.isColorObject(blue) // true
     * Color.isColorObject("#0099FF") // false
     * ```
     *
     * @param color - An object representing a color.
     */
    function isColorObject(color) {
        return (color &&
            typeof color !== "string" &&
            typeof color.r === "number" &&
            typeof color.g === "number" &&
            typeof color.b === "number" &&
            typeof color.h === "number" &&
            typeof color.s === "number" &&
            typeof color.l === "number" &&
            typeof color.a === "number" &&
            typeof color.roundA === "number" &&
            typeof color.format === "string");
    }
    Color.isColorObject = isColorObject;
    /**
     * Formats a Color instance into an RGB string.
     *
     * @remarks
     * ```jsx
     * const blue = Color("#0099FF")
     *
     * Color.toString(blue) // "rgb(0, 153, 255)"
     * ```
     *
     * @param color - The color to format
     */
    function toString(color) {
        return Color.toRgbString(color);
    }
    Color.toString = toString;
    /**
     * Formats a Color instance into an hexidecimal value.
     *
     * @remarks
     * ```jsx
     * const blue = Color("#0099FF")
     *
     * Color.toHex(blue) // "0099FF"
     * Color.toHex(Color("#FFAAFF"), true) // "FAF"
     * ```
     *
     * @param color - The color to format
     * @param allow3Char - If true will return short hand colors if possible (defaults to false).
     */
    function toHex(color, allow3Char = false) {
        return rgbToHex(color.r, color.g, color.b, allow3Char);
    }
    Color.toHex = toHex;
    /**
     * Formats a Color instance into an hexidecimal string.
     *
     * @remarks
     * ```jsx
     * const blue = Color("#0099FF")
     *
     * Color.toHexString(blue) // "#0099FF"
     * Color.toHexString(Color("#FFAAFF"), true) // "#FAF"
     * ```
     *
     * @param color - The color to format
     * @param allow3Char - If true will return short hand colors if possible (defaults to false).
     */
    function toHexString(color, allow3Char = false) {
        return `#${Color.toHex(color, allow3Char)}`;
    }
    Color.toHexString = toHexString;
    /**
     * Formats a Color instance into an RGB string.
     *
     * @remarks
     * ```jsx
     * const blue = Color("#0099FF")
     *
     * Color.toRgbString(blue) // "rgb(0, 153, 255)"
     * ```
     *
     * @param color - The color to format
     */
    function toRgbString(color) {
        return color.a === 1
            ? "rgb(" + Math.round(color.r) + ", " + Math.round(color.g) + ", " + Math.round(color.b) + ")"
            : "rgba(" +
                Math.round(color.r) +
                ", " +
                Math.round(color.g) +
                ", " +
                Math.round(color.b) +
                ", " +
                color.roundA +
                ")";
    }
    Color.toRgbString = toRgbString;
    /**
     * Formats a Color instance into an HUSL object.
     *
     * @remarks
     * ```jsx
     * const blue = Color("#0099FF")
     *
     * Color.toHusl(blue) // {h: 250, s: 100, l: 50, a: 1}
     * ```
     *
     * @param color - The color to format
     */
    function toHusl(color) {
        return {
            ...rgbToHsluv(color.r, color.g, color.b),
            a: color.roundA,
        };
    }
    Color.toHusl = toHusl;
    /**
     * Formats a Color instance into an HSL string.
     *
     * @remarks
     * ```jsx
     * const blue = Color("#0099FF")
     *
     * Color.toHslString(blue) // "hsl(204, 100%, 50%)"
     * ```
     *
     * @param color - The color to format
     */
    function toHslString(color) {
        const hsl = Color.toHsl(color);
        const h = Math.round(hsl.h);
        const s = Math.round(hsl.s * 100);
        const l = Math.round(hsl.l * 100);
        return color.a === 1
            ? "hsl(" + h + ", " + s + "%, " + l + "%)"
            : "hsla(" + h + ", " + s + "%, " + l + "%, " + color.roundA + ")";
    }
    Color.toHslString = toHslString;
    /**
     * Formats a Color instance into an HSV object.
     *
     * @remarks
     * ```jsx
     * const blue = Color("#0099FF")
     *
     * Color.toHsv(blue) // {h: 204, s: 1, v: 1, a: 1}"
     * ```
     *
     * @param color - The color to format
     */
    function toHsv(color) {
        const hsv = rgbToHsv(color.r, color.g, color.b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: color.a };
    }
    Color.toHsv = toHsv;
    /**
     * Formats a Color instance into an HSV string.
     *
     * @remarks
     * ```jsx
     * const blue = Color("#0099FF")
     *
     * Color.toHslString(blue) // "hsv(204, 100%, 50%)"
     * ```
     *
     * @param color - The color to format
     */
    function toHsvString(color) {
        const hsv = rgbToHsv(color.r, color.g, color.b);
        const h = Math.round(hsv.h * 360);
        const s = Math.round(hsv.s * 100);
        const v = Math.round(hsv.v * 100);
        return color.a === 1
            ? "hsv(" + h + ", " + s + "%, " + v + "%)"
            : "hsva(" + h + ", " + s + "%, " + v + "%, " + color.roundA + ")";
    }
    Color.toHsvString = toHsvString;
    /**
     * Formats a Color instance into {@link https://css-tricks.com/snippets/css/named-colors-and-hex-equivalents/ | CSS name}
     * or returns false if unspecified.
     *
     * @remarks
     * ```jsx
     * const green = Color("#8FBC8F")
     *
     * Color.toName(green) // "darkseagreen"
     * ```
     *
     * @param color - The color to format
     */
    function toName(color) {
        if (color.a === 0) {
            return "transparent";
        }
        if (color.a < 1) {
            return false;
        }
        const hex = rgbToHex(color.r, color.g, color.b, true);
        for (const key of Object.keys(cssNames)) {
            const value = cssNames[key];
            if (value === hex) {
                return key;
            }
        }
        return false;
    }
    Color.toName = toName;
    /**
     * Formats a color into an HSL object.
     *
     * @remarks
     * ```jsx
     * const blue = Color("#0099FF")
     *
     * Color.toHsl(blue) // {h: 204, s: 1, l: 0.5, a: 1}
     * ```
     *
     * @param color - The color to format
     */
    function toHsl(color) {
        return {
            h: Math.round(color.h),
            s: color.s,
            l: color.l,
            a: color.a,
        };
    }
    Color.toHsl = toHsl;
    /**
     * Formats a color into an RGB object.
     *
     * @remarks
     * ```jsx
     * const blue = Color("#0099FF")
     *
     * Color.toRgb(blue) // {r: 40, g: 175, b: 250, a: 1}
     * ```
     *
     * @param color - The color to format
     */
    function toRgb(color) {
        return {
            r: Math.round(color.r),
            g: Math.round(color.g),
            b: Math.round(color.b),
            a: color.a,
        };
    }
    Color.toRgb = toRgb;
    /**
     * Returns a brightened color.
     *
     * @remarks
     * ```jsx
     * const blue = Color("#0099FF")
     * const brightblue = Color.lighten(blue, 20)
     * ```
     *
     * @param color - The color to brighten
     * @param amount - A number, from 0 to 100. Set to 10 by default.
     */
    function brighten(color, amount = 10) {
        const rgb = Color.toRgb(color);
        rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
        rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
        rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
        return Color(rgb);
    }
    Color.brighten = brighten;
    /**
     * Add white and return a lightened color.
     *
     * @remarks
     * ```jsx
     * const blue = Color("#0099FF")
     * const lightblue = Color.lighten(blue, 20)
     * ```
     *
     * @param color - The color to lighten
     * @param amount - A number, from 0 to 100. Set to 10 by default.
     */
    function lighten(color, amount = 10) {
        const hsl = Color.toHsl(color);
        hsl.l += amount / 100;
        hsl.l = Math.min(1, Math.max(0, hsl.l));
        return Color(hsl);
    }
    Color.lighten = lighten;
    /**
     * Add black and return a darkened color.
     *
     * @remarks
     * ```jsx
     * const blue = Color("#0099FF")
     * const darkblue = Color.darken(blue, 20)
     * ```
     * @param color - The color to darken.
     * @param amount - A number, from 0 to 100. Set to 10 by default.
     */
    function darken(color, amount = 10) {
        const hsl = Color.toHsl(color);
        hsl.l -= amount / 100;
        hsl.l = Math.min(1, Math.max(0, hsl.l));
        return Color(hsl);
    }
    Color.darken = darken;
    /**
     * Increase the saturation of a color.
     *
     * @remarks
     * ```jsx
     * const blue = Color("#0099FF")
     * const saturated = Color.saturate(blue, 100)
     * ```
     * @param color - The color to modify
     * @param amount - A number from 0 to 100. Set to 10 by default.
     */
    function saturate(color, amount = 10) {
        const hsl = Color.toHsl(color);
        hsl.s += amount / 100;
        hsl.s = Math.min(1, Math.max(0, hsl.s));
        return Color(hsl);
    }
    Color.saturate = saturate;
    /**
     * Decrease the saturation of a color.
     *
     * @remarks
     * ```jsx
     * const blue = Color("#0099FF")
     * const desaturated = Color.desaturate(blue, 100)
     * ```
     * @param color - The color to modify
     * @param amount - A number from 0 to 100. Set to 10 by default.
     */
    function desaturate(color, amount = 10) {
        const hsl = Color.toHsl(color);
        hsl.s -= amount / 100;
        hsl.s = Math.min(1, Math.max(0, hsl.s));
        return Color(hsl);
    }
    Color.desaturate = desaturate;
    /**
     * Return a fully desaturated color.
     *
     * @remarks
     * ```jsx
     * const blue = Color("#0099FF")
     * const gray = Color.grayscale(blue)
     * ```
     * @param color - The color to convert.
     */
    function grayscale(color) {
        return Color.desaturate(color, 100);
    }
    Color.grayscale = grayscale;
    /**
     * Returns a new color for the rotated hue.
     * @param color - The color to manipulate
     * @param angle - The angle in degrees in which to rotate the hue.
     */
    function hueRotate(color, angle) {
        const hsl = Color.toHsl(color);
        hsl.h += angle;
        hsl.h = hsl.h > 360 ? hsl.h - 360 : hsl.h;
        return Color(hsl);
    }
    Color.hueRotate = hueRotate;
    /**
     * Set the alpha value, also known as opacity, of the color.
     *
     * @remarks
     * ```jsx
     * const blue = Color("#0099FF")
     *
     * const transparent = Color.alpha(blue, 0.1)
     * ```
     * @param color - The original color to modify.
     * @param alpha - A number from 1 to 0. Set to 1 by default.
     */
    function alpha(color, a = 1) {
        return Color({
            r: color.r,
            g: color.g,
            b: color.b,
            a: a,
        });
    }
    Color.alpha = alpha;
    /**
     * Set the alpha value, also known as opacity, of the color to zero.
     *
     * @remarks
     * ```jsx
     * const blue = Color("#0099FF")
     *
     * const transparent = Color.alpha(blue)
     * ```
     * @param color - The original color to modify.
     */
    function transparent(color) {
        return Color.alpha(color, 0);
    }
    Color.transparent = transparent;
    /**
     * Change the alpha value, also know as opacity, by a multiplier.
     *
     * @remarks
     * ```jsx
     * const blue = Color("#0099FF")
     * const transparent = Color.multiplyAlpha(blue, 0.5)
     * ```
     * @param color - The original color to modify.
     * @param alphaValue - A number between 1 and 0, defaults to 1,
     */
    function multiplyAlpha(color, alphaValue = 1) {
        return Color({
            r: color.r,
            g: color.g,
            b: color.b,
            a: color.a * alphaValue,
        });
    }
    Color.multiplyAlpha = multiplyAlpha;
    /**
     * Returns a function that can be used to transition a color from one value
     * to another. By default this will use the RGB `mix` model. Useful for providing to animation tools.
     *
     * ```jsx
     * const blend = Color.interpolate(Color("red"), Color("blue"))
     *
     * blend(0)   // Initial state (red)
     * blend(0.5) // Mid state (purple)
     * blend(1)   // Final state (blue)
     * ```
     * @param colorA - The starting color
     * @param colorB - The final color
     * @param model  - The model to use for the mix. One of {@link ColorMixModelType}
     */
    function interpolate(colorA, colorB, model = ColorMixModelType.RGB) {
        if (!Color.isColorObject(colorA) || !Color.isColorObject(colorB)) {
            throw new TypeError("Both arguments for Color.interpolate must be Color objects");
        }
        return (progress) => {
            const color = Color.mixAsColor(colorA, colorB, progress, false, model);
            return color;
        };
    }
    Color.interpolate = interpolate;
    /**
     * Create a function that will mix two colors together and output the result as an rgb string.
     *
     * @param colorA - The starting color
     * @param colorB - The final color
     * @param options - Options for the color mixer
     *
     * - `model`: The model to use for the mix. One of {@link ColorMixModelType}
     *
     * @public
     */
    function mix(from, toColor, { model = ColorMixModelType.RGB } = {}) {
        const fromColor = typeof from === "string" ? Color(from) : from;
        const mixer = Color.interpolate(fromColor, toColor, model);
        return (p) => Color.toRgbString(mixer(p));
    }
    Color.mix = mix;
    /**
     * Blend two colors together, optionally based on user input. The fraction defines the
     * distribution between the two colors, and is set to 0.5 by default.
     * The `limit` defines if the color can transition beyond its range.
     * @remarks
     * ```jsx
     * // Mix red with yellow
     * const orange = Color.mix("red", "yellow", 0.5)
     * ```
     *
     * ```jsx
     * Color.mix("red", "yellow", 0.5, true, "husl")
     * ```
     *
     * @param colorA   - A color, the first one.
     * @param colorB   - A color, the second one.
     * @param fraction - An optional number, from 0 to 1, set to 0.5 by default.
     * @param limit    - An optional boolean, set to false by default.
     * @param model    - The model to use for the mix. One of {@link ColorMixModelType}
     */
    function mixAsColor(colorA, colorB, fraction = 0.5, limit = false, model = ColorMixModelType.RGB) {
        let result = null;
        if (ColorMixModel.isRGB(model)) {
            // rgb model
            result = Color({
                r: modulate(fraction, [0, 1], [colorA.r, colorB.r], limit),
                g: modulate(fraction, [0, 1], [colorA.g, colorB.g], limit),
                b: modulate(fraction, [0, 1], [colorA.b, colorB.b], limit),
                a: modulate(fraction, [0, 1], [colorA.a, colorB.a], limit),
            });
        }
        else {
            let hslA, hslB;
            if (ColorMixModel.isHSL(model)) {
                // hsl model
                hslA = Color.toHsl(colorA);
                hslB = Color.toHsl(colorB);
            }
            else {
                // husl model
                hslA = Color.toHusl(colorA);
                hslB = Color.toHusl(colorB);
            }
            if (hslA.s === 0) {
                hslA.h = hslB.h;
            }
            else if (hslB.s === 0) {
                hslB.h = hslA.h;
            }
            const fromH = hslA.h;
            const toH = hslB.h;
            let deltaH = toH - fromH;
            if (deltaH > 180) {
                deltaH = toH - 360 - fromH;
            }
            else if (deltaH < -180) {
                deltaH = toH + 360 - fromH;
            }
            const tween = {
                h: modulate(fraction, [0, 1], [fromH, fromH + deltaH], limit),
                s: modulate(fraction, [0, 1], [hslA.s, hslB.s], limit),
                l: modulate(fraction, [0, 1], [hslA.l, hslB.l], limit),
                a: modulate(fraction, [0, 1], [colorA.a, colorB.a], limit),
            };
            if (ColorMixModel.isHSL(model)) {
                // hsl model
                result = Color(tween);
            }
            else {
                // husl model
                result = Color(rgbaFromHusl(tween.h, tween.s, tween.l, tween.a));
            }
        }
        return result;
    }
    Color.mixAsColor = mixAsColor;
    /**
     * Returns a Color instance with a random color value set.
     *
     * @remarks
     * ```jsx
     * const random = Color.random()
     * ```
     *
     * @param alphaValue - An optional alpha value, set to 1 by default.
     */
    function random(alphaValue = 1) {
        function gen() {
            return Math.floor(Math.random() * 255);
        }
        return Color("rgba(" + gen() + ", " + gen() + ", " + gen() + ", " + alphaValue + ")");
    }
    Color.random = random;
    /**
     * Creates a greyscale color.
     *
     * @remarks
     * ```jsx
     * const gray = Color.gray(0.5)
     * ```
     *
     * @param amount - A number from 0 to 1 representing the amount of white.
     * @param alphaValue  - A number from 0 to 1 representing the alpha. Set to 1 by default.
     */
    function grey(amount = 0.5, alphaValue = 1) {
        amount = Math.floor(amount * 255);
        return Color("rgba(" + amount + ", " + amount + ", " + amount + ", " + alphaValue + ")");
    }
    Color.grey = grey;
    /**
     * @internal
     * Alias for {@link (Color:namespace).grey}
     */
    Color.gray = Color.grey;
    /** @internal */
    function rgbToHsl(r, g, b) {
        return rgbToHslConverter(r, g, b);
    }
    Color.rgbToHsl = rgbToHsl;
    /** @internal */
    Color.isValidColorProperty = function (name, value) {
        const isColorKey = name.toLowerCase().slice(-5) === "color" || name === "fill" || name === "stroke";
        if (isColorKey && typeof value === "string" && Color.isColorString(value)) {
            return true;
        }
        return false;
    };
    /**
     * Calculates the color difference using {@link https://en.wikipedia.org/wiki/Color_difference#Euclidean |
     * Euclidean distance fitting human perception}. Returns a value between 0 and 765
     * @param colorA - A first color.
     * @param colorB - A second color.
     */
    function difference(colorA, colorB) {
        const _r = (colorA.r + colorB.r) / 2;
        const deltaR = colorA.r - colorB.r;
        const deltaG = colorA.g - colorB.g;
        const deltaB = colorA.b - colorB.b;
        const deltaR2 = Math.pow(deltaR, 2);
        const deltaG2 = Math.pow(deltaG, 2);
        const deltaB2 = Math.pow(deltaB, 2);
        return Math.sqrt(2 * deltaR2 + 4 * deltaG2 + 3 * deltaB2 + (_r * (deltaR2 - deltaB2)) / 256);
    }
    Color.difference = difference;
    /**
     * Checks whether two Color objects are equal.
     *
     * @remarks
     * ```jsx
     * Color.equal(Color("red"), Color("red"))  // true
     * Color.equal(Color("red"), Color("blue")) // false
     *
     * Color.equal(Color("#0099FF"), Color("009AFF"))    // false
     * Color.equal(Color("#0099FF"), Color("009AFF"), 2) // true
     * ```
     *
     * @param colorA    - The first color
     * @param colorB    - The second color
     * @param tolerance - A tolerance for the difference between rgba values. Set to 0.1 by default.
     */
    function equal(colorA, colorB, tolerance = 0.1) {
        if (Math.abs(colorA.r - colorB.r) >= tolerance) {
            return false;
        }
        if (Math.abs(colorA.g - colorB.g) >= tolerance) {
            return false;
        }
        if (Math.abs(colorA.b - colorB.b) >= tolerance) {
            return false;
        }
        if (Math.abs(colorA.a - colorB.a) * 256 >= tolerance) {
            return false;
        }
        return true;
    }
    Color.equal = equal;
})(Color || (Color = {}));
const ColorMixModel = {
    isRGB(colorModel) {
        return colorModel === ColorMixModelType.RGB || colorModel === ColorMixModelType.RGBA;
    },
    isHSL(colorModel) {
        return colorModel === ColorMixModelType.HSL || colorModel === ColorMixModelType.HSLA;
    },
};
// helpers
function getCompleteColorStrategy(colorOrR, g, b, a = 1) {
    let completeColor;
    // RGB arguments have higher priority
    if (typeof colorOrR === "number" &&
        !Number.isNaN(colorOrR) &&
        typeof g === "number" &&
        !Number.isNaN(g) &&
        typeof b === "number" &&
        !Number.isNaN(b)) {
        // color used as red - Color(255, 255, 255)
        const _r = colorOrR;
        const _g = g;
        const _b = b;
        const _a = a;
        completeColor = getCompleteColorFromRGB({ r: _r, g: _g, b: _b, a: _a });
    }
    else if (typeof colorOrR === "string") {
        // valid CSS color (including functions)
        completeColor = getCompleteColorFromString(colorOrR);
    }
    else if (typeof colorOrR === "object") {
        // eslint-disable-next-line no-prototype-builtins
        if (colorOrR.hasOwnProperty("r") && colorOrR.hasOwnProperty("g") && colorOrR.hasOwnProperty("b")) {
            completeColor = getCompleteColorFromRGB(colorOrR);
        }
        else {
            completeColor = getCompleteColorFromHSL(colorOrR);
        }
    }
    return completeColor;
}
function getCompleteColorFromString(color) {
    const result = stringToObject(color);
    if (result) {
        if (result.format === ColorFormat.HSL) {
            return getCompleteColorFromHSL(result);
        }
        else if (result.format === ColorFormat.HSV) {
            return getCompleteColorFromHSV(result);
        }
        else {
            return getCompleteColorFromRGB(result);
        }
    }
}
function getCompleteColorFromHSV(color) {
    const rgb = hsvToRgb(color.h, color.s, color.v);
    const hsl = rgbToHslConverter(rgb.r, rgb.g, rgb.b);
    return {
        ...hsl,
        ...rgb,
        format: ColorFormat.RGB,
        a: color.a !== undefined ? correctAlpha(color.a) : 1,
    };
}
function getCompleteColorFromRGB(color) {
    const rgb = rgbToRgb(color.r, color.g, color.b);
    const hsl = rgbToHslConverter(rgb.r, rgb.g, rgb.b);
    return {
        ...hsl,
        ...rgb,
        format: ColorFormat.RGB,
        a: color.a !== undefined ? correctAlpha(color.a) : 1,
    };
}
function getCompleteColorFromHSL(color) {
    let h;
    let s;
    let l;
    let rgb = { r: 0, g: 0, b: 0 };
    let hsl = { h: 0, s: 0, l: 0 };
    h = isNumeric(color.h) ? color.h : 0;
    h = (h + 360) % 360;
    s = isNumeric(color.s) ? color.s : 1;
    if (typeof color.s === "string") {
        s = numberFromString(color.s);
    }
    l = isNumeric(color.l) ? color.l : 0.5;
    if (typeof color.l === "string") {
        l = numberFromString(color.l);
    }
    rgb = hslToRgb(h, s, l);
    hsl = {
        h: h,
        s: s,
        l: l,
    };
    return {
        ...rgb,
        ...hsl,
        a: color.a === undefined ? 1 : color.a,
        format: ColorFormat.HSL,
    };
}
function correctAlpha(alphaValue) {
    alphaValue = parseFloat(alphaValue);
    if (alphaValue < 0) {
        alphaValue = 0;
    }
    if (isNaN(alphaValue) || alphaValue > 1) {
        alphaValue = 1;
    }
    return alphaValue;
}
//# sourceMappingURL=Color.js.map