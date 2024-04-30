
export function createVariableMap(allVariables) {
  return allVariables.reduce((acc, variable) => {
    const origins = variable.origin;

    origins.forEach(origin => {
      const entry = findOrCreateScope(origin, acc);

      addVariable(variable, entry);
    });

    const scope = variable.scope;
    const entry = findOrCreateScope(scope, acc);

    addVariable(variable, entry);

    return acc;
  }, {});
}

function addVariable(v, entry) {
  entry.$variables = entry.$variables || [];

  entry.$variables.includes(v) || entry.$variables.push(v);
}

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