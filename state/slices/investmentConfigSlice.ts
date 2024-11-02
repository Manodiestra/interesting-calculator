import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InvestmentIllustration = {
  principleInvestment: number;
  interestRate: number;
  investmentDuration: number;
  investmentDurationUnit: 'years' | 'months';
  compoundingFrequency: 'continuously' | 'daily' | 'monthly' | 'quarterly' | 'annually';
  recurringInvestmentAmount?: number;
  recurringInvestmentFrequency?: 'daily' | 'weekly' | 'monthly' | 'annually';
  recurringInvestmentFrequencyUnit?: 'years' | 'months';
  startDate?: Date;
  endDate?: Date;
  inflationRate?: number;
  taxRate?: number;
  compoundingStartDelay?: number; // Optional delay before compounding
  currency?: string;
  investmentGoal?: number;
};

type Configuration = {
  label: string;
  dateCreated: Date;
  color: string;
  tags: string[];
  illustrations: InvestmentIllustration[];
};

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
