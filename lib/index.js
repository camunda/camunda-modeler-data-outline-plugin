import { registerClientExtension, registerCloudBpmnJSModdleExtension } from 'camunda-modeler-plugin-helpers';

import bpmnJSModule from './bpmnJSModule';
import BottomPanel from './bottomPanel';

registerClientExtension(BottomPanel);
registerCloudBpmnJSModdleExtension(bpmnJSModule);