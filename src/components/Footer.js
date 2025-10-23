"use client";

import Link from "next/link";

const nav = {
  product: [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Post a Job", href: "/jobs/create" },
    { name: "Companies", href: "/companies" },
    { name: "Pricing", href: "/pricing" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Status", href: "/status" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200/60 dark:border-gray-800/60 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Top: brand + newsletter */}
        <div className="py-10 md:py-12 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2"
              aria-label="DJ-Board home"
            >
              <div className="w-10 h-10 bg-cyan-600 rounded-full grid place-items-center text-white font-bold">
                DJ
              </div>
              <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
                DJ-Board
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 max-w-sm">
              Discover developer roles, post openings, and hire faster with a
              focused tech talent marketplace.
            </p>

            {/* Socials */}
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="text-gray-500 hover:text-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22.46 6c-.77.35-1.6.59-2.46.69a4.26 4.26 0 0 0 1.87-2.35 8.5 8.5 0 0 1-2.7 1.03 4.24 4.24 0 0 0-7.22 3.87A12.05 12.05 0 0 1 3.16 4.9a4.22 4.22 0 0 0 1.31 5.66 4.2 4.2 0 0 1-1.92-.53v.05a4.24 4.24 0 0 0 3.4 4.15c-.47.13-.96.2-1.47.2-.36 0-.71-.03-1.05-.1a4.25 4.25 0 0 0 3.96 2.94A8.5 8.5 0 0 1 2 19.55 12 12 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.35 8.35 0 0 0 22.46 6z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-gray-500 hover:text-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 .5A11.5 11.5 0 0 0 .5 12.28c0 5.2 3.38 9.6 8.08 11.16.6.12.82-.26.82-.58 0-.28-.01-1.04-.02-2.04-3.29.73-3.98-1.6-3.98-1.6-.55-1.43-1.34-1.82-1.34-1.82-1.1-.77.08-.76.08-.76 1.21.09 1.84 1.24 1.84 1.24 1.08 1.86 2.83 1.33 3.52 1.02.11-.8.42-1.34.76-1.65-2.63-.3-5.4-1.34-5.4-5.98 0-1.32.47-2.4 1.23-3.25-.12-.3-.53-1.52.12-3.17 0 0 1-.33 3.3 1.24a11.5 11.5 0 0 1 6 0C16.9 4.92 17.9 5.25 17.9 5.25c.65 1.65.24 2.87.12 3.17.77.85 1.23 1.93 1.23 3.25 0 4.65-2.78 5.68-5.42 5.98.43.38.81 1.12.81 2.26 0 1.64-.02 2.96-.02 3.37 0 .32.21.7.83.58A11.5 11.5 0 0 0 23.5 12.28C23.5 5.92 18.33.5 12 .5z"
                  />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-gray-500 hover:text-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5.001 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM14.5 9A4.5 4.5 0 0 0 10 13.5V21h4v-6a2 2 0 1 1 4 0v6h4v-6.5C22 10.57 19.43 8 16.5 8c-.74 0-1.43.16-2 .45V9h0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="md:col-span-2 grid gap-8 sm:grid-cols-3">
            <FooterColumn title="Product" links={nav.product} />
            <FooterColumn title="Company" links={nav.company} />
            <FooterColumn title="Legal" links={nav.legal} />

            {/* Newsletter — stack to third col on small screens */}
            <div className="sm:col-span-3 md:col-span-1 md:hidden">
              <Newsletter />
            </div>
          </div>

          {/* Newsletter on md+ aligned to right */}
          <div className="hidden md:block md:col-span-1">
            <Newsletter />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-200/60 dark:border-gray-800/60 py-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {year} DJ-Board. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/accessibility"
              className="hover:text-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
            >
              Accessibility
            </Link>
            <Link
              href="/sitemap"
              className="hover:text-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <nav aria-label={title}>
      <h3 className="text-sm font-semibold tracking-wide text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <ul className="mt-3 space-y-2">
        {links.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Newsletter() {
  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: hook up to your newsletter provider
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-md"
      aria-label="Newsletter signup"
    >
      <h3 className="text-sm font-semibold tracking-wide text-gray-900 dark:text-gray-100">
        Subscribe to updates
      </h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Get the latest dev jobs and hiring tips.
      </p>
      <div className="mt-3 flex">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full min-w-0 rounded-l-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/40 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button
          type="submit"
          className="inline-flex items-center rounded-r-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          Subscribe
        </button>
      </div>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        By subscribing, you agree to our Privacy Policy.
      </p>
    </form>
  );
}
