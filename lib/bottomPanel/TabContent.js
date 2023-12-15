// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

import EmptyState from './Components/EmptyState';
import Variables from './Components/Variables';

import './style.scss';
import { Search } from '@carbon/react';
import { createVariableMap } from '../utils/variableUtil';
import EmptySearch from './Components/EmptySearch';

export default function(props) {

  const {
    variables = {}
  } = props;

  const [ search, setSearch ] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const allVariables = Object.values(variables).flat();

  if (allVariables.length === 0) {
    return <EmptyState />;
  }

  const filteredVariables = allVariables.filter(variableFilter(search));
  const filteredVariableMap = createVariableMap(filteredVariables);

  return <div className="plg-do-tab-content">
    <Search
      className="plg-do-search"
      size="lg"
      placeholder="Filter variables for name, origin, or scope"
      labelText="Filter"
      closeButtonLabelText="Clear filter input"
      id="search-1"
      onChange={ handleSearch }
      value={ search } />
    <div class="plg-do-variable-tree">
      {filteredVariables.length > 0 ?
        <Variables { ...props } variableMap={ filteredVariableMap } /> :
        <EmptySearch />
      }
    </div>
  </div>;
}

const variableFilter = search => variable => {

  // No filter
  if (!search) {
    return true;
  }

  search = search.toLowerCase();

  // Filter Variable Name
  if (variable.name?.toLowerCase().includes(search)) {
    return true;
  }

  // Filter Origin
  if (
    variable.origin.find(element => {
      return element.name?.toLowerCase().includes(search) || element.id.toLowerCase().includes(search);
    })
  ) {
    return true;
  }

  // Filter Scope
  if (
    variable.scope.name?.toLowerCase().includes(search) || variable.scope.id.toLowerCase().includes(search)
  ) {
    return true;
  }

  return false;
};