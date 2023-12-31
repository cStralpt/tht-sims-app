import { getUserById } from "@/lib/user/getUserById";
import useUserFromJwt from "@/hook/user/useUserFromJwt";

export async function GET() {
  const { userId, isUserAuthenticated } = useUserFromJwt();
  if (isUserAuthenticated) {
    const userById = await getUserById(userId);
    return Response.json(
      { message: "success", data: userById },
      {
        status: 200,
        statusText: "OK",
      },
    );
  } else {
    return Response.json(
      { message: "heyy!" },
      { status: 401, statusText: "Unauthorized" },
    );
  }
}
