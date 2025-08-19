
"use client";
// pages/donate.js
import { useState } from 'react';
import { Heart, MapPin, Phone, Mail, Calendar, User, Droplet, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function BloodDonatePage() {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    weight: '',
    height: '',
    
    // Address Information
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Medical Information
    lastDonation: '',
    medicalConditions: [],
    medications: '',
    allergies: '',
    recentIllness: '',
    recentTravel: '',
    
    // Emergency Contact
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: '',
    
    // Preferences
    preferredTime: '',
    preferredDate: '',
    donationType: 'whole-blood',
    
    // Legal
    consentForm: false,
    privacyPolicy: false,
    
    // Additional
    specialRequests: '',
    howDidYouHear: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const medicalConditionsList = [
    'Heart Disease', 'Diabetes', 'High Blood Pressure', 'Cancer', 'Hepatitis',
    'HIV/AIDS', 'Tuberculosis', 'Epilepsy', 'Anemia', 'Asthma'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMedicalConditionsChange = (condition) => {
    setFormData(prev => ({
      ...prev,
      medicalConditions: prev.medicalConditions.includes(condition)
        ? prev.medicalConditions.filter(c => c !== condition)
        : [...prev.medicalConditions, condition]
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch(step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
        if (!formData.weight) newErrors.weight = 'Weight is required';
        break;
      case 2:
        if (!formData.street) newErrors.street = 'Street address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
        break;
      case 3:
        if (!formData.emergencyName) newErrors.emergencyName = 'Emergency contact name is required';
        if (!formData.emergencyPhone) newErrors.emergencyPhone = 'Emergency contact phone is required';
        if (!formData.emergencyRelation) newErrors.emergencyRelation = 'Relationship is required';
        break;
      case 4:
        if (!formData.consentForm) newErrors.consentForm = 'You must agree to the consent form';
        if (!formData.privacyPolicy) newErrors.privacyPolicy = 'You must accept the privacy policy';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        setSubmitError(data.error || 'Failed to submit donation');
      }
    } catch (error) {
      setSubmitError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Your Donation!</h1>
            <p className="text-gray-600 mb-6">
              Your blood donation registration has been successfully submitted. Our team will contact you within 24-48 hours to confirm your appointment.
            </p>
            <div className="bg-red-50 p-6 rounded-xl mb-6">
              <h3 className="font-semibold text-red-800 mb-2">Next Steps:</h3>
              <ul className="text-left text-red-700 space-y-1">
                <li>• Check your email for confirmation</li>
                <li>• Get plenty of rest and stay hydrated</li>
                <li>• Eat iron-rich foods before donation</li>
                <li>• Bring a valid ID on donation day</li>
              </ul>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-700 transition-colors"
            >
              Register Another Donor
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <User className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
        <p className="text-gray-600 mt-2">Let's start with your basic information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your first name"
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your last name"
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender *
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blood Group *
          </label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${errors.bloodGroup ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select blood group</option>
            {bloodGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
          {errors.bloodGroup && <p className="text-red-500 text-sm mt-1">{errors.bloodGroup}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight (kg) *
          </label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${errors.weight ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your weight"
            min="40"
          />
          {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height (cm)
          </label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            placeholder="Enter your height"
            min="140"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Blood Donation Date
          </label>
          <input
            type="date"
            name="lastDonation"
            value={formData.lastDonation}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <MapPin className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Address & Medical Information</h2>
        <p className="text-gray-600 mt-2">We need your address and medical history for safety</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address *
            </label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${errors.street ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="123 Main Street, Apt 4B"
            />
            {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="New York"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State/Province *
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="NY"
              />
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code *
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="10001"
              />
              {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              placeholder="United States"
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Do you have any of these medical conditions?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {medicalConditionsList.map(condition => (
                <label key={condition} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.medicalConditions.includes(condition)}
                    onChange={() => handleMedicalConditionsChange(condition)}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">{condition}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Medications
              </label>
              <textarea
                name="medications"
                value={formData.medications}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="List any medications you're currently taking"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allergies
              </label>
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="List any known allergies"
                rows="3"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recent Illness or Fever
              </label>
              <input
                type="text"
                name="recentIllness"
                value={formData.recentIllness}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="Any illness in the last 30 days?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recent Travel
              </label>
              <input
                type="text"
                name="recentTravel"
                value={formData.recentTravel}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="Any international travel in the last 3 months?"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Phone className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Emergency Contact & Preferences</h2>
        <p className="text-gray-600 mt-2">Emergency contact and your donation preferences</p>
      </div>

      <div className="bg-orange-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contact Name *
            </label>
            <input
              type="text"
              name="emergencyName"
              value={formData.emergencyName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${errors.emergencyName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Full name of emergency contact"
            />
            {errors.emergencyName && <p className="text-red-500 text-sm mt-1">{errors.emergencyName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contact Phone *
            </label>
            <input
              type="tel"
              name="emergencyPhone"
              value={formData.emergencyPhone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${errors.emergencyPhone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="+1 (555) 987-6543"
            />
            {errors.emergencyPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyPhone}</p>}
        </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relationship *
            </label>
            <select
              name="emergencyRelation"
              value={formData.emergencyRelation}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${errors.emergencyRelation ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select relationship</option>
              <option value="spouse">Spouse</option>
              <option value="parent">Parent</option>
              <option value="child">Child</option>
              <option value="sibling">Sibling</option>
              <option value="friend">Friend</option>
              <option value="other">Other</option>
            </select>
            {errors.emergencyRelation && <p className="text-red-500 text-sm mt-1">{errors.emergencyRelation}</p>}
          </div>
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Donation Date
            </label>
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Time
            </label>
            <select
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            >
              <option value="">Select preferred time</option>
              <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
              <option value="afternoon">Afternoon (12:00 PM - 3:00 PM)</option>
              <option value="evening">Evening (3:00 PM - 6:00 PM)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Donation Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { value: 'whole-blood', label: 'Whole Blood', desc: 'Standard donation (1 pint)' },
                { value: 'platelets', label: 'Platelets', desc: 'Help cancer patients' },
                { value: 'plasma', label: 'Plasma', desc: 'For trauma patients' }
              ].map(type => (
                <label key={type.value} className="cursor-pointer">
                  <div className={`p-4 border rounded-xl transition-all ${formData.donationType === type.value ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}>
                    <input
                      type="radio"
                      name="donationType"
                      value={type.value}
                      checked={formData.donationType === type.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="font-medium text-gray-900">{type.label}</div>
                    <div className="text-sm text-gray-600">{type.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How did you hear about us?
            </label>
            <select
              name="howDidYouHear"
              value={formData.howDidYouHear}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            >
              <option value="">Select an option</option>
              <option value="social-media">Social Media</option>
              <option value="website">Website</option>
              <option value="friend">Friend/Family</option>
              <option value="healthcare-provider">Healthcare Provider</option>
              <option value="workplace">Workplace</option>
              <option value="advertisement">Advertisement</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requests or Comments
            </label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              placeholder="Any special requests or additional information..."
              rows="3"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Review & Consent</h2>
        <p className="text-gray-600 mt-2">Please review your information and provide consent</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Name:</span>
            <span className="ml-2 text-gray-900">{formData.firstName} {formData.lastName}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Blood Group:</span>
            <span className="ml-2 text-red-600 font-bold">{formData.bloodGroup}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Phone:</span>
            <span className="ml-2 text-gray-900">{formData.phone}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Email:</span>
            <span className="ml-2 text-gray-900">{formData.email}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Donation Type:</span>
            <span className="ml-2 text-gray-900 capitalize">{formData.donationType.replace('-', ' ')}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Preferred Date:</span>
            <span className="ml-2 text-gray-900">{formData.preferredDate || 'Not specified'}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-red-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-red-800 mb-4">Important Information</h3>
          <div className="space-y-3 text-sm text-red-700">
            <p>• You must be at least 17 years old (16 with parental consent in some states)</p>
            <p>• You must weigh at least 110 pounds (50 kg)</p>
            <p>• You must be in good general health</p>
            <p>• You cannot donate if you've had a tattoo or piercing in the last 3 months</p>
            <p>• Wait 56 days between whole blood donations</p>
            <p>• Bring a valid photo ID on donation day</p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="consentForm"
              checked={formData.consentForm}
              onChange={handleInputChange}
              className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-1"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-900">
                I consent to blood donation and medical screening *
              </span>
              <p className="text-xs text-gray-600 mt-1">
                I understand that my blood will be tested for infectious diseases and that I may be contacted if any issues are found. I consent to the medical screening process and blood collection procedure.
              </p>
            </div>
          </label>
          {errors.consentForm && <p className="text-red-500 text-sm">{errors.consentForm}</p>}

          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="privacyPolicy"
              checked={formData.privacyPolicy}
              onChange={handleInputChange}
              className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-1"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-900">
                I agree to the Privacy Policy and Terms of Service *
              </span>
              <p className="text-xs text-gray-600 mt-1">
                I understand how my personal information will be collected, used, and protected according to the blood bank's privacy policy.
              </p>
            </div>
          </label>
          {errors.privacyPolicy && <p className="text-red-500 text-sm">{errors.privacyPolicy}</p>}
        </div>
      </div>
    </div>
  );

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Address & Medical', icon: MapPin },
    { number: 3, title: 'Contact & Preferences', icon: Phone },
    { number: 4, title: 'Review & Consent', icon: CheckCircle2 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Blood Donation Registration</h1>
          <p className="text-lg text-gray-600">Your donation can save up to 3 lives</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                    isCompleted ? 'bg-green-600 border-green-600' :
                    isActive ? 'bg-red-600 border-red-600' : 'bg-white border-gray-300'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      isCompleted || isActive ? 'text-white' : 'text-gray-400'
                    }`} />
                  </div>
                  <div className={`ml-3 ${index < steps.length - 1 ? 'mr-8' : ''}`}>
                    <div className={`text-sm font-medium ${
                      isCompleted || isActive ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {submitError && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
              {submitError}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl transition-all ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all flex items-center space-x-2"
                >
                  <span>Next Step</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-xl transition-all flex items-center space-x-2 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4" />
                      <span>Register for Donation</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Additional Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Droplet className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">One Donation</h3>
            <p className="text-sm text-gray-600">Can save up to 3 lives and help patients in critical need</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quick Process</h3>
            <p className="text-sm text-gray-600">The entire donation process takes about 45-60 minutes</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Safe & Sterile</h3>
            <p className="text-sm text-gray-600">All equipment is sterile and used only once for your safety</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-red-600" />
              <span className="text-gray-600">Call us:</span>
              <span className="font-medium text-gray-900">1-800-DONATE-1</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-red-600" />
              <span className="text-gray-600">Email:</span>
              <span className="font-medium text-gray-900">donate@bloodbank.org</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}