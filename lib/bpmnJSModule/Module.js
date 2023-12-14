import { HANDLER } from '../utils/messageUtil';

export default function VariableMapModule(eventBus, variableResolver, injector) {

  HANDLER['BPMN-JS'] = (...payload) => {

    // Handle messages from tab
    console.log(payload);
  };

  async function getVariableTree() {
    const allVariables = await variableResolver.getVariables();


    HANDLER['CLIENT']('setInjector', injector);
    HANDLER['CLIENT']('setVariableMap', allVariables);
  }


  eventBus.on('commandStack.changed', e => {
    getVariableTree();
  });

  eventBus.on('import.done', e => {
    getVariableTree();
  });


  // getVariableTree();
}

VariableMapModule.$inject = [
  'eventBus',
  'variableResolver',
  'injector'
];
