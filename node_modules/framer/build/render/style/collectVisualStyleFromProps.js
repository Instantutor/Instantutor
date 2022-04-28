import { collectBackgroundFromProps } from "../traits/Background.js";
import { collectRadiusFromProps } from "../traits/Radius.js";
import { collectBlendingFromProps } from "../traits/Blending.js";
import { collectOverflowFromProps } from "../traits/Overflow.js";
import { collectOpacityFromProps } from "../traits/Opacity.js";
import { collectFiltersFromProps } from "../utils/filtersForNode.js";
import { collectBoxShadowsForProps, collectTextShadowsForProps } from "./shadow.js";
import { collectTextColorFromProps } from "../traits/TextColor.js";
/** @internal */
export function collectVisualStyleFromProps(props, style, isTextNode = false) {
    collectBackgroundFromProps(props, style);
    collectRadiusFromProps(props, style);
    collectFiltersFromProps(props, style);
    collectBlendingFromProps(props, style);
    collectOverflowFromProps(props, style);
    collectOpacityFromProps(props, style);
    collectTextColorFromProps(props, style);
    if (isTextNode) {
        collectTextShadowsForProps(props, style);
    }
    else {
        collectBoxShadowsForProps(props, style);
    }
}
//# sourceMappingURL=collectVisualStyleFromProps.js.map