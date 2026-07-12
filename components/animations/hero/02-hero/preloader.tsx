"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import styles from "./hero.module.css";

const css = styles as unknown as Record<string, string>;

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface PetPreloaderProps {
  isReady: boolean;
  onComplete: () => void;
}

const GRID_COLUMNS = 22;
const GRID_ROWS = 13;
const TOTAL_CELLS = GRID_COLUMNS * GRID_ROWS;

const CELL_COLORS = [
  "#d7f500",
  "#d2ef00",
  "#ddf80b",
  "#cce900",
  "#e0fa19",
];

export function PetPreloader({
  isReady,
  onComplete,
}: PetPreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const sequenceStartedRef = useRef(false);
  const exitStartedRef = useRef(false);
  const previousOverflowRef = useRef("");

  const progressRef = useRef({
    value: 0,
  });

  const [sequenceFinished, setSequenceFinished] =
    useState(false);

  const cells = useMemo(
    () =>
      Array.from(
        {
          length: TOTAL_CELLS,
        },
        (_, index) => ({
          id: index,
          color:
            CELL_COLORS[
              (index * 7 + (index % 3)) %
                CELL_COLORS.length
            ],
        }),
      ),
    [],
  );

  useEffect(() => {
    previousOverflowRef.current =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflowRef.current;
    };
  }, []);

  const restoreScroll = () => {
    document.body.style.overflow =
      previousOverflowRef.current;
  };

  /*
   * Loader fill sequence.
   */
  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root || sequenceStartedRef.current) {
        return;
      }

      sequenceStartedRef.current = true;

      const select = gsap.utils.selector(root);

      const cells = select("[data-loader-cell]");
      const interfaceElement = select(
        "[data-loader-interface]",
      );
      const logo = select("[data-loader-logo]");

      gsap.set(cells, {
  scaleX: 0,
  scaleY: 1,
  transformOrigin: (index: number) =>
    index % 2 === 0
      ? "left center"
      : "right center",
});

gsap.set(interfaceElement, {
  autoAlpha: 0,
  y: 12,
});

gsap.set(logo, {
  autoAlpha: 0,
  scale: 0.75,
});

const timeline = gsap.timeline({
  onComplete: () => {
    setSequenceFinished(true);
  },
});

timeline
  .set(root, {
    backgroundColor: "#050505",
  })
  .to(root, {
    backgroundColor: "#d6d6d0",
    duration: 0.65,
    ease: "power2.inOut",
  })
  .to(
    interfaceElement,
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.42,
      ease: "power3.out",
    },
    "-=0.12",
  )
  .to(progressRef.current, {
    value: 100,
    duration: 2.25,
    ease: "none",
    onUpdate: () => {
      if (!counterRef.current) {
        return;
      }

      counterRef.current.textContent = `${Math.round(
        progressRef.current.value,
      )}%`;
    },
  })
  .to(
    cells,
    {
      scaleX: 1,
      duration: 0.2,
      ease: "power2.out",
      stagger: {
        each: 0.0065,
        from: "random",
      },
    },
    "<",
  )
  .to(interfaceElement, {
    autoAlpha: 0,
    y: -10,
    duration: 0.28,
    ease: "power2.in",
  })
  .to(
    logo,
    {
      autoAlpha: 1,
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.6)",
    },
    "-=0.05",
  );



      return () => {
        timeline.kill();
      };
    },
    {
      scope: rootRef,
    },
  );


  useGSAP(
    () => {
      const root = rootRef.current;

      if (
        !root ||
        !sequenceFinished ||
        !isReady ||
        exitStartedRef.current
      ) {
        return;
      }

      exitStartedRef.current = true;

      const select = gsap.utils.selector(root);

      const cells = select("[data-loader-cell]");
      const logo = select("[data-loader-logo]");

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        restoreScroll();
        onComplete();
        return;
      }

      const timeline = gsap.timeline({
        onComplete: () => {
          restoreScroll();
          onComplete();
        },
      });

      timeline
        .to(logo, {
          autoAlpha: 0,
          scale: 0.8,
          duration: 0.2,
          ease: "power2.in",
        })
        .set(root, {
          backgroundColor: "transparent",
        })
        .to(cells, {
          scaleX: 0,

          duration: () =>
            gsap.utils.random(0.18, 0.42),

          transformOrigin: () =>
            Math.random() > 0.5
              ? "left center"
              : "right center",

          ease: "power3.inOut",

          stagger: {
            each: 0.0018,
            from: "random",
          },
        });

      return () => {
        timeline.kill();
      };
    },
    {
      scope: rootRef,
      dependencies: [
        sequenceFinished,
        isReady,
        onComplete,
      ],
    },
  );

  return (
    <div
      ref={rootRef}
      className={css.preloader}
      role="status"
      aria-label="Loading website"
      aria-live="polite"
      aria-busy
    >
      <div
        className={css.loaderGrid}
        aria-hidden="true"
        style={{
          gridTemplateColumns: `repeat(${GRID_COLUMNS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${GRID_ROWS}, minmax(0, 1fr))`,
        }}
      >
        {cells.map((cell) => (
          <span
            key={cell.id}
            data-loader-cell
            className={css.loaderCell}
            style={{
              backgroundColor: cell.color,
            }}
          />
        ))}
      </div>

      <div
        data-loader-interface
        className={css.loaderInterface}
      >
        <div className={css.loaderInterfaceInner}>
          <div className={css.loaderCounterBox}>
            <span
              ref={counterRef}
              className={css.loaderCounter}
            >
              0%
            </span>
          </div>

          {/* <div className={css.loaderLongBlock} />

          <div className={css.loaderSmallBlock} /> */}
        </div>
      </div>

      <div
        data-loader-logo
        className={css.loaderLogoWrapper}
      >
        <div
          className={`${css.loaderLogo} ${css.displayFont}`}
        >
          P
        </div>
      </div>
    </div>
  );
}