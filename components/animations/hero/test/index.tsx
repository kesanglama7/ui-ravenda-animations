import { HeroGrid } from "./hero-grid";


export default function Home01() {
  return (
    <main className="relative w-full min-h-screen bg-black">
      
      {/* The Animated Hero */}
      <HeroGrid />

      {/* This is the section you scroll into after the Hero finishes pinning and fading out.
        It needs relative positioning and a z-index to slide up behind/over the pinned hero.
      */}
      <section className="h-screen w-full bg-zinc-950 flex flex-col items-center justify-center text-white relative z-20">
        <h2 className="text-4xl font-bold">The Next Section</h2>
        <p className="mt-4 text-zinc-500">Scroll back up to reverse the choreography</p>
      </section>

    </main>
  );
}