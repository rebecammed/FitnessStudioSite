import { useEffect, useState } from "react";
import { fetchApi } from "../lib/api";
import PriceCard from "./PriceCard";

export default function Pricing() {
  // 1. State to save the trainers
  const [memberships, setMemberships] = useState([]);

  // 2. State to know if the data is loading
  const [loading, setLoading] = useState(true);

  // 3. useEffect to ask for the data when the component is mounted
  useEffect(() => {
    fetchApi("/api/memberships")
      .then((data) => {
        setMemberships(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <section id="pricing" className="bg-bg-alt px-4 py-20 md:px-6 md:py-28">
      <header className="max-w-2xl mx-auto mb-16 text-center">
        <h2 className="font-display text-3xl md:text-4xl mb-3">Memberships</h2>
        <p className="text-text-muted text-sm">
          No commitment. Cancel anytime.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto md:grid-cols-3">
        {/* 4. We render the state */}
        {loading ? (
          <p>Loading trainers...</p>
        ) : (
          memberships.map((membership) => (
            <PriceCard key={membership.id} membership={membership} />
          ))
        )}
      </div>
    </section>
  );
}
