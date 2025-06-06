import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HiringForm() {
  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [numberOfHires, setNumberOfHires] = useState("");
  const [timeline, setTimeline] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      companyName,
      fullName,
      email,
      roles,
      experienceLevel,
      numberOfHires,
      timeline,
      jobDescription,
      budget,
    };

    try {
      const res = await fetch("https://script.google.com/a/macros/careerfit.ai/s/AKfycbxBPHttdLfYEkcDpVxV0WwBE1CVCEiasJLbw_4q18aW38Y9n4OTUO55TiuI9vUYDVHNxA/exec", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      console.log("https://script.google.com/a/macros/careerfit.ai/s/AKfycbxBPHttdLfYEkcDpVxV0WwBE1CVCEiasJLbw_4q18aW38Y9n4OTUO55TiuI9vUYDVHNxA/exec", result);
      alert("Form submitted successfully!");
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Failed to submit form.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" required />
      <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your Name" required />
      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@company.com" type="email" required />
      <Input value={roles} onChange={(e) => setRoles(e.target.value)} placeholder="e.g. Full Stack Developer, Product Manager" required />
      <Input value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)} placeholder="Experience Level" required />
      <Input value={numberOfHires} onChange={(e) => setNumberOfHires(e.target.value)} placeholder="Number of Hires" required />
      <Input value={timeline} onChange={(e) => setTimeline(e.target.value)} placeholder="Hiring Timeline" required />
      <Input value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Job Description" required />
      <Input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Budget / Salary Range (Optional)" />
      <Button type="submit">Continue → Show My Plan</Button>
    </form>
  );
}
