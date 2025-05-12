import { RefObject, useEffect } from 'react';

function useResizeObserver<T extends RefObject<Element | null>>(
  elementRef: T | T[],
  callback: () => void
) {
  useEffect(() => {
    const resizeObserver = new ResizeObserver(callback);
    const elements: Element[] = [];

    if (Array.isArray(elementRef)) {
      elementRef.forEach((ref) => {
        const element = ref.current;
        if (element) {
          elements.push(element);
        }
      });
    } else {
      const element = elementRef.current;
      if (element) {
        elements.push(element);
      }
    }

    elements.forEach((element) => {
      resizeObserver.observe(element, { box: 'border-box' });
    });

    return () => {
      elements.forEach((element) => {
        resizeObserver.unobserve(element);
      });
    };
  }, []);
}

export { useResizeObserver };
