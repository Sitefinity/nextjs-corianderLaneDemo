'use client';

import { useEffect, useRef } from 'react';

export function useClickBoundaryDetector<T>({ insideClickHandler, outsideClickHandler }: ClickBoundaryDetectorParams) {
    const domNode = useRef<T>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (domNode.current && domNode.current && (domNode.current as any).contains(event.target as HTMLElement)) {
                safeExec(insideClickHandler);
            } else {
                safeExec(outsideClickHandler);
            }
        };

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    });

    return domNode;
}

function safeExec(callback: (() => void) | undefined): void {
    if (callback) {
        callback();
    }
}

type ClickBoundaryDetectorParams = {
    insideClickHandler?: () => void;
    outsideClickHandler?: () => void;
};
