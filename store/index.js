// we have created a separate file for the 'store' definition because it is particularly complex
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';

// this is for redux devtools, we use this in place of 'compose' when applying other middleware to the store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// second argument is default state for the application
const store = createStore(
  reducers,
  {},
  composeEnhancers(
    applyMiddleware(thunk),
    autoRehydrate()
  )
);

persistStore(store, { storage: AsyncStorage, whitelist: ['likedJobs'] });
//.purge();

export default store;
