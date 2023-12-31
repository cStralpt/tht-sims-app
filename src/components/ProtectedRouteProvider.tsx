import useUserFromJwt from "@/hook/user/useUserFromJwt";
import { redirect } from "next/navigation";
import React from "react";

export default function ProtectedRouteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isUserAuthenticated } = useUserFromJwt();
  console.log({ isUserAuthenticated });
  if (isUserAuthenticated === undefined) {
    redirect("/signin");
  }
  return <>{children}</>;
}
