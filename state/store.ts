import { configureStore } from '@reduxjs/toolkit';
import investmentReducer from './slices/investmentConfigSlice';

const store = configureStore({
  reducer: {
    investment: investmentReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
