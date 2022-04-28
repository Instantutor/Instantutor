import * as React from "react";
import type { Rect } from "../types/Rect.js";
/**
 * @internal
 */
export interface SVGRootProps {
    frame: Rect;
    width: number;
    height: number;
    willChangeTransform?: boolean;
    innerRef?: (ref: SVGSVGElement | null) => void;
}
/**
 * @internal
 */
export declare class SVGRoot extends React.Component<SVGRootProps, {}> {
    render(): JSX.Element;
}
//# sourceMappingURL=SVGRoot.d.ts.map