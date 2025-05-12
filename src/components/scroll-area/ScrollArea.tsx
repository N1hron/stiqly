import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useResizeObserver } from '@hooks';

import styles from './style.module.scss';

type ScrollAreaProps = {
  children?: React.ReactNode;
  thumbSize?: 'small' | 'medium' | 'large';
} & React.ComponentPropsWithRef<'div'>;

function ScrollArea({
  children,
  className,
  thumbSize = 'small',
  ...props
}: ScrollAreaProps) {
  const [showThumb, setShowThumb] = useState(false);
  const [thumbPressed, setThumbPressed] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const cn = clsx(styles.scrollArea, className);
  const thumbCn = clsx(
    styles.thumb,
    styles[thumbSize],
    thumbPressed && styles.pressed
  );

  useResizeObserver([contentRef, wrapperRef], () => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    const track = trackRef.current;
    if (!(wrapper && content && track)) return;

    track.style.setProperty(
      '--preffered-thumb-height',
      `${(wrapper.offsetHeight / wrapper.scrollHeight) * 100}%`
    );

    setShowThumb(content.offsetHeight > wrapper.offsetHeight);
  });

  function handleScroll() {
    if (thumbPressed) return;

    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;

    if (!(wrapper && track && thumb)) return;

    const scrollPath = wrapper.scrollHeight - wrapper.offsetHeight;
    const thumbScrollPath = track.offsetHeight - thumb.offsetHeight;
    const thumbTop = (wrapper.scrollTop / scrollPath) * thumbScrollPath;

    thumb.style.top = thumbTop + 'px';
  }

  function handleThumbMouseDown(event: React.MouseEvent) {
    const thumb = thumbRef.current;
    const wrapper = wrapperRef.current;
    const track = trackRef.current;

    if (!(wrapper && track && thumb)) return;

    const thumbRect = thumb.getBoundingClientRect();
    const thumbClickOffset = event.clientY - thumbRect.top;

    const handleMouseMove = (event: MouseEvent) => {
      const trackRect = track.getBoundingClientRect();
      const wrapperScrollPath = wrapper.scrollHeight - wrapper.offsetHeight;
      const maxThumbTop = track.offsetHeight - thumb.offsetHeight;
      const thumbTop = Math.min(
        maxThumbTop,
        Math.max(event.clientY - trackRect.top - thumbClickOffset, 0)
      );

      thumb.style.top = thumbTop + 'px';
      wrapper.scrollTop = wrapperScrollPath * (thumbTop / maxThumbTop);
    };

    const controller = new AbortController();
    const signal = controller.signal;

    const handleThumbRelease = () => {
      setThumbPressed(false);
      controller.abort();
    };

    setThumbPressed(true);

    window.addEventListener('mousemove', handleMouseMove, {
      signal,
    });
    window.addEventListener('mouseup', handleThumbRelease, { signal });
    window.addEventListener('blur', handleThumbRelease, { signal });
  }

  return (
    <div className={cn} {...props}>
      <div
        className={styles.contentWrapper}
        ref={wrapperRef}
        onScroll={handleScroll}
      >
        <div className={styles.content} ref={contentRef}>
          {children}
        </div>
      </div>
      <div className={styles.track} ref={trackRef}>
        {showThumb && (
          <div
            className={thumbCn}
            ref={thumbRef}
            onMouseDown={handleThumbMouseDown}
          ></div>
        )}
      </div>
    </div>
  );
}

export { ScrollArea };
