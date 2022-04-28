import { ObservableObject } from "./ObservableObject.js";
/**
 * Allows data to be shared between Frames using Code Overrides.
 * Any changes to the `Data` instance will cause the preview to update and code
 * overrides will re-render. In this example, we’re updating the `scale` property on `press`, setting it to `0.5`.
 * ```jsx
 * import { Data, Override } from "framer"
 *
 * const data = Data({
 *    scale: 0.5,
 * })
 *
 * export function WhileTap(): Override {
 *    return {
 *        whileTap: {
 *            scale: data.scale,
 *        },
 *    }
 * }
 *
 * ```
 * @param initial - The initial value of the data to be set.
 * @returns the data object for use across components.
 * @public
 */
export function Data(initial = {}) {
    // Because of the second boolean is set to false we already know that everything will have the same type as the input
    const data = ObservableObject(initial, false, false);
    Data.addData(data);
    return data;
}
/**
 * @public
 * @internalremarks The release tag on this should be internal, but API extractor does not support that yet: https://github.com/Microsoft/web-build-tools/issues/972
 */
(function (Data) {
    /**
     * @internal
     */
    Data._stores = [];
    /** @internal */
    function addData(data) {
        Data._stores.push(data);
    }
    Data.addData = addData;
    /** @internal */
    function reset() {
        Data._stores.forEach(target => ObservableObject.resetObject(target));
    }
    Data.reset = reset;
    /** @internal */
    function addObserver(target, observer) {
        return ObservableObject.addObserver(target, observer);
    }
    Data.addObserver = addObserver;
})(Data || (Data = {}));
//# sourceMappingURL=Data.js.map