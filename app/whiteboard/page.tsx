'use client'

import { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { PenTool, Plus } from 'lucide-react'
import type { Node, Edge, Connection, NodeChange, EdgeChange } from 'reactflow'
import 'reactflow/dist/style.css'

const ReactFlow = dynamic(
  () => import('reactflow').then((m) => m.default),
  { ssr: false }
)

const Background = dynamic(
  () => import('reactflow').then((m) => m.Background),
  { ssr: false }
)

const Controls = dynamic(
  () => import('reactflow').then((m) => m.Controls),
  { ssr: false }
)

const MiniMap = dynamic(
  () => import('reactflow').then((m) => m.MiniMap),
  { ssr: false }
)

const applyNodeChanges = (changes: NodeChange[], nodes: Node[]) => {
  return changes.reduce((acc, change) => {
    if (change.type === 'position' && change.position) {
      return acc.map((n) => (n.id === change.id ? { ...n, position: change.position! } : n))
    }
    if (change.type === 'select') {
      return acc.map((n) => (n.id === change.id ? { ...n, selected: change.selected } : n))
    }
    if (change.type === 'remove') {
      return acc.filter((n) => n.id !== change.id)
    }
    return acc
  }, nodes)
}

const applyEdgeChanges = (changes: EdgeChange[], edges: Edge[]) => {
  return changes.reduce((acc, change) => {
    if (change.type === 'remove') return acc.filter((e) => e.id !== change.id)
    if (change.type === 'select') {
      return acc.map((e) => (e.id === change.id ? { ...e, selected: change.selected } : e))
    }
    return acc
  }, edges)
}

const initialNodes: Node[] = [
  { id: '1', position: { x: 250, y: 50 }, data: { label: 'Client App' }, style: { background: '#00f0ff20', border: '1px solid #00f0ff', color: '#fff', borderRadius: 8, padding: 12 } },
  { id: '2', position: { x: 250, y: 170 }, data: { label: 'API Gateway' }, style: { background: '#7b2ffc20', border: '1px solid #7b2ffc', color: '#fff', borderRadius: 8, padding: 12 } },
  { id: '3', position: { x: 100, y: 300 }, data: { label: 'Auth Service' }, style: { background: '#ff6b3520', border: '1px solid #ff6b35', color: '#fff', borderRadius: 8, padding: 12 } },
  { id: '4', position: { x: 400, y: 300 }, data: { label: 'Core API' }, style: { background: '#ff6b3520', border: '1px solid #ff6b35', color: '#fff', borderRadius: 8, padding: 12 } },
  { id: '5', position: { x: 250, y: 420 }, data: { label: 'PostgreSQL' }, style: { background: '#00ff8820', border: '1px solid #00ff88', color: '#fff', borderRadius: 8, padding: 12 } },
]

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#00f0ff' } },
  { id: 'e2-3', source: '2', target: '3', style: { stroke: '#7b2ffc' } },
  { id: 'e2-4', source: '2', target: '4', style: { stroke: '#7b2ffc' } },
  { id: 'e4-5', source: '4', target: '5', style: { stroke: '#ff6b35' } },
  { id: 'e3-5', source: '3', target: '5', style: { stroke: '#ff6b35' } },
]

let nodeId = 6

export default function WhiteboardPage() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)
  const [loaded, setLoaded] = useState(false)

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds))
  }, [])

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds))
  }, [])

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => [
      ...eds,
      { id: `e${connection.source}-${connection.target}`, source: connection.source!, target: connection.target!, animated: true, style: { stroke: '#00f0ff' } },
    ])
  }, [])

  const addNode = () => {
    const id = String(nodeId++)
    setNodes((nds) => [
      ...nds,
      {
        id,
        position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
        data: { label: `Service ${id}` },
        style: { background: '#ffffff10', border: '1px solid #ffffff30', color: '#fff', borderRadius: 8, padding: 12 },
      },
    ])
  }

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      <section className="pt-24 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between mb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7b2ffc]/20 bg-[#7b2ffc]/5 text-[#7b2ffc] text-xs mb-2">
              <PenTool size={12} />
              System Design Whiteboard
            </div>
            <h1 className="text-2xl font-bold text-white">Architecture Whiteboard</h1>
            <p className="text-gray-400 text-sm">Drag nodes, connect services, design systems interactively.</p>
          </div>
          <button
            onClick={addNode}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00f0ff]/20 text-[#00f0ff] text-sm hover:bg-[#00f0ff]/30 transition"
          >
            <Plus size={16} />
            Add Node
          </button>
        </div>

        <div className="h-[calc(100vh-200px)] rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0f]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={() => setLoaded(true)}
            fitView
            attributionPosition="bottom-left"
          >
            {loaded && (
              <>
                <Background color="#ffffff10" gap={20} />
                <Controls />
                <MiniMap nodeColor={() => '#00f0ff'} maskColor="#00000080" />
              </>
            )}
          </ReactFlow>
        </div>
      </section>

      <Footer />
    </main>
  )
}
