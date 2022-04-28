import { LinearGradient, RadialGradient } from "../types/Gradient.js";
import { ConvertColor } from "../types/Color/ConvertColor.js";
import { gradientColorStops } from "./gradientColorStops.js";
export function elementPropertiesForLinearGradient(gradient, id) {
    return {
        id: `id${id}g${LinearGradient.hash(gradient)}`,
        angle: gradient.angle - 90,
        stops: gradientColorStops(gradient).map(stop => ({
            color: stop.value,
            alpha: ConvertColor.getAlpha(stop.value) * gradient.alpha,
            position: stop.position,
        })),
    };
}
export function elementPropertiesForRadialGradient(gradient, id) {
    return {
        id: `id${id}g${RadialGradient.hash(gradient)}`,
        widthFactor: gradient.widthFactor,
        heightFactor: gradient.heightFactor,
        centerAnchorX: gradient.centerAnchorX,
        centerAnchorY: gradient.centerAnchorY,
        stops: gradientColorStops(gradient).map(stop => ({
            color: stop.value,
            alpha: ConvertColor.getAlpha(stop.value) * gradient.alpha,
            position: stop.position,
        })),
    };
}
//# sourceMappingURL=elementPropertiesForGradient.js.map