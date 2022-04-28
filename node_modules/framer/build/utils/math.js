export const round = (value, decimals = 0, increment = 1, min, max) => {
    const d = Math.pow(10, decimals);
    if (increment) {
        value = Math.round(value / increment) * increment;
    }
    value = Math.round(value * d) / d;
    if (min && value < min) {
        return min;
    }
    if (max && value > max) {
        return max;
    }
    return value;
};
export const roundWhole = (value, decimals = 1) => {
    // Return integer if whole value, else include decimals
    if (decimals === null) {
        decimals = 1;
    }
    if (parseInt(value.toString()) === value) {
        return parseInt(value.toString());
    }
    return round(value, decimals);
};
export const clamp = (value, a, b) => {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    if (value < min) {
        value = min;
    }
    if (value > max) {
        value = max;
    }
    return value;
};
// Taken from http://jsfiddle.net/Xz464/7/
// Used by animation engine, needs to be very performant
// export const mapRange = (value, fromLow, fromHigh, toLow, toHigh) => {
// 	return toLow + (((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow))
// }
// Kind of similar as above but with a better syntax and a limiting option
export const modulate = (value, rangeA, rangeB, shouldClamp = false) => {
    const [fromLow, fromHigh] = Array.from(rangeA);
    const [toLow, toHigh] = Array.from(rangeB);
    // if rangeB consists of Colors we return a color tween
    // if Color.isColor(toLow) or _.isString(toLow) and Color.isColorString(toLow)
    // 	ratio = Utils.modulate(value, rangeA, [0, 1])
    // 	result = Color.mix(toLow, toHigh, ratio)
    // 	return result
    const result = toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow);
    if (shouldClamp === true) {
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
};
//# sourceMappingURL=math.js.map