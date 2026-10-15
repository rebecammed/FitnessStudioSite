import { useState } from "react";

export default function StarRating({ max = 5 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1" role="group" aria-label="Rate this trainer">
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
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
