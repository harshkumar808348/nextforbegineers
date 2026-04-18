// models/Teacher.js
import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["IITJEE", "Medical", "UPSC", "Other"],
      required: true,
    },
    details: {
      type: String,
    },
    image: {
      type: String, // Cloudinary URL
    },
    hourlyCharge: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite error in Next.js
const Teacher = mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);

export default Teacher;