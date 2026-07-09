'use client';

import { useCallback, useState } from "react";
import Preloader from "./preloader";
import Hero from "./hero";

export default function Preloader01() {
  const [showPreloader, setShowPreloader] =
    useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  return (
      <main
        className="relative w-full"
      >
        <Hero isReady={!showPreloader} />
        {showPreloader && (
          <Preloader
            onComplete={handlePreloaderComplete}
          />
        )}

      </main>
  );
}