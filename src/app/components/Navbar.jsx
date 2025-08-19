"use client";
import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, Phone, Bell, User, Search, MapPin, ChevronDown } from 'lucide-react';

export default function BloodBankNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
      if (!event.target.closest('.location-menu')) {
        setIsLocationMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navigationItems = [
    { name: 'Home', href: '/', active: true },
    { name: 'Find Blood', href: '/find-blood' },
    { name: 'Donate', href: '/donate' },
    { name: 'Blood Drives', href: '/events' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const locations = [
    { name: 'Main Center', address: '123 Healthcare Ave' },
    { name: 'North Branch', address: '456 Medical St' },
    { name: 'South Branch', address: '789 Wellness Blvd' },
    { name: 'East Branch', address: '321 Care Lane' }
  ];

  return (
    <>
      {/* Top Emergency Banner */}
      <div className="bg-red-600 text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <span className="font-medium">Emergency: +1 (555) 911-BLOOD</span>
            </div>
            <div className="hidden md:flex items-center">
              <Bell className="w-4 h-4 mr-2" />
              <span>24/7 Blood Emergency Service Available</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline">Follow us:</span>
            <div className="flex space-x-2">
              <div className="w-6 h-6 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-800 cursor-pointer transition-colors">
                <span className="text-xs">f</span>
              </div>
              <div className="w-6 h-6 bg-red-700 rounded-full flex items-center justify-center hover:bg-red-800 cursor-pointer transition-colors">
                <span className="text-xs">t</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white shadow-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center cursor-pointer group">
                <div className="relative">
                  <Heart className="h-8 w-8 text-red-600 group-hover:scale-110 transition-transform" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                <div className="ml-3">
                  <span className="text-xl font-bold text-gray-900">LifeBank</span>
                  <p className="text-xs text-gray-600 -mt-1">Save Lives Together</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    item.active
                      ? 'text-red-600 bg-red-50 border-b-2 border-red-600'
                      : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              
              {/* Search Button */}
              <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors">
                <Search className="w-5 h-5" />
              </button>

              {/* Location Selector */}
              <div className="relative location-menu">
                <button
                  onClick={() => setIsLocationMenuOpen(!isLocationMenuOpen)}
                  className="hidden md:flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Location</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Location Dropdown */}
                {isLocationMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Select Location</p>
                    </div>
                    {locations.map((location, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsLocationMenuOpen(false)}
                      >
                        <div className="text-sm font-medium text-gray-900">{location.name}</div>
                        <div className="text-xs text-gray-600">{location.address}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div className="relative user-menu">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-full transition-colors"
                >
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-red-600" />
                  </div>
                  <ChevronDown className="w-4 h-4 hidden md:block" />
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">John Doe</p>
                      <p className="text-xs text-gray-600">Donor ID: #12345</p>
                    </div>
                    <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      My Profile
                    </a>
                    <a href="#donations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Donation History
                    </a>
                    <a href="#appointments" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Appointments
                    </a>
                    <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Settings
                    </a>
                    <div className="border-t border-gray-100 mt-2">
                      <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Emergency Button */}
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hidden md:block">
                Emergency
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    item.active
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Emergency Button */}
              <button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg text-base font-medium transition-colors">
                Emergency Request
              </button>

              {/* Mobile Location Selector */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-900 mb-2">Select Location:</p>
                <div className="grid grid-cols-1 gap-2">
                  {locations.map((location, index) => (
                    <button
                      key={index}
                      className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="text-sm font-medium text-gray-900">{location.name}</div>
                      <div className="text-xs text-gray-600">{location.address}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Quick Actions Bar (appears on scroll) */}
      {isScrolled && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
          <button className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110">
            <Heart className="w-5 h-5" />
          </button>
          <button className="bg-white hover:bg-gray-50 text-red-600 p-3 rounded-full shadow-lg border border-gray-200 transition-all duration-300 transform hover:scale-110">
            <Phone className="w-5 h-5" />
          </button>
        </div>
      )}

      <style jsx>{`
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .transition-all {
          transition: all 0.3s ease;
        }

        .transform {
          transition: transform 0.2s ease;
        }

        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }

        .hover\\:scale-110:hover {
          transform: scale(1.1);
        }

        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar for dropdowns */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #dc2626;
          border-radius: 2px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #b91c1c;
        }
      `}</style>
    </>
  );
} 