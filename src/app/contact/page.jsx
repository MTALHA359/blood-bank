"use client";
import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, AlertCircle, Send, User, MessageSquare, Calendar, Heart, Shield, Stethoscope, Ambulance, Building, Globe, Facebook, Twitter, Instagram, Youtube, CheckCircle, ArrowRight, Navigation } from 'lucide-react';

const ContactPage = () => {
  const [selectedContact, setSelectedContact] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contactType: 'general',
    urgency: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const contactTypes = [
    {
      id: 'general',
      title: 'General Inquiry',
      icon: <MessageSquare className="w-6 h-6" />,
      description: 'General questions about our services',
      phone: '+92-41-2345678',
      email: 'info@bloodbank.pk',
      responseTime: '24 hours'
    },
    {
      id: 'emergency',
      title: 'Emergency Blood Need',
      icon: <AlertCircle className="w-6 h-6" />,
      description: 'Urgent blood requirements',
      phone: '+92-41-911-BLOOD',
      email: 'emergency@bloodbank.pk',
      responseTime: 'Immediate'
    },
    {
      id: 'donation',
      title: 'Blood Donation',
      icon: <Heart className="w-6 h-6" />,
      description: 'Information about donating blood',
      phone: '+92-41-DONATE-1',
      email: 'donate@bloodbank.pk',
      responseTime: '4 hours'
    },
    {
      id: 'medical',
      title: 'Medical Services',
      icon: <Stethoscope className="w-6 h-6" />,
      description: 'Medical consultations and services',
      phone: '+92-41-MEDICAL',
      email: 'medical@bloodbank.pk',
      responseTime: '8 hours'
    }
  ];

  const locations = [
    {
      name: 'Main Blood Bank Center',
      address: 'Medical Complex, Jail Road, Faisalabad, Punjab 38000',
      phone: '+92-41-2345678',
      email: 'main@bloodbank.pk',
      hours: '24/7 Emergency Service',
      services: ['Blood Collection', 'Testing', 'Storage', 'Emergency Supply'],
      coordinates: { lat: 31.4504, lng: 73.1350 }
    },
    {
      name: 'Mobile Collection Unit',
      address: 'Various Locations Across Faisalabad',
      phone: '+92-41-MOBILE-1',
      email: 'mobile@bloodbank.pk',
      hours: 'Mon-Sat: 9:00 AM - 6:00 PM',
      services: ['Mobile Blood Collection', 'Community Outreach'],
      coordinates: { lat: 31.4180, lng: 73.0775 }
    },
    {
      name: 'University Campus Unit',
      address: 'University of Agriculture, Faisalabad',
      phone: '+92-41-UAF-BLOOD',
      email: 'campus@bloodbank.pk',
      hours: 'Mon-Fri: 10:00 AM - 4:00 PM',
      services: ['Student Services', 'Faculty Donations'],
      coordinates: { lat: 31.4315, lng: 73.0776 }
    }
  ];

  const emergencyContacts = [
    {
      title: 'Blood Emergency Hotline',
      number: '+92-41-911-BLOOD',
      available: '24/7',
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'text-red-500'
    },
    {
      title: 'Ambulance Service',
      number: '+92-41-AMBULANCE',
      available: '24/7',
      icon: <Ambulance className="w-5 h-5" />,
      color: 'text-blue-500'
    },
    {
      title: 'Medical Consultation',
      number: '+92-41-CONSULT',
      available: 'Mon-Sun: 8 AM - 10 PM',
      icon: <Stethoscope className="w-5 h-5" />,
      color: 'text-green-500'
    }
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      url: 'https://facebook.com/bloodbankfaisalabad',
      followers: '25K+'
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      url: 'https://instagram.com/bloodbankfsd',
      followers: '15K+'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      url: 'https://twitter.com/bloodbankfsd',
      followers: '10K+'
    },
    {
      name: 'YouTube',
      icon: <Youtube className="w-5 h-5" />,
      url: 'https://youtube.com/bloodbankfaisalabad',
      followers: '8K+'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        contactType: 'general',
        urgency: 'normal'
      });
      
      setTimeout(() => setSubmitted(false), 5000);
    }, 2000);
  };

  const isOpen = () => {
    const hour = currentTime.getHours();
    return hour >= 0 && hour <= 23; // 24/7 for emergency services
  };

  const getStatusColor = () => {
    return isOpen() ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Get In Touch
              <Phone className="inline-block ml-4 w-10 h-10 text-pink-200 animate-bounce" />
            </h1>
            <p className="text-xl mb-8 text-red-100">
              We're here to help 24/7. Whether it's an emergency blood need or general inquiry, 
              our dedicated team is ready to assist you.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Clock className="w-4 h-4" />
                <span className={getStatusColor()}>● </span>
                <span>24/7 Emergency Service</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Shield className="w-4 h-4" />
                <span>Secure Communication</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Heart className="w-4 h-4" />
                <span>Life-Saving Mission</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contacts Bar */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {emergencyContacts.map((contact, index) => (
              <a
                key={index}
                href={`tel:${contact.number}`}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all transform hover:scale-105"
              >
                <div className={contact.color}>
                  {contact.icon}
                </div>
                <div>
                  <div className="font-semibold">{contact.title}</div>
                  <div className="text-xs opacity-90">{contact.number} • {contact.available}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form Section */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <Send className="w-6 h-6 text-red-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Send us a Message</h2>
              </div>

              {/* Contact Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Contact Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {contactTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setSelectedContact(type.id);
                        setFormData(prev => ({ ...prev, contactType: type.id }));
                      }}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        selectedContact === type.id
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-red-300'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <div className={`mr-2 ${selectedContact === type.id ? 'text-red-500' : 'text-gray-400'}`}>
                          {type.icon}
                        </div>
                        <span className="font-semibold text-gray-800 text-sm">{type.title}</span>
                      </div>
                      <p className="text-xs text-gray-600">{type.description}</p>
                      <p className="text-xs text-red-600 mt-1">Response: {type.responseTime}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="+92-XX-XXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Brief subject of your inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="low">Low - General Inquiry</option>
                    <option value="normal">Normal - Standard Request</option>
                    <option value="high">High - Urgent Need</option>
                    <option value="critical">Critical - Emergency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all transform ${
                    isSubmitting
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 hover:scale-105 shadow-lg hover:shadow-xl'
                  } flex items-center justify-center gap-2`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>

                {submitted && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-green-800 font-semibold">Message sent successfully!</p>
                      <p className="text-green-600 text-sm">We'll get back to you within {contactTypes.find(t => t.id === selectedContact)?.responseTime}.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-8">
            {/* Quick Contact Cards */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Quick Contact</h3>
              {contactTypes.map((contact) => (
                <div key={contact.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center mb-3">
                      <div className="text-red-500 mr-3">
                        {contact.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{contact.title}</h4>
                        <p className="text-sm text-gray-600">{contact.description}</p>
                      </div>
                    </div>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                      {contact.responseTime}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2 mt-4">
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      {contact.phone}
                    </a>
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center text-green-600 hover:text-green-700 text-sm"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      {contact.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Locations */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Locations</h3>
              <div className="space-y-4">
                {locations.map((location, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-gray-800 mb-1">{location.name}</h4>
                        <p className="text-gray-600 text-sm flex items-start">
                          <MapPin className="w-4 h-4 mr-2 mt-0.5 text-red-500" />
                          {location.address}
                        </p>
                      </div>
                      <button className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors">
                        <Navigation className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2 mb-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-blue-500" />
                        {location.hours}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-4 h-4 mr-2 text-green-500" />
                        {location.phone}
                      </div>
                    </div>
                    
                    <div className="border-t pt-3">
                      <p className="text-xs text-gray-500 mb-2">Services Available:</p>
                      <div className="flex flex-wrap gap-1">
                        {location.services.map((service, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all group"
                  >
                    <div className="flex items-center">
                      <div className="text-gray-600 group-hover:text-red-500 mr-3">
                        {social.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{social.name}</p>
                        <p className="text-xs text-gray-500">{social.followers} followers</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Find Us on Map</h3>
          <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-800 mb-2">Interactive Map</h4>
              <p className="text-gray-600 mb-4">View all our locations and get directions</p>
              <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105">
                Open in Maps
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Quick Links */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
            <p className="text-gray-600">Quick answers to common questions</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
              <h4 className="font-bold text-gray-800 mb-2">Who can donate blood?</h4>
              <p className="text-gray-600 text-sm mb-3">Healthy individuals aged 18-65, weighing at least 50kg.</p>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center">
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
              <h4 className="font-bold text-gray-800 mb-2">How often can I donate?</h4>
              <p className="text-gray-600 text-sm mb-3">Every 56 days for whole blood donation.</p>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center">
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
              <h4 className="font-bold text-gray-800 mb-2">Is blood donation safe?</h4>
              <p className="text-gray-600 text-sm mb-3">Yes, completely safe with sterile equipment and trained staff.</p>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center">
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;