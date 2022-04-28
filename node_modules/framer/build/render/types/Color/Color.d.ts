import { IncomingColor, ColorHSL, ColorHSLA, ColorRGBA, ColorHSVA, ColorFormat, ColorMixModelType } from "./types.js";
export { Color };
/** @public */
export interface ColorMixOptions {
    model?: ColorMixModelType;
}
declare type Mixer = (from: string | Color, toColor: Color, options?: ColorMixOptions) => (p: number) => string;
declare type MixerStateful = (toColor: Color, options?: ColorMixOptions) => (p: number) => string;
/**
 * @public
 */
interface Color {
    r: number;
    g: number;
    b: number;
    h: number;
    s: number;
    l: number;
    a: number;
    roundA: number;
    format: ColorFormat;
    initialValue?: string;
    isValid?: boolean;
    mix: Mixer | MixerStateful;
    toValue: () => string;
}
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
declare function Color(color: IncomingColor | Color | number, r?: number, g?: number, b?: number): Color;
/**
 * @public
 */
declare namespace Color {
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
    function inspect(color: Color, initialValue?: string): string;
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
    function isColor(color: string | Color): boolean;
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
    function isColorString(colorString: string | object): boolean;
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
    function isColorObject(color: any): color is object & Color;
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
    function toString(color: Color): string;
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
    function toHex(color: Color, allow3Char?: boolean): string;
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
    function toHexString(color: Color, allow3Char?: boolean): string;
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
    function toRgbString(color: Color): string;
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
    function toHusl(color: Color): ColorHSLA;
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
    function toHslString(color: Color): string;
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
    function toHsv(color: Color): ColorHSVA;
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
    function toHsvString(color: Color): string;
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
    function toName(color: Color): string | false;
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
    function toHsl(color: Color): ColorHSLA;
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
    function toRgb(color: Color): ColorRGBA;
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
    function brighten(color: Color, amount?: number): Color;
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
    function lighten(color: Color, amount?: number): Color;
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
    function darken(color: Color, amount?: number): Color;
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
    function saturate(color: Color, amount?: number): Color;
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
    function desaturate(color: Color, amount?: number): Color;
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
    function grayscale(color: Color): Color;
    /**
     * Returns a new color for the rotated hue.
     * @param color - The color to manipulate
     * @param angle - The angle in degrees in which to rotate the hue.
     */
    function hueRotate(color: Color, angle: number): Color;
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
    function alpha(color: Color, a?: number): Color;
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
    function transparent(color: Color): Color;
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
    function multiplyAlpha(color: Color, alphaValue?: number): Color;
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
    function interpolate(colorA: Color, colorB: Color, model?: ColorMixModelType): (progress: number) => Color;
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
    function mix(from: Color, toColor: Color, { model }?: {
        model?: ColorMixModelType | undefined;
    }): (p: number) => string;
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
    function mixAsColor(colorA: Color, colorB: Color, fraction?: number, limit?: boolean, model?: ColorMixModelType): Color | null;
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
    function random(alphaValue?: number): Color;
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
    function grey(amount?: number, alphaValue?: number): Color;
    /**
     * @internal
     * Alias for {@link (Color:namespace).grey}
     */
    const gray: typeof grey;
    /** @internal */
    function rgbToHsl(r: number, g: number, b: number): ColorHSL;
    /** @internal */
    const isValidColorProperty: (name: string, value: string) => boolean;
    /**
     * Calculates the color difference using {@link https://en.wikipedia.org/wiki/Color_difference#Euclidean |
     * Euclidean distance fitting human perception}. Returns a value between 0 and 765
     * @param colorA - A first color.
     * @param colorB - A second color.
     */
    function difference(colorA: Color, colorB: Color): number;
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
    function equal(colorA: Color, colorB: Color, tolerance?: number): boolean;
}
//# sourceMappingURL=Color.d.ts.map