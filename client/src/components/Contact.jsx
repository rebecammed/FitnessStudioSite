import { useState } from "react";
import { fetchApi } from "../lib/api";

export default function Contact() {
  // States for the form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // States to control the submitting process
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      // POST petition to the backend
      await fetchApi("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setStatus("success");
      setFormData({ name: "", email: "", message: "" }); // Clean the form
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="bg-bg px-4 py-20 md:px-6 md:py-28">
      <header className="max-w-2xl mx-auto mb-12 text-center">
        <h2 className="font-display text-3xl md:text-4xl mb-3">Come meet us</h2>
        <p className="text-text-muted text-sm">
          First class free. No commitment.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-2 max-w-md mx-auto"
      >
        <label htmlFor="name" className="text-sm font-semibold">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="px-4 py-2 border border-border rounded-lg bg-bg focus:outline-2 focus:outline-accent-2 focus:outline-offset-1"
        />

        <label htmlFor="email" className="text-sm font-semibold mt-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="px-4 py-2 border border-border rounded-lg bg-bg focus:outline-2 focus:outline-accent-2 focus:outline-offset-1"
        />

        <label htmlFor="message" className="text-sm font-semibold mt-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          className="px-4 py-2 border border-border rounded-lg bg-bg focus:outline-2 focus:outline-accent-2 focus:outline-offset-1"
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="self-start mt-2 inline-flex items-center justify-center bg-accent text-text text-sm font-semibold px-6 py-2 rounded-lg transition-colors hover:bg-accent-2 hover:text-white"
        >
          {status === "loading" ? "Sending..." : "Send"}
        </button>

        {/* Success or error message */}
        {status === "success" && (
          <p className="text-green-600 text-sm text-center mt-2 font-medium">
            Message received! We'll get back to you by email soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-sm text-center mt-2 font-medium">
            {errorMsg}
          </p>
        )}
      </form>
    </section>
  );
}
