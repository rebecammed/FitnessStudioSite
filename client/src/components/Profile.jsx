import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { authClient } from "../lib/auth-client";
import { fetchApi } from "../lib/api";

export default function Profile() {
  const { data: session, isPending } = authClient.useSession();
  const navigate = useNavigate();

  const [subscription, setSubscription] = useState(null);
  const [memberships, setMemberships] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      navigate("/login");
      return;
    }

    if (session) {
      Promise.all([
        fetchApi("/api/subscriptions/me"),
        fetchApi("/api/memberships"),
        fetchApi("/api/bookings/me"),
      ])
        .then(([subData, allMemberships, bookingsData]) => {
          setSubscription(subData);
          setMemberships(allMemberships);
          setBookings(bookingsData);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [session, isPending, navigate]);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;
    try {
      await fetchApi(`/api/bookings/${bookingId}`, { method: "DELETE" });
      setBookings(bookings.filter((b) => b.id !== bookingId));
    } catch (err) {
      alert("Failed to cancel booking");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-text">
        <div className="w-10 h-10 border-4 border-bg-alt border-t-accent rounded-full animate-spin"></div>
      </div>
    );

  // Buscamos los detalles de la membresía activa
  const activeMembershipDetails = subscription
    ? memberships.find((m) => m.id === subscription.membershipId)
    : null;

  let displayFeatures = [];
  if (
    activeMembershipDetails &&
    Array.isArray(activeMembershipDetails.features)
  ) {
    // Aplanamos y expandimos
    displayFeatures = activeMembershipDetails.features.reduce(
      (acc, feature) => {
        if (feature === "Everything in Pro") {
          const proPlan = memberships.find((m) => m.name === "Pro");
          if (proPlan && Array.isArray(proPlan.features)) {
            return [...acc, ...proPlan.features]; // Metemos las features de Pro
          }
        }
        return [...acc, feature]; // Metemos la feature normal
      },
      [],
    );
  }

  return (
    // 1. INVERTIMOS EL FONDO: Ahora es oscuro
    <section className="min-h-screen bg-text text-bg px-4 py-20 md:px-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl mb-2 text-white">
            Welcome,{" "}
            <span className="text-accent-2">
              {session.user.name.split(" ")[0]}
            </span>
          </h1>
          <p className="text-bg-alt">
            Manage your membership and upcoming classes.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 2. TARJETA DE MEMBRESÍA: Estilo VIP */}
          <div className="bg-bg-alt p-8 rounded-xl border border-border flex flex-col h-full relative overflow-hidden">
            {/* Un detalle decorativo de fondo */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent rounded-bl-full opacity-20"></div>

            <h2 className="text-2xl font-display text-text mb-6 border-b border-border pb-4 relative z-10">
              Your Membership
            </h2>

            {activeMembershipDetails ? (
              <div className="flex-grow flex flex-col relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-sm text-text-muted mb-1">Current plan</p>
                    <p className="text-3xl font-bold uppercase tracking-wide text-text">
                      {activeMembershipDetails.name}
                    </p>
                  </div>
                  <p className="font-display text-3xl font-bold text-text">
                    {activeMembershipDetails.price}€
                    <span className="text-sm font-body font-normal text-text-muted">
                      /mo
                    </span>
                  </p>
                </div>

                <ul className="flex flex-col gap-3 text-sm text-text-muted mb-8">
                  {displayFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-accent-2 font-bold mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Link
                    to="/#pricing"
                    className="inline-flex items-center justify-center bg-accent text-text text-sm font-semibold px-6 py-2 rounded-lg transition-transform hover:scale-105"
                  >
                    Change Plan
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-center py-8 relative z-10">
                <p className="text-text-muted mb-6">
                  You don't have an active plan.
                </p>
                <Link
                  to="/#pricing"
                  className="inline-flex items-center justify-center bg-accent text-text text-sm font-semibold px-6 py-3 rounded-lg hover:bg-accent-2 transition-colors"
                >
                  Choose a plan
                </Link>
              </div>
            )}
          </div>

          {/* 3. TARJETA DE CLASES */}
          <div className="bg-bg-alt p-8 rounded-xl border border-border flex flex-col h-full">
            <h2 className="text-2xl font-display text-text mb-6 border-b border-border pb-4">
              Upcoming Classes
            </h2>

            {bookings.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center py-8">
                <p className="text-text-muted mb-6">
                  You haven't booked any classes yet.
                </p>
                <Link
                  to="/#schedule"
                  className="inline-flex items-center justify-center border-2 border-text text-text text-sm font-semibold px-6 py-3 rounded-lg transition-colors hover:bg-text hover:text-white"
                >
                  View Schedule
                </Link>
              </div>
            ) : (
              <ul className="flex flex-col gap-4">
                {bookings.map((b) => (
                  <li
                    key={b.id}
                    className="flex justify-between items-center p-4 rounded-lg border border-border bg-bg hover:-translate-y-1 hover:shadow-md transition-all duration-300 group"
                  >
                    <div>
                      <p className="font-semibold text-lg text-text">
                        {b.className}{" "}
                        <span className="text-sm font-normal text-text-muted">
                          ({b.day})
                        </span>
                      </p>
                      <p className="text-sm text-text-muted">
                        {b.time} · {b.trainerName}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCancelBooking(b.id)}
                      className="text-sm font-semibold text-red-500 px-4 py-2 rounded-md hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    >
                      Cancel
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
