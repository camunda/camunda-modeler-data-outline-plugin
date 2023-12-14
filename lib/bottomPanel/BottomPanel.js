/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import React, { useState, useEffect } from 'react';

import { Fill } from 'camunda-modeler-plugin-helpers/components';
import { HANDLER } from '../utils/messageUtil';
import VariableTree from './VariableTree';


export default function(props) {

  const { subscribe } = props;

  const [ tabType, setTabType ] = useState(null);
  const [ variableMap, setVariableMap ] = useState({});
  const [ injector, setInjector ] = useState(null);
  const [ layout, setLayout ] = useState({});


  useEffect(() => {
    HANDLER['CLIENT'] = (action, payload) => {
      console.log('CLIENT called',action, payload);

      if (action === 'setVariableMap') {
        setVariableMap(payload);
      }
      if (action === 'setInjector') {
        setInjector(payload);
      }
    };

    return () => {
      HANDLER['CLIENT'] = () => {};
    };
  }, []);

  useEffect(() => {
    subscribe('app.activeTabChanged', ({ activeTab }) => {
      setTabType(activeTab.type);
    });
  }, [ subscribe ]);

  return (
    <>
      {tabType === 'cloud-bpmn' && <Fill slot="bottom-panel" label="Data Outline" id="c8-outline" variableMap={ variableMap }>
        <VariableTree variableMap={ variableMap } injector={ injector } layout={ layout } setLayout={ setLayout } />
      </Fill>
      }
    </>
  );
}


