export interface BankFDRate {
  bank: string;
  rates: { tenure: string; general: number; senior: number }[];
}

export const bankFDRates: BankFDRate[] = [
  {
    bank: "State Bank of India",
    rates: [
      { tenure: "7–45 days", general: 3.5, senior: 4.0 },
      { tenure: "46–179 days", general: 5.5, senior: 6.0 },
      { tenure: "180–364 days", general: 6.5, senior: 7.0 },
      { tenure: "1–2 years", general: 7.0, senior: 7.5 },
      { tenure: "2–3 years", general: 7.0, senior: 7.5 },
      { tenure: "3–5 years", general: 6.5, senior: 7.25 },
      { tenure: "5–10 years", general: 6.5, senior: 7.5 },
    ],
  },
  {
    bank: "HDFC Bank",
    rates: [
      { tenure: "7–29 days", general: 3.5, senior: 4.0 },
      { tenure: "30–90 days", general: 4.5, senior: 5.0 },
      { tenure: "91–180 days", general: 5.75, senior: 6.25 },
      { tenure: "181–364 days", general: 6.6, senior: 7.1 },
      { tenure: "1–2 years", general: 7.15, senior: 7.65 },
      { tenure: "2–3 years", general: 7.2, senior: 7.7 },
      { tenure: "3–5 years", general: 7.0, senior: 7.5 },
      { tenure: "5–10 years", general: 7.0, senior: 7.75 },
    ],
  },
  {
    bank: "ICICI Bank",
    rates: [
      { tenure: "7–29 days", general: 3.5, senior: 4.0 },
      { tenure: "30–90 days", general: 4.5, senior: 5.0 },
      { tenure: "91–180 days", general: 5.5, senior: 6.0 },
      { tenure: "181–364 days", general: 6.7, senior: 7.2 },
      { tenure: "1–2 years", general: 7.1, senior: 7.6 },
      { tenure: "2–3 years", general: 7.25, senior: 7.75 },
      { tenure: "3–5 years", general: 7.0, senior: 7.5 },
      { tenure: "5–10 years", general: 6.9, senior: 7.4 },
    ],
  },
];

export function calculateFD(principal: number, ratePercent: number, tenureMonths: number) {
  const r = ratePercent / 100;
  const n = 4; // quarterly compounding
  const t = tenureMonths / 12;
  const maturityAmount = principal * Math.pow(1 + r / n, n * t);
  const totalInterest = maturityAmount - principal;
  const maturityDate = new Date();
  maturityDate.setMonth(maturityDate.getMonth() + tenureMonths);
  return {
    maturityAmount: Math.round(maturityAmount),
    totalInterest: Math.round(totalInterest),
    maturityDate: maturityDate.toISOString().split("T")[0],
  };
}
