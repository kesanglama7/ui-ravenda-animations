"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const PROFILE_TITLE = "PROFILE";

const profileRows = [
  {
    label: "Name",
    value: "Kesang Lama",
  },
  {
    label: "Age",
    value: "25",
  },
  {
    label: "Degree",
    value: "BCA",
    description: "System Architecture & Software Development",
  },
];

const panelStripOrder = [3, 2, 4, 1, 5, 0, 6];

export function ProfileMotion() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const select = gsap.utils.selector(rootRef);
      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { mobile: isMobile, reduceMotion } = context.conditions as {
            desktop: boolean;
            mobile: boolean;
            reduceMotion: boolean;
          };

          const titleWrapper = select(".title-wrapper")[0];
          const titleSpark = select(".title-spark")[0];
          const titleBroken = select(".title-broken")[0];
          const titleFull = select(".title-full")[0];

          const mediaGroup = select(".media-group")[0];
          const mediaFrame = select(".media-frame")[0];
          const portrait = select(".portrait-image")[0];

          const detailsPanel = select(".details-panel")[0];
          const panelFill = select(".panel-fill")[0];
          const panelTexture = select(".panel-texture")[0];
          const panelStrips = select(".panel-strip");
          const informationRows = select(".info-row");

          const finalLayout = isMobile
            ? {
                titleScale: 0.4,
                media: {
                  left: "50%",
                  top: "34%",
                  width: "min(55vw, 38svh)",
                  height: "min(55vw, 38svh)",
                },
                panel: {
                  left: "0%",
                  right: "auto",
                  top: "auto",
                  bottom: "0%",
                  width: "100%",
                  height: "46%",
                },
              }
            : {
                titleScale: 0.38,
                media: {
                  left: "34%",
                  top: "60%",
                  width: "30%",
                  height: "66%",
                },
                panel: {
                  left: "auto",
                  right: "0%",
                  top: "0%",
                  bottom: "auto",
                  width: "32%",
                  height: "100%",
                },
              };

          gsap.set(rootRef.current, { autoAlpha: 1 });

          gsap.set(mediaGroup, {
            left: "50%",
            top: 0,
            xPercent: -50,
            yPercent: -50,
            width: isMobile ? "88%" : "65%",
            height: isMobile ? "27%" : "35%",
            transformOrigin: "50% 50%",
          });

          gsap.set(titleWrapper, {
            xPercent: -50,
            scale: 1,
            transformOrigin: "50% 100%",
          });

          const rootHeight =
            rootRef.current?.getBoundingClientRect().height ?? 0;
          const groupHeight = mediaGroup.getBoundingClientRect().height;
          const titleHeight = titleWrapper.getBoundingClientRect().height;
          const titleGap = isMobile ? 10 : 14;
          const initialGroupCenterY =
            rootHeight / 2 + groupHeight / 2 + titleGap + titleHeight / 2;

          gsap.set(mediaGroup, {
            top: initialGroupCenterY,
          });

          gsap.set([titleSpark, titleBroken, titleFull], { autoAlpha: 0 });
          gsap.set(titleSpark, {
            strokeDasharray: "1 25",
            strokeDashoffset: 95,
          });
          gsap.set(titleBroken, {
            strokeDasharray: "8 18",
            strokeDashoffset: 72,
          });

          gsap.set(mediaFrame, {
            autoAlpha: 0,
            clipPath: "inset(96% 0% 0% 0%)",
          });

          gsap.set(portrait, {
            yPercent: 12,
            scale: 1.06,
            transformOrigin: "50% 50%",
          });

          gsap.set(detailsPanel, finalLayout.panel);
          gsap.set([panelFill, panelTexture], { autoAlpha: 0 });

          gsap.set(panelStrips, {
            xPercent: isMobile ? 0 : 110,
            yPercent: isMobile ? 110 : 0,
            force3D: true,
          });

          informationRows.forEach((row) => {
            const line = row.querySelector(".info-line");
            const label = row.querySelector(".info-label");
            const value = row.querySelector(".info-value");

            gsap.set(line, {
              scaleY: 0,
              transformOrigin: "top center",
            });
            gsap.set(label, {
              autoAlpha: 0,
              x: -8,
              clipPath: "inset(0% 100% 0% 0%)",
            });
            gsap.set(value, {
              autoAlpha: 0,
              y: 7,
              clipPath: "inset(0% 0% 100% 0%)",
            });
          });

          if (reduceMotion) {
            gsap.set(titleFull, { autoAlpha: 1 });
            gsap.set(titleWrapper, { scale: finalLayout.titleScale });
            gsap.set(mediaGroup, finalLayout.media);
            gsap.set(mediaFrame, {
              autoAlpha: 1,
              clipPath: "inset(0% 0% 0% 0%)",
            });
            gsap.set(portrait, { yPercent: 0, scale: 1 });
            gsap.set(panelStrips, { xPercent: 0, yPercent: 0 });
            gsap.set(panelFill, { autoAlpha: 1 });
            gsap.set(panelTexture, { autoAlpha: 0.08 });
            gsap.set(select(".info-line"), { scaleY: 1 });
            gsap.set(select(".info-label"), {
              autoAlpha: 1,
              x: 0,
              clipPath: "inset(0% 0% 0% 0%)",
            });
            gsap.set(select(".info-value"), {
              autoAlpha: 1,
              y: 0,
              clipPath: "inset(0% 0% 0% 0%)",
            });
            return;
          }

          const timeline = gsap.timeline({
            defaults: { overwrite: "auto" },
          });

          timeline
            .to(
              titleSpark,
              {
                autoAlpha: 0.9,
                strokeDashoffset: 28,
                duration: 0.13,
                ease: "none",
              },
              0.49,
            )
            .to(
              titleBroken,
              {
                autoAlpha: 1,
                strokeDashoffset: 10,
                strokeDasharray: "13 8",
                duration: 0.16,
                ease: "power1.out",
              },
              0.55,
            )
            .to(
              titleBroken,
              {
                strokeDasharray: "30 2",
                strokeDashoffset: 0,
                duration: 0.12,
                ease: "power2.out",
              },
              0.63,
            )
            .to(
              titleFull,
              {
                autoAlpha: 1,
                duration: 0.06,
                ease: "none",
              },
              0.69,
            )
            .to(
              [titleSpark, titleBroken],
              {
                autoAlpha: 0,
                duration: 0.05,
                ease: "none",
              },
              0.72,
            )

            .set(mediaFrame, { autoAlpha: 1 }, 0.94)
            .to(
              mediaGroup,
              {
                top: isMobile ? "57%" : "63%",
                duration: 0.42,
                ease: "power4.inOut",
              },
              0.94,
            )
            .to(
              titleWrapper,
              {
                scale: isMobile ? 0.47 : 0.43,
                duration: 0.42,
                ease: "power4.inOut",
              },
              0.94,
            )
            .to(
              mediaFrame,
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.42,
                ease: "power4.out",
              },
              0.94,
            )
            .to(
              portrait,
              {
                yPercent: 0,
                scale: 1,
                duration: 0.42,
                ease: "power3.out",
              },
              0.96,
            )

            .to(
              mediaGroup,
              {
                ...finalLayout.media,
                duration: 0.56,
                ease: "power4.inOut",
              },
              1.7,
            )
            .to(
              titleWrapper,
              {
                scale: finalLayout.titleScale,
                duration: 0.56,
                ease: "power4.inOut",
              },
              1.7,
            );

          panelStripOrder.forEach((stripIndex, sequenceIndex) => {
            timeline.to(
              panelStrips[stripIndex],
              {
                xPercent: 0,
                yPercent: 0,
                duration: 0.32,
                ease: "power2.inOut",
              },
              1.75 + sequenceIndex * 0.045,
            );
          });

          timeline.set(panelFill, { autoAlpha: 1 }, 2.18).to(
            panelTexture,
            {
              autoAlpha: 0.08,
              duration: 0.08,
              ease: "none",
            },
            2.18,
          );

          const rowStartTimes = [2.38, 2.94, 3.46];

          informationRows.forEach((row, index) => {
            const line = row.querySelector(".info-line");
            const label = row.querySelector(".info-label");
            const value = row.querySelector(".info-value");
            const start = rowStartTimes[index];

            timeline
              .to(
                line,
                {
                  scaleY: 1,
                  duration: 0.14,
                  ease: "power2.out",
                },
                start,
              )
              .to(
                label,
                {
                  autoAlpha: 1,
                  x: 0,
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 0.18,
                  ease: "power2.out",
                },
                start + 0.06,
              )
              .to(
                value,
                {
                  autoAlpha: 1,
                  y: 0,
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 0.18,
                  ease: "power2.out",
                },
                start + 0.18,
              );
          });

          return () => {
            timeline.kill();
          };
        },
      );

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      aria-label="Animated profile introduction"
      className="relative h-[100svh] min-h-[520px] w-full overflow-hidden bg-[#090909] opacity-0 font-sans"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />
      <div
        className="media-group absolute z-10"
        style={{ willChange: "left, top, width, height, transform" }}
      >
        <div
          className="title-wrapper absolute bottom-[calc(100%+10px)] left-1/2 z-20 w-[82vw] md:bottom-[calc(100%+14px)] md:w-[44vw]"
          style={{ willChange: "transform" }}
        >
          <svg
            aria-hidden="true"
            className="block h-auto w-full overflow-visible"
            viewBox="0 0 1000 220"
            preserveAspectRatio="xMidYMid meet"
          >
            <text
              className="title-spark"
              x="500"
              y="112"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="none"
              stroke="#d8d8d8"
              strokeWidth="3"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="180"
              fontWeight="bold"
              letterSpacing="2"
            >
              {PROFILE_TITLE}
            </text>
            <text
              className="title-broken"
              x="500"
              y="112"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="none"
              stroke="#d8d8d8"
              strokeWidth="3"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="180"
              fontWeight="bold"
              letterSpacing="2"
            >
              {PROFILE_TITLE}
            </text>
            <text
              className="title-full"
              x="500"
              y="112"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="none"
              stroke="#d8d8d8"
              strokeWidth="3"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="180"
              fontWeight="bold"
              letterSpacing="2"
            >
              {PROFILE_TITLE}
            </text>
          </svg>
          <h1 className="sr-only">{PROFILE_TITLE}</h1>
        </div>

        <div
          className="media-frame relative h-full w-full overflow-hidden shadow-2xl"
          style={{ willChange: "clip-path, opacity" }}
        >
          <Image
            src="/hero/hero.png"
            alt="Profile portrait"
            fill
            priority
            sizes="(max-width: 767px) 88vw, 65vw"
            className="portrait-image object-cover object-center"
          />
        </div>
      </div>

      <aside className="details-panel absolute z-30 overflow-hidden bg-transparent">
        <div className="panel-fill absolute inset-0 bg-[#f1f1f1]" />

        <div className="panel-strips absolute -inset-px flex flex-row md:flex-col">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="panel-strip h-full min-w-0 flex-1 bg-[#f1f1f1] md:h-auto md:w-full"
              style={{ willChange: "transform" }}
            />
          ))}
        </div>

        <div
          className="panel-texture pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.35) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        />

        <div className="relative z-10 flex h-full flex-col justify-center gap-6 px-8 text-[#111] md:gap-10 md:px-[15%]">
          {profileRows.map((row) => (
            <div
              key={row.label}
              className="info-row flex items-stretch gap-4 md:gap-6"
            >
              <div className="info-line w-1 shrink-0 rounded-full bg-black" />

              <div className="flex flex-col justify-center">
                <div className="mb-1 overflow-hidden">
                  <h2 className="info-label text-sm font-bold uppercase tracking-widest text-black/40 md:text-base">
                    {row.label}
                  </h2>
                </div>

                <div className="overflow-hidden">
                  <div className="info-value flex flex-col">
                    <p className="text-2xl font-semibold tracking-tight text-black/90 md:text-4xl">
                      {row.value}
                    </p>
                    {row.description && (
                      <p className="mt-1 text-sm font-medium text-black/50 md:text-base">
                        {row.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}