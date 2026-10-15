import StarRating from "./StarRating";

export default function TrainerCard({ trainer }) {
  return (
    <article className="flex flex-col gap-2 p-6 border-2 border-accent rounded-xl bg-bg transition-all hover:-translate-y-1 hover:shadow-md">
      <img
        src={trainer.photo}
        alt={trainer.name}
        className="aspect-square object-cover rounded-lg mb-2"
      />

      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xl font-bold">{trainer.name}</h3>
        <StarRating />
      </div>

      <span className="self-start inline-block px-2 py-1 bg-accent text-text text-sm font-semibold rounded-md">
        {trainer.specialty}
      </span>

      <p className="text-text-muted text-sm">{trainer.bio}</p>
    </article>
  );
}
