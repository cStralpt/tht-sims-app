import { COOKIE_NAME } from "@/constants";
import { cookies } from "next/headers";
import { verifyJwt } from "../jwtAuth";
import { JwtPayload } from "jsonwebtoken";

interface UserFromToken extends JwtPayload {
  isUserAuthenticated: boolean;
}
export default function useUserFromJwt() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME);
  let userDataFromToken: UserFromToken | undefined;
  if (token !== undefined) {
    userDataFromToken = verifyJwt(token?.value) as unknown as UserFromToken;
    if (userDataFromToken !== undefined) {
      userDataFromToken.isUserAuthenticated = true;
    }
    console.log({ userDataFromToken });
    console.log({ token });
  }
  return { ...userDataFromToken };
}
