import { useState, useCallback } from "react";

export interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  options?: string[];
  field?: string;
}

interface LoanData {
  fullName?: string;
  income?: number;
  loanAmount?: number;
  tenure?: number;
  employment?: string;
  creditScore?: number;
}

const QUESTIONS: { field: string; question: string; options?: string[] }[] = [
  { field: "fullName", question: "Welcome to FinAssist AI! I'll help you apply for a personal loan in just a few steps. Let's start — **what's your full name?**" },
  { field: "employment", question: "Great! What's your **employment status**?", options: ["Salaried", "Self-Employed", "Freelancer", "Unemployed"] },
  { field: "income", question: "What's your **monthly income** (in USD)?" },
  { field: "creditScore", question: "Do you know your approximate **credit score**?", options: ["300-499", "500-649", "650-749", "750-850", "Not Sure"] },
  { field: "loanAmount", question: "How much would you like to **borrow**? (Enter amount in USD)" },
  { field: "tenure", question: "What **loan tenure** works best for you?", options: ["12 Months", "24 Months", "36 Months", "48 Months", "60 Months"] },
];

function evaluateLoan(data: LoanData): { status: "approved" | "rejected" | "review"; reason: string; details?: any } {
  const { income = 0, loanAmount = 0, tenure = 12, creditScore = 0, employment } = data;
  const monthlyRate = 0.01;
  const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
  const dti = emi / income;

  if (employment === "Unemployed") {
    return { status: "rejected", reason: "Loan applications require active employment or a stable income source. Consider applying once you have a steady income." };
  }
  if (creditScore < 500) {
    return { status: "rejected", reason: `Your credit score of **${creditScore}** is below our minimum threshold of 500. Tips to improve: pay bills on time, reduce existing debt, and check your credit report for errors.` };
  }
  if (dti > 0.5) {
    return { status: "rejected", reason: `Your estimated EMI of **$${Math.round(emi).toLocaleString()}** would be **${(dti * 100).toFixed(0)}%** of your income, exceeding our 50% DTI limit. Consider a smaller loan amount or longer tenure.` };
  }
  if (creditScore >= 650 && dti <= 0.35 && income >= 3000) {
    return {
      status: "approved",
      reason: "Congratulations! Your application has been **approved**.",
      details: {
        loanAmount,
        interestRate: 12,
        emi: Math.round(emi),
        tenure,
        approvalDate: new Date().toISOString().split("T")[0],
        validityDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      },
    };
  }
  return { status: "review", reason: "Your application is **under manual review**. Our team will evaluate your profile and contact you within 2-3 business days." };
}

export function useLoanChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [loanData, setLoanData] = useState<LoanData>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ status: string; reason: string; details?: any } | null>(null);
  const [isStarted, setIsStarted] = useState(false);

  const addMessage = useCallback((msg: Omit<ChatMessage, "id">) => {
    setMessages((prev) => [...prev, { ...msg, id: crypto.randomUUID() }]);
  }, []);

  const startChat = useCallback(() => {
    setIsStarted(true);
    const q = QUESTIONS[0];
    addMessage({ role: "assistant", content: q.question, options: q.options, field: q.field });
  }, [addMessage]);

  const processAnswer = useCallback((answer: string) => {
    addMessage({ role: "user", content: answer });

    const currentField = QUESTIONS[currentStep].field;
    const updated = { ...loanData };

    switch (currentField) {
      case "fullName": updated.fullName = answer; break;
      case "employment": updated.employment = answer; break;
      case "income": updated.income = parseFloat(answer.replace(/[^0-9.]/g, "")); break;
      case "creditScore": {
        const map: Record<string, number> = { "300-499": 400, "500-649": 575, "650-749": 700, "750-850": 800, "Not Sure": 650 };
        updated.creditScore = map[answer] || 650;
        break;
      }
      case "loanAmount": updated.loanAmount = parseFloat(answer.replace(/[^0-9.]/g, "")); break;
      case "tenure": updated.tenure = parseInt(answer.replace(/[^0-9]/g, "")) || 12; break;
    }

    setLoanData(updated);
    const nextStep = currentStep + 1;

    if (nextStep < QUESTIONS.length) {
      setCurrentStep(nextStep);
      setTimeout(() => {
        const q = QUESTIONS[nextStep];
        addMessage({ role: "assistant", content: q.question, options: q.options, field: q.field });
      }, 600);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => {
        const decision = evaluateLoan(updated);
        setResult(decision);
        setIsAnalyzing(false);
        addMessage({ role: "assistant", content: decision.reason });
      }, 3000);
    }
  }, [currentStep, loanData, addMessage]);

  return { messages, isAnalyzing, result, loanData, processAnswer, startChat, isStarted };
}
