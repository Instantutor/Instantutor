/**
 * @beta
 */
export function isInterpolatable(value) {
    return typeof value === "function" && value.interpolationFor && typeof value.interpolationFor === "function";
}
/**
 * @public
 */
export var Interpolation;
(function (Interpolation) {
    /**
     * @param from -
     * @param to -
     * @beta
     */
    function handleUndefined(from, to) {
        if (from === undefined) {
            from = to;
        }
        if (to === undefined) {
            to = from;
        }
        return [from, to];
    }
    Interpolation.handleUndefined = handleUndefined;
})(Interpolation || (Interpolation = {}));
//# sourceMappingURL=Interpolation.js.map