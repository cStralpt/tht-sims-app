import prisma from "../prisma";

export async function getAllProducts() {
  const products = await prisma.product.findMany();
  console.log(products);
  return products;
}
