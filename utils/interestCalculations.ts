export const calculateContinuousCompounding = (principal: number, rate: number, time: number) => {
  return principal * Math.exp(rate * time);
};
