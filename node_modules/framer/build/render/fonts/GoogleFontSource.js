import { TypefaceSourceNames, } from "./types.js";
export const googleFontSelectorPrefix = "GF;";
/** @internal */
export class GoogleFontSource {
    name = TypefaceSourceNames.Google;
    typefaces = [];
    byFamily = new Map();
    getTypefaceByFamily(family) {
        return this.byFamily.get(family) ?? null;
    }
    parseSelector(selector) {
        if (!selector.startsWith(googleFontSelectorPrefix))
            return null;
        const tokens = selector.split("-");
        if (tokens.length !== 2)
            return null;
        const family = tokens[0].replace(googleFontSelectorPrefix, "");
        const variant = tokens[1];
        return { family, variant, source: this.name };
    }
    // TODO: these are duplicated across implementations of FontSource
    // When adding a third source, we should abstract them
    createTypeface(family) {
        const typeface = { family: family, fonts: [], source: this.name };
        this.addTypeface(typeface);
        return typeface;
    }
    addTypeface(typeface) {
        this.typefaces.push(typeface);
        this.byFamily.set(typeface.family, typeface);
    }
    // end of duplication
    importFonts(webFonts) {
        let fontLocators = [];
        webFonts.forEach(webFont => {
            const locators = webFont.variants.map(variant => ({
                source: this.name,
                variant: variant,
                family: webFont.family,
                file: webFont.files[variant].replace("http://", "https://"),
            }));
            fontLocators = fontLocators.concat(locators);
        });
        return fontLocators;
    }
}
//# sourceMappingURL=GoogleFontSource.js.map