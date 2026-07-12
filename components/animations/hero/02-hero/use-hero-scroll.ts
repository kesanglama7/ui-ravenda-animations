"use client";

import type { RefObject } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
  );
}

interface MediaConditions {
  desktop?: boolean;
  mobile?: boolean;
}

export function useVoltHeroScroll(
  sectionRef: RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      const section =
        sectionRef.current;

      if (!section) {
        return;
      }

      const reducedMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

      if (reducedMotion) {
        return;
      }

      const select =
        gsap.utils.selector(section);

      const heroPanel =
        select(
          "[data-volt-hero-panel]",
        )[0] as HTMLElement | undefined;

      const heroImage =
        select(
          "[data-volt-hero-image]",
        )[0] as HTMLElement | undefined;

      const heroOverlay =
        select(
          "[data-volt-hero-overlay]",
        )[0] as HTMLElement | undefined;

      const mosaicItems =
        select(
          "[data-volt-mosaic-item]",
        ) as HTMLElement[];

      const mosaicImages =
        select(
          "[data-volt-mosaic-image]",
        ) as HTMLElement[];

      const largeLogo =
        select(
          "[data-volt-large-logo-position]",
        )[0] as HTMLElement | undefined;

      const tagline =
        select(
          "[data-volt-tagline]",
        )[0] as HTMLElement | undefined;

      const aboutContainer =
        select(
          "[data-volt-about-container]",
        )[0] as HTMLElement | undefined;

      const aboutText =
        select(
          "[data-volt-about-text]",
        )[0] as HTMLElement ;

      const aboutButton =
        select(
          "[data-volt-about-button]",
        )[0] as HTMLModElement;

      const headerMark =
        select(
          "[data-volt-header-mark]",
        )[0] as HTMLElement 

      const headerWordmark =
        select(
          "[data-volt-header-wordmark]",
        )[0] as HTMLElement ;

      if (
        !heroPanel ||
        !heroImage ||
        !heroOverlay ||
        !largeLogo ||
        !tagline ||
        !aboutContainer
      ) {
        return;
      }

      gsap.set(mosaicItems, {
        scale: 1.06,
      });

      gsap.set(mosaicImages, {
        scale: 1.12,
      });

      gsap.set(aboutContainer, {
        autoAlpha: 0,
        pointerEvents: "none",
      });

      gsap.set(aboutText, {
        autoAlpha: 0,
        y: 60,
      });

      gsap.set(aboutButton, {
        autoAlpha: 0,
        y: 35,
      });

      gsap.set(headerWordmark, {
        autoAlpha: 0,
      });

      const media =
        gsap.matchMedia();

      media.add(
        {
          desktop:
            "(min-width: 768px)",
          mobile:
            "(max-width: 767px)",
        },
        (context) => {
          const conditions =
            context.conditions as MediaConditions;

          const isDesktop =
            Boolean(
              conditions.desktop,
            );

          const timeline =
            gsap.timeline({
              defaults: {
                ease: "none",
              },
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () =>
                  `+=${
                    window.innerHeight *
                    (isDesktop
                      ? 2.6
                      : 1.8)
                  }`,
                scrub: 1,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

          /*
           * Stage one:
           * hero shrinks to approximately 65%.
           */
          timeline.to(
            heroPanel,
            {
              scale: isDesktop
                ? 0.66
                : 0.88,
              duration: 0.55,
              transformOrigin:
                "center center",
            },
            0,
          );

          /*
           * Stage two:
           * independent hero continues shrinking.
           */
          timeline.to(
            heroPanel,
            {
              scale: isDesktop
                ? 0.5
                : 0.8,
              duration: 0.3,
            },
            0.55,
          );

          timeline.to(
            heroImage,
            {
              scale: isDesktop
                ? 1.12
                : 1.06,
              duration: 0.85,
            },
            0,
          );

          timeline.to(
            mosaicItems,
            {
              scale: 1,
              duration: 0.85,
              stagger: {
                each: 0.01,
                from: "random",
              },
            },
            0,
          );

          timeline.to(
            mosaicImages,
            {
              scale: 1,
              duration: 0.9,
              stagger: {
                each: 0.01,
                from: "random",
              },
            },
            0,
          );

          timeline.to(
            heroOverlay,
            {
              backgroundColor:
                "rgba(0, 0, 0, 0.7)",
              duration: 0.72,
            },
            0.05,
          );

          /*
           * Initial tagline exits.
           */
          timeline.to(
            tagline,
            {
              autoAlpha: 0,
              y: 50,
              filter:
                "blur(12px)",
              duration: 0.22,
            },
            0.05,
          );

          /*
           * Large lime logo moves independently.
           */
          timeline.to(
            largeLogo,
            {
              x: () =>
                window.innerWidth *
                (isDesktop
                  ? 0.01
                  : 0),

              y: () =>
                -window.innerHeight *
                (isDesktop
                  ? 0.4
                  : 0.25),

              scale: isDesktop
                ? 0.3
                : 0.52,

              transformOrigin:
                "left bottom",

              duration: 0.58,
            },
            0.03,
          );

          /*
           * Large logo disappears near final layout.
           */
          timeline.to(
            largeLogo,
            {
              autoAlpha: 0,
              duration: 0.15,
            },
            0.67,
          );

          /*
           * About information appears inside
           * the independent foreground panel.
           */
          timeline.to(
            aboutContainer,
            {
              autoAlpha: 1,
              pointerEvents: "auto",
              duration: 0.15,
            },
            0.32,
          );

          timeline.to(
            aboutText,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.28,
              ease: "power3.out",
            },
            0.37,
          );

          timeline.to(
            aboutButton,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.22,
              ease: "power3.out",
            },
            0.52,
          );

          /*
           * Small header mark becomes
           * full white VOLT wordmark.
           */
          timeline.to(
            headerMark,
            {
              autoAlpha: 0,
              duration: 0.12,
            },
            0.68,
          );

          timeline.to(
            headerWordmark,
            {
              autoAlpha: 1,
              duration: 0.16,
            },
            0.72,
          );

          /*
           * Hold final composition.
           */
          timeline.to(
            {},
            {
              duration: 0.22,
            },
          );

          return () => {
            timeline.scrollTrigger?.kill();
            timeline.kill();
          };
        },
      );

      return () => {
        media.revert();
      };
    },
    {
      scope: sectionRef,
    },
  );
}