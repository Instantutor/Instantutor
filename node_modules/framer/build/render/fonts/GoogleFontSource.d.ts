/// <reference types="google.fonts" />
import { FontSource, TypefaceSourceName, Typeface, WebFontLocator, ReadonlyTypeface } from "./types.js";
export declare const googleFontSelectorPrefix = "GF;";
/** @internal */
export declare class GoogleFontSource implements FontSource {
    name: TypefaceSourceName;
    typefaces: Typeface[];
    byFamily: Map<string, Typeface>;
    getTypefaceByFamily(family: string): ReadonlyTypeface | null;
    parseSelector(selector: string): WebFontLocator | null;
    createTypeface(family: string): Typeface;
    private addTypeface;
    importFonts(webFonts: google.fonts.WebfontFamily[]): WebFontLocator[];
}
//# sourceMappingURL=GoogleFontSource.d.ts.map