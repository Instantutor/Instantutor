import { Observers } from "./Observers.js";
import { deprecationWarning } from "../../utils/deprecation.js";
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
export function Animatable(value) {
    deprecationWarning("Animatable()", "2.0.0", "the new animation API (https://www.framer.com/api/animation/)");
    return isAnimatable(value) ? value : new AnimatableValue(value);
}
/**
 * @public
 */
(function (Animatable) {
    /**
     * @internal
     */
    function transaction(update) {
        const transactionId = Math.random();
        const updatedValues = new Set();
        const updater = (animatable, value) => {
            animatable.set(value, transactionId);
            updatedValues.add(animatable);
        };
        update(updater, transactionId);
        const finishObservers = [];
        updatedValues.forEach(value => {
            finishObservers.push(...value.finishTransaction(transactionId));
        });
        finishObservers.forEach(finish => {
            finish(transactionId);
        });
    }
    Animatable.transaction = transaction;
    /**
     * @public
     */
    function getNumber(value, defaultValue = 0) {
        return Animatable.get(value, defaultValue);
    }
    Animatable.getNumber = getNumber;
    /** @internal */
    function get(value, defaultValue) {
        if (value === undefined || value === null) {
            return defaultValue;
        }
        if (isAnimatable(value)) {
            return value.get();
        }
        return value;
    }
    Animatable.get = get;
    /**
     * @internal
     */
    function objectToValues(object) {
        if (!object) {
            return object;
        }
        const result = {};
        for (const key in object) {
            const value = object[key];
            if (isAnimatable(value)) {
                result[key] = value.get();
            }
            else {
                result[key] = value;
            }
        }
        return result;
    }
    Animatable.objectToValues = objectToValues;
})(Animatable || (Animatable = {}));
const onUpdateKey = "onUpdate";
const finishTransactionKey = "finishTransaction";
/**
 * @internal
 * @deprecated
 */
export function isAnimatable(value) {
    return (value !== null &&
        typeof value === "object" &&
        onUpdateKey in value &&
        value[onUpdateKey] instanceof Function &&
        finishTransactionKey in value &&
        value[finishTransactionKey] instanceof Function);
}
function animatableInterpolation(value, currentInterpolation) {
    return {
        interpolate(from, to) {
            const fromValue = from.get();
            const toValue = to.get();
            const result = Animatable(fromValue);
            return (progress) => {
                const v = currentInterpolation.interpolate(fromValue, toValue)(progress);
                result.set(v);
                return result;
            };
        },
        difference(from, to) {
            const v = from.get();
            return currentInterpolation.difference(v, to.get());
        },
    };
}
class AnimatableValue {
    value;
    observers = new Observers();
    constructor(value) {
        this.value = value;
    }
    static interpolationFor(value, currentInterpolation) {
        if (isAnimatable(value)) {
            return animatableInterpolation(value, currentInterpolation);
        }
    }
    get() {
        return this.value;
    }
    set(value, transaction) {
        const oldValue = this.value;
        if (isAnimatable(value)) {
            value = value.get();
        }
        this.value = value;
        const change = {
            value,
            oldValue,
        };
        this.observers.notify(change, transaction);
    }
    finishTransaction(transaction) {
        return this.observers.finishTransaction(transaction);
    }
    onUpdate(handler) {
        return this.observers.add(handler);
    }
}
//# sourceMappingURL=Animatable.js.map