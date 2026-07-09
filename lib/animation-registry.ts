import Preloader01 from "@/components/animations/preloaders/01-preloader";

export const animationsRegistry = {
  'preloader-01': {
    name: 'Cienematic Preloader 1',
    description: 'Cienematic window open preloader',
    component: Preloader01,
  },
} as const;

export type AnimationSlug = keyof typeof animationsRegistry;