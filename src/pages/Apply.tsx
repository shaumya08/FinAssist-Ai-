import { useEffect, useRef, useState } from "react";
import { useLoanChat } from "@/hooks/useLoanChat";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Loader2, Download, CheckCircle, XCircle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { generateSanctionLetterPDF } from "@/lib/generateSanctionLetterPDF";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];
const chatAnim = {
  initial: { opacity: 0, y: 10, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.4, ease: easeOut },
};

export default function Apply() {
  const { messages, isAnalyzing, result, loanData, processAnswer, startChat, isStarted } = useLoanChat();
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isAnalyzing]);

  // Save result to DB
  useEffect(() => {
    if (result && user && !saved) {
      setSaved(true);
      supabase.from("loan_applications").insert({
        user_id: user.id,
        full_name: loanData.fullName || "",
        income: loanData.income || 0,
        loan_amount: loanData.loanAmount || 0,
        tenure: loanData.tenure || 12,
        employment: loanData.employment || "",
        credit_score: loanData.creditScore || 0,
        status: result.status,
        reason: result.reason,
        details: result.details || null,
      }).then(({ error }) => {
        if (error) console.error("Save error:", error);
      });
    }
  }, [result, user, saved, loanData]);

  const handleSend = () => {
    if (!input.trim()) return;
    processAnswer(input.trim());
    setInput("");
  };

  const handleDownload = () => {
    if (!result?.details) return;
    generateSanctionLetterPDF({
      fullName: loanData.fullName || "Applicant",
      ...result.details,
    });
    toast.success("Sanction letter downloaded!");
  };

  return (
    <div className="min-h-screen pt-16 flex flex-col">
      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="px-4 py-6 border-b border-border">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" /> Loan Application
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Chat with our AI to apply for a personal loan</p>
        </div>

        {/* Chat area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {!isStarted && (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-lg font-semibold">Ready to apply?</h2>
              <p className="text-sm text-muted-foreground max-w-sm">I'll guide you through a quick conversation to check your loan eligibility.</p>
              <Button variant="hero" onClick={startChat}>Start Application</Button>
            </div>
          )}

          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div key={msg.id} {...chatAnim} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-none p-4 max-w-[85%]"
                    : "bg-secondary/50 border border-border rounded-2xl rounded-tl-none p-4 max-w-[85%]"
                }>
                  <div className="text-sm leading-relaxed prose prose-sm dark:prose-invert prose-p:m-0">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                  {msg.options && !result && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {msg.options.map((opt) => (
                        <Button key={opt} variant="outline" size="sm" className="rounded-full text-xs" onClick={() => processAnswer(opt)}>
                          {opt}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Analyzing state */}
          {isAnalyzing && (
            <motion.div {...chatAnim} className="flex justify-start">
              <div className="bg-secondary/50 border border-border rounded-2xl rounded-tl-none p-4 flex items-center gap-3">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-sm animate-pulse-slow">Analyzing your application...</span>
              </div>
            </motion.div>
          )}

          {/* Decision card */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className={`surface-card p-6 ${
                  result.status === "approved" ? "border-l-4 border-l-primary bg-primary/5" :
                  result.status === "rejected" ? "border-l-4 border-l-destructive bg-destructive/5" :
                  "border-l-4 border-l-warning bg-warning/5"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  {result.status === "approved" && <CheckCircle className="h-6 w-6 text-primary" />}
                  {result.status === "rejected" && <XCircle className="h-6 w-6 text-destructive" />}
                  {result.status === "review" && <Clock className="h-6 w-6 text-warning" />}
                  <h3 className="text-lg font-bold capitalize">{result.status === "review" ? "Under Review" : result.status}</h3>
                </div>

                {result.details && (
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      ["Loan Amount", `$${result.details.loanAmount?.toLocaleString()}`],
                      ["Interest Rate", `${result.details.interestRate}%`],
                      ["Monthly EMI", `$${result.details.emi?.toLocaleString()}`],
                      ["Tenure", `${result.details.tenure} months`],
                    ].map(([label, value]) => (
                      <div key={label} className="bg-background/50 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground">{label}</div>
                        <div className="font-mono font-semibold text-sm">{value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {result.status === "approved" && (
                  <Button onClick={handleDownload} className="w-full mt-2">
                    <Download className="h-4 w-4 mr-2" /> Download Sanction Letter
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input bar */}
        {isStarted && !result && !isAnalyzing && (
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your answer..."
                className="rounded-full"
              />
              <Button size="icon" className="rounded-full shrink-0" onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
