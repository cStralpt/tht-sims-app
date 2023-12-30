"use client";
import { Input, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface UserData {
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    position: string;
    createdAt: string;
    updatedAt: string;
  };
}

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [getUser, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const user = async () => {
      const fetchUserByid = await fetch("/api/user");
      const userDataById: UserData = await fetchUserByid.json();
      setIsLoading(false);
      setUser(userDataById);
    };
    user();
  }, []);
  return (
    <main className="grow p-16">
      <div className="">
        <div className="">
          {isLoading ? (
            <Spinner
              label="Memuat profil..."
              color="warning"
              labelColor="warning"
            />
          ) : (
            <Image
              src={`/assets/${getUser?.data.avatar}`}
              width={200}
              height={200}
              alt="photo pengguna"
              className="aspect-auto"
            />
          )}
        </div>
        {isLoading ? (
          <Spinner label="Memuat nama..." color="danger" labelColor="danger" />
        ) : (
          <b className="text-purple-950 text-2xl">{getUser?.data.name}</b>
        )}
      </div>
      <div className="flex gap-4">
        {isLoading ? (
          <Spinner label="Memuat..." color="success" labelColor="success" />
        ) : (
          <Input
            type="text"
            value={getUser?.data.name}
            color="secondary"
            label="Nama Kandidat"
          />
        )}
        {isLoading ? (
          <Spinner
            label="Memuat posisi kandidat"
            color="secondary"
            labelColor="secondary"
          />
        ) : (
          <Input
            type="text"
            value={getUser?.data.position}
            color="secondary"
            label="Posisi Kandidat"
          />
        )}
      </div>
    </main>
  );
}
