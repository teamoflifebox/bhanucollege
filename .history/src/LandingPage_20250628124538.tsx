import React from 'react';
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageCircle,
} from 'lucide-react';

function LandingPage() {
  return (
    <div className="font-sans text-gray-700">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
          {/* Branding */}
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-blue-700" />
            <div>
              <h1 className="font-bold text-xl text-blue-700">Your College Name</h1>
              <p className="text-sm text-gray-500">Accredited by NAAC Grade A+</p>
            </div>
          </div>
          {/* Nav */}
          <nav className="hidden md:flex space-x-6">
            <Link to="#institute" className="hover:text-blue-700">Institute</Link>
            <Link to="#academics" className="hover:text-blue-700">Academics</Link>
            <Link to="#admissions" className="hover:text-blue-700">Admissions</Link>
            <Link to="#students" className="hover:text-blue-700">Students</Link>
            <Link to="#placements" className="hover:text-blue-700">Placements</Link>
            <Link to="#library" className="hover:text-blue-700">Library</Link>
            <Link to="#careers" className="hover:text-blue-700">Careers</Link>
          </nav>
          {/* CTA */}
          <div className="hidden md:flex space-x-2">
            <button className="border border-blue-700 text-blue-700 px-4 py-1 rounded hover:bg-blue-700 hover:text-white transition">Login</button>
            <button className="bg-yellow-400 text-blue-800 font-semibold px-4 py-1 rounded hover:bg-yellow-500 transition">Apply Now</button>
          </div>
          {/* Mobile Menu Icon */}
          <button className="md:hidden">
            <Menu className="h-6 w-6 text-blue-700" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-28 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
            Welcome to Your College Name
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Excellence in Education, Innovation, and Research
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800 transition">Explore Programs</button>
            <button className="border border-blue-700 text-blue-700 px-6 py-3 rounded hover:bg-blue-700 hover:text-white transition">Campus Tour</button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 text-center gap-6">
          <div>
            <h3 className="text-3xl font-bold text-blue-700">10,000+</h3>
            <p className="text-gray-600">Students Enrolled</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-700">200+</h3>
            <p className="text-gray-600">Faculty Members</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-700">95%</h3>
            <p className="text-gray-600">Placement Rate</p>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section id="academics" className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-8">Departments</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "Computer Science",
              "Electrical Engineering",
              "Mechanical Engineering",
              "Civil Engineering",
              "Mathematics",
              "Bio-sciences"
            ].map((dept) => (
              <div key={dept} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                <h3 className="font-semibold text-blue-700">{dept}</h3>
                <p className="text-gray-600 mt-2">World-class faculty and modern labs.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placements Section */}
      <section id="placements" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Placements</h2>
          <p className="text-gray-600 mb-8">Leading companies recruit our graduates every year.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <img src="/company1-logo.png" alt="Company1" className="h-12"/>
            <img src="/company2-logo.png" alt="Company2" className="h-12"/>
            <img src="/company3-logo.png" alt="Company3" className="h-12"/>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-700 py-12 text-center text-white">
        <h2 className="text-2xl font-semibold mb-4">Ready to Join Our Vibrant Community?</h2>
        <button className="bg-yellow-400 text-blue-800 font-bold px-6 py-3 rounded hover:bg-yellow-500 transition">Apply Now</button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-2">Your College Name</h3>
            <p>Accredited by NAAC Grade A+</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Quick Links</h4>
            <ul>
              <li><Link to="#institute" className="hover:text-white">Institute</Link></li>
              <li><Link to="#academics" className="hover:text-white">Academics</Link></li>
              <li><Link to="#admissions" className="hover:text-white">Admissions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Contact Us</h4>
            <p><Phone className="inline h-4 w-4 mr-1"/> +91-1234567890</p>
            <p><Mail className="inline h-4 w-4 mr-1"/> info@college.edu</p>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500">
          © 2025 Your College Name. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
