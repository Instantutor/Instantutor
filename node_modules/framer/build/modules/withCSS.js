import * as React from "react";
import { StyleSheetContext } from "../render/StyleSheetContext.js";
import * as CSS from "../render/utils/setDocumentStyles.js";
import { isBrowser } from "../utils/environment.js";
// FIXME: this is mostly unnecessary as of https://github.com/framer/FramerStudio/pull/10631
// because the minification process during SSG will move all the CSS into the <head>.
// It still matters for a rare occassion when a site failed to be optimized (eg due to SSG errors).
if (isBrowser()) {
    // Move the SSR-injected <style> tags to <head> to avoid React hydration errors.
    for (const node of document.querySelectorAll("style[data-framer-css-ssr]")) {
        document.head.appendChild(node);
    }
}
export const styleTagSSRMarker = { "data-framer-css-ssr": true };
/**
 * Render a React component with css that will be injected into the document's
 * head when the component is first rendered. The escapedCSS argument can either
 * be a string where each line is a css rule, or an array of css rule strings.
 *
 * @public
 */
export const withCSS = (Component, escapedCSS) => React.forwardRef((props, ref) => {
    const { sheet, cache } = React.useContext(StyleSheetContext) ?? {};
    if (!isBrowser()) {
        const concatenatedCSS = Array.isArray(escapedCSS) ? escapedCSS.join("\n") : escapedCSS;
        return (React.createElement(React.Fragment, null,
            React.createElement("style", { ...styleTagSSRMarker, dangerouslySetInnerHTML: { __html: concatenatedCSS } }),
            React.createElement(Component, { ...props, ref: ref })));
    }
    // We used to use useLayoutEffect for injecting styles, but this caused
    // https://github.com/framer/company/issues/22678. Situation:
    //
    //     const ContainerWithCSS = withCSS(Container, css)
    //     <ContainerWithCSS>
    //         <Component />
    //     </ContainerWithCSS>
    //
    // "Component" measures something in a useLayoutEffect on first mount.
    // useLayoutEffects fire "bottom-up", which means Component will measure
    // before ContainerWithCSS injects styles, which means the measurement
    // might be wrong.
    //
    // To prevent that, we now inject styles during the first render.
    //
    // Note that in concurrent mode, the initial render might get discarded
    // and re-tried later, and if the strict mode is any evidence, this
    // might also cause the ref to be discarded. Which means we should have
    // some second level of defense against injecting styles multiple times.
    // (Currently, CSS.setDocumentStyles takes care of that.)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const didInjectStyles = React.useRef(false);
    if (!didInjectStyles.current) {
        const css = Array.isArray(escapedCSS) ? escapedCSS : escapedCSS.split("\n");
        css.forEach(rule => rule && CSS.injectCSSRule(rule, sheet, cache));
        didInjectStyles.current = true;
    }
    return React.createElement(Component, { ...props, ref: ref });
});
//# sourceMappingURL=withCSS.js.map