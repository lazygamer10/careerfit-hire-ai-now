
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    localStorage.setItem("hiringFormData", JSON.stringify(formData));
    
    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbwLga2jgq_szapRNGcyHMBUGrk31khkBw2T6NVOYB_vmt83hq4TSaG0vMF8_amEljhaxQ/exec", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      console.log("https://script.google.com/macros/s/AKfycbwLga2jgq_szapRNGcyHMBUGrk31khkBw2T6NVOYB_vmt83hq4TSaG0vMF8_amEljhaxQ/exec", result);
      alert("Form submitted successfully!");
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Failed to submit form.");
    }
    navigate("/plan");
  };

  const handleInputChange = (field: keyof HiringFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    handleSubmit,
    handleInputChange
  };
};
