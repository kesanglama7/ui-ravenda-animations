"use client";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import { PetGridImages } from "./assets";
import styles from "./hero.module.css";

const css = styles as unknown as Record<string, string>;

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

interface MediaConditions {
  desktop?: boolean;
  mobile?: boolean;
}

export function PetHero() {
  const pageRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const page = pageRef.current;
      const section = sectionRef.current;

      if (!page || !section) {
        return;
      }

      const select = gsap.utils.selector(page);

      const gallery = select<HTMLElement>(
        "[data-volt-gallery]",
      )[0];

      const images = select<HTMLElement>(
        "[data-volt-grid-image]",
      );

      const logo = select<HTMLElement>(
        "[data-volt-logo-position]",
      )[0];

      const tagline = select<HTMLElement>(
        "[data-volt-tagline]",
      )[0];

      if (!gallery || !logo || !tagline) {
        return;
      }

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
        },
        (context) => {
          const conditions =
            context.conditions as MediaConditions;

          const isDesktop = Boolean(conditions.desktop);

          const getFinalLogoScale = () => {
            const currentWidth = logo.offsetWidth;
            const targetWidth = isDesktop ? 96 : 72;

            if (currentWidth <= 0) {
              return isDesktop ? 0.09 : 0.15;
            }

            return targetWidth / currentWidth;
          };

          const getInitialLogoY = () => {
            const topOffset = isDesktop ? 20 : 18;
            const bottomOffset = isDesktop ? 4 : 12;

            return (
              window.innerHeight -
              topOffset -
              logo.offsetHeight -
              bottomOffset
            );
          };

          /*
           * Initial hero state.
           *
           * This is already prepared underneath the preloader.
           * When the preloader cells disappear, the user sees
           * this exact state immediately.
           */
          gsap.set(gallery, {
            scale: isDesktop ? 3 : 2.65,
            transformOrigin: "center center",
          });

          gsap.set(images, {
            scale: isDesktop ? 1.5 : 1.35,
          });

          gsap.set(logo, {
            x: 0,
            y: getInitialLogoY,
            scale: 1,
            autoAlpha: 1,
            transformOrigin: "top left",
          });

          gsap.set(tagline, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
          });

          if (reducedMotion) {
            gsap.set(gallery, {
              scale: 1,
            });

            gsap.set(images, {
              scale: 1,
            });

            gsap.set(logo, {
              x: 0,
              y: 0,
              scale: getFinalLogoScale(),
            });

            return;
          }

          const timeline = gsap.timeline({
            defaults: {
              ease: "none",
            },

            scrollTrigger: {
              trigger: section,
              start: "top top",

              end: () =>
                `+=${
                  window.innerHeight *
                  (isDesktop ? 3 : 2.35)
                }`,

              scrub: 1,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          /*
           * Reveal the full 3 × 3 gallery.
           */
          timeline.to(
            gallery,
            {
              scale: 1,
              duration: 1,
              ease: "power2.inOut",
            },
            0,
          );

          /*
           * Inner-image parallax.
           */
          timeline.to(
            images,
            {
              scale: 1,
              duration: 1,
              ease: "power2.inOut",
            },
            0,
          );

          /*
           * Large PETS logo becomes the small fixed site logo.
           */
          timeline.to(
            logo,
            {
              x: 0,
              y: 0,
              scale: getFinalLogoScale,
              transformOrigin: "top left",
              duration: 0.82,
              ease: "power2.inOut",
            },
            0,
          );

          /*
           * Remove the initial tagline.
           */
          timeline.to(
            tagline,
            {
              autoAlpha: 0,
              y: 40,
              filter: "blur(10px)",
              duration: 0.23,
            },
            0.08,
          );

          /*
           * Hold the final gallery briefly.
           */
          timeline.to({}, { duration: 0.2 });

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
      scope: pageRef,
    },
  );

  return (
    <main
      ref={pageRef}
      className={css.page}
    >
      {/* Fixed menu */}
      <header className={css.header}>
        <button
          type="button"
          aria-label="Open navigation menu"
          className={css.menuButton}
        >
          <span>Menu</span>

          <span
            className={css.menuPlus}
            aria-hidden="true"
          />
        </button>
      </header>

      {/*
       * Same PETS element:
       * giant hero logo → small fixed header logo.
       */}
      <a
        data-volt-logo-position
        href="#volt-home"
        aria-label="Go to the homepage"
        className={css.introLogoPosition}
      >
        <div className={css.introLogoClip}>
          <div
            className={`${css.introLogo} ${css.displayFont}`}
          >
            PETS
          </div>
        </div>
      </a>

      <section
        ref={sectionRef}
        id="volt-home"
        className={css.heroSection}
      >
        <div className={css.galleryAnchor}>
          <div
            data-volt-gallery
            className={css.gallery}
          >
            {PetGridImages.map((image) => (
              <div
                key={image.id}
                className={`${css.tile} ${
                  image.isMain
                    ? css.centerTile
                    : ""
                }`}
              >
                <Image
                  data-volt-grid-image
                  fill
                  priority={image.isMain}
                  src={image.src}
                  alt={image.alt}
                  sizes={
                    image.isMain
                      ? "100vw"
                      : "(min-width: 768px) 48vw, 70vw"
                  }
                  className={css.tileImage}
                  draggable={false}
                />

                <div className={css.tileShade} />
              </div>
            ))}
          </div>
        </div>

        <div
          data-volt-tagline
          className={css.tagline}
        >
          <p>"The world would be a nicer place if everyone had the ability to love as unconditionally as a dog."</p>
          <p className="text-right"> — M.K. Clinton</p>
        </div>
      </section>

      {/* <section
        id="services"
        className={css.services}
      >
        <p className={css.servicesLabel}>
          What we do
        </p>

        <h2
          className={`${css.servicesTitle} ${css.displayFont}`}
        >
          Services
        </h2>
      </section> */}
    </main>
  );
}