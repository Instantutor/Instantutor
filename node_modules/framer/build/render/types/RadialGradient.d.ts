import { SimpleGradient } from "./SimpleGradient.js";
import { MultiStopGradient } from "./MultiStopGradient.js";
/**
 * @public
 */
export interface RadialGradientBase {
    alpha: number;
    widthFactor: number;
    heightFactor: number;
    centerAnchorX: number;
    centerAnchorY: number;
}
/**
 * @public
 */
export declare type RadialGradient = RadialGradientBase & (SimpleGradient | MultiStopGradient);
/**
 * @public
 */
export declare namespace RadialGradient {
    /**
     * @param value -
     * @public
     */
    function isRadialGradient(value: any): value is RadialGradient;
    /** @internal */
    function hash(radialGradient: RadialGradient): number;
    /** @alpha */
    function toCSS(radialGradient: RadialGradient): string;
}
//# sourceMappingURL=RadialGradient.d.ts.map