export default function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-bg-alt px-4 py-20 md:px-6 md:py-32"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/studio-bg.webp')` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-text/60" aria-hidden="true" />

      {/* Content on top */}
      <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
        <h1 className="font-display text-4xl md:text-6xl leading-tight text-white">
          Train with purpose. Move with your community.
        </h1>

        <p className="text-base md:text-lg text-white/90 max-w-xl">
          Classes, trainers and plans to fit training into your life.
        </p>

        <div className="flex flex-col gap-3 w-full sm:flex-row sm:justify-center sm:w-auto">
          {/** Using inline-flex for the buttons to make sure both of them are centered
           * regardless of the border of the button
           */}
          <a
            href="#schedule"
            className="inline-flex items-center justify-center bg-accent text-text text-sm font-semibold px-6 py-3 rounded-lg text-center transition-colors hover:bg-accent-2 hover:text-white"
          >
            See schedule
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center border-2 border-white text-white text-sm font-semibold px-6 py-3 rounded-lg text-center transition-colors hover:bg-white hover:text-text"
          >
            See memberships
          </a>
        </div>
      </div>
    </section>
  );
}
