import type { Interpolation } from "../../interpolation/Interpolation.js";
/**
 * @internal
 * @deprecated  Use the `transition` prop instead
 */
export interface Animator<Value, Options = any> {
    /**
     * @beta
     */
    setFrom(from: Value): void;
    /**
     * @beta
     */
    setTo(to: Value): void;
    /**
     * @beta
     */
    isReady(): boolean;
    /**
     * @beta
     */
    next(delta: number): Value;
    /**
     * @beta
     */
    isFinished(): boolean;
}
/**
 * @public
 * @deprecated  Use the `transition` prop instead
 */
export interface AnimatorClass<Value, Options = any> {
    /**
     * @internal
     */
    new (options: Partial<Options>, interpolation: Interpolation<Value>): Animator<Value, Options>;
}
//# sourceMappingURL=Animator.d.ts.map