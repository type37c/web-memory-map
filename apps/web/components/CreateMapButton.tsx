'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateMapButton() {
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    setIsCreating(true);
    
    try {
      const response = await fetch('/api/maps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'My Web Universe',
          is_public: false
        })
      });

      if (!response.ok) throw new Error('Failed to create map');
      
      const { map } = await response.json();
      router.push(`/map/${map.id}`);
    } catch (error) {
      console.error('Error creating map:', error);
      alert('Failed to create map. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <button
      onClick={handleCreate}
      disabled={isCreating}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors"
    >
      {isCreating ? 'Creating...' : 'Create New Map'}
    </button>
  );
}