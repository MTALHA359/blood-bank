// src/app/api/find-blood/route.js
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { bloodType, location } = await request.json();

    if (!bloodType || !location) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Blood type and location are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Connect to database
    const { db } = await connectToDatabase();

    // Query the donations collection
    const donors = await db
      .collection("donations")
      .find({
        bloodType: bloodType,
        location: { $regex: location, $options: "i" },
        status: "available", // Only show available donations
      })
      .project({ _id: 0, __v: 0 }) // Exclude MongoDB internal fields
      .toArray();

    return new Response(
      JSON.stringify({
        success: true,
        count: donors.length,
        donors,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Search error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
