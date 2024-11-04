import {useState} from 'react';

export type ScrollDirection = (scrollEntry?: IntersectionObserverEntry) => boolean;

const useScrollDirection = (): ScrollDirection => {
    const [previousPosition, setPreviousPosition] = useState<number>(0);

    return (scrollEntry?: IntersectionObserverEntry): boolean => {
        let result = true;

        if (scrollEntry) {
            const currentY = scrollEntry.boundingClientRect.y;
            const isIntersecting = scrollEntry.isIntersecting;

            if (currentY > previousPosition && isIntersecting) {
                result = false;
            }

            setPreviousPosition(currentY);
        }

        return result;
    };
};

export default useScrollDirection;
