
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("hiringFormData", JSON.stringify(formData));
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
