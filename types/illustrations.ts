export type InvestmentIllustration = {
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
  compoundingStartDelay?: number;
  currency?: string;
  investmentGoal?: number;
};

export type Configuration = {
  label: string;
  dateCreated: Date;
  color: string;
  tags: string[];
  illustrations: InvestmentIllustration[];
};
