export interface CurveOptions {
    tension: number;
    friction: number;
    velocity: number;
}
export declare namespace SpringCurveValueConverter {
    function computeDampingRatio(tension: number, friction: number, mass?: number): number;
    function computeDuration(tension: number, friction: number, velocity?: number, mass?: number): number | null;
    function computeDerivedCurveOptions(dampingRatio: number, duration: number, velocity?: number, mass?: number): CurveOptions;
}
//# sourceMappingURL=SpringCurveValueConverter.d.ts.map