import Link from 'next/link';
import CreateMapButton from '@/components/CreateMapButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Web Memory Map</h1>
          <p className="text-xl text-gray-600 mb-2">
            Transform your bookmarks into living knowledge maps
          </p>
          <p className="text-lg text-gray-500">
            Spatially organize, explore, and share your web discoveries
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">🗺️ Spatial Organization</h3>
              <p className="text-gray-600">
                Arrange websites in 2D space based on their relationships and meaning to you
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">🔗 Connect Ideas</h3>
              <p className="text-gray-600">
                Draw connections between related sites to visualize knowledge networks
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">🌍 Share & Explore</h3>
              <p className="text-gray-600">
                Make your maps public to share knowledge, or explore others&apos; curated collections
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to map your web?</h2>
            <p className="text-gray-600 mb-8">
              Start organizing your digital discoveries in a whole new way
            </p>
            <CreateMapButton />
            <p className="text-sm text-gray-500 mt-4">
              No sign-up required to start
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-8">Explore Public Maps</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium mb-2">Design Inspiration</h3>
              <p className="text-sm text-gray-600 mb-4">
                A curated collection of beautiful web designs
              </p>
              <Link 
                href="/explore" 
                className="text-blue-600 hover:underline text-sm"
              >
                View Map →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium mb-2">Dev Tools Galaxy</h3>
              <p className="text-sm text-gray-600 mb-4">
                Essential tools for modern web development
              </p>
              <Link 
                href="/explore" 
                className="text-blue-600 hover:underline text-sm"
              >
                View Map →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium mb-2">Academic Resources</h3>
              <p className="text-sm text-gray-600 mb-4">
                Research papers and educational materials
              </p>
              <Link 
                href="/explore" 
                className="text-blue-600 hover:underline text-sm"
              >
                View Map →
              </Link>
            </div>
          </div>
        </div>

        <footer className="mt-20 text-center text-gray-500">
          <p className="mb-2">
            Open source and built with ❤️ by the community
          </p>
          <div className="flex gap-6 justify-center">
            <Link 
              href="https://github.com/type37c/web-memory-map" 
              className="hover:text-gray-700"
            >
              GitHub
            </Link>
            <Link 
              href="/docs" 
              className="hover:text-gray-700"
            >
              Docs
            </Link>
            <Link 
              href="/about" 
              className="hover:text-gray-700"
            >
              About
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}