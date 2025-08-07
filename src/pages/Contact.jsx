
import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // TODO: i want to link this with EmailJS when its time for production
  };

  return (
    <section className="bg-black text-white px-6 py-20 min-h-screen">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-green-400 mb-4">Contact Us</h2>
        <p className="text-gray-400">Have questions? Reach out and we'll respond as soon as possible.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full bg-gray-800 text-white px-4 py-3 rounded outline-none"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full bg-gray-800 text-white px-4 py-3 rounded outline-none"
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          rows={6}
          className="w-full bg-gray-800 text-white px-4 py-3 rounded outline-none resize-none"
          required
        ></textarea>

        <button
          type="submit"
          className="bg-green-400 text-black font-semibold px-6 py-3 rounded hover:bg-green-300 transition"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
