import { useState } from "react";
import { bankFDRates, calculateFD } from "@/data/fdRates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PiggyBank, TrendingUp, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from "recharts";

export default function FDPlanner() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7.0);
  const [tenureMonths, setTenureMonths] = useState(24);
  const [activeBank, setActiveBank] = useState(0);

  const result = calculateFD(principal, rate, tenureMonths);

  const pieData = [
    { name: "Principal", value: principal, fill: "hsl(var(--primary))" },
    { name: "Interest", value: result.totalInterest, fill: "hsl(var(--warning))" },
  ];

  const growthData = Array.from({ length: Math.min(tenureMonths, 60) }, (_, i) => {
    const month = i + 1;
    const res = calculateFD(principal, rate, month);
    return { month: `M${month}`, principal, interest: res.totalInterest };
  }).filter((_, i, arr) => arr.length <= 12 || i % Math.ceil(arr.length / 12) === 0 || i === arr.length - 1);

  const chartConfig = {
    principal: { label: "Principal", color: "hsl(var(--primary))" },
    interest: { label: "Interest", color: "hsl(var(--warning))" },
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-10">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <PiggyBank className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold">Fixed Deposit Planner</h1>
          </div>
          <p className="text-sm text-muted-foreground">Calculate maturity value and compare bank FD rates.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Calculator */}
          <div className="surface-card p-6 space-y-5">
            <h2 className="font-semibold text-lg">FD Calculator</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Deposit Amount (₹)</label>
                <Input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Interest Rate (% p.a.)</label>
                <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Tenure (months)</label>
                <Input type="number" value={tenureMonths} onChange={(e) => setTenureMonths(Number(e.target.value))} />
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="surface-card p-3 text-center">
                <TrendingUp className="h-4 w-4 text-primary mx-auto mb-1" />
                <div className="font-mono text-lg font-bold text-primary">₹{result.maturityAmount.toLocaleString("en-IN")}</div>
                <div className="text-xs text-muted-foreground">Maturity</div>
              </div>
              <div className="surface-card p-3 text-center">
                <PiggyBank className="h-4 w-4 text-warning mx-auto mb-1" />
                <div className="font-mono text-lg font-bold text-warning">₹{result.totalInterest.toLocaleString("en-IN")}</div>
                <div className="text-xs text-muted-foreground">Interest</div>
              </div>
              <div className="surface-card p-3 text-center">
                <Calendar className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                <div className="font-mono text-sm font-bold">{result.maturityDate}</div>
                <div className="text-xs text-muted-foreground">Matures On</div>
              </div>
            </div>

            {/* Pie Chart */}
            <ChartContainer config={chartConfig} className="h-[200px]">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </div>

          {/* Growth Chart & Bank Rates */}
          <div className="space-y-6">
            <div className="surface-card p-6">
              <h2 className="font-semibold text-lg mb-4">Growth Over Time</h2>
              <ChartContainer config={chartConfig} className="h-[250px]">
                <BarChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="principal" stackId="a" fill="hsl(var(--primary))" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="interest" stackId="a" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>

            <div className="surface-card p-6">
              <h2 className="font-semibold text-lg mb-4">Bank FD Rates</h2>
              <div className="flex gap-2 mb-4">
                {bankFDRates.map((b, i) => (
                  <Button key={b.bank} variant={activeBank === i ? "default" : "outline"} size="sm" onClick={() => setActiveBank(i)} className="text-xs">
                    {b.bank.split(" ").slice(-2).join(" ")}
                  </Button>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-xs text-muted-foreground font-medium">Tenure</th>
                      <th className="text-right py-2 text-xs text-muted-foreground font-medium">General</th>
                      <th className="text-right py-2 text-xs text-muted-foreground font-medium">Senior</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bankFDRates[activeBank].rates.map((r) => (
                      <tr key={r.tenure} className="border-b border-border/50">
                        <td className="py-2 text-xs">{r.tenure}</td>
                        <td className="py-2 text-right font-mono text-xs">{r.general}%</td>
                        <td className="py-2 text-right font-mono text-xs text-primary">{r.senior}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
