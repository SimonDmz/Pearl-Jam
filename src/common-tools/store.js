import React, { createContext, useReducer } from 'react';
import { initAuth } from './auth/initAuth';

const initialState = {
  authInitialized: false,
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'initAuth':
        initAuth();
        return {
          ...state,
          authInitialized: true,
        };

      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
