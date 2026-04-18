// app/admin/page.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminPage() {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    category: "IITJEE",
    details: "",
    image: "",
    hourlyCharge: "",
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Upload image to Cloudinary
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

      const res = await fetch("/api/users/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setForm((prev) => ({ ...prev, image: data.url }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/users/teacher", {
        ...form,
        hourlyCharge: Number(form.hourlyCharge),
      });

      toast.success("Teacher Added Successfully");

      // reset form
      setForm({
        name: "",
        subject: "",
        category: "IITJEE",
        details: "",
        image: "",
        hourlyCharge: "",
      });
    } catch (error: any) {
      toast.error("Error adding teacher");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">

        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Add Teacher
        </h1>

        <div className="space-y-4">

          {/* Name */}
          <input
            name="name"
            value={form.name}
            placeholder="Teacher Name"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          {/* Subject */}
          <input
            name="subject"
            value={form.subject}
            placeholder="Subject Expertise"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          {/* Category */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="IITJEE">IIT-JEE</option>
            <option value="Medical">Medical</option>
            <option value="UPSC">UPSC</option>
            <option value="Other">Other Competitive Exams</option>
          </select>

          {/* Details */}
          <textarea
            name="details"
            value={form.details}
            placeholder="Details"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          {/* Image Upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleImageUpload(e.target.files[0]);
                }
              }}
              className="w-full border border-gray-300 p-3 rounded-lg"
            />

            {uploading && (
              <p className="text-sm text-gray-500 mt-1">Uploading...</p>
            )}

            {/* Preview */}
            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className="w-24 h-24 object-cover rounded-lg mt-3"
              />
            )}
          </div>

          {/* Hourly Charge */}
          <input
            name="hourlyCharge"
            value={form.hourlyCharge}
            type="number"
            placeholder="Hourly Charge (₹)"
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Add Teacher"}
          </button>

        </div>
      </div>
    </div>
  );
}