import React, { useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";

import TextNode from "./CustomNodes/TextNode";       // Custom node component
import SettingsPanel from "./SettingsPanel";         // Right sidebar settings for selected node
import { validateFlow } from "../utils/validateFlow"; // Validation utility function

// Register custom node types
const nodeTypes = { textNode: TextNode };

export default function FlowBuilder() {
  // State for nodes and edges, with handlers provided by ReactFlow
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Track selected node (to show its settings)
  const [selectedNode, setSelectedNode] = useState(null);

  // Error message for flow validation
  const [errorMessage, setErrorMessage] = useState("");

  // Called when a new connection (edge) is made between nodes
  const onConnect = (params) => {
    // Prevent multiple edges starting from the same source
    const alreadyConnected = edges.some((e) => e.source === params.source);
    if (!alreadyConnected) {
      setEdges((eds) => addEdge(params, eds));
    }
  };

  // Called when user clicks "Save Changes"
  const handleSave = () => {
    const error = validateFlow(nodes, edges);
    if (error) {
      setErrorMessage("❌ Cannot save Flow: Multiple nodes have empty targets");
    } else {
      setErrorMessage("");
      alert("✅ Flow saved successfully!");
    }
  };

  // Function to add a new message node to the flow
  const addTextNode = () => {
    const newNode = {
      id: `${+new Date()}`, // Simple unique ID using timestamp
      type: "textNode",     // Use the custom node type
      position: {           // Random position within canvas bounds
        x: Math.random() * 250,
        y: Math.random() * 250,
      },
      data: { label: "Send Message" }, // Default label
    };
    setNodes((nds) => [...nds, newNode]); // Add to node list
  };

  return (
    <ReactFlowProvider>
      {/* Top Navigation Bar with title and Save button */}
      <div className="w-full h-12 flex items-center justify-between px-6 border-b bg-white shadow z-10">
        <div className="text-lg font-semibold">Chatbot Flow Builder</div>
        <button
          onClick={handleSave}
          className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-100"
        >
          Save Changes
        </button>
      </div>

      {/* Error message displayed when validation fails */}
      {errorMessage && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-300 text-red-800 px-4 py-2 rounded shadow z-50">
          {errorMessage}
        </div>
      )}

      {/* Main layout: Flow canvas + right side panel */}
      <div className="flex w-full h-[calc(100vh-3rem)]">
        {/* Left: React Flow Canvas */}
        <div className="flex-grow">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onNodeClick={(e, node) => setSelectedNode(node)} // Set the clicked node as selected
            onPaneClick={() => setSelectedNode(null)} // Deselect when clicking canvas
            fitView
          >
            <Background /> {/* Grid-like background */}
            <Controls />   {/* Zoom and pan controls */}
          </ReactFlow>
        </div>

        {/* Right Sidebar Panel */}
        <div className="w-72 border-l p-4 bg-gray-100 flex-shrink-0">
          {/* Show message config when node is selected, else show button to add node */}
          {selectedNode?.type === "textNode" ? (
            <SettingsPanel node={selectedNode} setNodes={setNodes} />
          ) : (
            <div className="flex flex-col items-center justify-center mt-20">
              <button
                onClick={addTextNode}
                className="border border-blue-400 text-blue-500 px-4 py-3 rounded flex flex-col items-center hover:bg-blue-50 w-full"
              >
                <span className="text-2xl">💬</span>
                <span className="mt-1">Message</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </ReactFlowProvider>
  );
}
