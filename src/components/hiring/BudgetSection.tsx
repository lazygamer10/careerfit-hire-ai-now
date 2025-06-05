
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HiringFormData } from "@/hooks/useHiringForm";

interface BudgetSectionProps {
  formData: HiringFormData;
  onInputChange: (field: keyof HiringFormData, value: string) => void;
}

const BudgetSection = ({ formData, onInputChange }: BudgetSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="budget">Budget / Salary Range (Optional)</Label>
      <Input
        id="budget"
        placeholder="e.g., ₹8-12 LPA, $80-120k, etc."
        value={formData.budget}
        onChange={(e) => onInputChange("budget", e.target.value)}
        className="h-12"
      />
    </div>
  );
};

export default BudgetSection;
