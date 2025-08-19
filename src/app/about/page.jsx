"use client";
import React, { useState, useEffect } from 'react';
import { Heart, Users, Award, Clock, MapPin, Phone, Mail, Shield, Target, Eye, Globe, Stethoscope, Building, Calendar, ChevronRight, Star, ArrowRight, CheckCircle } from 'lucide-react';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [counters, setCounters] = useState({
    lives: 0,
    donors: 0,
    hospitals: 0,
    years: 0
  });
  const [animateStats, setAnimateStats] = useState(false);

  const finalCounts = {
    lives: 50000,
    donors: 15000,
    hospitals: 120,
    years: 25
  };

  useEffect(() => {
    setAnimateStats(true);
    const interval = setInterval(() => {
      setCounters(prev => ({
        lives: prev.lives < finalCounts.lives ? prev.lives + 500 : finalCounts.lives,
        donors: prev.donors < finalCounts.donors ? prev.donors + 150 : finalCounts.donors,
        hospitals: prev.hospitals < finalCounts.hospitals ? prev.hospitals + 2 : finalCounts.hospitals,
        years: prev.years < finalCounts.years ? prev.years + 1 : finalCounts.years
      }));
    }, 50);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setCounters(finalCounts);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const teamMembers = [
    {
      name: "Dr. Sarah Ahmed",
      position: "Chief Medical Officer",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      bio: "Leading hematologist with 20+ years experience in blood banking and transfusion medicine.",
      specialization: "Hematology & Transfusion Medicine"
    },
    {
      name: "Muhammad Hassan",
      position: "Operations Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Expert in blood bank operations and quality management with extensive experience in healthcare logistics.",
      specialization: "Operations & Quality Management"
    },
    {
      name: "Dr. Fatima Khan",
      position: "Laboratory Director",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
      bio: "Specialist in blood testing and laboratory management ensuring highest safety standards.",
      specialization: "Laboratory Medicine"
    },
    {
      name: "Ali Raza",
      position: "Community Outreach Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "Passionate advocate for blood donation awareness and community health initiatives.",
      specialization: "Community Relations & Education"
    }
  ];

  const milestones = [
    { year: "1999", event: "Blood Bank Established", description: "Founded in Faisalabad to serve the local community" },
    { year: "2005", event: "First Mobile Unit", description: "Launched mobile blood collection services" },
    { year: "2010", event: "ISO Certification", description: "Achieved international quality standards" },
    { year: "2015", event: "Digital Integration", description: "Implemented modern blood management systems" },
    { year: "2020", event: "COVID Response", description: "Led blood supply management during pandemic" },
    { year: "2024", event: "PWA Launch", description: "Launched modern web application for better service" }
  ];

  const services = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Blood Collection",
      description: "Safe and professional blood collection from volunteer donors with state-of-the-art equipment and trained staff."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Blood Testing",
      description: "Comprehensive testing for blood-borne infections and blood typing using advanced laboratory techniques."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Blood Processing",
      description: "Separation of blood components (plasma, platelets, red cells) to maximize therapeutic benefit."
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Blood Storage",
      description: "Temperature-controlled storage facilities ensuring blood products maintain their therapeutic properties."
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Emergency Supply",
      description: "24/7 emergency blood supply service for hospitals and medical facilities in critical situations."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Donor Care",
      description: "Comprehensive donor health screening and post-donation care to ensure donor safety and comfort."
    }
  ];

  const certifications = [
    { name: "ISO 15189:2012", description: "Medical Laboratory Quality" },
    { name: "WHO Standards", description: "World Health Organization Compliance" },
    { name: "AABB Accredited", description: "American Association of Blood Banks" },
    { name: "FDA Approved", description: "Food and Drug Administration" }
  ];

  const TabContent = () => {
    switch (activeTab) {
      case 'mission':
        return (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <Target className="w-6 h-6 text-red-500 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To save lives by providing safe, reliable, and accessible blood products to our community while promoting voluntary blood donation through education and awareness programs. We are committed to maintaining the highest standards of quality and safety in all our operations.
                </p>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <Eye className="w-6 h-6 text-red-500 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To become the leading blood bank in Punjab, ensuring no patient suffers due to lack of blood availability. We envision a future where voluntary blood donation is a normal part of community life, and every citizen understands their role in saving lives.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Core Values</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Heart className="w-8 h-8 text-red-500" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Compassion</h4>
                  <p className="text-gray-600 text-sm">Every action driven by care for human life and wellbeing.</p>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Shield className="w-8 h-8 text-blue-500" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Safety</h4>
                  <p className="text-gray-600 text-sm">Uncompromising commitment to donor and patient safety.</p>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Award className="w-8 h-8 text-yellow-500" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Excellence</h4>
                  <p className="text-gray-600 text-sm">Pursuing the highest standards in all our services.</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'history':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Journey Through Time</h3>
              <p className="text-gray-600 max-w-3xl mx-auto">
                From humble beginnings to becoming a trusted healthcare institution, our journey spans over two decades of dedicated service to the community.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-500 to-pink-500 rounded-full"></div>
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="flex-1 md:pr-8 md:pl-8">
                      <div className={`bg-white p-6 rounded-2xl shadow-lg ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        <div className="text-red-500 font-bold text-lg mb-2">{milestone.year}</div>
                        <h4 className="text-xl font-bold text-gray-800 mb-2">{milestone.event}</h4>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="relative flex-shrink-0 mx-4">
                      <div className="w-4 h-4 bg-red-500 rounded-full relative z-10"></div>
                      <div className="absolute inset-0 w-4 h-4 bg-red-200 rounded-full animate-ping"></div>
                    </div>
                    <div className="flex-1"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'team':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Meet Our Expert Team</h3>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our dedicated professionals bring years of experience and unwavering commitment to saving lives through blood donation and transfusion services.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-20 h-20 rounded-full object-cover mr-4 border-4 border-red-100"
                      />
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">{member.name}</h4>
                        <p className="text-red-600 font-semibold">{member.position}</p>
                        <p className="text-sm text-gray-500">{member.specialization}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                    
                    <div className="flex items-center mt-4 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">Excellent Performance</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'services':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Comprehensive Services</h3>
              <p className="text-gray-600 max-w-3xl mx-auto">
                We provide a full range of blood banking services with state-of-the-art equipment and highly trained professionals to ensure the highest quality care.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-red-500 mb-4">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h4>
                  <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                  <div className="flex items-center text-red-600 hover:text-red-700 cursor-pointer">
                    <span className="text-sm font-semibold">Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Quality Certifications</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Award className="w-8 h-8 text-blue-500" />
                    </div>
                    <h4 className="font-bold text-gray-800 text-sm mb-1">{cert.name}</h4>
                    <p className="text-gray-600 text-xs">{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              About Our Mission
              <Heart className="inline-block ml-4 w-12 h-12 text-pink-200 animate-pulse" />
            </h1>
            <p className="text-xl mb-8 text-red-100 leading-relaxed">
              For over 25 years, we've been at the forefront of saving lives through safe blood collection, 
              testing, and distribution across Punjab. Every drop counts in our mission to serve humanity.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Calendar className="w-5 h-5" />
                <span>Since 1999</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5" />
                <span>Faisalabad, Punjab</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Shield className="w-5 h-5" />
                <span>ISO Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Impact in Numbers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These numbers represent real lives touched, families helped, and communities served through our dedication to blood banking excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-8 mb-4 shadow-xl transform hover:scale-105 transition-transform">
                <Heart className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">{counters.lives.toLocaleString()}+</div>
                <div className="text-red-100 font-semibold">Lives Saved</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-8 mb-4 shadow-xl transform hover:scale-105 transition-transform">
                <Users className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">{counters.donors.toLocaleString()}+</div>
                <div className="text-blue-100 font-semibold">Active Donors</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-8 mb-4 shadow-xl transform hover:scale-105 transition-transform">
                <Building className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">{counters.hospitals}+</div>
                <div className="text-green-100 font-semibold">Partner Hospitals</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 mb-4 shadow-xl transform hover:scale-105 transition-transform">
                <Award className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">{counters.years}+</div>
                <div className="text-purple-100 font-semibold">Years of Service</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Content Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-2">
              {[
                { id: 'mission', label: 'Mission & Vision', icon: <Target className="w-5 h-5" /> },
                { id: 'history', label: 'Our History', icon: <Clock className="w-5 h-5" /> },
                { id: 'team', label: 'Our Team', icon: <Users className="w-5 h-5" /> },
                { id: 'services', label: 'Services', icon: <Stethoscope className="w-5 h-5" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
                  }`}
                >
                  {tab.icon}
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-6xl mx-auto">
            <TabContent />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Have questions about blood donation or our services? We're here to help 24/7.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur">
              <Phone className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="text-gray-300 mb-2">24/7 Emergency Hotline</p>
              <a href="tel:+92-41-111-BLOOD" className="text-red-400 hover:text-red-300 font-semibold">
                +92-41-111-BLOOD
              </a>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur">
              <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-gray-300 mb-2">Quick Response Guaranteed</p>
              <a href="mailto:info@bloodbank.pk" className="text-blue-400 hover:text-blue-300 font-semibold">
                info@bloodbank.pk
              </a>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur">
              <MapPin className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Visit Us</h3>
              <p className="text-gray-300 mb-2">Main Blood Bank Center</p>
              <p className="text-green-400 hover:text-green-300 font-semibold">
                Medical Complex, Faisalabad
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Schedule a Visit
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;