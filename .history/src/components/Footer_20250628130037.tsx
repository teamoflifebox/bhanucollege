import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from "../components/lan_cmp/button";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* College Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">RGUKT College</h3>
            <p className="text-gray-300 mb-4">
              Accredited by NAAC Grade A+, committed to excellence in education, 
              research, and innovation since 1995.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 hover:text-blue-400 cursor-pointer" />
              <Twitter className="h-5 w-5 hover:text-blue-400 cursor-pointer" />
              <Linkedin className="h-5 w-5 hover:text-blue-400 cursor-pointer" />
              <Instagram className="h-5 w-5 hover:text-pink-400 cursor-pointer" />
              <Youtube className="h-5 w-5 hover:text-red-400 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Academic Programs</a></li>
              <li><a href="#" className="hover:text-white">Admissions</a></li>
              <li><a href="#" className="hover:text-white">Campus Life</a></li>
              <li><a href="#" className="hover:text-white">Research</a></li>
              <li><a href="#" className="hover:text-white">Placements</a></li>
            </ul>
          </div>

          {/* Admissions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Admissions</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">UG Admission</a></li>
              <li><a href="#" className="hover:text-white">PG Admission</a></li>
              <li><a href="#" className="hover:text-white">Ph.D. Admission</a></li>
              <li><a href="#" className="hover:text-white">Fee Structure</a></li>
              <li><a href="#" className="hover:text-white">Scholarships</a></li>
              <li><a href="#" className="hover:text-white">Important Dates</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                <span>RGUKT Campus, Hyderabad, Telangana, India - 500032</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3" />
                <span>+91-9876543210</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3" />
                <span>info@rgukt.edu</span>
              </div>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900 transition-colors duration-200"
                >
                  Schedule Campus Visit
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 RGUKT College. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;