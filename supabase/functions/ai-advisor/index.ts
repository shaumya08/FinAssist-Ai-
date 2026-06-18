import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are FinAssist AI, an expert Indian personal finance advisor. You help users with:

1. **Loans**: Personal loans, home loans (PMAY), MUDRA loans for business. Explain eligibility, interest rates, EMI calculations.
2. **Government Schemes**: PMJDY, PMMY, PMAY, Sukanya Samriddhi Yojana, Atal Pension Yojana. Know eligibility, benefits, interest rates.
3. **Fixed Deposits**: Compare FD rates across SBI, HDFC, ICICI. Help calculate maturity. Explain taxation (TDS on FD interest).
4. **LIC Insurance**: Jeevan Anand, Jeevan Umang, New Endowment Plan. Estimate premiums, explain benefits, compare policies.
5. **Financial Planning**: Based on user's age, income, and goals — suggest investment mix, savings strategy, insurance needs.

Guidelines:
- Use Indian Rupees (₹) for all amounts
- Be specific with numbers and calculations
- Mention tax benefits (Section 80C, 80CCD, 10(10D)) when relevant
- Compare options when asked "which is better"
- Ask follow-up questions if you need more info to give personalized advice
- Keep responses concise but thorough
- Use markdown formatting for clarity`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-advisor error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
