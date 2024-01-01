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
  const searchedProducts = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: body.name,
          },
        },
        {
          categoryName: {
            contains: body.categoryName,
          },
        },
      ],
    },
  });
  console.log({ searchedProducts });
  return Response.json(searchedProducts);
}
