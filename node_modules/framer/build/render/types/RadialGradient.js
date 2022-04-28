import "../../utils/string.js";
import "./GradientColorStop.js";
import { gradientColorStops, gradientColorStopsHash } from "../utils/gradientColorStops.js";
import { isSimpleGradient } from "./SimpleGradient.js";
import { isMultiStopGradient } from "./MultiStopGradient.js";
const radialGradientKeys = [
    "widthFactor",
    "heightFactor",
    "centerAnchorX",
    "centerAnchorY",
    "alpha",
];
/**
 * @public
 */
export var RadialGradient;
(function (RadialGradient) {
    /**
     * @param value -
     * @public
     */
    function isRadialGradient(value) {
        return (value &&
            radialGradientKeys.every(key => key in value) &&
            (isSimpleGradient(value) || isMultiStopGradient(value)));
    }
    RadialGradient.isRadialGradient = isRadialGradient;
    /** @internal */
    function hash(radialGradient) {
        return (radialGradient.centerAnchorX ^
            radialGradient.centerAnchorY ^
            radialGradient.widthFactor ^
            radialGradient.heightFactor ^
            gradientColorStopsHash(radialGradient, radialGradient.alpha));
    }
    RadialGradient.hash = hash;
    /** @alpha */
    function toCSS(radialGradient) {
        const { alpha, widthFactor, heightFactor, centerAnchorX, centerAnchorY } = radialGradient;
        const stops = gradientColorStops(radialGradient, alpha);
        const cssStops = stops.map(stop => `${stop.value} ${stop.position * 100}%`);
        return `radial-gradient(${widthFactor * 100}% ${heightFactor * 100}% at ${centerAnchorX * 100}% ${centerAnchorY * 100}%, ${cssStops.join(", ")})`;
    }
    RadialGradient.toCSS = toCSS;
})(RadialGradient || (RadialGradient = {}));
//# sourceMappingURL=RadialGradient.js.map