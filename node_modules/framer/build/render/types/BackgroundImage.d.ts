/** @public */
export declare type ImageFit = "fill" | "fit" | "stretch";
/** @public */
export interface BackgroundImage {
    src: string;
    alt?: string;
    srcSet?: string;
    sizes?: string;
    pixelWidth?: number;
    pixelHeight?: number;
    intrinsicWidth?: number;
    intrinsicHeight?: number;
    fit?: ImageFit;
}
/** @public */
export declare namespace BackgroundImage {
    const isImageObject: (image: any) => image is object & BackgroundImage;
}
//# sourceMappingURL=BackgroundImage.d.ts.map