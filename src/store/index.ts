import { configureStore } from '@reduxjs/toolkit';
import { statusReducer } from '@slices/status';
import { filesReducer } from '@slices/files';

const store = configureStore({
  reducer: {
    status: statusReducer,
    files: filesReducer,
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
