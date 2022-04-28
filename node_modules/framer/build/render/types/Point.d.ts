/**
 * @public
 */
interface Point {
    x: number;
    y: number;
}
/**
 * @public
 */
declare function Point(x: number, y: number): Point;
/**
 * @public
 */
declare namespace Point {
    /** @alpha */
    const add: (...args: Point[]) => Point;
    /** @alpha */
    const subtract: (a: Point, b: Point) => Point;
    /** @alpha */
    const multiply: (a: Point, b: number) => Point;
    /** @alpha */
    const divide: (a: Point, b: number) => Point;
    /** @alpha */
    const absolute: (point: Point) => Point;
    /** @internal */
    const reverse: (point: Point) => Point;
    /** @internal */
    const pixelAligned: (point: Point, offset?: Point) => Point;
    /** @alpha */
    const distance: (a: Point, b: Point) => number;
    /** @alpha */
    const angle: (a: Point, b: Point) => number;
    /** @public */
    const isEqual: (a: Point, b: Point) => boolean;
    /** @internal */
    const rotationNormalizer: () => (value: number) => number;
    /** @alpha */
    function center(a: Point, b: Point): {
        x: number;
        y: number;
    };
}
export { Point };
//# sourceMappingURL=Point.d.ts.map