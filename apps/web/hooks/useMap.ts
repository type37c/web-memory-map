'use client';

import { useState, useEffect } from 'react';
import { MapData, Node } from '@/types';

export function useMap(mapId: string | null) {
  const [map, setMap] = useState<MapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapId) {
      setLoading(false);
      return;
    }

    fetchMap();
  }, [mapId]);

  const fetchMap = async () => {
    try {
      const response = await fetch(`/api/maps/${mapId}`);
      if (!response.ok) throw new Error('Failed to fetch map');
      const data = await response.json();
      setMap(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const updateNodePosition = async (nodeId: string, x: number, y: number) => {
    if (!mapId) return;

    try {
      const response = await fetch(`/api/maps/${mapId}/nodes`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodeId, x, y })
      });

      if (!response.ok) throw new Error('Failed to update node');
      
      // Update local state
      setMap(prev => {
        if (!prev) return null;
        return {
          ...prev,
          nodes: prev.nodes.map(node => 
            node.id === nodeId ? { ...node, x, y } : node
          )
        };
      });
    } catch (err) {
      console.error('Error updating node:', err);
    }
  };

  const addNode = async (node: Omit<Node, 'id' | 'addedAt'>) => {
    if (!mapId) return;

    try {
      const response = await fetch(`/api/maps/${mapId}/nodes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(node)
      });

      if (!response.ok) throw new Error('Failed to add node');
      const { node: newNode } = await response.json();
      
      // Update local state
      setMap(prev => {
        if (!prev) return null;
        return {
          ...prev,
          nodes: [...prev.nodes, newNode]
        };
      });
    } catch (err) {
      console.error('Error adding node:', err);
    }
  };

  return {
    map,
    loading,
    error,
    updateNodePosition,
    addNode,
    refetch: fetchMap
  };
}