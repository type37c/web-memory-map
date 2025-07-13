'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Map from '@/components/Map';
import { useMap } from '@/hooks/useMap';
import { Node } from '@/types';

export default function MapPage() {
  const params = useParams();
  const mapId = params.id as string;
  const { map, loading, error, updateNodePosition, addNode } = useMap(mapId);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-lg">Loading map...</div>
      </div>
    );
  }

  if (error || !map) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Error: {error || 'Map not found'}</div>
      </div>
    );
  }

  const handleAddNode = async () => {
    const url = prompt('Enter URL:');
    if (!url) return;

    const title = prompt('Enter title:') || new URL(url).hostname;
    
    await addNode({
      url,
      title,
      x: Math.random() * 800,
      y: Math.random() * 600,
      tags: []
    });
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/map/${mapId}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Map URL copied to clipboard!');
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{map.name}</h1>
            <p className="text-gray-600 mt-1">
              {map.isPublic ? 'Public' : 'Private'} • {map.nodes.length} sites
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleAddNode}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Site
            </button>
            <button 
              onClick={handleShare}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Share Map
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        <main className="flex-1 relative">
          <Map 
            data={map} 
            editable={true}
            onNodeMove={updateNodePosition}
            onNodeClick={setSelectedNode}
          />
        </main>

        {selectedNode && (
          <aside className="w-80 bg-white border-l p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-lg font-semibold">Site Details</h2>
              <button 
                onClick={() => setSelectedNode(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {selectedNode.favicon && (
                  <Image src={selectedNode.favicon} alt="" width={24} height={24} className="w-6 h-6" />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{selectedNode.title}</h3>
                  <a 
                    href={selectedNode.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline truncate block"
                  >
                    {selectedNode.url}
                  </a>
                </div>
              </div>

              {selectedNode.tags && selectedNode.tags.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.tags.map((tag: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 rounded text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedNode.note && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Note</h4>
                  <p className="text-sm text-gray-600">{selectedNode.note}</p>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}