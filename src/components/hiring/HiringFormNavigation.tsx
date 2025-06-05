
import { Link } from "react-router-dom";

const HiringFormNavigation = () => {
  return (
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
  );
};

export default HiringFormNavigation;
