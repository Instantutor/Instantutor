const isArray = Array.isArray;
const keyList = Object.keys;
const hasProp = Object.prototype.hasOwnProperty;
// Adapted from react-fast-compare (https://github.com/FormidableLabs/react-fast-compare)
function equal(a, b, deep) {
    if (a === b)
        return true;
    if (a && b && typeof a === "object" && typeof b === "object") {
        const arrA = isArray(a);
        const arrB = isArray(b);
        let i, length, key;
        if (arrA && arrB) {
            length = a.length;
            if (length !== b.length)
                return false;
            for (i = length; i-- !== 0;) {
                if (!deep && a[i] !== b[i])
                    return false;
                if (deep && !equal(a[i], b[i], true))
                    return false;
            }
            return true;
        }
        if (arrA !== arrB)
            return false;
        const dateA = a instanceof Date;
        const dateB = b instanceof Date;
        if (dateA !== dateB)
            return false;
        if (dateA && dateB)
            return a.getTime() === b.getTime();
        const regexpA = a instanceof RegExp;
        const regexpB = b instanceof RegExp;
        if (regexpA !== regexpB)
            return false;
        if (regexpA && regexpB)
            return a.toString() === b.toString();
        if (typeof a.equals === "function" && typeof b.equals === "function") {
            return a.equals(b);
        }
        const keys = keyList(a);
        length = keys.length;
        if (length !== keyList(b).length)
            return false;
        for (i = length; i-- !== 0;) {
            if (!hasProp.call(b, keys[i]))
                return false;
        }
        for (i = length; i-- !== 0;) {
            key = keys[i];
            if (key === "_owner" && a.$$typeof) {
                // React-specific: avoid traversing React elements' _owner.
                continue;
            }
            if (!deep && a[key] !== b[key])
                return false;
            if (deep && !equal(a[key], b[key], true))
                return false;
        }
        return true;
    }
    // True if a and b are both NaN, otherwise false.
    return a !== a && b !== b;
}
/** @internal */
export function isEqual(a, b, deep = true) {
    try {
        return equal(a, b, deep);
    }
    catch (error) {
        if ((error.message && error.message.match(/stack|recursion/i)) || error.number === -2146828260) {
            // eslint-disable-next-line no-console
            console.warn("Warning: isEqual does not handle circular references.", error.name, error.message);
            return false;
        }
        throw error;
    }
}
//# sourceMappingURL=isEqual.js.map