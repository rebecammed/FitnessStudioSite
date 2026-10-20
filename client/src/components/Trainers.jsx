import TrainerCard from "./TrainerCard";
import { fetchApi } from "../lib/api";
import { useEffect, useState } from "react";

export default function Trainers() {
  // 1. State to save the trainers
  const [trainers, setTrainers] = useState([]);

  // 2. State to know if the data is loading
  const [loading, setLoading] = useState(true);

  // 3. useEffect to ask for the data when the component is mounted
  useEffect(() => {
    fetchApi("/api/trainers")
      .then((data) => {
        setTrainers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  return (
    <section id="trainers" className=" px-4 py-20 md:px-6 md:py-28">
      <header className="max-w-2xl mx-auto mb-12 text-center">
        <h2 className="font-display text-3xl md:text-4xl mb-3">Our team</h2>
        <p className="text-text-muted text-sm">
          Trainers who know you by name.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 max-w-6xl mx-auto sm:grid-cols-2 lg:grid-cols-4">
        {/* 4. We render the state */}
        {loading ? (
          <p>Loading trainers...</p>
        ) : (
          trainers.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))
        )}
      </div>
    </section>
  );
}
