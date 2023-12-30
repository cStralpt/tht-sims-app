import PasswordInput from "@/components/PasswordInput";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";

export default function Signin() {
  return (
    <section className="h-full w-full grid grid-cols-2">
      <form
        action=""
        className="h-full flex justify-center flex-col items-center gap-4"
      >
        <b className="flex gap-2 items-center font-semibold text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="rgba(134, 75, 187, 1)"
          >
            <path d="M5 22h14a2 2 0 0 0 2-2V9a1 1 0 0 0-1-1h-3v-.777c0-2.609-1.903-4.945-4.5-5.198A5.005 5.005 0 0 0 7 7v1H4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2zm12-12v2h-2v-2h2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-2 3h2v2H7v-2z"></path>
          </svg>
          SIMS Web App
        </b>
        <strong className="text-2xl font-bold">
          Masuk atau buat akun untuk memulai
        </strong>
        <div className="flex gap-4 flex-col">
          <Input type="email" variant="faded" label="Email" color="secondary" />
          <PasswordInput />
        </div>
        <Button variant="flat" className="rounded-sm mt-4" color="secondary">
          Masuk
        </Button>
      </form>
      <div className="bg-purple-300 grid place-items-center">
        <Image
          src="/assets/signin-img.png"
          alt="signin art"
          width={500}
          height={900}
          className="aspect-auto"
        />
      </div>
    </section>
  );
}
