"use client";
// This file is part of the BloodFinder PWA project
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, MapPin, Phone, Clock, Heart, User, Calendar, Star, Navigation } from 'lucide-react';

const BloodFinderPWA = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('distance');

  // Mock donor data
  const [donors] = useState([
    {
      id: 1,
      name: 'Ahmed Hassan',
      bloodType: 'O+',
      location: 'Faisalabad, Punjab',
      distance: '2.3 km',
      phone: '+92-300-1234567',
      lastDonation: '2024-06-15',
      availableUntil: '2024-09-15',
      rating: 4.8,
      totalDonations: 12,
      isVerified: true,
      urgency: 'high',
      hospital: 'Allied Hospital'
    },
    {
      id: 2,
      name: 'Sara Ali',
      bloodType: 'A+',
      location: 'Lahore, Punjab',
      distance: '15.7 km',
      phone: '+92-301-2345678',
      lastDonation: '2024-07-20',
      availableUntil: '2024-10-20',
      rating: 4.9,
      totalDonations: 8,
      isVerified: true,
      urgency: 'medium',
      hospital: 'Services Hospital'
    },
    {
      id: 3,
      name: 'Muhammad Ali',
      bloodType: 'B+',
      location: 'Faisalabad, Punjab',
      distance: '5.1 km',
      phone: '+92-302-3456789',
      lastDonation: '2024-05-10',
      availableUntil: '2024-08-10',
      rating: 4.7,
      totalDonations: 15,
      isVerified: false,
      urgency: 'low',
      hospital: 'DHQ Hospital'
    },
    {
      id: 4,
      name: 'Fatima Khan',
      bloodType: 'O-',
      location: 'Islamabad, ICT',
      distance: '125.3 km',
      phone: '+92-303-4567890',
      lastDonation: '2024-08-01',
      availableUntil: '2024-11-01',
      rating: 5.0,
      totalDonations: 20,
      isVerified: true,
      urgency: 'high',
      hospital: 'PIMS Hospital'
    },
    {
      id: 5,
      name: 'Hassan Ahmed',
      bloodType: 'AB+',
      location: 'Karachi, Sindh',
      distance: '1200 km',
      phone: '+92-304-5678901',
      lastDonation: '2024-07-05',
      availableUntil: '2024-10-05',
      rating: 4.6,
      totalDonations: 6,
      isVerified: true,
      urgency: 'medium',
      hospital: 'Aga Khan Hospital'
    },
    {
      id: 6,
      name: 'Aisha Malik',
      bloodType: 'A-',
      location: 'Faisalabad, Punjab',
      distance: '3.8 km',
      phone: '+92-305-6789012',
      lastDonation: '2024-06-30',
      availableUntil: '2024-09-30',
      rating: 4.8,
      totalDonations: 9,
      isVerified: true,
      urgency: 'high',
      hospital: 'Allied Hospital'
    }
  ]);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const locations = ['Faisalabad, Punjab', 'Lahore, Punjab', 'Islamabad, ICT', 'Karachi, Sindh'];
  const urgencyLevels = ['high', 'medium', 'low'];

  const filteredDonors = useMemo(() => {
    return donors.filter(donor => {
      const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           donor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           donor.hospital.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBloodType = !selectedBloodType || donor.bloodType === selectedBloodType;
      const matchesLocation = !selectedLocation || donor.location === selectedLocation;
      const matchesUrgency = !urgencyFilter || donor.urgency === urgencyFilter;
      const matchesAvailability = !availabilityFilter || 
        (availabilityFilter === 'available' && new Date(donor.availableUntil) > new Date()) ||
        (availabilityFilter === 'verified' && donor.isVerified);

      return matchesSearch && matchesBloodType && matchesLocation && matchesUrgency && matchesAvailability;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        case 'rating':
          return b.rating - a.rating;
        case 'donations':
          return b.totalDonations - a.totalDonations;
        case 'recent':
          return new Date(b.lastDonation) - new Date(a.lastDonation);
        default:
          return 0;
      }
    });
  }, [donors, searchTerm, selectedBloodType, selectedLocation, urgencyFilter, availabilityFilter, sortBy]);

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getAvailabilityStatus = (availableUntil) => {
    const daysLeft = Math.ceil((new Date(availableUntil) - new Date()) / (1000 * 60 * 60 * 24));
    if (daysLeft < 0) return { status: 'Expired', color: 'text-red-600' };
    if (daysLeft <= 7) return { status: `${daysLeft} days left`, color: 'text-orange-600' };
    return { status: `Available for ${daysLeft} days`, color: 'text-green-600' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-red-500">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-red-500 rounded-full">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">BloodFinder</h1>
                <p className="text-gray-600">Connecting donors with those in need</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{donors.length} Active Donors</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Nationwide Coverage</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by donor name, location, or hospital..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-4 mb-4">
            <select
              value={selectedBloodType}
              onChange={(e) => setSelectedBloodType(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All Blood Types</option>
              {bloodTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-gray-50 rounded-xl p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
                  <select
                    value={urgencyFilter}
                    onChange={(e) => setUrgencyFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">All Urgency Levels</option>
                    {urgencyLevels.map(level => (
                      <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                  <select
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">All Donors</option>
                    <option value="available">Available Now</option>
                    <option value="verified">Verified Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="distance">Distance</option>
                    <option value="rating">Rating</option>
                    <option value="donations">Total Donations</option>
                    <option value="recent">Recent Donors</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Results Summary */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="text-gray-600">
              Found <span className="font-semibold text-red-600">{filteredDonors.length}</span> donors matching your criteria
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Updated 2 minutes ago</span>
            </div>
          </div>
        </div>

        {/* Donor Cards */}
        <div className="grid gap-6">
          {filteredDonors.map((donor) => {
            const availability = getAvailabilityStatus(donor.availableUntil);
            return (
              <div key={donor.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    {/* Main Info */}
                    <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {donor.bloodType}
                        </div>
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{donor.name}</h3>
                          {donor.isVerified && (
                            <div className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                              Verified
                            </div>
                          )}
                          <div className={`px-2 py-1 text-xs font-medium rounded-full ${getUrgencyColor(donor.urgency)}`}>
                            {donor.urgency} priority
                          </div>
                        </div>
                        
                        <div className="space-y-1 text-gray-600">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{donor.location}</span>
                            <span className="text-gray-400">•</span>
                            <span className="font-medium">{donor.distance} away</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Heart className="w-4 h-4" />
                            <span>{donor.hospital}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats and Actions */}
                    <div className="flex flex-col lg:items-end space-y-3">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium">{donor.rating}</span>
                        </div>
                        <div className="text-gray-600">
                          {donor.totalDonations} donations
                        </div>
                        <div className={`font-medium ${availability.color}`}>
                          {availability.status}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                          <Phone className="w-4 h-4" />
                          <span>Call</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                          <Navigation className="w-4 h-4" />
                          <span>Navigate</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Phone:</span>
                        <div className="font-medium">{donor.phone}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Last Donation:</span>
                        <div className="font-medium">{new Date(donor.lastDonation).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Available Until:</span>
                        <div className="font-medium">{new Date(donor.availableUntil).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Total Donations:</span>
                        <div className="font-medium">{donor.totalDonations} times</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredDonors.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No donors found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or expanding your search area.
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedBloodType('');
                setSelectedLocation('');
                setUrgencyFilter('');
                setAvailabilityFilter('');
              }}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodFinderPWA;