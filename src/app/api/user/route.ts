import { getUserById } from "@/lib/user/getUserById";

export async function GET(request: Request) {
  const userById = await getUserById("clqrxai770000hkp0ae7athe7");
  return Response.json(
    { message: "success", data: userById },
    {
      status: 200,
      statusText: "OK",
    },
  );
}
