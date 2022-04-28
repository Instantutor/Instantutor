import * as React from "react";
// Match the first portion of a CSS variable e.g. var(--token-123)
const VariableRegex = /var\(([^),]+)/;
/**
 * Provides a lookup function `CustomPropertiesLookup` to consumers.
 * @internal
 */
export const CustomPropertiesContext = React.createContext(() => null);
/**
 * Takes a CSS properties map of custom property to value and inserts them into the DOM.
 * Also sets up a CustomPropertiesContext provider to make a lookup function available
 * to all children.
 * @internal
 *
 * @internalremarks
 * This component was at the heart of a serious panning performance issue. Ensure any
 * refactoring never updates `value` every render.
 */
export class CustomProperties extends React.PureComponent {
    lookup = (variable) => {
        const match = VariableRegex.exec(variable);
        const customProperty = match ? match[1].trim() : "";
        return this.props.customProperties[customProperty] || null;
    };
    render() {
        const { children, customProperties } = this.props;
        return (React.createElement(CustomPropertiesContext.Provider, { value: this.lookup },
            React.createElement("div", { style: customProperties }, children)));
    }
}
//# sourceMappingURL=CustomProperties.js.map