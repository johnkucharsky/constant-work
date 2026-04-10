import { useEffect, useRef, useState } from "react";

export const useTextOverflow = () => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const checkOverflow = () => {
      setIsOverflowed(el.scrollWidth > el.clientWidth);
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, []);

  const getTooltipTitle = (text: string) => (isOverflowed ? text : "");

  return [textRef, getTooltipTitle] as const;
};
