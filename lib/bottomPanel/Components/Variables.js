// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

import { FlowConnection } from '@carbon/icons-react';
import { getName } from '../../utils/elementUtil';
import Tree from './Tree';
import { VariableOrigin, VariableType } from './Labels';

export default function(
    {
      variableMap = {},
      injector = { get: () => { } },
      layout = {},
      setLayout = () => { }
    }
) {

  // Highlight handling
  const [ highlightedElements, setHighlightedElements ] = useState([]);

  const onSelect = (ids) => {
    if (!ids) {
      return setHighlightedElements([]);
    }

    if (!Array.isArray(ids)) {
      ids = [ ids ];
    }

    setHighlightedElements(ids);
  };

  useEffect(() => {
    const canvas = injector.get('canvas');

    highlightedElements.forEach(id => canvas.addMarker(id, 'dataOutline-highlight'));

    return () => {
      highlightedElements.forEach(id => canvas.removeMarker(id, 'dataOutline-highlight'));
    };
  }, [ injector, highlightedElements ]);


  // Skip root level - it's always definitons and not relevant for the user
  const variableNodes = Object.keys(variableMap).flatMap(key => {
    return createNodes({
      variableMap: variableMap[key],
      idPrefix: key,
      onSelect
    });
  });

  return <Tree variableNodes={ variableNodes } layout={ layout } setLayout={ setLayout } />;
}

const createNodes = ({
  variableMap,
  idPrefix = '',
  onSelect
}) => {
  const nodes = Object.keys(variableMap).flatMap(key => {
    if (key.startsWith('$')) {
      return [];
    }

    // Handle nested scopes
    const scope = variableMap[key];
    const id = idPrefix + '-' + key;
    return {
      id: id,
      value: id,
      label: getName(scope.$details),
      isExpanded: true,
      renderIcon: FlowConnection,
      children: createNodes({ variableMap: scope, idPrefix: id, onSelect })
    };
  });

  const variableNodes = createVariableNodes({
    variables: variableMap['$variables'],
    onSelect
  });

  variableNodes && nodes.push(...variableNodes);

  return nodes;
};

function createVariableNodes({ variables, idPrefix = '', onSelect }) {
  if (!variables || !variables.length) {
    return null;
  }

  return variables.map(variable => {

    const onMouseEnter = (e) => {
      onSelect(variable.origin?.map(o => o.id));
    };

    const onMouseOut = (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        onSelect([]);
      }
    };

    return {
      id: idPrefix + '-' + variable.name,
      value: variable.name,
      label: <>
        {variable.name}
        <VariableOrigin variable={ variable } />
        <VariableType variable={ variable } />
      </>,
      onMouseEnter: variable.origin?.length && onMouseEnter,
      onMouseOut: variable.origin?.length && onMouseOut,
      isExpanded: false,
      children: createVariableNodes({ variables: variable.entries, idPrefix: idPrefix + '-' + variable.name, onSelect })
    };
  });
}

