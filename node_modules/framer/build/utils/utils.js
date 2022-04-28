export const delay = (time = 0, f) => {
    setTimeout(f, time * 1000);
};
// Shallow type checkers used by "inspect". Can be made
// more terse:
export function isFunction(value) {
    return value instanceof Function;
}
export function isString(value) {
    return typeof value === "string";
}
export function isNumber(value) {
    return typeof value === "number";
}
export function isArray(value) {
    return value instanceof Array;
}
export function isObject(value) {
    return typeof value === "object";
}
//# sourceMappingURL=utils.js.map