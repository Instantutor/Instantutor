const defaultCache = new Set();
let defaultSheet;
/**
 * Add CSS to the document.
 *
 * @param cssRule - CSS rule to add to the document
 */
export function injectCSSRule(cssRule, sheet = defaultSheet, cache = defaultCache) {
    if (!cssRule || cache.has(cssRule) || typeof document === "undefined")
        return;
    cache.add(cssRule);
    if (!sheet) {
        const styleElement = document.createElement("style");
        styleElement.setAttribute("type", "text/css");
        styleElement.setAttribute("data-framer-css", "true");
        document.head && document.head.appendChild(styleElement);
        if (styleElement.sheet)
            sheet = styleElement.sheet;
    }
    try {
        sheet.insertRule(cssRule, sheet.cssRules.length);
    }
    catch (e) {
        // Assume that errors are from malformed rules, or rules that are not
        // valid in the current browser. e.g.
        // `input[type="range"]::-moz-range-thumb` will error in Chrome, but not
        // Firefox, and swallow the error.
    }
}
//# sourceMappingURL=setDocumentStyles.js.map