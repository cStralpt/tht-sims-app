import prisma from "../prisma";

export async function getAllProducts(take: number, skip: number) {
  const totalRecord = await prisma.product.count();
  console.log(totalRecord);
  const products = await prisma.product.findMany({
    take,
    skip,
  });
  console.log(products);
  return products;
}
