import React, { useState } from 'react';
import { Menu, X, ChevronDown, LogIn } from 'lucide-react';
import { Button } from "../components/lan_cmp/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../components/lan_cmp/navigation-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const instituteLinks = [
    'About College', 'Vision and Mission', 'Organization Chart', 
    'Campus Tour', 'NAAC Certificate', 'Governing Council'
  ];

  const academicsLinks = [
    'Academic Programs', 'Departments', 'Curriculum', 
    'Time Table', 'Fee Structure', 'Faculty Ethics'
  ];

  const administrationLinks = [
    'Chancellor', 'Vice Chancellor', 'Director', 
    'Administrative Officer', 'Finance Officer', 'Sports Board'
  ];

  const facultyLinks = [
    'Computer Science', 'Electronics', 'Mechanical', 
    'Civil Engineering', 'Mathematics', 'Physics', 'Chemistry'
  ];

  const admissionLinks = ['UG Admission', 'PG Admission', 'Ph.D. Admission'];

  const studentLinks = [
    'Education at RGUKT', 'Career Development Cell', 'Incubation Cell',
    'International Desk', 'Anti-Ragging', 'Women\'s Cell', 
    'Student\'s Welfare Office', 'Alumni Portal'
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top bar with college name and accreditation */}
      <div className="bg-blue-900 text-white py-2">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-lg font-bold">RGUKT College of Excellence</h1>
          <p className="text-sm">Accredited by NAAC Grade A+</p>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 flex-1">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Institute */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Institute
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-80 gap-2 p-4">
                      {instituteLinks.map((link) => (
                        <NavigationMenuLink key={link} className="block p-2 hover:bg-gray-100 rounded">
                          {link}
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Academics */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Academics
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-80 gap-2 p-4">
                      {academicsLinks.map((link) => (
                        <NavigationMenuLink key={link} className="block p-2 hover:bg-gray-100 rounded">
                          {link}
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Administration */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Administration
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-80 gap-2 p-4">
                      {administrationLinks.map((link) => (
                        <NavigationMenuLink key={link} className="block p-2 hover:bg-gray-100 rounded">
                          {link}
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Faculty */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Faculty
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-80 gap-2 p-4">
                      {facultyLinks.map((link) => (
                        <NavigationMenuLink key={link} className="block p-2 hover:bg-gray-100 rounded">
                          {link}
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Admission */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Admission
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-60 gap-2 p-4">
                      {admissionLinks.map((link) => (
                        <NavigationMenuLink key={link} className="block p-2 hover:bg-gray-100 rounded">
                          {link}
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Students */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Students
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-80 gap-2 p-4">
                      {studentLinks.map((link) => (
                        <NavigationMenuLink key={link} className="block p-2 hover:bg-gray-100 rounded">
                          {link}
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Simple menu items */}
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-sm font-medium px-3 py-2 hover:text-blue-600">
                    Placement Cell
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink className="text-sm font-medium px-3 py-2 hover:text-blue-600">
                    Library
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink className="text-sm font-medium px-3 py-2 hover:text-blue-600">
                    Careers
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Login Button */}
          <div className="hidden lg:flex items-center">
            <Button variant="outline" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="space-y-2">
              {['Institute', 'Academics', 'Administration', 'Faculty', 'Admission', 'Students', 'Placement Cell', 'Library', 'Careers'].map((item) => (
                <button key={item} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
                  {item}
                </button>
              ))}
              <div className="px-4 py-2">
                <Button variant="outline" className="w-full flex items-center gap-2 justify-center">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
