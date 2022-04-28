/**
 * @beta
 */
export declare type Interpolator<Value> = (progress: number) => Value;
/**
 * @public
 */
export interface Interpolation<Value = any> {
    /**
     * @beta
     */
    interpolate(from: Value, to: Value): Interpolator<Value>;
    /**
     * difference(from, to) calculates a measure of difference between two values,
     * such that for every value of from, to and x holds:
     * interpolator = interpolate(from, to)
     * total = difference(from, to)
     * interpolator( difference(from, x) / total ) === x
     * @beta
     */
    difference(from: Value, to: Value): number;
}
/**
 * @beta
 */
export interface Interpolatable<Value> {
    interpolationFor(value: Value, currentInterpolation: Interpolation): Interpolation<Value> | undefined;
}
/**
 * @beta
 */
export declare function isInterpolatable<Value>(value: any): value is Interpolatable<Value>;
/**
 * @public
 */
export declare namespace Interpolation {
    /**
     * @param from -
     * @param to -
     * @beta
     */
    function handleUndefined<Value>(from: Value, to: Value): [Value, Value];
}
//# sourceMappingURL=Interpolation.d.ts.map