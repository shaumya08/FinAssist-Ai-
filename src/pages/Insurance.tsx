import { useState } from "react";
import { licPolicies, estimatePremium, estimateMaturity } from "@/data/licPolicies";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Shield, Calculator, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Insurance() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [calcPolicy, setCalcPolicy] = useState(licPolicies[0].id);
  const [age, setAge] = useState(30);
  const [term, setTerm] = useState(20);
  const [sumAssured, setSumAssured] = useState(500000);

  const premium = estimatePremium(sumAssured, age, term);
  const maturity = estimateMaturity(sumAssured, term);

  return (
    <div className="min-h-screen pt-20 px-4 pb-10">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold">Insurance (LIC) Plans</h1>
          </div>
          <p className="text-sm text-muted-foreground">Compare LIC policies, estimate premiums, and calculate maturity values.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Policies */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-semibold text-lg">Policy Comparison</h2>
            {licPolicies.map((policy, i) => (
              <motion.div key={policy.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="surface-card overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-sm">{policy.name}</h3>
                        <Badge variant="outline" className="text-xs font-mono">{policy.planNo}</Badge>
                      </div>
                      <p className="text-xs text-primary mb-1">{policy.type}</p>
                      <p className="text-sm text-muted-foreground">{policy.shortDesc}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setExpanded(expanded === policy.id ? null : policy.id)}>
                      {expanded === policy.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <AnimatePresence>
                  {expanded === policy.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-5 pb-5 border-t border-border pt-4 space-y-4">
                        <p className="text-sm text-muted-foreground">{policy.description}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="surface-card p-2 text-center">
                            <div className="text-xs text-muted-foreground">Min Age</div>
                            <div className="font-mono text-sm font-semibold">{policy.eligibility.minAge}</div>
                          </div>
                          <div className="surface-card p-2 text-center">
                            <div className="text-xs text-muted-foreground">Max Age</div>
                            <div className="font-mono text-sm font-semibold">{policy.eligibility.maxAge}</div>
                          </div>
                          <div className="surface-card p-2 text-center">
                            <div className="text-xs text-muted-foreground">Min Term</div>
                            <div className="font-mono text-sm font-semibold">{policy.eligibility.minTerm}y</div>
                          </div>
                          <div className="surface-card p-2 text-center">
                            <div className="text-xs text-muted-foreground">Min SA</div>
                            <div className="font-mono text-sm font-semibold">₹{(policy.eligibility.minSA / 1000).toFixed(0)}K</div>
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Benefits</h4>
                            <ul className="space-y-1">{policy.benefits.map((b, i) => <li key={i} className="text-sm flex items-start gap-2"><span className="text-primary mt-1">•</span>{b}</li>)}</ul>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Features</h4>
                            <div className="flex flex-wrap gap-2">{policy.features.map((f) => <Badge key={f} variant="outline" className="text-xs">{f}</Badge>)}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Calculator */}
          <div className="surface-card p-6 h-fit sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-lg">Premium Calculator</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Policy</label>
                <select value={calcPolicy} onChange={(e) => setCalcPolicy(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  {licPolicies.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Your Age</label>
                <Input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Policy Term (years)</label>
                <Input type="number" value={term} onChange={(e) => setTerm(Number(e.target.value))} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Sum Assured (₹)</label>
                <Input type="number" value={sumAssured} onChange={(e) => setSumAssured(Number(e.target.value))} />
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Annual Premium</span>
                  <span className="font-mono font-semibold text-primary">₹{premium.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Monthly (approx)</span>
                  <span className="font-mono font-semibold">₹{Math.round(premium / 12).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Est. Maturity</span>
                  <span className="font-mono font-semibold text-primary">₹{maturity.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Premiums</span>
                  <span className="font-mono font-semibold">₹{(premium * term).toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
