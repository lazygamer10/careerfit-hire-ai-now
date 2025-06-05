
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HiringFormData } from "@/hooks/useHiringForm";

interface PersonalInfoSectionProps {
  formData: HiringFormData;
  onInputChange: (field: keyof HiringFormData, value: string) => void;
}

const PersonalInfoSection = ({ formData, onInputChange }: PersonalInfoSectionProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name *</Label>
        <Input
          id="companyName"
          placeholder="Your company name"
          value={formData.companyName}
          onChange={(e) => onInputChange("companyName", e.target.value)}
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
          onChange={(e) => onInputChange("name", e.target.value)}
          required
          className="h-12"
        />
      </div>
    </div>
  );
};

export default PersonalInfoSection;
