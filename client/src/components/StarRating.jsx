import { useState, useEffect } from "react";
import { authClient } from "../lib/auth-client";
import { fetchApi } from "../lib/api";

export default function StarRating({ trainerId, max = 5 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  // We get the user's session
  const { data: session } = authClient.useSession();

  // If there's a user, we search their rating
  useEffect(() => {
    if (session) {
      fetchApi("/api/ratings/me")
        .then((ratings) => {
          // We look for the rating for this specific trainer
          const existingRating = ratings.find((r) => r.trainerId === trainerId);
          if (existingRating) {
            setRating(existingRating.value);
          }
        })
        .catch((err) => console.error("Error loading ratings:", err));
    }
  }, [session, trainerId]);

  const handleRate = async (star) => {
    // If there's no session, we don't let them rate the trainers
    if (!session) {
      alert("Please log in to rate our trainers.");
      return;
    }

    // We update the UI immediately for smoothness
    setRating(star);

    try {
      await fetchApi("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trainerId, value: star }),
      });
    } catch (error) {
      console.error("Failed to save rating", error);
    }
  };

  return (
    <div className="flex gap-1" role="group" aria-label="Rate this trainer">
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleRate(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          className="text-xl transition-colors"
          style={{
            color:
              star <= (hover || rating)
                ? "var(--color-accent-2)"
                : "var(--color-border)",
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}
