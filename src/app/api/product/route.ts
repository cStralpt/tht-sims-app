import { getAllProducts } from "@/lib/product/getAllProduct";

export async function GET(request: Request) {
  const products = await getAllProducts();
  return Response.json(products);
}
