import jsPDF from "jspdf";

interface SanctionDetails {
  fullName: string;
  loanAmount: number;
  interestRate: number;
  emi: number;
  tenure: number;
  approvalDate: string;
  validityDate: string;
}

export function generateSanctionLetterPDF(details: SanctionDetails) {
  const doc = new jsPDF();
  const { fullName, loanAmount, interestRate, emi, tenure, approvalDate, validityDate } = details;

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("FinAssist AI", 105, 30, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text("Loan Sanction Letter", 105, 38, { align: "center" });

  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.5);
  doc.line(20, 45, 190, 45);

  doc.setTextColor(0);
  doc.setFontSize(11);
  doc.text(`Date: ${approvalDate}`, 20, 58);
  doc.text(`Ref: FA-${Date.now().toString(36).toUpperCase()}`, 20, 65);

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`Dear ${fullName},`, 20, 80);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const body = `We are pleased to inform you that your personal loan application has been approved. Please find the details of your loan sanction below:`;
  doc.text(body, 20, 90, { maxWidth: 170 });

  const tableY = 110;
  const rows = [
    ["Loan Amount", `$${loanAmount.toLocaleString()}`],
    ["Interest Rate", `${interestRate}% per annum`],
    ["Monthly EMI", `$${emi.toLocaleString()}`],
    ["Tenure", `${tenure} Months`],
    ["Approval Date", approvalDate],
    ["Validity Date", validityDate],
  ];

  doc.setFillColor(240, 253, 244);
  doc.rect(20, tableY - 2, 170, 10, "F");
  doc.setFont("helvetica", "bold");
  doc.text("Parameter", 25, tableY + 5);
  doc.text("Value", 120, tableY + 5);

  doc.setFont("helvetica", "normal");
  rows.forEach((row, i) => {
    const y = tableY + 15 + i * 10;
    if (i % 2 === 0) {
      doc.setFillColor(249, 250, 251);
      doc.rect(20, y - 5, 170, 10, "F");
    }
    doc.text(row[0], 25, y);
    doc.text(row[1], 120, y);
  });

  const footerY = tableY + 85;
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("This is a system-generated document. No signature required.", 105, footerY, { align: "center" });
  doc.text("© FinAssist AI — Capital, clarified.", 105, footerY + 7, { align: "center" });

  doc.save(`FinAssist_Sanction_${fullName.replace(/\s/g, "_")}.pdf`);
}
