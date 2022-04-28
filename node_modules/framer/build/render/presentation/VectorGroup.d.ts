import * as React from "react";
import { LayerProps, Layer } from "./Layer.js";
import type { Rect } from "../types/Rect.js";
/**
 * @alpha
 */
export interface VectorGroupProps {
    name?: string;
    opacity?: number | string;
    visible: boolean;
    x: number;
    y: number;
    rotation: number;
    width: number;
    height: number;
    targetName?: string;
    defaultName: string;
    isRootVectorNode: boolean;
    frame: Rect;
    includeTransform?: boolean;
}
/**
 * @alpha
 */
export interface VectorGroupProperties extends VectorGroupProps, LayerProps {
}
/**
 * @internal
 */
export declare class VectorGroup extends Layer<VectorGroupProperties, {}> {
    static defaultVectorGroupProps: VectorGroupProps;
    static readonly defaultProps: VectorGroupProperties;
    render(): React.ReactElement<any> | null;
    private renderElement;
}
//# sourceMappingURL=VectorGroup.d.ts.map