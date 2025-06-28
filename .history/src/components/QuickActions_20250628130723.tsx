import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Users, Calendar, FileText, Award } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      icon: GraduationCap,
      title: "Apply Now",
      description: "Start your journey with us",
      link: "Apply for Admission",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: BookOpen,
      title: "Academic Programs",
      description: "Explore our courses",
      link: "View Programs",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Student Life",
      description: "Campus experience",
      link: "Campus Life",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Calendar,
      title: "Events",
      description: "Upcoming activities",
      link: "View Events",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: FileText,
      title: "Announcements",
      description: "Latest updates",
      link: "Read More",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Award,
      title: "Achievements",
      description: "Our recognitions",
      link: "View All",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {actions.map((action, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-0">
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} p-3 mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg font-bold text-gray-900">
                  {action.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-gray-600 mb-4">
                  {action.description}
                </CardDescription>
                <Button variant="outline" size="sm" className="w-full group-hover:bg-blue-50 group-hover:border-blue-300">
                  {action.link}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
