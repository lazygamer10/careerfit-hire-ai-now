
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Loader2 } from "lucide-react";
import { useHiringForm } from "@/hooks/useHiringForm";
import HiringFormNavigation from "@/components/hiring/HiringFormNavigation";
import HiringFormHeader from "@/components/hiring/HiringFormHeader";
import PersonalInfoSection from "@/components/hiring/PersonalInfoSection";
import JobDetailsSection from "@/components/hiring/JobDetailsSection";
import JobDescriptionSection from "@/components/hiring/JobDescriptionSection";
import BudgetSection from "@/components/hiring/BudgetSection";
import MobileCTA from "@/components/hiring/MobileCTA";

const HiringForm = () => {
  const { formData, handleSubmit, handleInputChange, isSubmitting } = useHiringForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <HiringFormNavigation />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HiringFormHeader />

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-slate-800">
              Tell Us About Your Hiring Need
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <PersonalInfoSection 
                formData={formData} 
                onInputChange={handleInputChange} 
              />
              
              <JobDetailsSection 
                formData={formData} 
                onInputChange={handleInputChange} 
              />

              <JobDescriptionSection 
                formData={formData} 
                onInputChange={handleInputChange} 
              />

              <BudgetSection 
                formData={formData} 
                onInputChange={handleInputChange} 
              />

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Continue → Show My Plan
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <MobileCTA 
        onSubmit={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)} 
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default HiringForm;
