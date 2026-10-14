import { trainers } from "../data/data";
import TrainerCard from "./TrainerCard";

export default function Trainers() {
  return (
    <section id="trainers" className="bg-bg-alt px-4 py-12 md:px-6 md:py-16">
      <header className="max-w-2xl mx-auto mb-12 text-center">
        <h2 className="font-display text-3xl md:text-4xl mb-3">Our team</h2>
        <p className="text-text-muted text-sm">
          Trainers who know you by name.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 max-w-6xl mx-auto sm:grid-cols-2 lg:grid-cols-4">
        {trainers.map((trainer) => (
          <TrainerCard key={trainer.id} trainer={trainer} />
        ))}
      </div>
    </section>
  );
}
