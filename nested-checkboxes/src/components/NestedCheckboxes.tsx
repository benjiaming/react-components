import * as React from 'react';

// Define the Node type
interface Node {
  id: string | number;
  name: string;
  children?: Node[];
}

// Define the Props type
interface Props {
  defaultCheckboxData: Node[];
}

export default function NestedCheckboxes({ defaultCheckboxData }: Props): React.JSX.Element {
  const parents: Record<string | number, string | number | null> = {};
  const children: Record<string | number, (string | number)[]> = {};

  // Build the tree structure
  const buildTree = (node: Node, parentId: string | number | null = null) => {
    if (parentId) parents[node.id] = parentId;
    if (node.children) {
      children[node.id] = node.children.map((child) => child.id);
      node.children.forEach((child) => buildTree(child, node.id));
    }
  };
  defaultCheckboxData.forEach((root) => buildTree(root));

  // Initialize the state
  const initialState: Record<string | number, number> = {};
  Object.keys(parents)
    .concat(Object.keys(children))
    .forEach((id) => {
      initialState[id] = 0;
    });
  defaultCheckboxData.forEach((node) => {
    initialState[node.id] = 0;
  });

  // Reducer function
  const reducer = (state: Record<string | number, number>, action: any) => {
    switch (action.type) {
      case 'TOGGLE': {
        console.log('Toggling node:', action.payload.id);
        const { id, parents, children } = action.payload;
        const draft = { ...state };

        // Toggle the clicked node
        draft[id] = draft[id] === 1 ? 0 : 1;

        // Propagate to children
        const updateChildren = (nodeId: string | number, value: number) => {
          (children[nodeId] || []).forEach((childId: string | number) => {
            draft[childId] = value;
            updateChildren(childId, value);
          });
        };
        updateChildren(id, draft[id]);

        // Update parents recursively
        const updateParents = (nodeId: string | number) => {
          const parentId = parents[nodeId];
          if (!parentId) return;
          const childIds = children[parentId] || [];
          const sum = childIds.reduce(
            (acc: number, cid: string | number) =>
              acc + (draft[cid] === 1 ? 2 : draft[cid] === 2 ? 1 : 0),
            0
          );
          const full = childIds.length * 2;

          if (sum === 0) draft[parentId] = 0;
          else if (sum === full) draft[parentId] = 1;
          else draft[parentId] = 2;

          updateParents(parentId);
        };
        updateParents(id);

        return draft;
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleToggle = (id: string | number) => {
    dispatch({ type: 'TOGGLE', payload: { id, parents, children } });
  };

  const Checkbox = ({ node }: { node: Node }) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    // Use useEffect to set the indeterminate state
    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = state[node.id] === 2;
      }
    }, [state[node.id]]); // Update when the state of this node changes

    return (
      <div style={{ marginLeft: 20 }}>
        <label>
          <input
            type="checkbox"
            ref={inputRef} // Attach the ref
            checked={state[node.id] === 1}
            onChange={() => handleToggle(node.id)} // Ensure onChange is registered
          />
          {node.name} ({node.id})
        </label>
        {node.children && (
          <div>
            {node.children.map((child) => (
              <Checkbox key={child.id} node={child} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {defaultCheckboxData.map((node) => (
        <Checkbox key={node.id} node={node} />
      ))}
    </div>
  );
}
