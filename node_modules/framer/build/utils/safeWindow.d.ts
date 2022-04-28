export interface ServerSafeWindow extends EventTarget {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    clearInterval(handle?: number): void;
    clearTimeout(handle?: number): void;
    setInterval(handler: string | Function, timeout?: number, ...args: any[]): number;
    setTimeout(handler: string | Function, timeout?: number, ...args: any[]): number;
    ResizeObserver: undefined;
    onpointerdown: false;
    onpointermove: false;
    onpointerup: false;
    ontouchstart: false;
    ontouchmove: false;
    ontouchend: false;
    onmousedown: false;
    onmousemove: false;
    onmouseup: false;
    scrollX: 0;
    scrollY: 0;
    devicePixelRatio: 1;
    location: {
        href: "";
    };
}
/**
 * Creates a server-safe reference to `window`, returning a mock if none is available.
 *
 * @internal
 */
export declare const safeWindow: (Window & typeof globalThis) | ServerSafeWindow;
//# sourceMappingURL=safeWindow.d.ts.map