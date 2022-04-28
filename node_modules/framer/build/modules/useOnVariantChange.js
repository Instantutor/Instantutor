// rules-of-hooks is disabled for this file so that we avoid calling pointless
// useEffects on the framer canvas.
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import { useIsOnFramerCanvas } from "./useIsOnFramerCanvas.js";
import { useOnCurrentTargetChange } from "../components/NavigationTargetContext.js";
function callbackForVariant(map, variant) {
    if (map[variant])
        return map[variant];
    if (variant in map)
        return undefined;
    return map.default;
}
/**
 * Executes a callback when the base variant changes. Events will not be
 * executed on the Framer canvas.
 *
 * @public
 */
export function useOnVariantChange(variant, callbackMap) {
    const isOnFramerCanvas = useIsOnFramerCanvas();
    if (isOnFramerCanvas)
        return;
    const isActiveScreenRef = React.useRef(true);
    useOnCurrentTargetChange((isCurrent, isOverlayed) => {
        const isActiveScreen = isCurrent && !isOverlayed;
        if (!isActiveScreenRef.current && isActiveScreen) {
            const callback = callbackForVariant(callbackMap, variant);
            if (callback)
                callback();
        }
        isActiveScreenRef.current = isActiveScreen;
    }, [callbackMap]);
    React.useEffect(() => {
        if (isActiveScreenRef.current) {
            const callback = callbackForVariant(callbackMap, variant);
            if (callback)
                callback();
        }
    }, [variant, callbackMap]);
}
/**
 * A simplified version of useOnVariantChange, that takes a single callback,
 * cancelling it only if the navigation target changes.
 *
 * @internal
 */
export function useOnAppear(callback) {
    useOnVariantChange("default", { default: callback });
}
//# sourceMappingURL=useOnVariantChange.js.map