declare type Family = string;
declare type Style = string;
declare type Selector = string;
declare type Weight = number | undefined;
interface Font {
    selector: Selector;
    weight: Weight;
}
declare type TypefaceMembers = Record<Style, Font>;
declare type Typefaces = Record<Family, TypefaceMembers>;
export declare const typefaceAliases: {
    [key: string]: string;
};
export declare const typefaces: Typefaces;
export {};
//# sourceMappingURL=fonts.d.ts.map