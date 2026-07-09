import { animationsRegistry, AnimationSlug } from '@/lib/animation-registry';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AnimationPage({ params }: PageProps) {
  const { slug } = await params;
  const animation = animationsRegistry[slug as AnimationSlug];
  
  if (!animation) {
    notFound();
  }
  
  const AnimationComponent = animation.component;

  return (
    <main className="relative w-full">
        <AnimationComponent />
    </main>
  );
}

export function generateStaticParams() {
  return Object.keys(animationsRegistry).map((slug) => ({
    slug: slug,
  }));
}