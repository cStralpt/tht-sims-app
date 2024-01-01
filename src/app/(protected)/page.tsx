import Link from "next/link";

export default function Home() {
  return (
    <section className="grow p-16 grid place-content-center">
      <div className="flex gap-8">
        <Link
          href="/product/productList"
          className="p-4 text-purple-800 flex gap-2 text-3xl text-center font-bold flex-col items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="130"
            height="130"
            viewBox="0 0 24 24"
            fill="rgba(134, 75, 187, 1)"
          >
            <path d="m21.704 5.29-2.997-2.997A.996.996 0 0 0 18 2H6a.996.996 0 0 0-.707.293L2.296 5.29A.994.994 0 0 0 2 5.999V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5.999a.994.994 0 0 0-.296-.709zM6.414 4h11.172l1 1H5.414l1-1zM17 13v1H7v-4h2v2h6v-2h2v3z"></path>
          </svg>
          Produk
        </Link>
        <Link
          href="/profile"
          className="p-4 text-purple-800 flex gap-2 text-3xl text-center font-bold flex-col items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="130"
            height="130"
            fill="rgba(134, 75, 187, 1)"
            viewBox="0 0 24 24"
          >
            <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
          </svg>
          Profil
        </Link>
      </div>
    </section>
  );
}
