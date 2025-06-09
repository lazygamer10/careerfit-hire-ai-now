
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitToExcel } from "@/utils/excelService";
import { toast } from "sonner";

export interface HiringFormData {
  companyName: string;
  name: string;
  email: string;
  numberOfHires: string;
  roles: string;
  experienceLevel: string;
  jobDescription: string;
  timeline: string;
  budget: string;
}

export const useHiringForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<HiringFormData>({
    companyName: "",
    name: "",
    email: "",
    numberOfHires: "",
    roles: "",
    experienceLevel: "",
    jobDescription: "",
    timeline: "",
    budget: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Save to localStorage first
    localStorage.setItem("hiringFormData", JSON.stringify(formData));
    
    let googleSheetsSuccess = false;
    let excelSuccess = false;

    // Try to submit to Google Sheets (existing functionality)
    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbwLga2jgq_szapRNGcyHMBUGrk31khkBw2T6NVOYB_vmt83hq4TSaG0vMF8_amEljhaxQ/exec", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      console.log("Google Sheets response:", result);
      googleSheetsSuccess = true;
    } catch (err) {
      console.error("❌ Google Sheets Error:", err);
    }

    // Try to submit to Excel
    try {
      const excelData = {
        ...formData,
        submittedAt: new Date().toISOString()
      };
      excelSuccess = await submitToExcel(excelData);
    } catch (err) {
      console.error("❌ Excel submission error:", err);
    }

    // Show appropriate success/error message
    if (googleSheetsSuccess || excelSuccess) {
      const successMessage = [];
      if (googleSheetsSuccess) successMessage.push("Google Sheets");
      if (excelSuccess) successMessage.push("Excel");
      
      toast.success(`Form submitted successfully to: ${successMessage.join(", ")}!`);
    } else {
      toast.error("Failed to submit form. Please try again.");
    }

    setIsSubmitting(false);
    navigate("/plan");
  };

  const handleInputChange = (field: keyof HiringFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    handleSubmit,
    handleInputChange,
    isSubmitting
  };
};
