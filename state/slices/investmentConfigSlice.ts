import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Configuration } from '../../types/illustrations';

interface InvestmentState {
  configurations: Configuration[];
}

const initialState: InvestmentState = {
  configurations: [],
};

const investmentSlice = createSlice({
  name: 'investment',
  initialState,
  reducers: {
    addConfiguration: (state, action: PayloadAction<Configuration>) => {
      state.configurations.push(action.payload);
    },
    updateConfiguration: (
      state,
      action: PayloadAction<{ index: number; config: Partial<Configuration> }>
    ) => {
      const { index, config } = action.payload;
      if (state.configurations[index]) {
        state.configurations[index] = { ...state.configurations[index], ...config };
      }
    },
    removeConfiguration: (state, action: PayloadAction<number>) => {
      state.configurations.splice(action.payload, 1);
    },
  },
});

export const { addConfiguration, updateConfiguration, removeConfiguration } = investmentSlice.actions;

export const selectInvestmentConfigs = (state: RootState) => state.investment.configurations;

export default investmentSlice.reducer;
