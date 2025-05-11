import React, { useState, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  { id: "frontend", data: { label: "Frontend" }, position: { x: 100, y: 0 }, style: { background: "#eee" } },
  { id: "backend-a", data: { label: "Backend A" }, position: { x: 100, y: 150 }, style: { background: "#eee" } },
  { id: "rabbitmq", data: { label: "RabbitMQ" }, position: { x: 100, y: 300 }, style: { background: "#eee" } },
  { id: "backend-b", data: { label: "Backend B" }, position: { x: 100, y: 450 }, style: { background: "#eee" } },
  { id: "rabbitmq2", data: { label: "RabbitMQ 2" }, position: { x: 100, y: 600 }, style: { background: "#eee" } },
  { id: "workstation", data: { label: "Workstation" }, position: { x: 100, y: 700 }, style: { background: "#eee" } },

  { id: "rabbitmq3", data: { label: "RabbitMQ 3" }, position: { x: 300, y: 600 }, style: { background: "#eee" } },
  { id: "backend-c", data: { label: "Backend C" }, position: { x: 300, y: 450 }, style: { background: "#eee" } },
  { id: "rabbitmq4", data: { label: "RabbitMQ 4" }, position: { x: 300, y: 300 }, style: { background: "#eee" } },
];

const edgeData = [
  { id: "e1", source: "frontend", target: "backend-a", info: "POST /api" },
  { id: "e2", source: "backend-a", target: "rabbitmq", info: "Queue: jobs" },
  { id: "e3", source: "rabbitmq", target: "backend-b", info: "Routing: user.created" },
  { id: "e4", source: "backend-b", target: "rabbitmq2", info: "Queue: results" },
  { id: "e5", source: "rabbitmq2", target: "workstation", info: "Emit logs" },
  { id: "e6", source: "workstation", target: "rabbitmq3", info: "Notify" },
  { id: "e7", source: "rabbitmq3", target: "backend-c", info: "Routing: notify.mail" },
  { id: "e8", source: "backend-c", target: "rabbitmq4", info: "Queue: mail" },
  { id: "e9", source: "rabbitmq4", target: "frontend", info: "Callback" },
];

const TracerFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= edgeData.length) return;

    const timer = setTimeout(() => {
      const currentEdge = edgeData[step];

      // Mark target node green
      setNodes((nds) =>
        nds.map((node) =>
          node.id === currentEdge.target
            ? { ...node, style: { ...node.style, background: "#90ee90" } }
            : node
        )
      );

      // Add edge progressively with styled label
      setEdges((eds) => [
        ...eds,
        {
          id: currentEdge.id,
          source: currentEdge.source,
          target: currentEdge.target,
          markerEnd: { type: MarkerType.ArrowClosed },
          type: "straight",
          label: currentEdge.info,
          labelStyle: {
            fill: "#fff",
            fontWeight: 500,
            fontSize: 12
          },
          labelBgPadding: [6, 4],
          labelBgBorderRadius: 6,
          labelBgStyle: {
            fill: "rgba(0, 0, 0, 0.75)",
            color: "#fff"
          },
          style: { stroke: "#ffcc00", strokeWidth: 2 }
        }
      ]);

      setStep((s) => s + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [step, setEdges, setNodes]);

  return (
    <div style={{ width: "100%", height: "800px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        defaultEdgeOptions={{ type: "straight", markerEnd: { type: MarkerType.ArrowClosed } }}
      >
        <MiniMap />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default TracerFlow;
