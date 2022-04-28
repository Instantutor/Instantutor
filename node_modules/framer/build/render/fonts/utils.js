/** @internal */
export function parseVariant(variant) {
    if (variant === "regular")
        return { style: "normal", weight: 400 };
    const res = /([0-9]*)([a-z]*)/.exec(variant);
    if (!res)
        return null;
    const weight = parseInt(res[1] || "400");
    const style = res[2] || "normal";
    return { weight, style };
}
//# sourceMappingURL=utils.js.map