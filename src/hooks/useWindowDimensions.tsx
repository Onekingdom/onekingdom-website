"use client";

import { useState, useEffect } from "react";

// Custom hook for getting window dimensions
function useWindowDimensions() {
  const hasWindow = typeof window !== "undefined";

  // Initialize state with undefined width/height so server and client renders match
  // This avoids hydration issues
  const [windowDimensions, setWindowDimensions] = useState({
    width: hasWindow ? window.innerWidth : undefined,
    height: hasWindow ? window.innerHeight : undefined,
  });

  useEffect(() => {
    if (!hasWindow) {
      return;
    }

    // console.log(window.innerWidth, window.innerHeight);
    function handleResize() {
      // Set window width and height to state
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [hasWindow]); // Empty array ensures that effect is only run on mount and unmount

  return windowDimensions;
}

export default useWindowDimensions;
