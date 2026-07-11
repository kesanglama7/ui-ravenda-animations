import { ProfileMotion } from "@/components/animations/hero/01-hero";
import Preloader01 from "@/components/animations/preloaders/01-preloader";

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
  }
} as const;

export type AnimationSlug = keyof typeof animationsRegistry;