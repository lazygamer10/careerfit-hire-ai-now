
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

  const validateForm = () => {
    const requiredFields = ['companyName', 'name', 'email', 'numberOfHires', 'roles', 'experienceLevel', 'timeline'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof HiringFormData].trim());
    
    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    console.log("Starting form submission...", formData);
    
    // Save to localStorage first
    localStorage.setItem("hiringFormData", JSON.stringify(formData));
    
    let googleSheetsSuccess = false;
    let excelSuccess = false;

    // Try to submit to Google Sheets
    try {
      console.log("Attempting Google Sheets submission...");
      const res = await fetch("https://script.google.com/macros/s/AKfycbwLga2jgq_szapRNGcyHMBUGrk31khkBw2T6NVOYB_vmt83hq4TSaG0vMF8_amEljhaxQ/exec", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const result = await res.json();
        console.log("✅ Google Sheets response:", result);
        googleSheetsSuccess = true;
      } else {
        console.error("❌ Google Sheets HTTP error:", res.status, res.statusText);
      }
    } catch (err) {
      console.error("❌ Google Sheets Error:", err);
    }

    // Try to submit to Excel
    try {
      console.log("Attempting Excel submission...");
      const excelData = {
        ...formData,
        submittedAt: new Date().toISOString()
      };
      excelSuccess = await submitToExcel(excelData);
      console.log("Excel submission result:", excelSuccess);
    } catch (err) {
      console.error("❌ Excel submission error:", err);
    }

    // Show appropriate success/error message
    if (googleSheetsSuccess || excelSuccess) {
      const successServices = [];
      if (googleSheetsSuccess) successServices.push("Google Sheets");
      if (excelSuccess) successServices.push("Excel");
      
      toast.success(`Form submitted successfully to: ${successServices.join(", ")}!`);
      console.log("✅ Form submission successful, navigating to plan page...");
      navigate("/plan");
    } else {
      toast.error("Failed to submit form to any service. Your data has been saved locally.");
      console.error("❌ All submission methods failed");
    }

    setIsSubmitting(false);
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
