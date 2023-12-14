
export function createVariableMap(allVariables) {
  return allVariables.reduce((acc, variable) => {
    const scope = variable.scope;

    const entry = findOrCreateScope(scope, acc);

    entry.$variables = entry.$variables || [];

    entry.$variables.push(variable);

    return acc;
  }, {});
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