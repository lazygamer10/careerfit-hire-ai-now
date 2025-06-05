
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Target, Clock, Zap, Shield, ArrowRight } from "lucide-react";

const Index = () => {
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { number: 120, suffix: "+", label: "Clients" },
    { number: 92, suffix: "%+", label: "Match Accuracy" },
    { number: 40, suffix: "M+", label: "Profiles" },
    { number: 87, suffix: "%", label: "Offer Acceptance" },
    { number: 5, suffix: "%", label: "Drop-Off", prefix: "<" }
  ];

  const AnimatedCounter = ({ number, suffix = "", prefix = "", duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!statsVisible) return;
      
      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;
        
        if (progress < 1) {
          setCount(Math.floor(number * progress));
          requestAnimationFrame(animate);
        } else {
          setCount(number);
        }
      };
      requestAnimationFrame(animate);
    }, [statsVisible, number, duration]);

    return <span>{prefix}{count}{suffix}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/50 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-slate-800">Careerfit</div>
            <Link to="/hire">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Start Hiring Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Hire Perfect-Fit Talent in{" "}
            <span className="text-blue-600">14 Days</span>
            <br />
            <span className="text-3xl md:text-5xl text-slate-600">— No HR Headache.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            YO!!!!! This is your Boss, Dee101 Aka Lazygamer17
            <br />
            We source, screen, and deliver candidates you'll actually want to interview.
          </p>

          <Link to="/hire">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Start Hiring Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">
                  <AnimatedCounter number={stat.number} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <div className="text-sm text-slate-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-16">
            How Careerfit Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: <Target className="h-8 w-8" />,
                title: "Tell us who you want to hire",
                description: "Upload your JD or fill a short form."
              },
              {
                step: "2", 
                icon: <Zap className="h-8 w-8" />,
                title: "AI + Recruiters find the best fit",
                description: "We screen and score millions of profiles to find perfect matches."
              },
              {
                step: "3",
                icon: <Users className="h-8 w-8" />,
                title: "Receive shortlist-ready profiles",
                description: "Get qualified candidates in 3–5 days. Interview. Hire. Done."
              }
            ].map((item, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-slate-50">
                <CardContent className="p-8">
                  <div className="absolute top-4 right-4 text-6xl font-bold text-blue-100 opacity-50">
                    {item.step}
                  </div>
                  <div className="text-blue-600 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-slate-600">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Makes Careerfit Different
          </h2>
          <p className="text-xl text-blue-200 mb-16">
            "We're not a job board. We're your hiring command center."
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Shield className="h-6 w-6" />, title: "Built-in ATS dashboard" },
              { icon: <Target className="h-6 w-6" />, title: "Match scoring backed by AI" },
              { icon: <Users className="h-6 w-6" />, title: "Human-reviewed shortlists" },
              { icon: <Clock className="h-6 w-6" />, title: "24/7 recruiter support" },
              { icon: <CheckCircle className="h-6 w-6" />, title: "No upfront fees — only 10% CTC when you hire" },
            ].map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-blue-300 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <p className="text-white font-medium">{feature.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12">
            <Link to="/hire">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4">
                Start Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-16">
            What Our Clients Say
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "We closed 5 tech roles in 7 days. Never going back to traditional recruiters.",
                author: "HR, Kissht"
              },
              {
                quote: "Zero spam, all signal. Every candidate matched our team culture.",
                author: "Swan Energy"
              },
              {
                quote: "We saved 40% on hiring costs — and got better results.",
                author: "Rapid Coat"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-slate-50 to-blue-50">
                <CardContent className="p-8">
                  <p className="text-slate-600 text-lg mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <p className="text-slate-900 font-semibold">
                    — {testimonial.author}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 md:hidden z-40">
        <Link to="/hire" className="block">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Start Hiring Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold mb-4">Careerfit</div>
          <p className="text-slate-400 mb-4">
            AI-powered hiring that actually works.
          </p>
          <p className="text-slate-500 text-sm">
            Need help? Contact us at{" "}
            <a href="mailto:team@careerfit.ai" className="text-blue-400 hover:text-blue-300">
              team@careerfit.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
