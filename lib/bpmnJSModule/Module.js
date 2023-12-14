import { HANDLER } from '../utils/messageUtil';

export default function VariableMapModule(eventBus, variableResolver, injector) {

  HANDLER['BPMN-JS'] = (...payload) => {

    // Handle messages from tab
    console.log(payload);
  };

  async function getVariableTree() {
    const allVariables = await variableResolver.getVariables();

    let variableMap = {};

    Object.keys(allVariables).forEach(key => {

      const processVariables = allVariables[key];

      variableMap = processVariables.reduce((acc, variable) => {
        const scope = variable.scope;

        const entry = findOrCreateScope(scope, acc);

        entry.$variables = entry.$variables || [];

        entry.$variables.push(variable);

        return acc;
      }, variableMap);
    });

    HANDLER['CLIENT']('setInjector', injector);
    HANDLER['CLIENT']('setVariableMap', variableMap);
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


function findOrCreateScope(scope, variableTree) {
  const scopePath = [ scope ];

  let i = scope;
  while (i.$parent) {
    i = i.$parent;
    scopePath.unshift(i);
  }

  let treeScope = variableTree;
  scopePath.forEach(scope => {
    treeScope[scope.id] = treeScope[scope.id] || { $details: scope };
    treeScope = treeScope[scope.id];
  });

  return treeScope;

}