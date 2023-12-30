import { Input } from "@nextui-org/react";
import Image from "next/image";

export default function Profile() {
  return (
    <main className="grow p-16">
      <div className="">
        <div className="">
          <Image
            src="/assets/user-photo.png"
            width={200}
            height={200}
            alt="photo pengguna"
            className="aspect-auto"
          />
        </div>
        <b className="text-purple-950 text-2xl">Kristanto Wibowo</b>
      </div>
      <div className="flex gap-4">
        <Input
          type="text"
          value="Kristanto Wibowo"
          color="secondary"
          label="Nama Kandidat"
        />
        <Input
          type="text"
          value="Web Programmer"
          color="secondary"
          label="Posisi Kandidat"
        />
      </div>
    </main>
  );
}
