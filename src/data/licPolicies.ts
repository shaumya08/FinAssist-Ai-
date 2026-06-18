export interface LICPolicy {
  id: string;
  name: string;
  planNo: string;
  type: string;
  shortDesc: string;
  description: string;
  eligibility: { minAge: number; maxAge: number; minTerm: number; maxTerm: number; minSA: number };
  benefits: string[];
  features: string[];
}

export const licPolicies: LICPolicy[] = [
  {
    id: "jeevan-anand",
    name: "LIC Jeevan Anand",
    planNo: "Plan 915",
    type: "Endowment with Whole Life Cover",
    shortDesc: "Combines savings with life-long protection even after maturity.",
    description: "Jeevan Anand is a participating non-linked plan that provides financial protection to the family in case of death during the policy term and a lump sum at maturity. The life cover continues even after the policy matures.",
    eligibility: { minAge: 18, maxAge: 50, minTerm: 15, maxTerm: 35, minSA: 100000 },
    benefits: [
      "Death benefit: Sum Assured + Bonuses during policy term",
      "Maturity: Sum Assured + Accrued bonuses",
      "Post-maturity death: Basic Sum Assured paid to nominee",
      "Loan facility available after 3 years",
      "Tax benefits under Section 80C & 10(10D)",
    ],
    features: ["Whole life risk cover", "Bonus accumulation", "Loan facility", "Optional riders"],
  },
  {
    id: "jeevan-umang",
    name: "LIC Jeevan Umang",
    planNo: "Plan 945",
    type: "Whole Life with Regular Income",
    shortDesc: "Whole life plan providing survival benefits at regular intervals.",
    description: "Jeevan Umang is a whole life participating plan providing guaranteed survival benefits at periodic intervals. After the premium paying term, the policyholder receives 8% of Sum Assured every year for life.",
    eligibility: { minAge: 90, maxAge: 55, minTerm: 15, maxTerm: 30, minSA: 200000 },
    benefits: [
      "8% of Sum Assured as survival benefit every year",
      "Death: 10× annualized premium or Sum Assured + bonuses",
      "Maturity at age 100: Sum Assured + Final Additional Bonus",
      "Loan available after 2 years",
      "Tax benefits under Section 80C & 10(10D)",
    ],
    features: ["Lifelong regular income", "Whole life cover up to 100", "Bonus accumulation", "Loan facility"],
  },
  {
    id: "new-endowment",
    name: "LIC New Endowment Plan",
    planNo: "Plan 914",
    type: "Traditional Endowment",
    shortDesc: "Balanced savings and protection plan with guaranteed returns.",
    description: "The New Endowment Plan offers a combination of savings and protection. It provides a lump sum amount at maturity for the surviving policyholder or to the nominee in case of death during the term.",
    eligibility: { minAge: 8, maxAge: 55, minTerm: 12, maxTerm: 35, minSA: 100000 },
    benefits: [
      "Death benefit: Sum Assured + Accrued bonuses",
      "Maturity: Sum Assured + Accrued bonuses + Final bonus",
      "Loan facility after 3 years",
      "Premium waiver with AD rider",
      "Tax benefits under Section 80C & 10(10D)",
    ],
    features: ["Guaranteed maturity value", "Bonus participation", "Loan facility", "Flexible premium payment terms"],
  },
];

export function estimatePremium(sumAssured: number, age: number, term: number): number {
  // Simplified premium estimation (actual LIC premiums vary)
  const baseRate = 45; // per ₹1000 SA for age 30, 20-year term
  const ageFactor = 1 + (age - 30) * 0.02;
  const termFactor = 1 + (20 - term) * 0.015;
  const premium = (sumAssured / 1000) * baseRate * ageFactor * termFactor;
  return Math.round(Math.max(premium, 1500));
}

export function estimateMaturity(sumAssured: number, term: number, bonusRate: number = 48): number {
  // bonus rate per ₹1000 SA per year (approximate)
  const totalBonus = (sumAssured / 1000) * bonusRate * term;
  const finalBonus = sumAssured * 0.05;
  return Math.round(sumAssured + totalBonus + finalBonus);
}
