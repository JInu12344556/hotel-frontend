// reducers/index.js
import { combineReducers } from 'redux';
// Import your reducers here
import exampleReducer from './Examplereducer';

const rootReducer = combineReducers({
  // Add your reducers here
  example: exampleReducer,
  // Add more reducers as needed
});

export default rootReducer;
