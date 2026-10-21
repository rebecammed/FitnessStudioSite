export default function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
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
          className="px-4 py-2 border border-border rounded-lg bg-bg focus:outline-2 focus:outline-accent-2 focus:outline-offset-1"
        />

        <label htmlFor="message" className="text-sm font-semibold mt-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          className="px-4 py-2 border border-border rounded-lg bg-bg focus:outline-2 focus:outline-accent-2 focus:outline-offset-1"
        />

        <button
          type="submit"
          className="self-start mt-2 inline-flex items-center justify-center bg-accent text-text text-sm font-semibold px-6 py-2 rounded-lg transition-colors hover:bg-accent-2 hover:text-white"
        >
          Send
        </button>
      </form>
    </section>
  );
}
