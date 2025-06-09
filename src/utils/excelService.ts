
export interface ExcelSubmissionData {
  companyName: string;
  name: string;
  email: string;
  numberOfHires: string;
  roles: string;
  experienceLevel: string;
  jobDescription: string;
  timeline: string;
  budget: string;
  submittedAt: string;
}

export const submitToExcel = async (formData: ExcelSubmissionData): Promise<boolean> => {
  const EXCEL_API_URL = "https://script.google.com/macros/s/AKfycbyJSZSsvaCvDfDNJQP_7ysjRbXSxQoHftEA-AB5t6DHqtWugVTnNT1JpsxtnGaAtQP9/exec";
  
  console.log("Submitting to Google Sheets:", EXCEL_API_URL);
  console.log("Form data being sent:", formData);

  try {
    const response = await fetch(EXCEL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ Data successfully stored in Google Sheets:", result);
    return true;
  } catch (error) {
    console.error("❌ Failed to store data in Google Sheets:", error);
    return false;
  }
};
