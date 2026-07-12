"use client";

import { useCallback, useMemo, useState } from "react";

import { PetGridImages } from "./assets";
import { PetHero } from "./hero";
import { PetPreloader } from "./preloader";
import { useHeroImageReady } from "./use-hero-image-ready";

export function Hero02() {
  const centerImageSource = useMemo(() => {
    return (
      PetGridImages.find((image) => image.isMain)?.src ?? ""
    );
  }, []);

  const isHeroImageReady =
    useHeroImageReady(centerImageSource);

  const [isPreloaderVisible, setIsPreloaderVisible] =
    useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setIsPreloaderVisible(false);
  }, []);

  return (
    <>
      <PetHero />

      {isPreloaderVisible && (
        <PetPreloader
          isReady={isHeroImageReady}
          onComplete={handlePreloaderComplete}
        />
      )}
    </>
  );
}