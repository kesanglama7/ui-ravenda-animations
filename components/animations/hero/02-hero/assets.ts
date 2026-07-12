export interface PetGridImage {
  id: number;
  src: string;
  alt: string;
  isMain?: boolean;
}

export const PetGridImages: PetGridImage[] = [
  {
    id: 1,
    src: "/hero/02-hero/8.jpg",
    alt: "Pet",
  },
  {
    id: 2,
    src: "/hero/02-hero/3.jpg",
    alt: "Pet",
  },
  {
    id: 3,
    src: "/hero/02-hero/4.jpg",
    alt: "Pet",
  },
  {
    id: 4,
    src: "/hero/02-hero/1.jpg",
    alt: "Pet",
  },
  {
    id: 5,
    src: "/hero/02-hero/2.jpg",
    alt: "Pet",
    isMain: true,
  },
  {
    id: 6,
    src: "/hero/02-hero/5.jpg",
    alt: "Pet",
  },
  {
    id: 7,
    src: "/hero/02-hero/6.jpg",
    alt: "Pet",
  },
  {
    id: 8,
    src: "/hero/02-hero/8.jpg",
    alt: "Pet",
  },
  {
    id: 9,
    src: "/hero/02-hero/7.jpg",
    alt: "Pet",
  },
];