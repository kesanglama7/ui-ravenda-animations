"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface HeroProps {
  isReady: boolean;
}

const PERSON_NAME = "ui.ravenda";

export default function Hero({ isReady }: HeroProps) {
  const screenRef = useRef<HTMLDivElement>(null);
  const typingTextRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const screen = screenRef.current;
      const typingText = typingTextRef.current;
      const cursor = cursorRef.current;

      if (!screen || !typingText || !cursor) {
        return;
      }

      typingText.textContent = "";

      gsap.set(screen, {
        autoAlpha: 1,
      });

      gsap.set(typingText, {
        autoAlpha: 1,
      });

      gsap.set(cursor, {
        autoAlpha: 1,
      });

      if (!isReady) {
        return;
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        typingText.textContent = PERSON_NAME;
        return;
      }

      const cursorTween = gsap.to(cursor, {
        autoAlpha: 0,
        duration: 0.45,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });

      const typingTimeline = gsap.timeline();

      for (let index = 1; index <= PERSON_NAME.length; index += 1) {
        typingTimeline.call(() => {
          typingText.textContent = PERSON_NAME.slice(0, index);
        });

        typingTimeline.to({}, {
          duration: 0.09,
        });
      }

      return () => {
        typingTimeline.kill();
        cursorTween.kill();
      };
    },
    {
      scope: screenRef,
      dependencies: [isReady],
      revertOnUpdate: true,
    },
  );

  return (
    <section
      id="home"
      ref={screenRef}
      className="flex h-[100svh] w-full items-center justify-center overflow-hidden bg-white text-black"
    >
      <div className="flex items-center whitespace-nowrap">
        <h1
          ref={typingTextRef}
          aria-label={PERSON_NAME}
          className="font-manrope text-5xl font-bold leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        />

        <span
          ref={cursorRef}
          aria-hidden="true"
          className="ml-2 inline-block h-[3em] sm:h-[4.5em] w-[3px] bg-neutral-500 md:w-[4px]"
        />
      </div>
    </section>
  );
}