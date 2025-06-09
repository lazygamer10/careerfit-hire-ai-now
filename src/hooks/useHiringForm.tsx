
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
    
    // Submit to Google Sheets via Excel service
    try {
      console.log("Attempting Google Sheets submission via Excel service...");
      const excelData = {
        ...formData,
        submittedAt: new Date().toISOString()
      };
      const success = await submitToExcel(excelData);
      
      if (success) {
        toast.success("Form submitted successfully to Google Sheets!");
        console.log("✅ Form submission successful, navigating to plan page...");
        navigate("/plan");
      } else {
        toast.error("Failed to submit form. Your data has been saved locally.");
        console.error("❌ Form submission failed");
      }
    } catch (err) {
      console.error("❌ Form submission error:", err);
      toast.error("Failed to submit form. Your data has been saved locally.");
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
