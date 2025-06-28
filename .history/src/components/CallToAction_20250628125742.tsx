import React from 'react';
import { Button } from "../components/lan_cmp/button";
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Start Your
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Academic Journey?
              </span>
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join thousands of successful alumni who started their careers at RGUKT. 
              Apply now and be part of our legacy of excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold px-8 py-4 rounded-full">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full backdrop-blur-sm">
                Schedule Campus Visit
              </Button>
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-yellow-400" />
                <span>+91-9876543210</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-yellow-400" />
                <span>info@rgukt.edu</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-yellow-400" />
                <span>Hyderabad, India</span>
              </div>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-3xl font-bold text-yellow-400 mb-2">25,000+</div>
              <div className="text-blue-200">Alumni Network</div>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-3xl font-bold text-yellow-400 mb-2">95%</div>
              <div className="text-blue-200">Placement Rate</div>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-3xl font-bold text-yellow-400 mb-2">100+</div>
              <div className="text-blue-200">Programs</div>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-3xl font-bold text-yellow-400 mb-2">50+</div>
              <div className="text-blue-200">Awards</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;