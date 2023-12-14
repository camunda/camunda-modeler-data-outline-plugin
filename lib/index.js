import { registerClientExtension, registerCloudBpmnJSPlugin } from 'camunda-modeler-plugin-helpers';

import bpmnJSModule from './bpmnJSModule';
import BottomPanel from './bottomPanel';

registerClientExtension(BottomPanel);
registerCloudBpmnJSPlugin(bpmnJSModule);