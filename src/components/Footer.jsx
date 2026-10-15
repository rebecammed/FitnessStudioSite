import { footerInfo } from "../data/data";

export default function Footer() {
  return (
    <footer className="bg-bg-alt border-t border-border px-4 pt-12 pb-6 md:px-6 md:pt-16 md:pb-8">
      <div className="grid grid-cols-1 gap-8 max-w-6xl mx-auto text-center md:grid-cols-3 mb-12">
        <div>
          <h2 className="font-display text-xl mb-2">
            {footerInfo.studio.name}
          </h2>
          <p className="text-text-muted text-sm">{footerInfo.studio.address}</p>
        </div>

        <div>
          <h3 className="text-xl mb-2">Opening hours</h3>
          {footerInfo.hours.map((line) => (
            <p key={line} className="text-text-muted text-sm">
              {line}
            </p>
          ))}
        </div>

        <div>
          <h3 className="text-xl mb-2">Follow us</h3>
          <ul className="flex flex-col gap-1 text-sm">
            {footerInfo.social.map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  className="text-text-muted transition-colors hover:text-accent-2"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="max-w-6xl mx-auto text-center text-text-muted text-sm pt-6 border-t border-border">
        © 2026 {footerInfo.studio.name}. All rights reserved.
      </p>
    </footer>
  );
}
