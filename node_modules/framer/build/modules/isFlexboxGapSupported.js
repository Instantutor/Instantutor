const isFlexboxGapSupportedRef = { result: null };
/* @internal */
export function isFlexboxGapSupported() {
    if (isFlexboxGapSupportedRef.result !== null)
        return isFlexboxGapSupportedRef.result;
    // Source: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/css/flexgap.js
    // create flex container with row-gap set
    const flex = document.createElement("div");
    Object.assign(flex.style, {
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        rowGap: "1px",
    });
    // create two elements inside it
    flex.appendChild(document.createElement("div"));
    flex.appendChild(document.createElement("div"));
    // append to the DOM (needed to obtain scrollHeight)
    document.body.appendChild(flex);
    const isSupported = flex.scrollHeight === 1; // flex container should be 1px high from the row-gap
    if (flex.parentNode) {
        flex.parentNode.removeChild(flex);
    }
    isFlexboxGapSupportedRef.result = isSupported;
    return isSupported;
}
//# sourceMappingURL=isFlexboxGapSupported.js.map