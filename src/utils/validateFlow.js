// Function to validate the chatbot flow before saving
// Ensures that there are not multiple nodes without outgoing edges (i.e., dangling nodes)

export const validateFlow = (nodes, edges) => {
  // If there's only one or zero nodes, it's always valid
  if (nodes.length <= 1) return false;

  // Get a list of all target node IDs from the edges
  const targets = edges.map(e => e.target);

  // Find all nodes that are NOT a target of any edge (i.e., no incoming connections)
  const nodesWithoutTarget = nodes.filter(n => !targets.includes(n.id));

  // If more than one such node exists, return true to indicate an invalid flow
  return nodesWithoutTarget.length > 1;
};
