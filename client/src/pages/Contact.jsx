import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would normally send the form data to your backend
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Company Info */}
        <div className="md:w-1/2 p-8 bg-gradient-to-br from-green-100 to-blue-100 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-primary mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-500"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h15a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75l9.75 7.5 9.75-7.5" /></svg>
            Contact Us
          </h2>
          <p className="text-gray-700 mb-6">We'd love to hear from you! Reach out with any questions, feedback, or just to say hello.</p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.659 1.591l-7.591 7.591a2.25 2.25 0 01-3.182 0L2.909 8.584A2.25 2.25 0 012.25 6.993V6.75" /></svg>
              <a href="mailto:support@nexbuy.com" className="text-indigo-600 hover:underline">support@nexbuy.com</a>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h15a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75l9.75 7.5 9.75-7.5" /></svg>
              <span className="text-gray-800">123 Market Street, City, Country</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h15a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75l9.75 7.5 9.75-7.5" /></svg>
              <a href="tel:+1234567890" className="text-blue-600 hover:underline">+1 234 567 890</a>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
              <span className="text-gray-800">Mon - Sat: 9:00 AM - 8:00 PM</span>
            </div>
          </div>
        </div>
        {/* Contact Form */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Send us a message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-green-200 transition"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-blue-200 transition"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-indigo-200 transition"
                rows={4}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg shadow hover:from-green-500 hover:to-blue-600 transition"
            >
              Send Message
            </button>
            {submitted && (
              <div className="mt-4 text-green-600 font-medium text-center">Thank you for contacting us! We'll get back to you soon.</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact; 