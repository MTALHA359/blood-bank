// app/donate/route.js
import dbConnect from "@/lib/dbConnect";
import Donation from "@/models/Donation";

// POST request
export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json(); // ✅ In App Router, you use req.json()

    const donationData = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      dateOfBirth: new Date(body.dateOfBirth),
      gender: body.gender,
      bloodGroup: body.bloodGroup,
      weight: parseFloat(body.weight),
      height: body.height ? parseFloat(body.height) : undefined,

      address: {
        street: body.street,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        country: body.country || "United States",
      },

      lastDonation: body.lastDonation ? new Date(body.lastDonation) : undefined,
      medicalConditions: body.medicalConditions || [],
      medications: body.medications,
      allergies: body.allergies,
      recentIllness: body.recentIllness,
      recentTravel: body.recentTravel,

      emergencyContact: {
        name: body.emergencyName,
        phone: body.emergencyPhone,
        relation: body.emergencyRelation,
      },

      preferences: {
        preferredDate: body.preferredDate
          ? new Date(body.preferredDate)
          : undefined,
        preferredTime: body.preferredTime,
        donationType: body.donationType,
        specialRequests: body.specialRequests,
        howDidYouHear: body.howDidYouHear,
      },

      consentForm: body.consentForm,
      privacyPolicy: body.privacyPolicy,
    };

    const donation = await Donation.create(donationData);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Donation registered successfully",
        data: donation,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving donation:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Validation Error",
          messages: errors,
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: "Server Error",
        message: "Failed to save donation",
      }),
      { status: 500 }
    );
  }
}

// GET request
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const bloodGroup = searchParams.get("bloodGroup");
    const city = searchParams.get("city");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const query = { status: "approved" };
    if (bloodGroup) query.bloodGroup = bloodGroup;
    if (city) query["address.city"] = new RegExp(city, "i");

    const donations = await Donation.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Donation.countDocuments(query);

    return new Response(
      JSON.stringify({
        success: true,
        data: donations,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching donations:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Server Error",
        message: "Failed to fetch donations",
      }),
      { status: 500 }
    );
  }
}
