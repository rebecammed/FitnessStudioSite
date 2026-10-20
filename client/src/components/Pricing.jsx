import { memberships } from "../data/data";
import PriceCard from "./PriceCard";

export default function Pricing() {
  return (
    <section id="pricing" className="bg-bg-alt px-4 py-20 md:px-6 md:py-28">
      <header className="max-w-2xl mx-auto mb-16 text-center">
        <h2 className="font-display text-3xl md:text-4xl mb-3">Memberships</h2>
        <p className="text-text-muted text-sm">
          No commitment. Cancel anytime.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto md:grid-cols-3">
        {memberships.map((membership) => (
          <PriceCard key={membership.id} membership={membership} />
        ))}
      </div>
    </section>
  );
}
