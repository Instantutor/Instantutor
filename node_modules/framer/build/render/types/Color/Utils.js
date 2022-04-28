export function clamp(value, a, b) {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    if (value < min) {
        value = min;
    }
    if (value > max) {
        value = max;
    }
    return value;
}
// TODO: use another function from Library
export function modulate(value, rangeA, rangeB, limit = false) {
    const [fromLow, fromHigh] = rangeA;
    const [toLow, toHigh] = rangeB;
    const result = toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow);
    if (limit === true) {
        if (toLow < toHigh) {
            if (result < toLow) {
                return toLow;
            }
            if (result > toHigh) {
                return toHigh;
            }
        }
        else {
            if (result > toLow) {
                return toLow;
            }
            if (result < toHigh) {
                return toHigh;
            }
        }
    }
    return result;
}
export function isNumeric(value) {
    return !isNaN(value) && isFinite(value);
}
export function percentToFraction(val) {
    const digits = numberFromString(val);
    if (digits !== undefined) {
        if (val.includes("%")) {
            return digits / 100;
        }
        return digits;
    }
    return 0;
}
export function numberFromString(input) {
    const match = input.match(/\d?\.?\d+/);
    return match ? Number(match[0]) : undefined;
}
//# sourceMappingURL=Utils.js.map