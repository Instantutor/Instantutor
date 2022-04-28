import { TypefaceSourceNames } from "./types.js";
import { typefaces as systemTypefaces, typefaceAliases } from "./fonts.js";
import { safeNavigator } from "../../utils/safeNavigator.js";
/** @internal */
export const systemTypefaceName = "System Default";
/** @internal */
export class LocalFontSource {
    name = TypefaceSourceNames.Local;
    typefaces = [];
    byFamily = new Map();
    typefaceAliasBySelector = new Map();
    typefaceAliases = new Map();
    getTypefaceByFamily(family) {
        return this.byFamily.get(family) ?? null;
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
    importFonts() {
        const fonts = [];
        for (const family of Object.keys(systemTypefaces)) {
            const members = systemTypefaces[family];
            if (!members)
                continue;
            const typeface = this.createTypeface(family);
            for (const variant of Object.keys(members)) {
                const member = members[variant];
                if (!member)
                    continue;
                const { selector, weight } = member;
                // font.style is never defined in local fonts, we always use a specific font family that already includes the style
                const font = {
                    variant,
                    selector,
                    weight,
                    typeface,
                    status: "loaded",
                };
                typeface.fonts.push(font);
            }
            fonts.push(...typeface.fonts);
        }
        for (const [key, value] of Object.entries(typefaceAliases)) {
            this.addTypefaceAlias(key, value);
        }
        const { typeface: systemTypeface, aliases } = this.getSystemTypeface();
        this.addTypeface(systemTypeface);
        for (const [key, value] of aliases) {
            this.addTypefaceAlias(key, value);
        }
        fonts.push(...systemTypeface.fonts);
        const interTypeface = this.importInterTypeface();
        fonts.push(...interTypeface.fonts);
        return fonts;
    }
    interTypefaceSelectors = new Set();
    importInterTypeface() {
        const inter = [
            ["Regular", "Inter", undefined],
            ["Thin", "Inter-Thin", 100],
            ["Extra Light", "Inter-ExtraLight", 200],
            ["Light", "Inter-Light", 300],
            ["Medium", "Inter-Medium", 500],
            ["Semibold", "Inter-SemiBold", 600],
            ["Bold", "Inter-Bold", 700],
            ["Extra Bold", "Inter-ExtraBold", 800],
            ["Black", "Inter-Black", 900],
            ["Thin Italic", "Inter-ThinItalic", 100],
            ["Extra Light Italic", "Inter-ExtraLightItalic", 300],
            ["Light Italic", "Inter-LightItalic", 300],
            ["Italic", "Inter-Italic", undefined],
            ["Medium Italic", "Inter-MediumItalic", 500],
            ["Semibold Italic", "Inter-SemiBoldItalic", 600],
            ["Bold Italic", "Inter-BoldItalic", 700],
            ["Extra Bold Italic", "Inter-ExtraBoldItalic", 800],
            ["Black Italic", "Inter-BlackItalic", 900],
        ];
        const typeface = this.createTypeface("Inter");
        for (const entry of inter) {
            const [variant, selector, weight] = entry;
            const font = {
                variant,
                selector,
                weight,
                typeface,
                style: /italic/i.test(selector) ? "italic" : undefined,
            };
            typeface.fonts.push(font);
        }
        typeface.fonts.forEach(t => this.interTypefaceSelectors.add(t.selector));
        return typeface;
    }
    addTypefaceAlias(key, value) {
        this.typefaceAliases.set(key, value);
        this.typefaceAliasBySelector.set(value, key);
    }
    getSystemTypeface() {
        const fontFamilies = this.workaroundChrome81and82(
        // System fonts - Taken from https://furbo.org/stuff/systemfonts-new.html - "All Platforms" section
        "system-ui|-apple-system|BlinkMacSystemFont|Segoe UI|Roboto|Oxygen|Ubuntu|Cantarell|Fira Sans|Droid Sans|Helvetica Neue|sans-serif");
        const typeface = { family: systemTypefaceName, fonts: [], source: this.name };
        const aliases = new Map();
        const weights = [400, 100, 200, 300, 500, 600, 700, 800, 900];
        const styles = ["normal", "italic"];
        for (const style of styles) {
            for (const weight of weights) {
                const variant = createVariantName(weight, style);
                const alias = `__SystemDefault-${weight}-${style}__`;
                const font = {
                    variant,
                    selector: alias,
                    style: style === "normal" ? undefined : style,
                    weight: weight === 400 ? undefined : weight,
                    typeface,
                    status: "loaded",
                };
                typeface.fonts.push(font);
                aliases.set(alias, fontFamilies);
            }
        }
        return { typeface, aliases };
    }
    getTypefaceAliasBySelector(selector) {
        return this.typefaceAliasBySelector.get(selector) || null;
    }
    getTypefaceSelectorByAlias(alias) {
        return this.typefaceAliases.get(alias) || null;
    }
    /** Typeface aliases are in the format of `__Alias-Name__` */
    isTypefaceAlias(value) {
        if (value && value.match(/^__.*__$/))
            return true;
        return false;
    }
    /**
     * Use 'Inter' web font as System Default fonts on Mac with Chrome v81 v82
     * https://github.com/framer/company/issues/17277
     * https://bugs.chromium.org/p/chromium/issues/detail?id=1057654
     */
    workaroundChrome81and82(s) {
        if (safeNavigator) {
            const userAgent = safeNavigator.userAgent;
            if (!userAgent.includes("Mac OS X 10_15"))
                return s;
            if (!userAgent.includes("Chrome/81") && !userAgent.includes("Chrome/82"))
                return s;
        }
        return `Inter|${s}`;
    }
}
const fontWeightNames = {
    "100": "Thin",
    "200": "Extra Light",
    "300": "Light",
    "400": "Normal",
    "500": "Medium",
    "600": "Semi Bold",
    "700": "Bold",
    "800": "Extra Bold",
    "900": "Black",
};
function createVariantName(weight, style) {
    const friendlyStyle = style === "normal" ? "Regular" : "Italic";
    if (weight === 400) {
        return friendlyStyle;
    }
    if (style !== "normal") {
        return `${fontWeightNames[weight]} ${friendlyStyle}`;
    }
    return `${fontWeightNames[weight]}`;
}
//# sourceMappingURL=LocalFontSource.js.map