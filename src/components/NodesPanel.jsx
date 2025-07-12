import React from "react";
import { nanoid } from "nanoid"; // Generates unique IDs for new nodes

// Component shown in the sidebar when no node is selected
// Provides a button to add a new "Message" node to the flow
export default function NodesPanel({ setNodes }) {
  // Function to add a new Text Node to the canvas
  const addMessageNode = () => {
    const newNode = {
      id: nanoid(), // Generate a unique ID
      type: "textNode", // Type used to render with custom node component
      position: {
        x: Math.random() * 400, // Random X position
        y: Math.random() * 400, // Random Y position
      },
      data: {
        label: "Send Message", // Default message text
      },
    };

    // Add the new node to the existing list of nodes
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    // Button that triggers node creation when clicked
    <button
      onClick={addMessageNode}
      className="w-full border border-blue-400 text-blue-500 rounded p-3 text-center hover:bg-blue-50 flex items-center justify-center gap-2"
    >
      💬 Message
    </button>
  );
}
