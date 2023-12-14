// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Tag } from '@carbon/react';

import './Labels.scss';

import { getName } from '../../utils/elementUtil';

export function VariableOrigin({ variable }) {
  if (!variable || !variable.origin || !variable.origin.length) {
    return null;
  }

  let result;

  const names = variable.origin.map(getName);

  if (names.length <= 2) {

    // Concatenate all strings
    result = names.map(createScopeTag);
  } else {

    // Concatenate the first two strings
    result = [ ...names.slice(0, 2).map(createScopeTag), createScopeTag(`+${names.length - 2}`) ];
  }

  return result;
}

export function VariableType({ variable }) {
  if (!variable || !variable.type) {
    return null;
  }

  let type = variable.type;

  if (type.endsWith('|')) {
    type = type.slice(0, -1);
  }

  if (type.startsWith('|')) {
    type = type.slice(1);
  }

  return <Tag type="cyan" className="dataOutline--Pill" title="Type">
    {type}
  </Tag>;
}


function createScopeTag(name) {
  return <Tag type="cool-gray" key={ name } className="dataOutline--Pill" title="Origin">
    {name}
  </Tag>;
}