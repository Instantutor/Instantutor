import type { PageContentDimension, PageAlignment } from "./types.js";
import * as React from "react";
import type { MotionValue, PanInfo } from "framer-motion";
interface PageContainerProps {
    effect: {
        [key: string]: MotionValue;
    } | undefined;
    children?: React.ReactNode;
    dragEnabled: boolean;
    direction: "horizontal" | "vertical";
    contentWidth: PageContentDimension | number;
    contentHeight: PageContentDimension | number;
    alignment?: PageAlignment;
    gap: number;
    isLastPage: boolean;
    contentOffsetRef: React.MutableRefObject<{
        x: MotionValue<number>;
        y: MotionValue<number>;
    }>;
    constraintsRef: React.MutableRefObject<{
        top: number;
        left: number;
        right: number;
        bottom: number;
    }>;
    directionLock: boolean | undefined;
    layoutId: string | undefined;
    onDragStart: (event: MouseEvent | TouchEvent, info: PanInfo) => void;
    onDrag: (event: MouseEvent | TouchEvent, info: PanInfo) => void;
    onDragEnd: (event: MouseEvent | TouchEvent, info: PanInfo) => void;
}
export declare const pageContentWrapperType = "PageContentWrapper";
export declare function PageContainer({ children, effect, dragEnabled, direction, contentHeight, contentWidth, alignment, gap, isLastPage, contentOffsetRef, constraintsRef, directionLock, onDragStart, onDrag, onDragEnd, layoutId, }: PageContainerProps): JSX.Element;
export {};
//# sourceMappingURL=PageContainer.d.ts.map