
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, CheckCircle, Shield, Clock, Users } from "lucide-react";

const Contract = () => {
  const [formData, setFormData] = useState(null);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("hiringFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleSignAndStart = () => {
    if (!agreed) {
      alert("Please agree to the terms before proceeding.");
      return;
    }
    
    // In a real app, this would handle the contract signing
    alert("Contract signed! Our team will reach out within 24 hours to begin the hiring process.");
    
    // Clear the stored form data
    localStorage.removeItem("hiringFormData");
  };

  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">No hiring details found</h2>
          <Link to="/hire">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Start New Application
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-slate-800">
              Careerfit
            </Link>
            <div className="text-sm text-slate-600">Step 3 of 3</div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Ready to Start{" "}
            <span className="text-blue-600">Hiring Smarter</span>?
          </h1>
          <p className="text-xl text-slate-600">
            Let's get you set up and start finding your perfect candidates.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* What You Get */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800 flex items-center">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                What You Get
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "End-to-end recruitment support",
                "ATS dashboard with live updates", 
                "10% CTC success fee (no hire = no fee)",
                "Cancel anytime. No lock-ins."
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-700">{feature}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* What We Need */}
          <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Users className="h-6 w-6 mr-3" />
                What We Need
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "A digital signature on our standard terms",
                "Your JD and hiring timeline",
                "That's it — we start matching"
              ].map((requirement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                  <p className="text-blue-100">{requirement}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Hiring Summary */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-md mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800">Your Hiring Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Company</h4>
                <p className="text-slate-600">{formData.companyName}</p>
                <p className="text-sm text-slate-500">{formData.name}</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Roles</h4>
                <p className="text-slate-600">{formData.numberOfHires} {formData.roles}</p>
                <p className="text-sm text-slate-500">{formData.experienceLevel} level</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Timeline</h4>
                <p className="text-slate-600">
                  {formData.timeline === "asap" ? "ASAP" : 
                   formData.timeline === "week" ? "Within 7 days" : 
                   formData.timeline}
                </p>
                <div className="flex items-center mt-1">
                  <Clock className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">On track</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms Agreement */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-md mb-8">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={setAgreed}
                className="mt-1"
              />
              <div className="text-sm text-slate-600">
                <label htmlFor="terms" className="cursor-pointer">
                  I agree to Careerfit's <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and understand that:
                  <ul className="mt-2 space-y-1 ml-4 list-disc">
                    <li>No payment is required upfront</li>
                    <li>10% CTC success fee applies only when I hire</li>
                    <li>I can cancel anytime with 7 days notice</li>
                    <li>Replacement guarantee covers first 90 days</li>
                  </ul>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={handleSignAndStart}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={!agreed}
          >
            <Shield className="mr-2 h-5 w-5" />
            Sign & Start Hiring
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <p className="text-sm text-slate-500 mt-4">
            Need help? Talk to our team at{" "}
            <a href="mailto:team@careerfit.ai" className="text-blue-600 hover:underline">
              team@careerfit.ai
            </a>
          </p>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 md:hidden">
        <Button
          onClick={handleSignAndStart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={!agreed}
        >
          <Shield className="mr-2 h-4 w-4" />
          Sign & Start Hiring
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Contract;
