import merge from './lib/merge';

// Returns the initialState of the app
const main = (...additions) => additions.reduce((acc, item) => merge(acc, item), {});

export default main;