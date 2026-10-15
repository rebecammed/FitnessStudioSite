export default function PriceCard({ membership }) {
  return (
    <article
      className={`relative flex flex-col gap-4 p-6 rounded-xl bg-bg shadow-sm ${
        membership.featured ? "border-2 border-accent" : "border border-border"
      }`}
    >
      {membership.featured && (
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
        {membership.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-accent-2 font-bold" aria-hidden="true">
              ✓
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`inline-flex items-center justify-center text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
          membership.featured
            ? "bg-accent text-text hover:bg-accent-2 hover:text-white"
            : "border-2 border-text text-text hover:bg-accent-2 hover:text-white hover:border-accent-2"
        }`}
      >
        Choose {membership.name}
      </a>
    </article>
  );
}
