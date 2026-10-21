import { useState, useEffect } from "react";
import { authClient } from "../lib/auth-client";
import { fetchApi } from "../lib/api";

export default function Hero() {
  const { data: session } = authClient.useSession();
  const [planName, setPlanName] = useState(null);

  // GET the active subscription
  const fetchUserPlan = async () => {
    if (!session) {
      setPlanName(null);
      return;
    }
    try {
      const sub = await fetchApi("/api/subscriptions/me");
      if (sub) {
        // We clean the membership ID to make it look more appealing
        setPlanName(sub.membershipId.replace("membership-", "").toUpperCase());
      } else {
        setPlanName(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserPlan();

    // Listen to see if the user changes plans in another section
    const handlePlanUpdate = () => fetchUserPlan();
    window.addEventListener("planUpdated", handlePlanUpdate);

    // Clean the event at component dismount
    return () => window.removeEventListener("planUpdated", handlePlanUpdate);
  }, [session]); // It's executed at update and if the user logs in or out

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
        {session && planName && (
          <span className="inline-block bg-accent text-text text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {planName} Member
          </span>
        )}

        <h1 className="font-display text-4xl md:text-6xl leading-tight text-white">
          {session
            ? `Welcome back, ${session.user.name.split(" ")[0]}. Ready to train?`
            : "Train with purpose. Move with your community."}
        </h1>

        <p className="text-base md:text-lg text-white/90 max-w-xl">
          {session
            ? "Check your upcoming classes and book your next session."
            : "Classes, trainers and plans to fit training into your life."}
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
