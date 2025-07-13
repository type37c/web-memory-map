'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { MapData, Node, Edge } from '@/types';

interface MapProps {
  data: MapData;
  editable?: boolean;
  onNodeMove?: (nodeId: string, x: number, y: number) => void;
  onNodeClick?: (node: Node) => void;
}

export default function Map({ data, editable = false, onNodeMove, onNodeClick }: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = dimensions.width;
    const height = dimensions.height;

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform.toString());
      });

    svg.call(zoom);

    // Create main group
    const g = svg.append('g');

    // Create edges
    const links = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data.edges)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 1);

    // Create nodes group
    const nodes = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(data.nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`);

    // Add circles for nodes
    nodes.append('circle')
      .attr('r', 20)
      .attr('fill', '#4285f4')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', editable ? 'move' : 'pointer');

    // Add favicons
    nodes.append('image')
      .attr('x', -12)
      .attr('y', -12)
      .attr('width', 24)
      .attr('height', 24)
      .attr('href', d => d.favicon || '/default-icon.png')
      .style('pointer-events', 'none');

    // Add labels
    nodes.append('text')
      .attr('y', 35)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-family', 'sans-serif')
      .text(d => d.title)
      .each(function(d) {
        const text = d3.select(this);
        const words = d.title.split(' ');
        if (words.length > 3) {
          text.text(words.slice(0, 3).join(' ') + '...');
        }
      });

    // Update edge positions
    function updateLinks() {
      links
        .attr('x1', d => {
          const source = data.nodes.find(n => n.id === d.source);
          return source ? source.x : 0;
        })
        .attr('y1', d => {
          const source = data.nodes.find(n => n.id === d.source);
          return source ? source.y : 0;
        })
        .attr('x2', d => {
          const target = data.nodes.find(n => n.id === d.target);
          return target ? target.x : 0;
        })
        .attr('y2', d => {
          const target = data.nodes.find(n => n.id === d.target);
          return target ? target.y : 0;
        });
    }

    updateLinks();

    // Add drag behavior if editable
    if (editable) {
      const drag = d3.drag<SVGGElement, Node>()
        .on('drag', (event, d) => {
          d.x = event.x;
          d.y = event.y;
          d3.select(event.sourceEvent.target.parentNode)
            .attr('transform', `translate(${d.x}, ${d.y})`);
          updateLinks();
        })
        .on('end', (event, d) => {
          if (onNodeMove) {
            onNodeMove(d.id, d.x, d.y);
          }
        });

      nodes.call(drag);
    }

    // Add click handler
    nodes.on('click', (event, d) => {
      if (onNodeClick) {
        onNodeClick(d);
      }
    });

    // Handle resize
    const handleResize = () => {
      const container = svgRef.current?.parentElement;
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: container.clientHeight
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data, dimensions, editable, onNodeMove, onNodeClick]);

  return (
    <svg
      ref={svgRef}
      width={dimensions.width}
      height={dimensions.height}
      style={{ width: '100%', height: '100%', background: '#f8f9fa' }}
    />
  );
}