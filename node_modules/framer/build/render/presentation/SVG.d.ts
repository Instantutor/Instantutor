import * as React from "react";
import { LayerProps } from "./Layer.js";
import { NewConstraintProperties, ParentSize } from "../types/NewConstraints.js";
import type { Shadow } from "../types/Shadow.js";
import { Animatable } from "../../animation/Animatable/Animatable.js";
import type { Background } from "../traits/Background.js";
import type { FilterProperties } from "../traits/Filters.js";
import type { BackgroundFilterProperties } from "../traits/BackdropFilters.js";
import type { RadiusProperties } from "../traits/Radius.js";
import type { WithOpacity } from "../traits/Opacity.js";
import { Transition, Variants } from "framer-motion";
/**
 * @internal
 */
export interface SVGProps extends Partial<NewConstraintProperties>, Partial<FilterProperties & BackgroundFilterProperties & RadiusProperties & WithOpacity> {
    rotation: Animatable<number> | number;
    visible: boolean;
    name?: string;
    fill?: Animatable<Background> | Background | null;
    svg: string;
    intrinsicWidth?: number;
    intrinsicHeight?: number;
    shadows: Readonly<Shadow[]>;
    parentSize?: ParentSize;
    withExternalLayout?: boolean;
    className?: string;
    style?: React.CSSProperties;
    variants?: Variants;
    transition?: Transition;
    /** If nonzero indicates a managed SVG of fixed size and with unique internal ids. */
    svgContentId?: number;
    title?: string;
    description?: string;
    tabIndex?: number;
}
/**
 * @internal
 */
export interface SVGProperties extends SVGProps, LayerProps {
    layoutId?: string | undefined;
    /** @internal */
    innerRef?: React.RefObject<HTMLDivElement>;
    /** @internal */
    providedWindow?: typeof window | null;
}
/**
 * @internal
 */
export declare function SVG(props: Partial<SVGProperties>): React.ReactElement<any>;
//# sourceMappingURL=SVG.d.ts.map