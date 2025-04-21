import { combineReducers, configureStore } from '@reduxjs/toolkit';

const reducer = combineReducers({});

const store = configureStore({
  reducer,
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
