"use client";
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, Heart, Filter, Search, Phone, Mail, ChevronRight, Star, AlertCircle } from 'lucide-react';

const BloodDriveEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationModal, setRegistrationModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data for blood drive events
  const mockEvents = [
    {
      id: 1,
      title: "Community Center Blood Drive",
      date: "2025-08-25",
      time: "9:00 AM - 5:00 PM",
      location: "Downtown Community Center",
      address: "123 Main Street, Faisalabad",
      organizer: "Red Cross Punjab",
      phone: "+92-41-2345678",
      email: "events@redcrosspunjab.org",
      capacity: 100,
      registered: 67,
      bloodTypes: ["O+", "A+", "B+", "AB+", "O-", "A-", "B-", "AB-"],
      urgentNeeds: ["O-", "AB+"],
      description: "Join us for our monthly community blood drive. Every donation can save up to three lives!",
      requirements: ["Age 18-65", "Weight min 50kg", "Good health", "Valid ID"],
      incentives: ["Free health checkup", "Refreshments", "Certificate", "Blood donation card"],
      status: "upcoming",
      featured: true,
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      title: "University Campus Drive",
      date: "2025-08-28",
      time: "10:00 AM - 4:00 PM",
      location: "University of Agriculture",
      address: "University Road, Faisalabad",
      organizer: "Student Health Services",
      phone: "+92-41-9876543",
      email: "health@uaf.edu.pk",
      capacity: 80,
      registered: 45,
      bloodTypes: ["O+", "A+", "B+", "O-"],
      urgentNeeds: ["O-"],
      description: "Special blood drive for students and faculty. Help save lives while contributing to your community service hours.",
      requirements: ["Student/Faculty ID", "Age 18+", "Good health", "Weight min 45kg"],
      incentives: ["Community service hours", "Free snacks", "Health screening"],
      status: "upcoming",
      featured: false,
      rating: 4.6,
      reviews: 89
    },
    {
      id: 3,
      title: "Corporate Blood Drive",
      date: "2025-09-02",
      time: "11:00 AM - 6:00 PM",
      location: "Business District Plaza",
      address: "Corporate Avenue, Faisalabad",
      organizer: "Chamber of Commerce",
      phone: "+92-41-5555666",
      email: "corporate@bloodbank.pk",
      capacity: 150,
      registered: 92,
      bloodTypes: ["O+", "A+", "B+", "AB+", "O-", "A-", "B-", "AB-"],
      urgentNeeds: ["B-", "AB-"],
      description: "Annual corporate blood donation drive. Companies compete to see who can donate the most!",
      requirements: ["Employee ID", "Age 18-60", "Medical clearance"],
      incentives: ["Company recognition", "Lunch voucher", "Blood type card", "Health report"],
      status: "upcoming",
      featured: true,
      rating: 4.9,
      reviews: 203
    },
    {
      id: 4,
      title: "Emergency Drive - Urgent Need",
      date: "2025-08-22",
      time: "8:00 AM - 8:00 PM",
      location: "City Hospital",
      address: "Hospital Road, Faisalabad",
      organizer: "Emergency Blood Bank",
      phone: "+92-41-911-BLOOD",
      email: "emergency@cityhospital.pk",
      capacity: 200,
      registered: 156,
      bloodTypes: ["O-", "AB+", "B-"],
      urgentNeeds: ["O-", "AB+", "B-"],
      description: "URGENT: Critical shortage of rare blood types. Your donation is desperately needed!",
      requirements: ["Immediate availability", "Valid ID", "Health clearance"],
      incentives: ["Priority health screening", "Emergency contact registration", "VIP treatment"],
      status: "urgent",
      featured: true,
      rating: 5.0,
      reviews: 67
    },
    {
      id: 5,
      title: "Mobile Blood Drive",
      date: "2025-09-05",
      time: "12:00 PM - 7:00 PM",
      location: "Multiple Locations",
      address: "Various neighborhoods in Faisalabad",
      organizer: "Mobile Blood Unit",
      phone: "+92-41-MOBILE-1",
      email: "mobile@bloodservices.pk",
      capacity: 60,
      registered: 23,
      bloodTypes: ["O+", "A+", "B+", "O-"],
      urgentNeeds: [],
      description: "Our mobile unit visits different neighborhoods. Check schedule for your area!",
      requirements: ["Neighborhood registration", "Age 18-65", "Basic health check"],
      incentives: ["Door-to-door service", "Local community certificate"],
      status: "upcoming",
      featured: false,
      rating: 4.4,
      reviews: 156
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = events;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(event => {
        switch (selectedFilter) {
          case 'upcoming':
            return event.status === 'upcoming';
          case 'urgent':
            return event.status === 'urgent';
          case 'featured':
            return event.featured;
          case 'available':
            return event.registered < event.capacity;
          default:
            return true;
        }
      });
    }

    setFilteredEvents(filtered);
  }, [searchTerm, selectedFilter, events]);

  const handleRegistration = (event) => {
    setSelectedEvent(event);
    setRegistrationModal(true);
  };

  const submitRegistration = (formData) => {
    // Update registered count
    setEvents(prev => prev.map(event => 
      event.id === selectedEvent.id 
        ? { ...event, registered: event.registered + 1 }
        : event
    ));
    setRegistrationModal(false);
    setSelectedEvent(null);
    alert('Registration successful! You will receive a confirmation email shortly.');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProgressPercentage = (registered, capacity) => {
    return Math.min((registered / capacity) * 100, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-12 h-12 text-red-500 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading blood drive events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Blood Drive Events
              <Heart className="inline-block ml-4 w-12 h-12 text-pink-200" />
            </h1>
            <p className="text-xl mb-8 text-red-100">
              Join our life-saving mission. Every donation can save up to three lives.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>10,000+ Donors</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>50+ Events Monthly</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>30,000+ Lives Saved</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events by location, organizer, or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
              >
                <option value="all">All Events</option>
                <option value="upcoming">Upcoming</option>
                <option value="urgent">Urgent Need</option>
                <option value="featured">Featured</option>
                <option value="available">Available Spots</option>
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Event Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(event.status)}`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                      {event.featured && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                      {event.urgentNeeds.length > 0 && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span>{event.rating}</span>
                      <span className="mx-1">•</span>
                      <span>{event.reviews} reviews</span>
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-3 text-red-500" />
                    <span className="text-sm">{new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-3 text-red-500" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-3 text-red-500" />
                    <div className="text-sm">
                      <div className="font-medium">{event.location}</div>
                      <div className="text-gray-500">{event.address}</div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Registration Progress</span>
                    <span>{event.registered}/{event.capacity} registered</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage(event.registered, event.capacity)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Blood Types Needed */}
                {event.bloodTypes.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Blood Types Needed:</p>
                    <div className="flex flex-wrap gap-1">
                      {event.bloodTypes.map((type) => (
                        <span 
                          key={type}
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            event.urgentNeeds.includes(type) 
                              ? 'bg-red-100 text-red-800 border border-red-200' 
                              : 'bg-gray-100 text-gray-700 border border-gray-200'
                          }`}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                {/* Contact Info */}
                <div className="border-t pt-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Organizer: {event.organizer}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      <span>{event.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      <span>{event.email}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleRegistration(event)}
                  disabled={event.registered >= event.capacity}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                    event.registered >= event.capacity
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transform hover:scale-105 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {event.registered >= event.capacity ? 'Event Full' : 'Register Now'}
                  {event.registered < event.capacity && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Events Found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or check back later for new events.</p>
          </div>
        )}
      </div>

      {/* Registration Modal */}
      {registrationModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedEvent.title}</h2>
                  <p className="text-gray-600">{selectedEvent.location}</p>
                </div>
                <button
                  onClick={() => setRegistrationModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <RegistrationForm 
                event={selectedEvent}
                onSubmit={submitRegistration}
                onCancel={() => setRegistrationModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Registration Form Component
const RegistrationForm = ({ event, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bloodType: '',
    age: '',
    weight: '',
    medicalConditions: '',
    emergencyContact: '',
    emergencyPhone: '',
    agreedToTerms: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">Select Blood Type</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="18"
            max="65"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg) *</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            min="45"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Name *</label>
        <input
          type="text"
          name="emergencyContact"
          value={formData.emergencyContact}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Phone *</label>
        <input
          type="tel"
          name="emergencyPhone"
          value={formData.emergencyPhone}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions (if any)</label>
        <textarea
          name="medicalConditions"
          value={formData.medicalConditions}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          placeholder="Please list any medical conditions, medications, or allergies..."
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="agreedToTerms"
          checked={formData.agreedToTerms}
          onChange={handleChange}
          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">
          I agree to the terms and conditions and consent to donate blood *
        </label>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105"
        >
          Complete Registration
        </button>
      </div>
    </form>
  );
};

export default BloodDriveEvents;