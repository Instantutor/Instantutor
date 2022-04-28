import { gradientColorStops, gradientColorStopsHash } from "../utils/gradientColorStops.js";
import { isSimpleGradient } from "./SimpleGradient.js";
import { isMultiStopGradient } from "./MultiStopGradient.js";
const linearGradientKeys = ["angle", "alpha"];
/**
 * @public
 */
export var LinearGradient;
(function (LinearGradient) {
    /**
     * @param value -
     */
    function isLinearGradient(value) {
        return (value &&
            linearGradientKeys.every(key => key in value) &&
            (isSimpleGradient(value) || isMultiStopGradient(value)));
    }
    LinearGradient.isLinearGradient = isLinearGradient;
    /** @internal */
    function hash(linearGradient) {
        return linearGradient.angle ^ gradientColorStopsHash(linearGradient, linearGradient.alpha);
    }
    LinearGradient.hash = hash;
    /** @alpha */
    function toCSS(linearGradient, overrideAngle) {
        const stops = gradientColorStops(linearGradient, linearGradient.alpha);
        const angle = overrideAngle !== undefined ? overrideAngle : linearGradient.angle;
        const cssStops = stops.map(stop => `${stop.value} ${stop.position * 100}%`);
        return `linear-gradient(${angle}deg, ${cssStops.join(", ")})`;
    }
    LinearGradient.toCSS = toCSS;
})(LinearGradient || (LinearGradient = {}));
//# sourceMappingURL=LinearGradient.js.map