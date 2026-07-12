import { ProfileMotion } from "@/components/animations/hero/01-hero";
import { Hero02 } from "@/components/animations/hero/02-hero";
import Home01 from "@/components/animations/hero/test";

import Preloader01 from "@/components/animations/preloaders/01-preloader";
import TestHome from "@/components/animations/test";

export const animationsRegistry = {
  'preloader-01': {
    name: 'Cienematic Preloader 1',
    description: 'Cienematic window open preloader',
    component: Preloader01,
  },
  'hero-01': {
    name: 'Motion Hero 1',
    description: 'Motion based profile hero section',
    component:  ProfileMotion,
  },
  'hero-02': {
    name: 'test',
    description: 'test',
    component:  Hero02,
  },


  'test': {
    name: 'test',
    description: 'test',
    component:  Home01,
  },
} as const;

export type AnimationSlug = keyof typeof animationsRegistry;