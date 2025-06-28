import { CheckCircle, Star, ArrowRight } from "lucide-react";
import { Button } from "../components/lan_cmp/button";

const features = [
  "World-class faculty with industry experience",
  "State-of-the-art infrastructure and labs",
  "Strong industry partnerships and internships",
  "International exchange programs",
  "24/7 library and research facilities",
  "Comprehensive career support services"
];

const About = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                <Star className="h-4 w-4" />
                Excellence Since 1995
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Empowering
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Tomorrow's Leaders</span>
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                For over two decades, we've been at the forefront of educational excellence, nurturing innovative minds and shaping the future through comprehensive learning experiences.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Our commitment to academic rigor, research excellence, and industry relevance has established us as a premier institution that transforms students into confident professionals ready to make a meaningful impact in their chosen fields.
              </p>
            </div>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-700 text-lg">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full group">
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-full">
                Download Brochure
              </Button>
            </div>
          </div>
          
          {/* Right Content - Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Modern campus"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                />
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
                  alt="Students studying"
                  className="w-full h-64 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                />
              </div>
              
              <div className="space-y-6 pt-12">
                <img 
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80"
                  alt="Research lab"
                  className="w-full h-64 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                />
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Campus life"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                />
              </div>
            </div>
            
            {/* Floating Element */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black p-6 rounded-2xl shadow-xl animate-[float_4s_ease-in-out_infinite]">
              <div className="text-2xl font-bold">28+</div>
              <div className="text-sm opacity-80">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;