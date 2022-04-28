import type * as React from "react";
import { BackgroundProperties } from "../traits/Background.js";
import { RadiusProperties } from "../traits/Radius.js";
import type { FilterProperties } from "../traits/Filters.js";
import type { BackgroundFilterProperties } from "../traits/BackdropFilters.js";
import { BlendingProperties } from "../traits/Blending.js";
import { OverflowProperties } from "../traits/Overflow.js";
import { WithOpacity } from "../traits/Opacity.js";
import type { BoxShadowProperties } from "../traits/Shadow.js";
import { TextColorProperties } from "../traits/TextColor.js";
import type { MotionStyle } from "framer-motion";
/** @public */
export declare type DeprecatedVisualProperties = Partial<BackgroundProperties & RadiusProperties & FilterProperties & BackgroundFilterProperties & BlendingProperties & OverflowProperties & BoxShadowProperties & WithOpacity & TextColorProperties>;
/** @internal */
export declare function collectVisualStyleFromProps(props: DeprecatedVisualProperties, style: React.CSSProperties | MotionStyle, isTextNode?: boolean): void;
//# sourceMappingURL=collectVisualStyleFromProps.d.ts.map