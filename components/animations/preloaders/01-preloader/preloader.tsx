"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface PreloaderProps {
  onComplete: () => void;
}

const SHUTTER_WORDS = [
    "Hello",
    "Bonjour",
    "Olà",
    "やあ",
    "Halo",
    "Salam",
    "नमस्ते",
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const morphingBlockRef = useRef<HTMLDivElement>(null);
  const shutterContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const morphingBlock = morphingBlockRef.current;
      const shutterContainer = shutterContainerRef.current;

      if (!container || !morphingBlock || !shutterContainer) {
        onComplete();
        return;
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(container, { display: "none" });
        onComplete();
        return;
      }

      const words = Array.from(shutterContainer.children);

      gsap.set(morphingBlock, {
        scaleX: 0,
        height: 2,
        opacity: 1,
      });

      gsap.set(words, {
        autoAlpha: 0,
        display: "none",
      });

      const timeline = gsap.timeline({
        onComplete,
      });

      timeline
        .to(morphingBlock, {
          scaleX: 1,
          duration: 0.7,
          ease: "power3.inOut",
        })

        // Turn the line into a banner
        .to(morphingBlock, {
          height: 140,
          duration: 0.4,
          ease: "power2.out",
        });

      // Rapid greeting animation
      words.forEach((word) => {
        timeline
          .set(word, {
            display: "block",
          })
          .to(word, {
            autoAlpha: 1,
            duration: 0.08,
            ease: "none",
          })
          .to(word, {
            autoAlpha: 0,
            duration: 0.08,
            ease: "none",
          })
          .set(word, {
            display: "none",
          });
      });

      timeline
        // Expand the white banner to cover the viewport
        .to(
          morphingBlock,
          {
            height: "100vh",
            duration: 0.65,
            ease: "power4.inOut",
          },
          "-=0.03",
        )

        // Brief clean white-screen pause
        .to({}, { duration: 0.15 })

        // Reveal the Hero section underneath
        .to(container, {
          autoAlpha: 0,
          duration: 0.55,
          ease: "power2.inOut",
        })

        // Remove the preloader from interaction/layout
        .set(container, {
          display: "none",
          pointerEvents: "none",
        });

      return () => {
        timeline.kill();
      };
    },
    {
      scope: containerRef,
      dependencies: [onComplete],
      revertOnUpdate: true,
    },
  );

  return (
    <div
      ref={containerRef}
      role="status"
      aria-label="Loading website"
      className="fixed inset-0 z-[9999] flex touch-none select-none items-center justify-center overflow-hidden bg-black"
    >
      <div
        ref={morphingBlockRef}
        className="relative flex h-[2px] w-full origin-center scale-x-0 items-center justify-center overflow-hidden bg-white opacity-0"
      >
        <div
          ref={shutterContainerRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          {SHUTTER_WORDS.map((word) => (
            <span
              key={word}
              className="hidden text-4xl font-manrope font-medium tracking-tight text-black opacity-0 md:text-6xl"
            >  
                <span className="rounded-full h-4 w-4 bg-black inline-block mr-3 mb-2" />
                {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}