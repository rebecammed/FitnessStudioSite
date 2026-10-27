import { authClient } from "../lib/auth-client";
import { fetchApi } from "../lib/api";

export default function PriceCard({ membership, activePlanId }) {
  const isCurrentPlan = activePlanId === membership.id;
  const { data: session } = authClient.useSession();

  const handleChoosePlan = async () => {
    // 1. If there's no session, redirect to the login
    if (!session) {
      window.location.href = "/login";
      return;
    }

    try {
      // 2. POST request to the API
      const data = await fetchApi("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ membershipId: membership.id }),
      });

      // 2. data is the object, so we access the url directly
      if (data && data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No URL returned from checkout");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  return (
    <article
      className={`relative flex flex-col gap-4 p-6 rounded-xl bg-bg shadow-sm ${
        membership.featured ? "border-2 border-accent" : "border border-border"
      }`}
    >
      {/* Render the badge IF it's marked as true on the db */}
      {membership.badge && (
        <p className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-text text-sm font-semibold rounded-md whitespace-nowrap">
          {membership.badge}
        </p>
      )}

      <h3 className="text-xl">{membership.name}</h3>

      <p className="font-display text-4xl font-bold leading-none">
        {membership.price}€
        <span className="text-base font-body font-normal text-text-muted">
          {" "}
          /month
        </span>
      </p>

      <ul className="flex flex-col gap-2 text-sm text-text-muted grow">
        {/* Features is now type JSON from the database, React reads it as an array */}
        {membership.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-accent-2 font-bold" aria-hidden="true">
              ✓
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {isCurrentPlan ? (
        <div className="mt-auto inline-flex items-center justify-center bg-text text-white text-sm font-semibold px-4 py-2 rounded-lg">
          ✓ Your current plan
        </div>
      ) : (
        <button
          onClick={handleChoosePlan}
          className={`mt-auto inline-flex items-center justify-center text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
            membership.featured
              ? "bg-accent text-text hover:bg-accent-2 hover:text-white"
              : "border-2 border-text text-text hover:bg-accent-2 hover:text-white hover:border-accent-2"
          }`}
        >
          Choose {membership.name}
        </button>
      )}
    </article>
  );
}
