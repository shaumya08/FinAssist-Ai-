import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, ClipboardCheck } from "lucide-react";
import { motion } from "framer-motion";

interface EligibilityResult {
  category: string;
  items: { name: string; eligible: boolean; reason: string }[];
}

function checkEligibility(age: number, income: number, occupation: string): EligibilityResult[] {
  const results: EligibilityResult[] = [];

  // Loans
  const loanItems = [];
  loanItems.push({
    name: "Personal Loan",
    eligible: income >= 15000 && age >= 21 && age <= 60,
    reason: income < 15000 ? "Min income ₹15,000/month" : age < 21 || age > 60 ? "Age must be 21-60" : "You qualify!",
  });
  loanItems.push({
    name: "Home Loan (PMAY)",
    eligible: income <= 150000 && age >= 18,
    reason: income > 150000 ? "PMAY for income up to ₹1.5L/month" : age < 18 ? "Must be 18+" : "You qualify!",
  });
  loanItems.push({
    name: "MUDRA Loan",
    eligible: ["Self-Employed", "Business Owner", "Freelancer"].includes(occupation),
    reason: !["Self-Employed", "Business Owner", "Freelancer"].includes(occupation) ? "For self-employed/business" : "You qualify!",
  });
  results.push({ category: "Loans", items: loanItems });

  // Government Schemes
  const schemeItems = [];
  schemeItems.push({ name: "Jan Dhan Yojana", eligible: age >= 10, reason: age < 10 ? "Must be 10+" : "Open to all citizens 10+" });
  schemeItems.push({ name: "Atal Pension Yojana", eligible: age >= 18 && age <= 40, reason: age < 18 || age > 40 ? "Age must be 18-40" : "You qualify!" });
  schemeItems.push({ name: "Sukanya Samriddhi", eligible: true, reason: "For parents of girl child below 10 years" });
  results.push({ category: "Government Schemes", items: schemeItems });

  // Insurance
  const insuranceItems = [];
  insuranceItems.push({ name: "LIC Jeevan Anand", eligible: age >= 18 && age <= 50, reason: age < 18 || age > 50 ? "Age must be 18-50" : "You qualify!" });
  insuranceItems.push({ name: "LIC Jeevan Umang", eligible: age >= 0 && age <= 55, reason: age > 55 ? "Max entry age 55" : "You qualify!" });
  insuranceItems.push({ name: "LIC New Endowment", eligible: age >= 8 && age <= 55, reason: age < 8 || age > 55 ? "Age must be 8-55" : "You qualify!" });
  results.push({ category: "LIC Insurance", items: insuranceItems });

  // Pension
  const pensionItems = [];
  pensionItems.push({ name: "Atal Pension Yojana", eligible: age >= 18 && age <= 40, reason: age < 18 || age > 40 ? "Age must be 18-40" : "You qualify!" });
  pensionItems.push({ name: "NPS (National Pension)", eligible: age >= 18 && age <= 70, reason: age < 18 || age > 70 ? "Age must be 18-70" : "You qualify!" });
  results.push({ category: "Pension Schemes", items: pensionItems });

  return results;
}

export default function EligibilityChecker() {
  const [age, setAge] = useState(30);
  const [income, setIncome] = useState(50000);
  const [occupation, setOccupation] = useState("Salaried");
  const [results, setResults] = useState<EligibilityResult[] | null>(null);

  const occupations = ["Salaried", "Self-Employed", "Business Owner", "Freelancer", "Student", "Retired", "Homemaker"];

  const handleCheck = () => {
    setResults(checkEligibility(age, income, occupation));
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-10">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ClipboardCheck className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold">Financial Eligibility Checker</h1>
          </div>
          <p className="text-sm text-muted-foreground">Check your eligibility for loans, schemes, insurance, and pensions.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="surface-card p-5 space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Age</label>
              <Input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Monthly Income (₹)</label>
              <Input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Occupation</label>
              <select value={occupation} onChange={(e) => setOccupation(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                {occupations.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <Button className="w-full" onClick={handleCheck}>Check Eligibility</Button>
          </div>

          {results && (
            <div className="md:col-span-2 space-y-4">
              {results.map((group, gi) => (
                <motion.div key={group.category} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: gi * 0.08 }} className="surface-card p-5">
                  <h3 className="font-semibold text-sm mb-3">{group.category}</h3>
                  <div className="space-y-2">
                    {group.items.map((item) => (
                      <div key={item.name} className="flex items-center justify-between gap-3 py-2 border-b border-border/50 last:border-0">
                        <div className="flex items-center gap-2">
                          {item.eligible ? <CheckCircle className="h-4 w-4 text-primary" /> : <XCircle className="h-4 w-4 text-destructive" />}
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{item.reason}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
