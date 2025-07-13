export interface MapData {
  id: string;
  userId: string;
  name: string;
  isPublic: boolean;
  nodes: Node[];
  edges: Edge[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Node {
  id: string;
  url: string;
  title: string;
  x: number;
  y: number;
  note?: string;
  favicon?: string;
  tags?: string[];
  addedAt: Date;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  note?: string;
}