export type InvestmentIllustration = {
  label: string;
  principleInvestment: number;
  interestRate: number;
  investmentDuration: number;
  investmentDurationUnit: 'years' | 'months';
  compoundingFrequency: 'continuously' | 'daily' | 'monthly' | 'quarterly' | 'annually';
  recurringInvestmentAmount?: number;
  recurringInvestmentFrequency?: 'daily' | 'weekly' | 'monthly' | 'annually';
  recurringInvestmentFrequencyUnit?: 'years' | 'months';
  startDate?: string;
  endDate?: string;
  inflationRate?: number;
  taxRate?: number;
  compoundingStartDelay?: number;
  currency?: string;
  investmentGoal?: number;
};

export type Configuration = {
  label: string;
  dateCreated: string;
  color: string;
  tags: string[];
  illustrations: InvestmentIllustration[];
};
