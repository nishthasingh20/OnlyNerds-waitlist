import mongoose from "mongoose"
import { NextResponse } from "next/server"

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return

  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw error
  }
}

// Define Waitlist schema
const waitlistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Get the model, preventing re-compilation
const Waitlist = mongoose.models.Waitlist || mongoose.model("Waitlist", waitlistSchema)

export async function POST(request: Request) {
  try {
    await connectDB()

    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingEmail = await Waitlist.findOne({ email })
    if (existingEmail) {
      return NextResponse.json(
        { message: "Email is already on the waitlist" },
        { status: 400 }
      )
    }

    // Create new waitlist entry
    const waitlistEntry = await Waitlist.create({ email })

    return NextResponse.json(
      { message: "Successfully joined waitlist", data: waitlistEntry },
      { status: 201 }
    )
  } catch (error) {
    console.error("Waitlist API error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
