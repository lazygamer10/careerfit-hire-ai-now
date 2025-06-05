
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface MobileCTAProps {
  onSubmit: () => void;
}

const MobileCTA = ({ onSubmit }: MobileCTAProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 md:hidden">
      <Button
        onClick={onSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        Continue → Show My Plan
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default MobileCTA;
