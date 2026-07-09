import Link from 'next/link';
import { animationsRegistry } from '@/lib/animation-registry';

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Animations</h1>
      
      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Object.entries(animationsRegistry).map(([slug, data]) => (
          <li key={slug} className="border p-4 rounded-lg hover:shadow-lg transition">
            <Link href={`/animations/${slug}`} rel="noopener noreferrer" target="_blank" className="block">
              <h2 className="text-xl font-semibold text-blue-600">{data.name}</h2>
              <p className="text-gray-600 mt-2">{data.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}