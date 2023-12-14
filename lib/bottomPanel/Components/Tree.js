
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { TreeView, TreeNode } from '@carbon/react';

export default function({ variableNodes, layout, setLayout }) {
  return <TreeView label="Variable Outline" hideLabel>
    {renderTree({
      nodes: variableNodes,
      layout,
      setLayout
    })}
  </TreeView>;
}

// Adjusted from https://react.carbondesignsystem.com/?path=/story/components-treeview--default
function renderTree({
  nodes,
  layout,
  setLayout
}) {
  if (!nodes) {
    return;
  }

  return nodes.map(({
    children,
    renderIcon,
    isExpanded,
    ...nodeProps
  }) => {
    const expanded = layout[nodeProps.id] || (typeof layout[nodeProps.id] === 'undefined' && isExpanded);

    const handleToggle = () => {
      setLayout({
        ...layout,
        [nodeProps.id]: !expanded
      });
    };

    return <TreeNode key={ nodeProps.id } renderIcon={ renderIcon } isExpanded={ expanded ?? expanded } onToggle={ handleToggle } { ...nodeProps }>
      {renderTree({
        nodes: children,
        layout,
        setLayout
      })}
    </TreeNode>;
  }
  );
}