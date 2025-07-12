import { Handle, Position } from 'reactflow';

export default function TextNode({ data }) {
  return (
    <div className="bg-white border rounded shadow-md px-4 py-2 text-center min-w-[200px]">
      {/* Node Header: Icon + Title */}
      <div className="bg-teal-100 font-semibold text-sm text-left px-2 py-1 rounded-t">
        💬 Send Message
      </div>

      {/* Node Content: dynamic label */}
      <div className="text-black text-base py-2">{data.label}</div>

      {/* Input Handle (left side) */}
      <Handle
        type="target"              // this handle is for incoming edges
        position={Position.Left}   // position on the left
        className="w-2 h-2 bg-black"
      />

      {/* Output Handle (right side) */}
      <Handle
        type="source"              // this handle is for outgoing edges
        position={Position.Right}  // position on the right
        className="w-2 h-2 bg-black"
      />
    </div>
  );
}
