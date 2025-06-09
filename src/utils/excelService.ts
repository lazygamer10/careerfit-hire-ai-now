
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
  // TODO: Replace this URL with your actual Excel API endpoint
  const EXCEL_API_URL = "YOUR_EXCEL_API_ENDPOINT_HERE";
  
  if (EXCEL_API_URL === "YOUR_EXCEL_API_ENDPOINT_HERE") {
    console.log("⚠️ Excel API URL not configured yet");
    console.log("Form data that would be sent to Excel:", formData);
    return false;
  }

  try {
    const response = await fetch(EXCEL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Excel API error: ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ Data successfully stored in Excel:", result);
    return true;
  } catch (error) {
    console.error("❌ Failed to store data in Excel:", error);
    return false;
  }
};
