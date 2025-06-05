
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { HiringFormData } from "@/hooks/useHiringForm";

interface JobDescriptionSectionProps {
  formData: HiringFormData;
  onInputChange: (field: keyof HiringFormData, value: string) => void;
}

const JobDescriptionSection = ({ formData, onInputChange }: JobDescriptionSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="jobDescription">Job Description</Label>
      <div className="relative">
        <Textarea
          id="jobDescription"
          placeholder="Paste your job description here or describe the role requirements..."
          value={formData.jobDescription}
          onChange={(e) => onInputChange("jobDescription", e.target.value)}
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
  );
};

export default JobDescriptionSection;
