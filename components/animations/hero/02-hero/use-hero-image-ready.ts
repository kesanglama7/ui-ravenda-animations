"use client";

import { useEffect, useState } from "react";

export function useHeroImageReady(src: string) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!src) {
      setIsReady(true);
      return;
    }

    let active = true;
    let completed = false;

    const image = new window.Image();

    const finish = () => {
      if (!active || completed) {
        return;
      }

      completed = true;
      setIsReady(true);
    };

    image.onload = finish;
    image.onerror = finish;
    image.src = src;

    if (image.complete) {
      finish();
    }

    return () => {
      active = false;
      image.onload = null;
      image.onerror = null;
    };
  }, [src]);

  return isReady;
}