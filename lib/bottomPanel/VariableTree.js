import React from 'react'

import { TreeView, TreeNode, Tag } from '@carbon/react';
import { Boolean as BooleanIcon, FlowConnection, ValueVariable, StringText, StringInteger, Help } from '@carbon/icons-react';

import "./style.scss";


export default function ({variableMap, injector, layout, setLayout})  {
  // Skip root level - it's always definitons and not relevant for the user

  const onSelect = (ids) => {
    if(!ids) {
      return;
    }

    if(!Array.isArray(ids)) {
      ids = [ids]
    }
    const selection = injector.get('selection');
    const elementRegistry = injector.get('elementRegistry');

    const elements = ids.map(id => elementRegistry.get(id));

    selection.select(elements);
  }

  const variableNodes = Object.keys(variableMap).flatMap(key => {
    return createNodes({
      variableMap: variableMap[key], 
      idPrefix: key,
      onSelect
    });
  })

  return (<TreeView label="Variable Outline" hideLabel>
    {renderTree({
    nodes: variableNodes,
    layout,
    setLayout
  })}</TreeView>)
}

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

    return <TreeNode key={nodeProps.id} renderIcon={renderIcon} isExpanded={expanded ?? expanded} onToggle={handleToggle} {...nodeProps}>
      {renderTree({
      nodes: children,
      layout,
      setLayout
    })}
    </TreeNode>}
    );
}


const createNodes = ({
  variableMap, 
  idPrefix = '',
  onSelect
}) => {
   const nodes = Object.keys(variableMap).flatMap(key => {
    if(key === '$variables') {
      return createVariableNodes({
        variables: variableMap[key], 
        onSelect
      })
    }

    // Handle nested scopes
    const scope = variableMap[key];

    return {
      id: idPrefix + '-' + key,
      value: key,
      label: key,
      isExpanded: true,
      renderIcon: FlowConnection,
      children: createNodes({variableMap: scope, idPrefix: idPrefix + '-' +  key, onSelect})
    };

  });

  return nodes;
}

function createVariableNodes({variables, idPrefix = '', onSelect}) {
  if(!variables || !variables.length) {
    return null;
  }

  return variables.map(variable => {
    console.log(variable.origin, getIcon(variable))
    return {
      id: idPrefix + '-' + variable.name,
      value: variable.name,
      label: <>{variable.name} {variable.type && <Tag type="cyan" className="variableTypePill" title={variable.type}>
      {variable.type || 'null'}
    </Tag>}</>,
      // renderIcon: getIcon(variable),
      isExpanded: false,
      onSelect: () => onSelect(variable.origin?.map(o => o.id)),
      children: createVariableNodes({variables: variable.entries, idPrefix: idPrefix + '-' + variable.name, onSelect})
    }
  });
}

function getIcon(variable) {

  if(variable.type === 'Context') {
    return ValueVariable;
  }
  if(variable.type === 'String') {
    return StringText;
  }
  if(variable.type === 'Number') {
    return StringInteger;
  }
  if(variable.type === 'Boolean') {
    return BooleanIcon;
  }
  return Help;
}