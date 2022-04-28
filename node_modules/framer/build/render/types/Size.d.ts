/**
 * @public
 */
interface Size {
    width: number;
    height: number;
}
/**
 * @public
 */
declare function Size(width: number, height: number): Size;
/**
 * @public
 */
declare namespace Size {
    /**
     * @param sizeA -
     * @param sizeB -
     * @alpha
     */
    const equals: (sizeA: Size | null, sizeB: Size | null) => boolean;
    /**
     *
     * @param fromSize - The initial size
     * @param toSize - The size to update to
     * @param keepAspectRatio - If the updating should preserve the aspect ratio
     * @remarks
     * keepAspectRatio only works if passing a toSize with only a width or height
     * @alpha
     */
    const update: (fromSize: Size, toSize: Partial<Size>, keepAspectRatio?: boolean) => {
        width: number;
        height: number;
    };
    /**
     *
     * @param sizeA -
     * @param sizeB -
     * @alpha
     */
    function subtract(sizeA: Size, sizeB: Size): {
        width: number;
        height: number;
    };
    /**
     * @public
     */
    const zero: Size;
    /**
     * Checks if the size has a zero width and zero height
     * @param size - size to check
     * @public
     */
    const isZero: (size: Size) => boolean;
    /**
     * @param width -
     * @param height -
     * @param size -
     * @alpha
     */
    const defaultIfZero: (width: number, height: number, size: Size) => Size;
}
export { Size };
//# sourceMappingURL=Size.d.ts.map