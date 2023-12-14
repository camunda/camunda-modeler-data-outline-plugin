import { HANDLER } from '../utils/messageUtil';


console.log('here');
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

    console.log('variableMap', variableMap);
    HANDLER['CLIENT']('setVariableMap', variableMap);
  }

  HANDLER['CLIENT']('setInjector', injector);


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
    treeScope[scope.id] = treeScope[scope.id] || {};
    treeScope = treeScope[scope.id];
  });

  return treeScope;

}