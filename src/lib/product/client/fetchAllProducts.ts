import { Product } from "@prisma/client";

type TProduct = {
  message: string;
  data: Product[];
  length: number;
};
export default async function fetchAllProducts(take: number, skip: number) {
  try {
    const fetchProduct = await fetch(`/api/product?take=${take}&skip=${skip}`);

    if (!fetchProduct.ok) {
      throw new Error(`HTTP error! Status: ${fetchProduct.status}`);
    }
    const products: TProduct = await fetchProduct.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
