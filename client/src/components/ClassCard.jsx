import { useState } from "react";
import { fetchApi } from "../lib/api";
import { authClient } from "../lib/auth-client";

export default function ClassCard({ classItem, isBooked, onBook }) {
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState("");
  const { data: session } = authClient.useSession();

  const handleBook = async () => {
    if (!session) {
      window.location.href = "/login";
      return;
    }

    setIsBooking(true);
    setError("");

    try {
      await fetchApi("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classId: classItem.id }),
      });

      // If successful, call the parent function to reload data
      if (onBook) onBook();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <article className="grid grid-cols-2 gap-3 p-4 bg-bg border border-border rounded-xl items-center md:grid-cols-[80px_2fr_1fr_1fr_auto] md:gap-4 md:px-6">
      <time className="col-span-2 font-display font-bold text-text-muted text-sm md:col-span-1">
        {classItem.time}
      </time>

      <h3 className="col-span-2 text-xl md:col-span-1">{classItem.name}</h3>

      <p className="text-sm">{classItem.trainer?.name || "Trainer TBD"}</p>

      <div className="text-sm md:text-left text-right flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
        <p className="text-text-muted">{classItem.level}</p>

        {/* Lógica para pintar en rojo si quedan 3 o menos plazas */}
        <p
          className={`text-xs font-semibold ${
            classItem.availableSpots <= 3 ? "text-red-500" : "text-accent-2"
          }`}
        >
          {classItem.availableSpots} spots left
        </p>
      </div>

      {/* Button / State area */}
      <div className="col-span-2 md:col-span-1 flex flex-col items-end justify-center">
        {isBooked ? (
          <span className="inline-flex items-center justify-center text-sm font-semibold px-4 py-2 rounded-lg bg-accent-2/20 text-accent-2 w-full md:w-auto">
            Booked ✓
          </span>
        ) : classItem.availableSpots <= 0 ? (
          <span className="inline-flex items-center justify-center text-sm font-semibold px-4 py-2 rounded-lg bg-bg-alt text-text-muted w-full md:w-auto">
            Full
          </span>
        ) : (
          <button
            onClick={handleBook}
            disabled={isBooking}
            className="w-full md:w-auto inline-flex items-center justify-center text-sm font-semibold px-4 py-2 rounded-lg border-2 border-text transition-colors hover:bg-accent-2 hover:text-white hover:border-accent-2 disabled:opacity-50"
          >
            {isBooking ? "Booking..." : "Book"}
          </button>
        )}
        {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
      </div>
    </article>
  );
}
