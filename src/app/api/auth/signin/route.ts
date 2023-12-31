import { COOKIE_NAME } from "@/constants";
import { generateJwtAccessToken } from "@/lib/jwtAuth";
import prisma from "@/lib/prisma";
import { serialize } from "cookie";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;
  const userdata = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (
    userdata &&
    userdata?.email === email &&
    userdata?.password === password
  ) {
    const accessToken = generateJwtAccessToken(userdata?.id, userdata.name);
    const serialized = serialize(COOKIE_NAME, accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 1000,
      path: "/",
    });
    return Response.json(
      { message: "success", accessToken },
      {
        status: 200,
        headers: {
          "Set-Cookie": serialized,
        },
      },
    );
  } else {
    return Response.json({ message: "credentials invalid" }, { status: 401 });
  }
}
