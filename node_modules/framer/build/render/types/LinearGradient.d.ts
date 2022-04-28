import { SimpleGradient } from "./SimpleGradient.js";
import { MultiStopGradient } from "./MultiStopGradient.js";
/**
 * @public
 */
export interface LinearGradientBase {
    alpha: number;
    angle: number;
}
/**
 * @public
 */
export declare type LinearGradient = LinearGradientBase & (SimpleGradient | MultiStopGradient);
/**
 * @public
 */
export declare namespace LinearGradient {
    /**
     * @param value -
     */
    function isLinearGradient(value: any): value is LinearGradient;
    /** @internal */
    function hash(linearGradient: LinearGradient): number;
    /** @alpha */
    function toCSS(linearGradient: LinearGradient, overrideAngle?: number): string;
}
//# sourceMappingURL=LinearGradient.d.ts.map