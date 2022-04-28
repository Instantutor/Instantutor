import process from "process";
import * as React from "react";
import { transformString } from "../utils/transformString.js";
import { Layer } from "./Layer.js";
import { SVGRoot } from "./SVGRoot.js";
import { transformValues } from "../utils/createTransformValues.js";
import { RenderTarget } from "../types/RenderEnvironment.js";
import { RenderEnvironment } from "../types/RenderEnvironment.js";
import { safeWindow } from "../../utils/safeWindow.js";
/**
 * @internal
 */
export class VectorGroup extends Layer {
    static defaultVectorGroupProps = {
        name: undefined,
        opacity: undefined,
        visible: true,
        x: 0,
        y: 0,
        rotation: 0,
        width: 100,
        height: 100,
        targetName: undefined,
        defaultName: "",
        isRootVectorNode: false,
        includeTransform: undefined,
        frame: { x: 0, y: 0, width: 100, height: 100 },
    };
    static defaultProps = {
        ...Layer.defaultProps,
        ...VectorGroup.defaultVectorGroupProps,
    };
    render() {
        if (process.env.NODE_ENV !== "production" && safeWindow["perf"])
            safeWindow["perf"].nodeRender();
        const { id, name: nameProp, opacity, visible, targetName, defaultName, children, includeTransform, x, y, width, height, rotation, isRootVectorNode, } = this.props;
        if (!visible)
            return null;
        const { target } = RenderEnvironment;
        const rect = { x, y, width, height };
        const transform = transformValues(rect, rotation, isRootVectorNode, includeTransform);
        const addNames = target === RenderTarget.preview;
        let name = undefined;
        if (addNames) {
            if (targetName) {
                name = targetName;
            }
            else if (nameProp) {
                name = nameProp;
            }
            else {
                name = defaultName;
            }
        }
        return this.renderElement(React.createElement("g", { transform: transformString(transform), ...{ id, name, opacity } }, children));
    }
    renderElement(element) {
        const { isRootVectorNode, width, height, frame, willChangeTransform } = this.props;
        if (!isRootVectorNode)
            return element;
        return (React.createElement(SVGRoot, { frame: frame, width: width, height: height, willChangeTransform: willChangeTransform, innerRef: this.setLayerElement }, element));
    }
}
//# sourceMappingURL=VectorGroup.js.map