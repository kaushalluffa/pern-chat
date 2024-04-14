import { prisma } from "../prisma.js";
export const getAllUsers = async (req, res) => {
  const search = req?.body?.search;
  try {
    const allUsers = await prisma.user.findMany({
      where: {
        id: { not: { equals: req?.user?.id } },
        OR: search
          ? [
              { email: { contains: req?.body?.search, mode: "insensitive" } },
              { name: { contains: req?.body?.search, mode: "insensitive" } },
            ]
          : undefined,
      },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        email: true,
        imageId: true,
        imageUrl: true,
        createdAt: true,
      },
    });
    return res.json(allUsers);
  } catch (error) {
    console.log(error);
    return res.json({ error: error?.toString() });
  }
};
