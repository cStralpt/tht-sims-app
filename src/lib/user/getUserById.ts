import prisma from "../prisma";

export async function getUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user;
}
