import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const searchedProducts = await prisma.product.findUnique({
    where: {
      id: body.id,
    },
  });
  console.log({ searchedProducts });
  return Response.json(searchedProducts);
}
