import React from 'react';
import { Card, CardContent } from "../components/lan_cmp/card";
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Arjun Sharma",
      role: "Software Engineer at Google",
      batch: "CSE 2023",
      content: "RGUKT provided me with excellent technical foundation and industry exposure. The faculty support and placement cell helped me secure my dream job.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Priya Reddy",
      role: "Data Scientist at Microsoft",
      batch: "ECE 2022",
      content: "The research opportunities and modern infrastructure at RGUKT shaped my analytical thinking. Grateful for the mentorship I received.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Vikram Kumar",
      role: "Entrepreneur & Startup Founder",
      batch: "ME 2021",
      content: "The innovation lab and incubation center at RGUKT helped me develop my business idea. Today I run a successful tech startup.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Sneha Patel",
      role: "Research Scholar at IIT",
      batch: "Physics 2023",
      content: "The research culture and faculty guidance prepared me well for advanced studies. Now pursuing PhD at a premier institute.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Alumni Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Success stories from our graduates who are making their mark globally
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-blue-600">{testimonial.batch}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
