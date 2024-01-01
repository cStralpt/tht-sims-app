import useUserFromJwt from "@/hook/user/useUserFromJwt";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { isUserAuthenticated } = useUserFromJwt();
  if (isUserAuthenticated === undefined) {
    return Response.json(
      { message: "unauthorized" },
      {
        status: 401,
      },
    );
  }
  const searchedProducts = await prisma.product.findUnique({
    where: {
      id: body.id,
    },
  });
  console.log({ searchedProducts });
  return Response.json(searchedProducts);
}
