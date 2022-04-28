import * as React from "react";
import { Layer, LayerProps } from "../Layer.js";
import { ConstraintProperties } from "../../types/Constraints.js";
import { BorderStyle } from "../../style/BorderComponent.js";
import type { Rect } from "../../types/Rect.js";
import type { Size } from "../../types/Size.js";
import { Animatable, AnimatableObject, Change, Cancel } from "../../../animation/Animatable/index.js";
import { ImageFit } from "../../types/BackgroundImage.js";
import { DeprecatedVisualProperties } from "../../style/collectVisualStyleFromProps.js";
import { DeprecatedTransformProperties } from "../../traits/Transform.js";
import type { MotionStyle } from "framer-motion";
/** @internal */
export declare function cssBackgroundSize(size: ImageFit | undefined): "contain" | "cover" | "100% 100%";
/** @public */
export interface DeprecatedFrameProperties extends ConstraintProperties, DeprecatedTransformProperties, DeprecatedVisualProperties {
    /**
     * Determines whether the Frame is current visible. Set to `true` by default.
     * @remarks
     * ```jsx
     * function App() {
     *   return <Frame visible={false} />
     * }
     * ```
     */
    visible: boolean;
    /**
     * An optional name for the Frame.
     * @remarks
     * ```jsx
     * function App() {
     *   return <Frame name="MyFrame" />
     * }
     * ```
     */
    name?: string;
    /**
     * Set to `true` to enable backface-visibility.
     * @remarks
     * ```jsx
     * function App() {
     *   return <Frame backfaceVisibility={true} />
     * }
     * ```
     */
    backfaceVisible?: boolean | Animatable<boolean>;
    /**
     * Set the perspective on the z-plane.
     * @remarks
     * ```jsx
     * function App() {
     *   return <Frame perspective={100px} />
     * }
     * ```
     */
    perspective?: number | Animatable<number>;
    /**
     * Set to `true` to preserve 3D.
     * @remarks
     * ```jsx
     * function App() {
     *   return <Frame preserve3d={true} />
     * }
     * ```
     */
    preserve3d?: boolean | Animatable<boolean>;
    /**
     * A border width for the frame. Can be either a single number for all sides or
     * an object describing each side. Set to `0` by default.
     * @remarks
     * ```jsx
     * function App() {
     *   return <Frame borderWidth={{top: 10, bottom: 10}} />
     * }
     * ```
     */
    borderWidth: number | Partial<{
        top: number;
        bottom: number;
        left: number;
        right: number;
    }>;
    /**
     * A border color for the Frame. Set to `"#222"` by default.
     * @remarks
     * ```jsx
     * function App() {
     *   return <Frame borderColor="red" />
     * }
     * ```
     */
    borderColor: string;
    /**
     * A border style for the Frame. One of `"solid", "dashed", "dotted"` or `"double"`. Set to `"solid"` by default.
     * @remarks
     * ```jsx
     * function App() {
     *   return <Frame borderStyle="dotted" />
     * }
     * ```
     */
    borderStyle: BorderStyle;
    /**
     * Additional CSSProperties to apply to the frame. Usage is exactly the same as with the
     * standard React style prop.
     * @remarks
     * ```jsx
     * function App() {
     *   return <Frame style={{color: "red", backgroundColor: "blue"}} />
     * }
     * ```
     */
    style?: React.CSSProperties;
    /**
     * An optional className for the Frame.
     * @remarks
     * ```jsx
     * function App() {
     *   return <Frame className="my-frame" />
     * }
     * ```
     */
    className?: string;
    /** @internal */
    _overrideForwardingDescription?: {
        [key: string]: string;
    };
    /** @internal */
    _initialStyle?: Partial<MotionStyle>;
}
interface DeprecatedFrameState {
    size: AnimatableObject<Size> | Size | null;
}
/** @public */
export interface DeprecatedCoreFrameProps extends DeprecatedFrameProperties, LayerProps {
}
/**
 * @public
 */
export declare class DeprecatedFrame extends Layer<DeprecatedCoreFrameProps, DeprecatedFrameState> {
    static supportsConstraints: boolean;
    static defaultFrameSpecificProps: DeprecatedFrameProperties;
    static readonly defaultProps: DeprecatedCoreFrameProps;
    static rect(props: Partial<ConstraintProperties>): Rect;
    get rect(): Rect;
    element: HTMLDivElement | null;
    imageDidChange: boolean;
    state: DeprecatedFrameState;
    static getDerivedStateFromProps(nextProps: Partial<DeprecatedCoreFrameProps>, prevState: DeprecatedFrameState): DeprecatedFrameState | null;
    static updatedSize(props: Partial<DeprecatedCoreFrameProps>, state: DeprecatedFrameState): AnimatableObject<Size> | Size;
    getStyle(): React.CSSProperties;
    private updateStyle;
    private setElement;
    propsObserver: AnimatableObject<DeprecatedCoreFrameProps>;
    propsObserverCancel?: Cancel;
    sizeObserver: AnimatableObject<Size>;
    sizeObserverCancel?: Cancel;
    componentDidMount(): void;
    componentDidUpdate(): void;
    protected onPropsChange: (props: Change<AnimatableObject<DeprecatedCoreFrameProps>>) => void;
    protected onSizeChange: () => void;
    componentWillUnmount(): void;
    render(): JSX.Element | null;
    layoutChildren(): (React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.FunctionComponentElement<{
        _forwardedOverrides: {
            [key: string]: any;
        };
    }>)[] | null | undefined;
}
export declare const Center: React.SFC<{
    style?: React.CSSProperties;
}>;
export {};
//# sourceMappingURL=DeprecatedFrame.d.ts.map