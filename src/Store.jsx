// store.js
import { createStore } from 'redux';
import rootReducer from './Reducer'; // Import your combined reducers

const store = createStore(rootReducer); // Create your Redux store with combined reducers

export default store;
