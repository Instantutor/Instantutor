const shadowKeys = ["color", "x", "y", "blur"];
/** @public */
export var Shadow;
(function (Shadow) {
    function is(shadow) {
        return shadow && shadowKeys.every(key => key in shadow);
    }
    Shadow.is = is;
})(Shadow || (Shadow = {}));
const boxShadowKeys = ["inset", "color", "x", "y", "blur", "spread"];
/** @public */
export var BoxShadow;
(function (BoxShadow) {
    function is(shadow) {
        return shadow && boxShadowKeys.every(key => key in shadow);
    }
    BoxShadow.is = is;
    function toCSS(shadow) {
        const inset = shadow.inset ? "inset " : "";
        return `${inset}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;
    }
    BoxShadow.toCSS = toCSS;
})(BoxShadow || (BoxShadow = {}));
//# sourceMappingURL=Shadow.js.map