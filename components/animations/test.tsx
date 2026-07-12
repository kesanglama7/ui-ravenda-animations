import Image from "next/image";

const Images = [
  "/hero/02-hero/hero-1.jpg",
  "/hero/02-hero/hero-2.jpg",
  "/hero/02-hero/hero-3.jpg",
  "/hero/02-hero/hero-4.jpg",
  "/hero/02-hero/hero-5.jpg",
  "/hero/02-hero/hero-6.jpg",
  "/hero/02-hero/hero-3.jpg",
  "/hero/02-hero/hero-2.jpg",
  "/hero/02-hero/hero-1.jpg",
];
export default function TestHome() {

    return(
        <section className="grid grid-cols-3">
            {Images.map((image, index) => (
                <Image key={index} src={image} alt={`Image ${index}`} width={100} height={100} className="w-full h-full object-cover" />
            ))}
        </section>
    )
}