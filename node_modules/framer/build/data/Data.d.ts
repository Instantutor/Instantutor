import type { Observer } from "../animation/Animatable/Observers.js";
import type { Cancel } from "../animation/Animatable/Animatable.js";
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
export declare function Data<T extends object = object>(initial?: Partial<T> | object): T;
/**
 * @public
 * @internalremarks The release tag on this should be internal, but API extractor does not support that yet: https://github.com/Microsoft/web-build-tools/issues/972
 */
export declare namespace Data {
    /**
     * @internal
     */
    const _stores: object[];
    /** @internal */
    function addData(data: object): void;
    /** @internal */
    function reset(): void;
    /** @internal */
    function addObserver<T extends object>(target: T, observer: Observer<T>): Cancel;
}
//# sourceMappingURL=Data.d.ts.map