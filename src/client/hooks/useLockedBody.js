import { useEffect, useState } from "react";

function useLockedBody(initialLocked = false) {
  const [isLocked, setIsLocked] = useState(initialLocked);

  // Do the side effect before render
  useEffect(() => {
    if (!isLocked) {
      return;
    }

    // Save initial body style
    const bodyOriginalOverflow = document.body.style.overflow;
    const bodyOriginalPaddingRight = document.body.style.paddingRight;

    // Lock HTML and body scroll
    document.body.style.overflow = "hidden";
 
    // Get the scrollBar width
    const root = document.getElementById("app"); // or root
    const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0;

    // Avoid width reflow
    if (scrollBarWidth) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = bodyOriginalOverflow;

      if (scrollBarWidth) {
        document.body.style.paddingRight = bodyOriginalPaddingRight;
      }
    };
  }, [isLocked]);

  // Update state if initialValue changes
  useEffect(() => {
    if (isLocked !== initialLocked) {
      setIsLocked(initialLocked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLocked]);

  return [isLocked, setIsLocked];
}

export default useLockedBody;
