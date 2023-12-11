/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import { useState, useEffect } from 'camunda-modeler-plugin-helpers/react';

import { Fill } from 'camunda-modeler-plugin-helpers/components';


export default function(props) {

  const { subscribe } = props;

  const [ tabType, setTabType ] = useState(null);

  useEffect(() => {
    subscribe('app.activeTabChanged', ({ activeTab }) => {
      setTabType(activeTab.type);
    });
  }, [ subscribe ]);

  return (
    <>
      {tabType === 'cloud-bpmn' && <Fill slot="bottom-panel" label="Data Outline" id="c8-outline">
        <h1>Hello World</h1>
      </Fill>
      }
    </>
  );
}
