import type { NumberControlDescription, EnumControlDescription, BooleanControlDescription, StringControlDescription, ColorControlDescription, FusedNumberControlDescription, SegmentedEnumControlDescription, ImageControlDescription, FileControlDescription, ComponentInstanceDescription, TransitionControlDescription } from "./PropertyControls.js";
/** @internal */
export declare type ActionControlDescription<P = any> = NumberControlDescription<P> | EnumControlDescription<P> | BooleanControlDescription<P> | StringControlDescription<P> | ColorControlDescription<P> | FusedNumberControlDescription<P> | SegmentedEnumControlDescription<P> | ImageControlDescription<P> | FileControlDescription<P> | ComponentInstanceDescription<P> | TransitionControlDescription<P>;
/** @internal */
export declare type ActionControls<ActionProps = any> = {
    [K in keyof ActionProps]?: ActionControlDescription<Partial<ActionProps>>;
};
/** @internal */
export declare type ActionHandler = (...args: any[]) => void;
/**
 * Action hooks are picked up by Framer
 * @param options - object containing action options
 * @returns event handler
 * @internal
 */
export declare type Action<Options extends {
    [key: string]: any;
} = {}> = (options: Options) => ActionHandler;
//# sourceMappingURL=Action.d.ts.map