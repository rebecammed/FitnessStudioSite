import { useState } from "react";
import { Link } from "react-router";

const navLinks = [
  { id: 1, label: "Classes", href: "#schedule" },
  { id: 2, label: "Trainers", href: "#trainers" },
  { id: 3, label: "Prices", href: "#pricing" },
  { id: 4, label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    /**
     * The header sticks to the top, is in front of every item in the site
     * and has an inferior border
     */
    <header className="sticky top-0 z-50 bg-bg border-b border-border min-h-[73px]">
      <nav
        aria-label="Main navigation menu"
        className="flex flex-wrap items-center justify-between gap-4 p-4 max-w-6xl mx-auto md:flex-nowrap"
      >
        <a
          href="/#hero"
          className="font-display text-xl font-bold tracking-wider"
        >
          PULSO
        </a>

        {/* Navigation links - visible on tablet and desktop devices */}
        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          } flex-col w-full gap-4 md:flex md:flex-row md:w-auto md:items-center md:gap-6`}
        >
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={`/${link.href}`}
                className="text-sm font-medium transition-colors hover:text-accent-2"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href="/login"
          className="inline-flex items-center justify-center bg-accent text-text text-sm font-semibold px-4 py-2 rounded-lg transition-colors hover:bg-accent-2 hover:text-white"
        >
          Log in / Sign up
        </a>

        {/* Hamburger button - only visible on mobile */}
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-bg-alt"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </nav>
    </header>
  );
}
