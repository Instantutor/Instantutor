import { Observer } from "../animation/Animatable/Observers.js";
import { Cancel, AnimatableObject } from "../animation/Animatable/Animatable.js";
/**
 * @internal
 */
declare function ObservableObject<T extends object = object>(initial?: Partial<T> | object, makeAnimatables?: boolean, observeAnimatables?: boolean): AnimatableObject<T>;
/**
 * @internal
 */
declare namespace ObservableObject {
    function resetObject<T extends object>(target: T): any;
    function addObserver<T extends object>(target: T, observer: Observer<T>): Cancel;
}
export { ObservableObject };
//# sourceMappingURL=ObservableObject.d.ts.map