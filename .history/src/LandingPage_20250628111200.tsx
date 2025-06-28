import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import { 
  Menu, 
  X, 
  ChevronRight, 
  Users, 
  Calendar, 
  DollarSign, 
  UserCheck, 
  MessageSquare, 
  BarChart3, 
  Shield, 
  BookOpen,
  Computer,
  Building2,
  Wrench,
  Star,
  Play,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageCircle,
  GraduationCap,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';

function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    students: 0,
    colleges: 0,
    satisfaction: 0
  });

  // Animated counter effect
  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const frameRate = 60;
      const totalFrames = duration / (1000 / frameRate);
      
      let frame = 0;
      const timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        
        setAnimatedStats({
          students: Math.floor(10000 * progress),
          colleges: Math.floor(20 * progress),
          satisfaction: Math.floor(95 * progress)
        });
        
        if (frame >= totalFrames) {
          clearInterval(timer);
          setAnimatedStats({ students: 10000, colleges: 20, satisfaction: 95 });
        }
      }, 1000 / frameRate);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    });

    const statsElement = document.getElementById('stats-section');
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => observer.disconnect();
  }, []);

  const courses = [
    { title: "Computer Science", icon: Computer, description: "Cutting-edge technology and programming" },
    { title: "Business Administration", icon: Building2, description: "Leadership and management excellence" },
    { title: "Mechanical Engineering", icon: Wrench, description: "Innovation in engineering solutions" },
    { title: "Medicine", icon: UserCheck, description: "Healthcare and medical sciences" },
    { title: "Arts & Literature", icon: BookOpen, description: "Creative expression and communication" },
    { title: "Data Science", icon: BarChart3, description: "Analytics and intelligent systems" }
  ];

  const features = [
    { title: "Smart Attendance", icon: Calendar, description: "Automated tracking with biometric integration" },
    { title: "Performance Analytics", icon: TrendingUp, description: "Real-time academic progress monitoring" },
    { title: "Fee Management", icon: DollarSign, description: "Streamlined payment processing" },
    { title: "HR Module", icon: Users, description: "Complete staff management system" },
    { title: "WhatsApp Alerts", icon: MessageSquare, description: "Instant notifications to parents" },
    { title: "Grade Management", icon: Award, description: "Comprehensive assessment tools" },
    { title: "Security & Privacy", icon: Shield, description: "Enterprise-grade data protection" },
    { title: "Quick Integration", icon: Zap, description: "Seamless setup in 24 hours" }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Academic Director",
      content: "NextEdu transformed our administrative efficiency by 80%. The integration was seamless and the support team is exceptional.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Computer Science Student",
      content: "As a student, I love how easy it is to track my progress, submit assignments, and communicate with professors.",
      rating: 5
    },
    {
      name: "Prof. Robert Davis",
      role: "Faculty Member",
      content: "The attendance tracking and grade management features have made my teaching workflow incredibly efficient.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-[#004aad]" />
              <span className="text-2xl font-bold text-[#004aad]">NextEdu</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-[#004aad] transition-colors">Home</a>
              <a href="#courses" className="text-gray-700 hover:text-[#004aad] transition-colors">Courses</a>
              <a href="#features" className="text-gray-700 hover:text-[#004aad] transition-colors">Features</a>
              <a href="#about" className="text-gray-700 hover:text-[#004aad] transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-[#004aad] transition-colors">Contact</a>
            </div>

            <div className="hidden md:flex space-x-4">
              <button className="px-4 py-2 text-[#004aad] border border-[#004aad] rounded-lg hover:bg-[#004aad] hover:text-white transition-all duration-300">
                <Link to="/login">ERP Login</Link>
              </button>
              <button className="px-4 py-2 bg-[#f7c948] text-[#004aad] rounded-lg hover:bg-[#004aad] hover:text-white transition-all duration-300 font-semibold">
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-[#004aad]">Home</a>
                <a href="#courses" className="block px-3 py-2 text-gray-700 hover:text-[#004aad]">Courses</a>
                <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-[#004aad]">Features</a>
                <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-[#004aad]">About</a>
                <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-[#004aad]">Contact</a>
                <div className="px-3 py-2 space-y-2">
                  <button className="w-full px-4 py-2 text-[#004aad] border border-[#004aad] rounded-lg">
                    ERP Login
                  </button>
                  <button className="w-full px-4 py-2 bg-[#f7c948] text-[#004aad] rounded-lg font-semibold">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
          }}
        />
        <div className="absolute inset-0 bg-[#004aad]/70" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            Empowering Future-Ready
            <span className="block text-[#f7c948]">Education</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-delay">
            One Platform. Total Academic Control.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
            <button className="px-8 py-4 bg-[#f7c948] text-[#004aad] rounded-lg font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg">
              Apply Now
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-[#004aad] hover:scale-105 transition-all duration-300">
              Book a Demo
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-6 w-6 text-white rotate-90" />
        </div>
      </section>

      {/* Top Courses Section */}
      <section id="courses" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Courses</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover world-class programs designed to prepare you for tomorrow's challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 p-6 group"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-[#004aad]/10 rounded-lg group-hover:bg-[#004aad] transition-colors duration-300">
                    <course.icon className="h-8 w-8 text-[#004aad] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 ml-4">{course.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <button className="text-[#004aad] font-semibold hover:text-[#f7c948] transition-colors duration-300 flex items-center">
                  Learn More <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ERP Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful ERP Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your educational institution efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="p-4 bg-gradient-to-br from-[#004aad] to-[#0066dd] rounded-xl shadow-lg mb-4 mx-auto w-16 h-16 flex items-center justify-center group-hover:shadow-xl transition-shadow duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" className="py-20 bg-gradient-to-r from-[#004aad] to-[#0066dd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div className="group">
              <div className="text-5xl font-bold mb-2 text-[#f7c948]">
                {animatedStats.students.toLocaleString()}+
              </div>
              <div className="text-xl opacity-90">Happy Students</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold mb-2 text-[#f7c948]">
                {animatedStats.colleges}+
              </div>
              <div className="text-xl opacity-90">Partner Colleges</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold mb-2 text-[#f7c948]">
                {animatedStats.satisfaction}%
              </div>
              <div className="text-xl opacity-90">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from students, faculty, and administrators who trust NextEdu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-[#f7c948] fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div className="border-t pt-4">
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-[#004aad] text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Tour Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience Our Campus</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take a virtual tour of our state-of-the-art facilities
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-[#004aad] to-[#0066dd] rounded-xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-center h-full">
                <button className="bg-white/20 backdrop-blur-sm rounded-full p-6 hover:bg-white/30 transition-all duration-300 hover:scale-110">
                  <Play className="h-12 w-12 text-white ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-[#004aad] to-[#0066dd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Bring Your Campus into the Digital Era
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of institutions worldwide who trust NextEdu for their academic management
          </p>
          <button className="px-8 py-4 bg-[#f7c948] text-[#004aad] rounded-lg font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="h-8 w-8 text-[#f7c948]" />
                <span className="text-2xl font-bold">NextEdu</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Empowering educational institutions with cutting-edge ERP solutions for the digital age.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-gray-400 hover:text-[#f7c948] transition-colors cursor-pointer" />
                <Twitter className="h-6 w-6 text-gray-400 hover:text-[#f7c948] transition-colors cursor-pointer" />
                <Instagram className="h-6 w-6 text-gray-400 hover:text-[#f7c948] transition-colors cursor-pointer" />
                <Linkedin className="h-6 w-6 text-gray-400 hover:text-[#f7c948] transition-colors cursor-pointer" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#f7c948] transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#f7c948] transition-colors">Academics</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#f7c948] transition-colors">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#f7c948] transition-colors">ERP Login</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-[#f7c948]" />
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-[#f7c948]" />
                  <span className="text-gray-400">info@nextedu.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-[#f7c948]" />
                  <span className="text-gray-400">123 Education St, Learning City</span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="max-w-md mx-auto text-center">
              <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
              <div className="flex space-x-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#f7c948] text-white"
                />
                <button className="px-6 py-2 bg-[#f7c948] text-[#004aad] rounded-lg font-semibold hover:bg-white transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 NextEdu. All rights reserved. Designed for the future of education.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <button className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50">
        <MessageCircle className="h-6 w-6" />
      </button>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.3s both;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.6s both;
        }
      `}</style>
    </div>
  );
}

export default LandingPage;