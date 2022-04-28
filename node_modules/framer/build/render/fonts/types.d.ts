/** @internal */
interface FontMetaData {
    fontFamily: string;
    fontSubFamily: string;
    postscriptName: string;
    preferredFamily: string;
    preferredSubFamily: string;
}
/** @internal */
interface AssetProperties {
    kind: string;
    font: FontMetaData;
}
/**
 * @internal
 * The Asset related types are defined in src/app/assets.
 * To avoid a dependency on that module, this module only defines
 * interfaces that only contain relevant properties for fonts
 * */
export interface Asset {
    key: string;
    name: string;
    filename: string;
    ownerType: string;
    mimeType: string;
    url: string;
    properties?: AssetProperties;
}
/** @internal */
export declare type TypefaceSourceName = "local" | "google" | "custom";
/** @internal */
export declare type TypefaceSelector = string;
/** @internal */
export declare enum TypefaceSourceNames {
    Google = "google",
    Local = "local",
    Custom = "custom"
}
/** @internal */
export interface FontSource {
    name: TypefaceSourceName;
    typefaces: Typeface[];
    byFamily: Map<string, Typeface>;
}
/** @internal */
export interface Typeface {
    source: TypefaceSourceName;
    family: string;
    fonts: Font[];
    owner?: "team" | "project";
}
/** @internal */
export interface Font {
    typeface: Typeface;
    variant: string;
    /**
     * normal / italic / oblique
     * The font-style of the font
     * Can be parsed from the variant when using google gonts
     */
    style?: string;
    /**
     * 100-800
     * The font-weight of the font
     * Can be parsed from the variant when using google gonts
     */
    weight?: number;
    selector: TypefaceSelector;
    status?: "loaded";
    postscriptName?: string;
    file?: string;
}
/**
 * The data required to locate a typeface
 *
 * @internal
 */
export interface TypefaceLocator {
    source: TypefaceSourceName;
    family: string;
}
/**
 * The data required to locate a font
 *
 * @internal
 */
export interface WebFontLocator extends TypefaceLocator {
    variant: string;
    file?: string;
}
/**
 * Specific set of properties required by draft to render a font
 * @internal
 */
export interface DraftFontProperties {
    style: string | undefined;
    weight: number | undefined;
    variant: string | undefined;
    family: string;
    source: TypefaceSourceName;
}
/**
 * Information about a font variant
 * For example: `parseVariant("600italic")` will return `{style: 'italic', weight: 600}`
 * */
export interface FontVariant {
    /** "normal" | "italic" | "oblique" */
    style: string;
    /** 100 / 200 / 300 / 400 / 500 / 600 / 700 / 800 */
    weight: number;
}
/**
 * A mapped type that deeply changes all properties into readonly
 * all arrays into ReadonlyArray<T>
 * all maps into ReadonlyMap<T>
 */
declare type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends Map<infer K, infer V> ? ReadonlyMap<K, V> : T[P] extends (infer X)[] ? readonly X[] : DeepReadonly<T[P]>;
};
/** @internal */
export declare type ReadonlyFont = DeepReadonly<Font>;
/** @internal */
export declare type ReadonlyTypeface = DeepReadonly<Typeface>;
export {};
//# sourceMappingURL=types.d.ts.map