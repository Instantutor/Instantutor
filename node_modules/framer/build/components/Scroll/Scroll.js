import * as React from "react";
import { ControlType } from "../../render/types/PropertyControls.js";
import { addPropertyControls } from "../../utils/addPropertyControls.js";
import { EmulatedScroll } from "./EmulatedScroll.js";
import { NativeScroll } from "./NativeScroll.js";
/**
 * @public
 */
export const Scroll = React.forwardRef(function Scroll(props, forwardedRef) {
    if (props.native) {
        return React.createElement(NativeScroll, { ref: forwardedRef, ...props });
    }
    else {
        return React.createElement(EmulatedScroll, { ref: forwardedRef, ...props });
    }
});
addPropertyControls(Scroll, {
    native: {
        type: ControlType.Boolean,
        defaultValue: false,
    },
    direction: {
        type: ControlType.SegmentedEnum,
        title: "Direction",
        options: ["vertical", "horizontal", "both"],
        defaultValue: "vertical",
    },
    contentOffsetX: {
        type: ControlType.Number,
        title: "Offset X",
        defaultValue: 0,
        min: 0,
        step: 10,
        displayStepper: true,
        hidden: ({ direction }) => direction === "vertical",
    },
    contentOffsetY: {
        type: ControlType.Number,
        title: "Offset Y",
        defaultValue: 0,
        min: 0,
        step: 10,
        displayStepper: true,
        hidden: ({ direction }) => direction === "horizontal",
    },
    directionLock: {
        type: ControlType.Boolean,
        title: "Lock",
        enabledTitle: "1 Axis",
        disabledTitle: "Off",
        defaultValue: true,
        hidden: ({ native }) => native === true,
    },
    dragEnabled: {
        type: ControlType.Boolean,
        title: "Drag",
        enabledTitle: "On",
        disabledTitle: "Off",
        defaultValue: true,
    },
    overdragEnabled: {
        type: ControlType.Boolean,
        title: "Overdrag",
        enabledTitle: "On",
        disabledTitle: "Off",
        defaultValue: true,
        hidden: ({ native }) => native === true,
    },
    wheelEnabled: {
        type: ControlType.Boolean,
        title: "Wheel",
        enabledTitle: "On",
        disabledTitle: "Off",
        defaultValue: true,
        hidden: ({ native }) => native === true,
    },
    scrollBarVisible: {
        type: ControlType.Boolean,
        title: "Scroll Bar",
        enabledTitle: "Visible",
        disabledTitle: "Hidden",
        defaultValue: false,
        hidden: ({ native }) => native === false,
    },
    resetOffset: {
        type: ControlType.Boolean,
        title: "Reset",
        enabledTitle: "True",
        disabledTitle: "False",
        defaultValue: false,
    },
});
Scroll.supportsConstraints = true;
//# sourceMappingURL=Scroll.js.map