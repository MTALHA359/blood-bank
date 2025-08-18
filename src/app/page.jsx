"use client";
import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Phone, Clock, Users, Droplets, Award, Shield, ChevronDown, Menu, X, Star, Calendar, ArrowRight, Activity, User, Search } from 'lucide-react';

export default function BloodBankHomepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [stats, setStats] = useState({ donors: 0, units: 0, lives: 0, hospitals: 0 });
  const [isVisible, setIsVisible] = useState({});

  // Animated counter for stats
  useEffect(() => {
    const animateStats = () => {
      const targets = { donors: 15420, units: 8765, lives: 12340, hospitals: 156 };
      const duration = 2000;
      const steps = 60;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setStats({
          donors: Math.floor(targets.donors * progress),
          units: Math.floor(targets.units * progress),
          lives: Math.floor(targets.lives * progress),
          hospitals: Math.floor(targets.hospitals * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setStats(targets);
        }
      }, duration / steps);
    };

    const timer = setTimeout(animateStats, 500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Donor",
      text: "Donating blood through this platform has been incredibly easy and rewarding. The staff is professional and the process is seamless.",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      role: "Hospital Administrator",
      text: "This blood bank has been a lifesaver for our hospital. Their quick response and quality service has helped us save countless lives.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "First-time Donor",
      text: "I was nervous about donating for the first time, but the team made me feel comfortable and informed throughout the entire process.",
      rating: 5
    }
  ];

  const services = [
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Blood Donation",
      description: "Safe and comfortable blood donation process with trained medical professionals.",
      features: ["Pre-donation screening", "Comfortable donation area", "Post-donation care"]
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Blood Typing",
      description: "Comprehensive blood typing and compatibility testing services.",
      features: ["ABO typing", "Rh factor testing", "Cross-matching"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Blood Storage",
      description: "State-of-the-art storage facilities ensuring blood safety and quality.",
      features: ["Temperature controlled", "Quality monitoring", "Proper labeling"]
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Emergency Supply",
      description: "24/7 emergency blood supply for hospitals and medical facilities.",
      features: ["Rapid response", "Hospital network", "Emergency protocols"]
    }
  ];

  const upcomingEvents = [
    { date: "Aug 25", title: "Community Blood Drive", location: "Central Mall", time: "9:00 AM - 5:00 PM" },
    { date: "Sep 02", title: "University Campus Drive", location: "State University", time: "10:00 AM - 4:00 PM" },
    { date: "Sep 08", title: "Corporate Blood Drive", location: "Tech Park", time: "11:00 AM - 3:00 PM" },
    { date: "Sep 15", title: "Weekend Blood Camp", location: "Community Center", time: "8:00 AM - 6:00 PM" }
  ];

  return (
    <div className="min-h-screen bg-white">
     
      
      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Save Lives, Donate Blood
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100 max-w-3xl mx-auto">
              Every drop counts. Join our mission to ensure no life is lost due to blood shortage. 
              Your donation can save up to three lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-red-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105">
                Donate Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">
                Find Blood
              </button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">{stats.donors.toLocaleString()}+</div>
              <div className="text-gray-600 font-medium">Active Donors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">{stats.units.toLocaleString()}</div>
              <div className="text-gray-600 font-medium">Blood Units Collected</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">{stats.lives.toLocaleString()}</div>
              <div className="text-gray-600 font-medium">Lives Saved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">{stats.hospitals}</div>
              <div className="text-gray-600 font-medium">Partner Hospitals</div>
            </div>
          </div>
        </div>
      </section>

      {/* Blood Availability */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Current Blood Availability
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real-time blood stock levels across all blood types
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {bloodTypes.map((type, index) => {
              const availability = Math.floor(Math.random() * 100) + 20;
              const isLow = availability < 40;
              const isCritical = availability < 20;
              
              return (
                <div key={type} className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="text-2xl font-bold text-gray-900 mb-2">{type}</div>
                  <div className={`text-sm font-medium mb-2 ${
                    isCritical ? 'text-red-600' : isLow ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {isCritical ? 'Critical' : isLow ? 'Low' : 'Available'}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full ${
                        isCritical ? 'bg-red-600' : isLow ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${availability}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600">{availability} units</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive blood bank services designed to save lives and serve our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-red-600 mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-500 flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Process */}
      <section id="donate" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Donation Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to become a life-saving blood donor
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Registration</h3>
              <p className="text-gray-600">
                Register online or walk-in. Fill out the donor questionnaire and provide valid ID.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Health Screening</h3>
              <p className="text-gray-600">
                Quick health check including blood pressure, temperature, and hemoglobin level.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Donation</h3>
              <p className="text-gray-600">
                Comfortable donation process takes 8-10 minutes. Relax and save lives!
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors">
              Schedule Donation
            </button>
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Donor Eligibility
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Check if you're eligible to donate blood and save lives
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-6">✓ You CAN donate if:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">Age between 18-65 years</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">Weight above 50 kg (110 lbs)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">In good general health</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">Haven't donated in the last 56 days</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">Hemoglobin level is adequate</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-6">✗ You CANNOT donate if:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">Currently taking antibiotics</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">Had a cold or flu in the past week</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">Pregnant or breastfeeding</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">Recent tattoo or piercing (within 6 months)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">History of certain medical conditions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="events" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Blood Drives
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join us at these upcoming community blood donation events
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 px-3 py-2 rounded-lg text-center min-w-16">
                    <div className="text-red-600 font-bold text-lg">{event.date.split(' ')[1]}</div>
                    <div className="text-red-600 text-sm">{event.date.split(' ')[0]}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <div className="flex items-center text-gray-600 mb-1">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What People Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stories from our donors and partner organizations
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < testimonials[currentTestimonial].rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <p className="text-lg text-gray-600 mb-6">"{testimonials[currentTestimonial].text}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-red-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Emergency Blood Request?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            We're available 24/7 for emergency blood requirements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+1234567890" className="bg-white text-red-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              Call Emergency Line
            </a>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">
              Request Blood Online
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-red-600" />
                <span className="ml-2 text-xl font-bold">LifeBank</span>
              </div>
              <p className="text-gray-400 mb-4">
                Saving lives through blood donation. Join our mission to ensure no life is lost due to blood shortage.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 cursor-pointer transition-colors">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 cursor-pointer transition-colors">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 cursor-pointer transition-colors">
                  <span className="text-sm">in</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#donate" className="hover:text-white transition-colors">Donate Blood</a></li>
                <li><a href="#events" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Find Blood</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Contact Info</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>123 Healthcare Ave, Medical District</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>24/7 Emergency Service</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Stay updated with blood drives and donation opportunities.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-600"
                />
                <button className="bg-red-600 px-4 py-2 rounded-r-lg hover:bg-red-700 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 LifeBank. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110">
          <Heart className="w-6 h-6" />
        </button>
      </div>

      {/* Emergency Banner */}
      <div className="fixed top-16 left-0 right-0 bg-yellow-400 text-black py-2 px-4 text-center z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            <span className="font-medium">URGENT: O- blood type needed at City Hospital</span>
          </div>
          <button className="bg-black text-yellow-400 px-4 py-1 rounded text-sm hover:bg-gray-800 transition-colors">
            Donate Now
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .hover\:scale-105:hover {
          transform: scale(1.05);
        }

        .transition-all {
          transition: all 0.3s ease;
        }

        .transition-colors {
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .transition-shadow {
          transition: box-shadow 0.3s ease;
        }

        .group:hover .group-hover\:translate-x-2 {
          transform: translateX(0.5rem);
        }

        .backdrop-blur {
          backdrop-filter: blur(4px);
        }

        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: #dc2626;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #b91c1c;
        }
      `}</style>
    </div>
  );
}