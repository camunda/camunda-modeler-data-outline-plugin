// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Tag } from '@carbon/react';

import { getName } from '../../utils/elementUtil';

export function VariableOrigin({ variable }) {
  if (!variable || !variable.origin || !variable.origin.length) {
    return null;
  }

  let result;

  const names = variable.origin.map(getName);

  if (names.length <= 2) {

    // Concatenate all strings
    result = names.join(', ');
  } else {

    // Concatenate the first two strings
    result = names.slice(0, 2).join(', ') + ', ... (+' + (names.length - 2) + ')';
  }


  return <Tag type="cool-gray" className="dataOutline--Pill" title="Origin">
    {result}
  </Tag>;
}

export function VariableType({ variable }) {
  if (!variable || !variable.type) {
    return null;
  }

  return <Tag type="cyan" className="dataOutline--Pill" title="Type">
    {variable.type}
  </Tag>;
}