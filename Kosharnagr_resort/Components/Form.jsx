import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    // Basic email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (!validateEmail(email)) {
      toast.warn("Invalid email address!");
      return;
    }

    toast.success("Form submitted successfully 🚀");

    // Optionally clear the form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="w-full  px-6 md:px-20 py-30 bg-white flex flex-col md:flex-row justify-between items-start gap-10 font-serif">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Left Side */}
      <div className="md:w-1/2">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Get in Touch</h1>
        <p className="text-lg text-gray-700 mb-10">
          We’d love to hear from you! Contact us for inquiries about your stay or any assistance you may need during your visit.
        </p>

        <div className="mb-6">
          <h3 className="font-semibold text-lg text-gray-900">Connect</h3>
          <p className="text-md text-gray-700">+92 331 5100014</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-gray-900">Reach</h3>
          <p className="text-md text-gray-700">info@kosharnagar.com</p>
        </div>
      </div>

      {/* Right Side */}
      <form onSubmit={handleSubmit} className="md:w-1/2 w-full space-y-6">
        <div>
          <label className="block text-gray-800 font-medium mb-1">Your First Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your first name"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div>
          <label className="block text-gray-800 font-medium mb-1">
            Your Email Address<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div>
          <label className="block text-gray-800 font-medium mb-1">
            Your Message<span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            placeholder="Type your message here"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <button
          type="submit"
          className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
        >
          Submit Your Inquiry
        </button>
      </form>
    </div>
  );
}

export default Form;
