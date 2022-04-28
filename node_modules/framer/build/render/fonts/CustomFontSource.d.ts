import { Asset, Typeface, TypefaceSourceNames, ReadonlyTypeface, TypefaceLocator, ReadonlyFont, Font } from "./types.js";
export declare const customFontSelectorPrefix = "CUSTOM;";
/** @internal */
export declare class CustomFontSource {
    name: TypefaceSourceNames;
    typefaces: Typeface[];
    byFamily: Map<string, Typeface>;
    assetsByFamily: Map<string, Asset>;
    importFonts(assets: readonly Asset[]): Font[];
    private isValidCustomFontAsset;
    inferVariantName(family: string): string;
    createTypeface(family: string): Typeface;
    private addTypeface;
    parseSelector(selector: string): TypefaceLocator | null;
    getFontBySelector(selector: string, createFont?: boolean): ReadonlyFont | null;
    getTypefaceByFamily(family: string): ReadonlyTypeface;
}
//# sourceMappingURL=CustomFontSource.d.ts.map