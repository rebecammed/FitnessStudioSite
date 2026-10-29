import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { fetchApi } from "../lib/api";
import { authClient } from "../lib/auth-client";
import PriceCard from "./PriceCard";

export default function Pricing() {
  const { data: session } = authClient.useSession();
  // 1. States to save the memberships and the active plan
  const [memberships, setMemberships] = useState([]);
  const [activePlanId, setActivePlanId] = useState(null);

  // 2. State to know if the data is loading
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isCancelled = queryParams.get("payment") === "cancelled";

  // 3. Get memberships and user's subscription
  useEffect(() => {
    const loadData = async () => {
      try {
        const membershipsData = await fetchApi("/api/memberships");
        setMemberships(membershipsData);

        if (session) {
          const sub = await fetchApi("/api/subscriptions/me");
          if (sub) setActivePlanId(sub.membershipId);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [session]); // It reruns if the user logs in or out

  return (
    <section id="pricing" className="bg-bg-alt px-4 py-20 md:px-6 md:py-28">
      <header className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl mb-3">Memberships</h2>
        <p className="text-text-muted text-sm">
          No commitment. Cancel anytime.
        </p>

        {/* 2. Movemos el mensaje AQUÍ DENTRO del header */}
        {isCancelled && (
          <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center animate-pulse">
            <p className="font-semibold">Payment cancelled</p>
            <p className="text-sm">
              You have not been charged. Feel free to try again when you're
              ready.
            </p>
          </div>
        )}
      </header>
      <div className="mb-12"></div>
      <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto md:grid-cols-3">
        {/* 4. We render the state */}
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-border border-t-accent rounded-full animate-spin"></div>
          </div>
        ) : (
          memberships.map((membership) => (
            <PriceCard
              key={membership.id}
              membership={membership}
              activePlanId={activePlanId}
            />
          ))
        )}
      </div>
    </section>
  );
}
