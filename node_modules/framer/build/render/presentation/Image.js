import * as React from "react";
import { BackgroundImageComponent } from "../style/BackgroundImageComponent.js";
import { motion } from "framer-motion";
/** @public */
export const Image = React.forwardRef(function Image(props, ref) {
    const { background, children, alt, ...rest } = props;
    const style = { ...rest.style };
    if (background) {
        // Remove existing `background` props from style, when we are rendering a background asset.
        // This ensures that the background prop can be properly reset when removing the background-image.
        delete style.background;
    }
    const MotionComponent = motion[props.as ?? "div"];
    return (React.createElement(MotionComponent, { ...rest, style: style, ref: ref },
        background && background.src ? React.createElement(BackgroundImageComponent, { image: background, alt: alt }) : null,
        children));
});
//# sourceMappingURL=Image.js.map