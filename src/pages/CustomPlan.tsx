
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Target, Users, Clock, Shield, CheckCircle } from "lucide-react";

const CustomPlan = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("hiringFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleCallSchedule = () => {
    // In a real app, this would open a calendar booking widget
    alert("Calendar booking would open here. For now, proceeding to contract.");
    navigate("/contract");
  };

  const handleSkipCall = () => {
    navigate("/contract");
  };

  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">No hiring details found</h2>
          <Link to="/hire">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Go Back to Form
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
            <div className="text-sm text-slate-600">Step 2 of 3</div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Here's What We'll Do{" "}
            <span className="text-blue-600">For You</span>
          </h1>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-lg text-slate-800">
              <span className="font-semibold">You're hiring {formData.numberOfHires} {formData.roles}</span>
              {formData.timeline && (
                <span> in {formData.timeline === "asap" ? "ASAP" : formData.timeline === "week" ? "1 week" : formData.timeline}</span>
              )}
              ? <span className="text-blue-600 font-semibold">Let's make it happen.</span>
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* What We Offer */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800 flex items-center">
                <Target className="h-6 w-6 text-blue-600 mr-3" />
                What We Offer You
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "AI-driven shortlisting from 40M+ verified profiles",
                "Human-reviewed candidates matched for skill & culture",
                "3–5 days delivery of first shortlist",
                "Real-time ATS dashboard",
                "Dedicated hiring specialist assigned"
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-700">{feature}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pricing & Process */}
          <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Shield className="h-6 w-6 mr-3" />
                Our Promise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold mb-2">10% CTC</div>
                <div className="text-blue-100">Success fee only when you hire</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-200" />
                  <span>No upfront costs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-200" />
                  <span>Cancel anytime, no lock-ins</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-blue-200" />
                  <span>Replacement guarantee</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Custom Details */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-md mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800">Your Hiring Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Company & Contact</h4>
                <p className="text-slate-600">{formData.companyName}</p>
                <p className="text-slate-600">{formData.name} • {formData.email}</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Role Requirements</h4>
                <p className="text-slate-600">{formData.numberOfHires} • {formData.roles}</p>
                <p className="text-slate-600">{formData.experienceLevel} level</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Next Steps</h2>
          
          <div className="space-y-4">
            <Button
              onClick={handleCallSchedule}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 mr-4"
            >
              Schedule a 15-min Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <div className="text-slate-500">or</div>
            
            <Button
              onClick={handleSkipCall}
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-4"
            >
              Skip the Call — Send Me the Contract
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 md:hidden space-y-2">
        <Button
          onClick={handleCallSchedule}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          Schedule 15-min Call
        </Button>
        <Button
          onClick={handleSkipCall}
          variant="outline"
          className="w-full border-blue-600 text-blue-600"
        >
          Skip — Send Contract
        </Button>
      </div>
    </div>
  );
};

export default CustomPlan;
