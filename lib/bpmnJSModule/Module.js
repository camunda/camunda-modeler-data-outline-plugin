export default function VariableMapModule(eventBus, variableResolver) {

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

    console.log(variableMap);
  }

  eventBus.on('commandStack.changed', e => {
    getVariableTree();
  });
}

VariableMapModule.$inject = [
  'eventBus',
  'variableResolver'
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