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
