import { BookOpen, Users, Award, Briefcase, Globe, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/lan_cmp/card";

const services = [
  {
    icon: BookOpen,
    title: "Academic Excellence",
    description: "Comprehensive programs designed to foster critical thinking and innovation across multiple disciplines.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Users,
    title: "Industry Partnerships",
    description: "Strong connections with leading companies ensuring practical exposure and placement opportunities.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Award,
    title: "Research & Innovation",
    description: "State-of-the-art research facilities and mentorship for groundbreaking discoveries.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Briefcase,
    title: "Career Development",
    description: "Comprehensive career services including internships, job placement, and entrepreneurship support.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Globe,
    title: "Global Exposure",
    description: "International exchange programs and collaborations with universities worldwide.",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Lightbulb,
    title: "Innovation Hub",
    description: "Incubation centers and maker spaces to transform ideas into reality.",
    color: "from-yellow-500 to-orange-500"
  }
];

const Services = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Choose
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Our Institution</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide comprehensive education that prepares students for the challenges of tomorrow through innovative learning experiences and industry connections.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
            >
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
