export interface GovernmentScheme {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  interestRate?: string;
  officialLink: string;
  category: "savings" | "loan" | "pension" | "housing" | "insurance";
  icon: string;
}

export const governmentSchemes: GovernmentScheme[] = [
  {
    id: "pmjdy",
    name: "Pradhan Mantri Jan Dhan Yojana",
    shortDesc: "Zero-balance savings account with insurance cover for every household.",
    description: "PMJDY is a national mission for financial inclusion to ensure access to financial services — banking, savings, deposit, remittance, credit, insurance, and pension — in an affordable manner.",
    eligibility: [
      "Any Indian citizen above 10 years of age",
      "No minimum balance required",
      "Valid KYC documents needed",
    ],
    benefits: [
      "Free zero-balance savings account",
      "RuPay debit card with ₹2 lakh accident insurance",
      "₹30,000 life insurance cover",
      "Overdraft facility up to ₹10,000",
      "Direct benefit transfer from government",
    ],
    interestRate: "4% p.a. on savings",
    officialLink: "https://pmjdy.gov.in",
    category: "savings",
    icon: "🏦",
  },
  {
    id: "mudra",
    name: "Pradhan Mantri Mudra Yojana",
    shortDesc: "Collateral-free loans up to ₹10 lakh for micro-enterprises.",
    description: "PMMY provides loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises. Loans are classified as Shishu (up to ₹50,000), Kishore (₹50,001 to ₹5 lakh), and Tarun (₹5,00,001 to ₹10 lakh).",
    eligibility: [
      "Any Indian citizen with a business plan",
      "Non-farm income-generating activities",
      "Manufacturing, trading, or service sector",
      "No collateral required",
    ],
    benefits: [
      "Collateral-free loans",
      "Three categories: Shishu, Kishore, Tarun",
      "Low interest rates",
      "Mudra Card for working capital",
      "Available through all banks and MFIs",
    ],
    interestRate: "7.30% – 12% p.a.",
    officialLink: "https://www.mudra.org.in",
    category: "loan",
    icon: "💼",
  },
  {
    id: "pmay",
    name: "Pradhan Mantri Awas Yojana",
    shortDesc: "Affordable housing with interest subsidy for EWS/LIG/MIG families.",
    description: "PMAY aims to provide affordable housing to urban poor by 2024. It offers interest subsidy on home loans through Credit Linked Subsidy Scheme (CLSS).",
    eligibility: [
      "EWS: Annual income up to ₹3 lakh",
      "LIG: Annual income ₹3–6 lakh",
      "MIG-I: Annual income ₹6–12 lakh",
      "MIG-II: Annual income ₹12–18 lakh",
      "No house owned by any family member",
    ],
    benefits: [
      "Interest subsidy of 3% to 6.5% on home loans",
      "Subsidy for loan tenure up to 20 years",
      "Benefit ranges from ₹2.35 lakh to ₹2.67 lakh",
      "Covers new construction and enhancement",
    ],
    interestRate: "6.5% subsidy for EWS/LIG",
    officialLink: "https://pmaymis.gov.in",
    category: "housing",
    icon: "🏠",
  },
  {
    id: "ssy",
    name: "Sukanya Samriddhi Yojana",
    shortDesc: "High-interest savings scheme for the girl child with tax benefits.",
    description: "SSY is a government-backed small savings scheme aimed at parents of girl children. It offers one of the highest interest rates among small savings instruments with full tax exemption.",
    eligibility: [
      "Girl child below 10 years of age",
      "Maximum 2 accounts per family",
      "Account opened by natural/legal guardian",
      "Minimum ₹250/year deposit",
    ],
    benefits: [
      "Current interest rate: 8.2% p.a. (compounded yearly)",
      "Tax-free under Section 80C (EEE status)",
      "Partial withdrawal at 18 for education",
      "Matures after 21 years from opening",
      "Maximum deposit ₹1.5 lakh/year",
    ],
    interestRate: "8.2% p.a.",
    officialLink: "https://www.india.gov.in/sukanya-samriddhi-yojna",
    category: "savings",
    icon: "👧",
  },
  {
    id: "apy",
    name: "Atal Pension Yojana",
    shortDesc: "Guaranteed monthly pension of ₹1,000–₹5,000 after age 60.",
    description: "APY is a pension scheme for workers in the unorganized sector. It guarantees a minimum monthly pension of ₹1,000 to ₹5,000 after the age of 60.",
    eligibility: [
      "Indian citizen aged 18–40 years",
      "Must have a savings bank account",
      "Not an income tax payer",
      "Aadhaar and mobile number linked to account",
    ],
    benefits: [
      "Guaranteed pension: ₹1,000 to ₹5,000/month",
      "Government co-contribution of 50% for 5 years",
      "Spouse receives same pension after subscriber's death",
      "Nominee receives accumulated corpus",
      "Tax benefits under Section 80CCD",
    ],
    interestRate: "Varies by entry age and pension amount",
    officialLink: "https://www.npscra.nsdl.co.in/scheme-details.php",
    category: "pension",
    icon: "🧓",
  },
];
