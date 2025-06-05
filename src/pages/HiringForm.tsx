
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Upload } from "lucide-react";

const HiringForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store form data in localStorage for the next page
    localStorage.setItem("hiringFormData", JSON.stringify(formData));
    navigate("/plan");
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-slate-800">
              Careerfit
            </Link>
            <div className="text-sm text-slate-600">Step 1 of 3</div>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Let's Get You Matched with the{" "}
            <span className="text-blue-600">Right Candidates</span>
          </h1>
          <p className="text-xl text-slate-600">
            Fill this quick form — we'll take care of everything else.
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-slate-800">
              Tell Us About Your Hiring Needs
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    placeholder="Your company name"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numberOfHires">Number of Hires *</Label>
                  <Select onValueChange={(value) => handleInputChange("numberOfHires", value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select number" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hire</SelectItem>
                      <SelectItem value="2-5">2-5 hires</SelectItem>
                      <SelectItem value="6-10">6-10 hires</SelectItem>
                      <SelectItem value="10+">10+ hires</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roles">Roles / Designations *</Label>
                <Input
                  id="roles"
                  placeholder="e.g., Full Stack Developer, Product Manager, Data Scientist"
                  value={formData.roles}
                  onChange={(e) => handleInputChange("roles", e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Experience Level *</Label>
                  <Select onValueChange={(value) => handleInputChange("experienceLevel", value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fresher">Fresher (0-1 years)</SelectItem>
                      <SelectItem value="mid">Mid-level (2-5 years)</SelectItem>
                      <SelectItem value="senior">Senior (5+ years)</SelectItem>
                      <SelectItem value="lead">Lead/Manager (8+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline">Hiring Timeline *</Label>
                  <Select onValueChange={(value) => handleInputChange("timeline", value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">ASAP</SelectItem>
                      <SelectItem value="week">Within 7 days</SelectItem>
                      <SelectItem value="2-3weeks">2-3 weeks</SelectItem>
                      <SelectItem value="month">1 month+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobDescription">Job Description</Label>
                <div className="relative">
                  <Textarea
                    id="jobDescription"
                    placeholder="Paste your job description here or describe the role requirements..."
                    value={formData.jobDescription}
                    onChange={(e) => handleInputChange("jobDescription", e.target.value)}
                    className="min-h-32"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload JD
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget / Salary Range (Optional)</Label>
                <Input
                  id="budget"
                  placeholder="e.g., ₹8-12 LPA, $80-120k, etc."
                  value={formData.budget}
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                  className="h-12"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg"
              >
                Continue → Show My Plan
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 md:hidden">
        <Button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Continue → Show My Plan
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default HiringForm;
