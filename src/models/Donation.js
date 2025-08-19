// models/Donation.js
import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    // Personal Information
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [50, "First name cannot be more than 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [50, "Last name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
      validate: {
        validator: function (value) {
          // Check if donor is at least 17 years old
          const today = new Date();
          const minDate = new Date(
            today.getFullYear() - 17,
            today.getMonth(),
            today.getDate()
          );
          return value <= minDate;
        },
        message: "You must be at least 17 years old to donate blood",
      },
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["male", "female", "other", "prefer-not-to-say"],
    },
    bloodGroup: {
      type: String,
      required: [true, "Blood group is required"],
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    weight: {
      type: Number,
      required: [true, "Weight is required"],
      min: [40, "Minimum weight for donation is 40kg"],
    },
    height: {
      type: Number,
      min: [140, "Minimum height is 140cm"],
    },

    // Address Information
    address: {
      street: {
        type: String,
        required: [true, "Street address is required"],
        trim: true,
      },
      city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
      },
      state: {
        type: String,
        required: [true, "State is required"],
        trim: true,
      },
      zipCode: {
        type: String,
        required: [true, "ZIP code is required"],
        trim: true,
      },
      country: {
        type: String,
        default: "United States",
        trim: true,
      },
    },

    // Medical Information
    lastDonation: {
      type: Date,
      validate: {
        validator: function (value) {
          // Check if last donation was at least 56 days ago (for whole blood)
          const minDate = new Date();
          minDate.setDate(minDate.getDate() - 56);
          return value <= minDate;
        },
        message: "You must wait at least 56 days between whole blood donations",
      },
    },
    medicalConditions: [
      {
        type: String,
        enum: [
          "Heart Disease",
          "Diabetes",
          "High Blood Pressure",
          "Cancer",
          "Hepatitis",
          "HIV/AIDS",
          "Tuberculosis",
          "Epilepsy",
          "Anemia",
          "Asthma",
        ],
      },
    ],
    medications: {
      type: String,
      trim: true,
      maxlength: [
        500,
        "Medications description cannot be more than 500 characters",
      ],
    },
    allergies: {
      type: String,
      trim: true,
      maxlength: [
        500,
        "Allergies description cannot be more than 500 characters",
      ],
    },
    recentIllness: {
      type: String,
      trim: true,
      maxlength: [
        200,
        "Recent illness description cannot be more than 200 characters",
      ],
    },
    recentTravel: {
      type: String,
      trim: true,
      maxlength: [
        200,
        "Recent travel description cannot be more than 200 characters",
      ],
    },

    // Emergency Contact
    emergencyContact: {
      name: {
        type: String,
        required: [true, "Emergency contact name is required"],
        trim: true,
      },
      phone: {
        type: String,
        required: [true, "Emergency contact phone is required"],
        trim: true,
      },
      relation: {
        type: String,
        required: [true, "Emergency contact relation is required"],
        enum: ["spouse", "parent", "child", "sibling", "friend", "other"],
      },
    },

    // Preferences
    preferences: {
      preferredDate: Date,
      preferredTime: {
        type: String,
        enum: ["morning", "afternoon", "evening", ""],
      },
      donationType: {
        type: String,
        enum: ["whole-blood", "platelets", "plasma"],
        default: "whole-blood",
      },
      specialRequests: {
        type: String,
        trim: true,
        maxlength: [500, "Special requests cannot be more than 500 characters"],
      },
      howDidYouHear: {
        type: String,
        enum: [
          "social-media",
          "website",
          "friend",
          "healthcare-provider",
          "workplace",
          "advertisement",
          "other",
          "",
        ],
      },
    },

    // Legal
    consentForm: {
      type: Boolean,
      required: [true, "You must agree to the consent form"],
      validate: {
        validator: function (value) {
          return value === true;
        },
        message: "You must agree to the consent form",
      },
    },
    privacyPolicy: {
      type: Boolean,
      required: [true, "You must accept the privacy policy"],
      validate: {
        validator: function (value) {
          return value === true;
        },
        message: "You must accept the privacy policy",
      },
    },

    // System fields
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },
    appointmentDate: Date,
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, "Notes cannot be more than 1000 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
donationSchema.index({ email: 1, createdAt: -1 });
donationSchema.index({ bloodGroup: 1, status: 1 });
donationSchema.index({ "address.city": 1, "address.state": 1 });

// Virtual for full name
donationSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for age
donationSchema.virtual("age").get(function () {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
});

// Method to check eligibility based on medical conditions
donationSchema.methods.isEligible = function () {
  const ineligibleConditions = ["HIV/AIDS", "Hepatitis"];
  return !this.medicalConditions.some((condition) =>
    ineligibleConditions.includes(condition)
  );
};

// Pre-save middleware to validate donation eligibility
donationSchema.pre("save", function (next) {
  // Check if donor meets weight requirement
  if (this.weight < 40) {
    next(new Error("Minimum weight for donation is 40kg"));
  }

  // Check if donor meets age requirement
  if (this.age < 17) {
    next(new Error("You must be at least 17 years old to donate blood"));
  }

  next();
});

// Static method to find donors by blood group
donationSchema.statics.findByBloodGroup = function (bloodGroup) {
  return this.find({ bloodGroup, status: "approved" });
};

// Transform output to remove sensitive data
donationSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

export default mongoose.models.Donation ||
  mongoose.model("Donation", donationSchema);
