
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

interface MobileCTAProps {
  onSubmit: () => void;
  isSubmitting?: boolean;
}

const MobileCTA = ({ onSubmit, isSubmitting = false }: MobileCTAProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 md:hidden">
      <Button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Continue → Show My Plan
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default MobileCTA;
