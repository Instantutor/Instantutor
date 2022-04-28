import { LinearGradient, RadialGradient } from "../types/Gradient.js";
/** @internal */
interface ColorStop {
    color: string;
    alpha: number;
    position: number;
}
/** @internal */
export interface LinearGradientElementProperties {
    id: string;
    angle: number;
    stops: ColorStop[];
}
export declare function elementPropertiesForLinearGradient(gradient: LinearGradient, id: string): LinearGradientElementProperties;
/** @internal */
export interface RadialGradientElementProperties {
    id: string;
    widthFactor: number;
    heightFactor: number;
    centerAnchorX: number;
    centerAnchorY: number;
    stops: ColorStop[];
}
export declare function elementPropertiesForRadialGradient(gradient: RadialGradient, id: string): RadialGradientElementProperties;
export {};
//# sourceMappingURL=elementPropertiesForGradient.d.ts.map