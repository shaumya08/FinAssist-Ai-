import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Shield, ArrowRight, MessageSquare, Landmark, PiggyBank, ShieldCheck, Sparkles, ClipboardCheck, TrendingUp, Bot } from "lucide-react";
import logo from "@/assets/logo.png";
import { motion } from "framer-motion";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: easeOut },
};

const services = [
  { icon: MessageSquare, title: "AI Loan Assistant", desc: "Apply for personal loans through a conversational chatbot.", link: "/apply" },
  { icon: Landmark, title: "Government Schemes", desc: "Explore PMJDY, MUDRA, PMAY, SSY, APY and more.", link: "/schemes" },
  { icon: PiggyBank, title: "FD Planner", desc: "Calculate maturity, compare bank rates with visual charts.", link: "/fd-planner" },
  { icon: ShieldCheck, title: "LIC Insurance", desc: "Compare LIC policies, estimate premiums and maturity.", link: "/insurance" },
  { icon: Sparkles, title: "AI Financial Advisor", desc: "Get personalized advice on investments, loans, and schemes.", link: "/ai-advisor" },
  { icon: ClipboardCheck, title: "Eligibility Checker", desc: "Check your eligibility for loans, schemes, and pensions.", link: "/eligibility" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-4xl text-center relative">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-8">
              <Zap className="h-3.5 w-3.5" /> Your Complete Financial Assistant
            </div>
          </motion.div>
          <motion.h1 {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="text-5xl md:text-7xl font-extrabold leading-[1.05] mb-6">
            Finance,{" "}
            <span className="text-gradient-primary">simplified.</span>
          </motion.h1>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Loans, investments, insurance, government schemes — all powered by AI. Get personalized financial guidance in minutes.
          </motion.p>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" onClick={() => navigate("/auth")}>
              Get Started <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button variant="hero-outline" size="lg" onClick={() => navigate("/schemes")}>
              Explore Schemes
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-bold text-center mb-4">
            Everything You Need
          </motion.h2>
          <motion.p {...fadeUp} className="text-muted-foreground text-center mb-14 max-w-xl mx-auto">
            One platform for all your financial planning — loans, savings, insurance, and government benefits.
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i, duration: 0.5, ease: easeOut }}
                onClick={() => navigate(s.link)}
                className="surface-card p-6 hover:shadow-glow transition-all duration-300 hover:-translate-y-[1px] cursor-pointer group">
                <s.icon className="h-7 w-7 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-base font-semibold mb-1.5">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: Bot, title: "Tell Us About You", desc: "Share your age, income, and goals through chat or our simple forms." },
              { step: "02", icon: TrendingUp, title: "Get AI Analysis", desc: "Our AI evaluates your profile and recommends the best options." },
              { step: "03", icon: Shield, title: "Take Action", desc: "Apply for loans, start FDs, or enroll in schemes with full confidence." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="font-mono text-xs text-primary mb-3">{s.step}</div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="surface-card p-10 shadow-glow">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to plan your finances?</h2>
            <p className="text-muted-foreground mb-8">Get personalized recommendations from our AI advisor in minutes.</p>
            <Button variant="hero" size="lg" onClick={() => navigate("/auth")}>
              Start Now <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-4">
        <div className="container mx-auto max-w-4xl flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <img src={logo} alt="FinAssist AI" className="h-5 w-5" />
            <span className="text-sm font-semibold">FinAssist AI</span>
          </div>
          <p className="text-sm text-muted-foreground">Developed by <span className="font-semibold text-foreground">Ayush Jain</span></p>
          <div className="flex items-center gap-5">
            <a href="https://github.com/AyushJain11-h" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"/></svg>
            </a>
            <a href="mailto:ayushjain54320@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Email">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/ayush-jain-9768ab3b2/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM6.889 20.452H3.784V9h3.105v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z"/></svg>
            </a>
          </div>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} FinAssist AI. Finance, simplified.</p>
        </div>
      </footer>
    </div>
  );
}
