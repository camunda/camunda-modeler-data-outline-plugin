export default function ExampleModule(eventBus) {

  // TODO: implement module
  eventBus.on('selection.changed', e => {
    console.log('selection.changed', e.newSelection);
  });
}

ExampleModule.$inject = [
  'eventBus'
];