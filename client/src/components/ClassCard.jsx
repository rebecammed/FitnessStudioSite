export default function ClassCard({ classItem }) {
  return (
    /**time and name occupy two columns, trainer and level one on the same row
     * and the button takes two columns on the fourth row
     * on tablet and desktop it's all one row with 5 columns*/
    <article className="grid grid-cols-2 gap-3 p-4 bg-bg border border-border rounded-xl items-center md:grid-cols-[80px_2fr_1fr_1fr_auto] md:gap-4 md:px-6">
      <time className="col-span-2 font-display font-bold text-text-muted text-sm md:col-span-1">
        {classItem.time}
      </time>

      <h3 className="col-span-2 text-xl md:col-span-1">{classItem.name}</h3>

      <p className="text-sm">{classItem.trainer}</p>

      <p className="text-sm text-text-muted text-right md:text-left">
        {classItem.level}
      </p>

      <a
        href="#contact"
        className="col-span-2 inline-flex items-center justify-center text-sm font-semibold px-4 py-2 rounded-lg border-2 border-text transition-colors hover:bg-accent-2 hover:text-white hover:border-accent-2 md:col-span-1 md:justify-self-end"
      >
        Book
      </a>
    </article>
  );
}
