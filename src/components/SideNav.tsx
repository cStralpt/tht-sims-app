"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SideNav() {
  const [isNavExpanded, setIsNavExpanded] = useState(true);
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/api/auth/logout");
  };
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
            route: "/product/productList",
            name: "Produk",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="rgba(134, 75, 187, 1)"
              >
                <path d="m21.704 5.29-2.997-2.997A.996.996 0 0 0 18 2H6a.996.996 0 0 0-.707.293L2.296 5.29A.994.994 0 0 0 2 5.999V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5.999a.994.994 0 0 0-.296-.709zM6.414 4h11.172l1 1H5.414l1-1zM17 13v1H7v-4h2v2h6v-2h2v3z"></path>
              </svg>
            ),
          },
          {
            route: "/profile",
            name: "Profil",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="rgba(134, 75, 187, 1)"
                viewBox="0 0 24 24"
              >
                <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
              </svg>
            ),
          },
          {
            route: "/",
            name: "Logout",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                fill="rgba(134, 75, 187, 1)"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="m2 12 5 4v-3h9v-2H7V8z"></path>
                <path d="M13.001 2.999a8.938 8.938 0 0 0-6.364 2.637L8.051 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051 2.051 3.08 2.051 4.95-.729 3.628-2.051 4.95-3.08 2.051-4.95 2.051-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637c1.7-1.699 2.637-3.959 2.637-6.364s-.937-4.665-2.637-6.364a8.938 8.938 0 0 0-6.364-2.637z"></path>
              </svg>
            ),
          },
        ].map((d) => (
          <>
            {d.name != "Logout" ? (
              <Link
                href={d.route}
                key={d.name}
                className="p-4 text-purple-800 flex gap-2"
              >
                {d.icon}
                {d.name}
              </Link>
            ) : (
              <button
                onClick={handleButtonClick}
                className="p-4 text-purple-800 flex gap-2"
              >
                {d.icon}
                {d.name}
              </button>
            )}
          </>
        ))}
      </nav>
    </aside>
  );
}
