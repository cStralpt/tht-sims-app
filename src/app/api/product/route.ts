import prisma from "@/lib/prisma";
import { getAllProducts } from "@/lib/product/getAllProduct";
import getProductByategoryName from "@/lib/product/getProductByCategoryName";

export async function GET(request: Request) {
  const products = await getAllProducts();
  return Response.json(products);
}
export async function POST(request: Request) {
  const body = await request.json();
  console.log({ body: body });
  const products = await getProductByategoryName(body.categoryName);
  return Response.json(products);
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const isProductExist = await prisma.product.findUnique({
    where: { id: body.id },
  });
  if (!isProductExist) {
    return Response.json(
      {
        message: "Product not found, deletion cancelled",
      },
      {
        status: 404,
        statusText: "Product not found",
      },
    );
  }
  const deletedProduct = await prisma.product.delete({
    where: { id: body.id },
  });
  return Response.json({
    message: "Product deleted",
    data: deletedProduct,
  });
}
