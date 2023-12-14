/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

import { Fill } from 'camunda-modeler-plugin-helpers/components';
import { HANDLER } from '../utils/messageUtil';
import Content from './TabContent';


export default function(props) {

  const { subscribe } = props;

  const [ variableMap, setVariableMap ] = useState({});
  const [ injector, setInjector ] = useState({});
  const [ layout, setLayout ] = useState({});
  const [ activeTab, setActiveTab ] = useState({});

  useEffect(() => {
    HANDLER['CLIENT'] = (action, payload) => {

      if (action === 'setVariableMap') {
        setVariableMap({
          ...variableMap,
          [activeTab.id]: payload
        });
      }

      if (action === 'setInjector') {
        setInjector({
          ...injector,
          [activeTab.id]: payload
        });
      }
    };

    return () => {
      HANDLER['CLIENT'] = () => {};
    };
  }, [ activeTab, injector, variableMap ]);

  useEffect(() => {
    subscribe('app.activeTabChanged', ({ activeTab }) => {
      setActiveTab(activeTab);
    });
  }, [ subscribe ]);

  return (
    <>
      {activeTab.type === 'cloud-bpmn' && <Fill slot="bottom-panel" label="Data Outline" id="c8-outline" variableMap={ variableMap }>
        <Content variableMap={ variableMap[activeTab.id] } injector={ injector[activeTab.id] } layout={ layout } setLayout={ setLayout } />
      </Fill>
      }
    </>
  );
}


