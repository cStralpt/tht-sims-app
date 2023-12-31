import { useProductState } from "@/hook/product/useProduct";
import { Product } from "@prisma/client";

export default async function fetchAllProducts() {
  try {
    const fetchProduct = await fetch("/api/product");

    if (!fetchProduct.ok) {
      throw new Error(`HTTP error! Status: ${fetchProduct.status}`);
    }
    const products: Product[] = await fetchProduct.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
