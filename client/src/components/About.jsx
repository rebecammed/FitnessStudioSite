import { values } from "../data/data";

export default function About() {
  return (
    <section
      id="about"
      className="text-center justify-center bg-bg-alt px-4 py-20 md:px-6 md:py-28"
    >
      <header className="max-w-2xl mx-auto mb-12 text-center">
        <h2 className="font-display text-3xl md:text-4xl mb-3">
          A studio, three commitments
        </h2>
        <p className="text-text-muted text-sm">
          What sets us apart isn't the equipment. It's how we train with you.
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-4 max-w-6xl mx-auto md:grid-cols-3">
        {values.map((value) => (
          <li
            key={value.id}
            className="bg-bg p-6 border border-border rounded-xl shadow-sm"
          >
            <h3 className="text-xl mb-2">{value.title}</h3>
            <p className="text-text-muted text-sm">{value.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
