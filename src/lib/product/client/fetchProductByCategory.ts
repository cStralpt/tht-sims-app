import { type Product } from "@prisma/client";

export const fetchProductByCategory = async (categoryName: string) => {
  try {
    const fetchProduct = await fetch("/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName }),
    });

    if (!fetchProduct.ok) {
      throw new Error(`HTTP error! Status: ${fetchProduct.status}`);
    }
    const products: Product[] = await fetchProduct.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
