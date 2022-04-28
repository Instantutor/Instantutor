import * as React from "react";
export interface Props {
    children: React.ReactNode;
    size: {
        width?: string | number;
        height?: string | number;
    };
    title?: string;
    description?: string;
    hide?: boolean;
    insideUserCodeComponent?: boolean;
}
/** @internal */
export declare function EmptyState({ title, description, children, size, hide, insideUserCodeComponent, }: Props): JSX.Element | null;
//# sourceMappingURL=EmptyState.d.ts.map