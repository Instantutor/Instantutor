import { UpdateObserver, FinishFunction } from "./Observers.js";
import type { MotionValue } from "framer-motion";
/** @public */
export declare type Cancel = () => void;
/**
 * @public
 */
export declare type TransactionId = number;
export interface Change<Value> {
    value: Value;
    oldValue?: Value;
}
export declare type ToAnimatable<PossiblyAnimatable> = PossiblyAnimatable extends Animatable<infer Value> ? Animatable<Value> : Animatable<PossiblyAnimatable>;
export declare type FromAnimatable<PossiblyAnimatable> = PossiblyAnimatable extends Animatable<infer Value> ? Value : PossiblyAnimatable;
export declare type ToAnimatableOrValue<PossiblyAnimatable> = PossiblyAnimatable extends Animatable<infer Value> ? Value | Animatable<Value> : PossiblyAnimatable | Animatable<PossiblyAnimatable>;
/** @public */
export declare type AnimatableObject<T> = {
    [K in keyof T]: ToAnimatableOrValue<T[K]>;
};
/**
 * @public
 * @deprecated
 */
export declare type DeprecatedAnimationTarget<Value> = Animatable<Value> | AnimatableObject<Value> | MotionValue<Value>;
/**
 * @public
 * @deprecated Use {@link useMotionValue} instead
 */
export interface Animatable<Value> extends UpdateObserver<Value> {
    /**
     * Get the current value out of this Animatable object
     * @remarks
     * ```jsx
     * const a = Animatable(0)
     * a.get() // returns 0
     * await animate(a, 42)
     * a.get() // returns 42
     * ```
     * @returns Current value
     * @public
     */
    get(): Value;
    /**
     * Set a new value to a animatable object
     * @remarks
     * The passed value can be an Animatable value too
     * ```jsx
     * const a = Animatable(0)
     * const b = Animatable(100)
     * a.set(42)
     * a.get() // returns 42
     * a.set(b)
     * a.get() // returns 100
     * ```
     * @param value - New value to set to the animatable
     * @public
     */
    set(value: Value | Animatable<Value>): void;
    /**
     * @public
     */
    set(value: Value | Animatable<Value>, transaction?: TransactionId): void;
    /**
     * @internal
     */
    finishTransaction(transaction: TransactionId): FinishFunction[];
}
/**
 * Creates a Animatable object that can be animated. These objects can be passed into a {@link DeprecatedFrame} instead of a primitive like number
 * and afterwards animated with {@link (animate:function)}.
 * @remarks
 * ```jsx
 * const value = Animatable(0)
 * animate(value, 100)
 * ```
 * @param value - Value to animate
 * @returns Animatable value
 * @public
 * @deprecated Use {@link useMotionValue} instead
 */
export declare function Animatable<Value>(value: Value | Animatable<Value>): Animatable<Value>;
/**
 * @public
 */
export declare namespace Animatable {
    /**
     * @internal
     */
    function transaction(update: (updater: (animatable: Animatable<any>, value: any) => void, transactionId: TransactionId) => void): void;
    /**
     * @public
     */
    function getNumber(value: number | Animatable<number> | null | undefined, defaultValue?: number): number;
    /** @internal */
    function get<Value>(value: Value | Animatable<Value> | null | undefined, defaultValue: Value): Value;
    /**
     * @internal
     */
    function objectToValues<Object>(object: AnimatableObject<Object>): Object;
}
/**
 * @internal
 * @deprecated
 */
export declare function isAnimatable(value: any): value is Animatable<any>;
//# sourceMappingURL=Animatable.d.ts.map