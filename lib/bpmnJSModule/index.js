import {
  ZeebeVariableResolverModule
} from '@bpmn-io/variable-resolver';

import VariableMapModule from './Module';

export default {
  __init__: [
    'exampleModule',
  ],
  __depends__: [
    ZeebeVariableResolverModule
  ],
  exampleModule: [ 'type', VariableMapModule ],
};
