import { useEffect, useState } from 'react';

// Component to display the settings panel for a selected node
// Allows editing the text label of the selected node
export default function SettingsPanel({ node, setNodes }) {
  // Local state to manage the input text for editing
  const [text, setText] = useState(node.data.label || '');

  // Whenever a new node is selected, update the text input with that node's label
  useEffect(() => {
    setText(node.data.label || '');
  }, [node]);

  // Handle input change and update the node label in real time
  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    // Update the label of the specific node in the React Flow state
    setNodes((nodes) =>
      nodes.map((n) =>
        n.id === node.id ? { ...n, data: { ...n.data, label: newText } } : n
      )
    );
  };

  return (
    <div>
      {/* Settings Panel Title */}
      <h2 className="text-lg font-semibold mb-2">Settings</h2>

      {/* Input field to edit the message text of the selected node */}
      <input
        className="border border-yellow-500 rounded px-2 py-1 w-full mb-2"
        value={text}
        onChange={handleChange}
      />
    </div>
  );
}
