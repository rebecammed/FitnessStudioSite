import { useEffect, useState } from "react";
import { fetchApi } from "../lib/api";
import ClassCard from "./ClassCard";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Schedule() {
  // 1. State to save the trainers
  const [classes, setClasses] = useState([]);

  // 2. State to know if the data is loading
  const [loading, setLoading] = useState(true);

  // 3. useEffect to ask for the data when the component is mounted
  useEffect(() => {
    fetchApi("/api/classes")
      .then((data) => {
        setClasses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  /**Default selection is Monday, once you click on another day, that's the selected day. */
  const [selectedDay, setSelectedDay] = useState("Mon");

  const visibleClasses = classes.filter(
    (classItem) => classItem.day === selectedDay,
  );

  return (
    <section id="schedule" className="bg-bg-alt px-4 py-20 md:px-6 md:py-28">
      <header className="max-w-2xl mx-auto mb-12 text-center">
        <h2 className="font-display text-3xl md:text-4xl mb-3">
          Class schedule
        </h2>
        <p className="text-text-muted text-sm">
          Pick a day and book your spot.
        </p>
      </header>

      {/* Day tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 max-w-6xl mx-auto">
        {loading ? (
          <p>Loading trainers...</p>
        ) : (
          days.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedDay === day
                  ? "bg-accent text-text"
                  : "text-text-muted hover:bg-bg-alt hover:text-text"
              }`}
            >
              {day}
            </button>
          ))
        )}
      </div>

      {/* Class rows */}
      <div className="grid gap-3 max-w-6xl mx-auto">
        {visibleClasses.map((classItem) => (
          <ClassCard key={classItem.id} classItem={classItem} />
        ))}
      </div>
    </section>
  );
}
