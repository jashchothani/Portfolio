import { profile } from "../data/profile";

export function Footer() {
  return (
    <footer className="border-t border-ink-900/[0.06] py-10">
      <div className="section-shell flex flex-col items-center justify-between gap-4 text-sm text-ink-400 sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}. Built from scratch.</p>
        <div className="flex gap-5">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-ink-900">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
