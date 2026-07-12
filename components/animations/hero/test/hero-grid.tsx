"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './hero.module.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const images = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2487&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?q=80&w=2574&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2574&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2487&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
];

export const HeroGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", // Pins for 3 screen heights for smooth scrolling
        scrub: 1,      
        pin: true,     
      }
    });

    // 1. Scale grid down to normal size
    tl.to(`.${styles.gallery}`, {
      scale: 1,
      duration: 1,
      ease: "power2.inOut"
    }, 0); 

    // 2. Parallax: Scale inner images down
    tl.to(`.${styles.image}`, {
      scale: 1,
      duration: 1,
      ease: "power2.inOut"
    }, 0);

    // 3. Move and shrink FRME logo to top left
    tl.to(`.${styles.logo}`, {
      scale: 0.15, 
      y: () => -window.innerHeight * 0.85, 
      duration: 1,
      ease: "power2.inOut"
    }, 0);

    // 4. Fade in center text lines
    tl.to(`.${styles.centerText}`, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.1
    }, 0.5); 

    // 5. Fade in button
    tl.to(`.${styles.requestBtn}`, {
      opacity: 1,
      y: 0,
      duration: 0.3
    }, 0.7);

    // 6. Fade out entire container to transition to next section
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.2
    }, 0.9);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={styles.heroSection}>
      
      <div className={styles.gallery}>
        {/* Column 1 */}
        <div className={styles.column}>
          {images.slice(0, 3).map((src, i) => (
            <div key={`col1-${i}`} className={styles.item}>
              <img src={src} className={styles.image} alt="" />
            </div>
          ))}
        </div>
        {/* Column 2 (Center) */}
        <div className={styles.column}>
          {images.slice(3, 6).map((src, i) => (
            <div key={`col2-${i}`} className={styles.item}>
              <img src={src} className={styles.image} alt="" />
            </div>
          ))}
        </div>
        {/* Column 3 */}
        <div className={styles.column}>
          {images.slice(6, 9).map((src, i) => (
            <div key={`col3-${i}`} className={styles.item}>
              <img src={src} className={styles.image} alt="" />
            </div>
          ))}
        </div>
      </div>

      <h1 className={styles.logo}>FRME</h1>

      <div className={styles.centerTextWrapper}>
        <h2 className={styles.centerText}>
          A living catalogue of images that
        </h2>
        <h2 className={styles.centerText}>
          shouldn't exist, collected frame by frame
        </h2>
        <h2 className={styles.centerText}>
           from the edge of the real.
        </h2>
        <button className={styles.requestBtn}>
          Request Access
        </button>
      </div>
    </section>
  );
};