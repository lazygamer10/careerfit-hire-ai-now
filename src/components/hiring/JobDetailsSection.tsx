
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HiringFormData } from "@/hooks/useHiringForm";

interface JobDetailsSectionProps {
  formData: HiringFormData;
  onInputChange: (field: keyof HiringFormData, value: string) => void;
}

const JobDetailsSection = ({ formData, onInputChange }: JobDetailsSectionProps) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@company.com"
            value={formData.email}
            onChange={(e) => onInputChange("email", e.target.value)}
            required
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="numberOfHires">Number of Hires *</Label>
          <Select onValueChange={(value) => onInputChange("numberOfHires", value)}>
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
          onChange={(e) => onInputChange("roles", e.target.value)}
          required
          className="h-12"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="experienceLevel">Experience Level *</Label>
          <Select onValueChange={(value) => onInputChange("experienceLevel", value)}>
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
          <Select onValueChange={(value) => onInputChange("timeline", value)}>
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
    </>
  );
};

export default JobDetailsSection;
