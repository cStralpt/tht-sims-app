import prisma from "../prisma";

export default async function getProductByategoryName(categoryName: string) {
  const products = await prisma.product.findMany({
    where: { categoryName },
  });
  return products;
}
