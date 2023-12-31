import { Product } from "@prisma/client";

export default async function searchProductByNameOrCategoryName(
  name: string,
  categoryName: string,
) {
  const fetchSearchedProduct = await fetch("/api/product/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, categoryName }),
  });
  const searchedProduct: Product[] = await fetchSearchedProduct.json();
  return searchedProduct;
}
