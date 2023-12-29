"use client";
import Link from "next/link";
import { useState } from "react";

export default function SideNav() {
  const [isNavExpanded, setIsNavExpanded] = useState(true);
  return (
    <aside className="bg-purple-300 p-4">
      <header className="flex justify-between gap-8">
        {isNavExpanded && (
          <div className="flex items-center gap">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="rgba(134, 75, 187, 1)"
            >
              <path d="M5 22h14a2 2 0 0 0 2-2V9a1 1 0 0 0-1-1h-3v-.777c0-2.609-1.903-4.945-4.5-5.198A5.005 5.005 0 0 0 7 7v1H4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2zm12-12v2h-2v-2h2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-2 3h2v2H7v-2z"></path>
            </svg>
            Sims Web App
          </div>
        )}
        <button className="" onClick={() => setIsNavExpanded(!isNavExpanded)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="rgba(134, 75, 187, 1)"
          >
            <path d="M4 11h12v2H4zm0-5h16v2H4zm0 12h7.235v-2H4z"></path>
          </svg>
        </button>
      </header>
      <nav className="flex flex-col gap-4">
        {[
          {
            route: "/",
            name: "Produk",
          },
          {
            route: "/",
            name: "Profil",
          },
          {
            route: "/",
            name: "Logout",
          },
        ].map((d) => (
          <Link href={d.route} key={d.name} className="p-4 text-purple-800">
            {d.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
