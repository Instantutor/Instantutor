/** @public */
export interface Shadow {
    color: string;
    x: number;
    y: number;
    blur: number;
}
/** @public */
export declare namespace Shadow {
    function is(shadow: any): shadow is Shadow;
}
/** @public */
export interface BoxShadow {
    inset: boolean;
    color: string;
    x: number;
    y: number;
    blur: number;
    spread: number;
}
/** @public */
export declare namespace BoxShadow {
    function is(shadow: any): shadow is BoxShadow;
    function toCSS(shadow: BoxShadow): string;
}
//# sourceMappingURL=Shadow.d.ts.map