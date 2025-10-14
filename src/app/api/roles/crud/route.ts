import prisma from "@/lib/db";
import { ResponseHelper } from "@/lib/response";
import { roleSchema } from "@/modules/roles/schemas/roleSchema";

export const GET = async () => {
  try {
    const roles = await prisma.role.findMany({
      where: { isDeleted: false },
      include: {
        usersRoles: {
          where: { isDeleted: false },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return ResponseHelper.ok(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    return ResponseHelper.badRequest((error as Error).message || "Invalid data");
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { name } = roleSchema.parse(body);

    const existingRole = await prisma.role.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
        isDeleted: false,
      },
    });

    if (existingRole) {
      return ResponseHelper.badRequest("Ya existe un rol con ese nombre");
    }

    const newRole = await prisma.role.create({
      data: {
        name,
      },
      include: {
        usersRoles: {
          where: { isDeleted: false },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return ResponseHelper.created(newRole);
  } catch (error: unknown) {
    console.error("Error creating role:", error);
    return ResponseHelper.badRequest((error as Error).message || "Invalid data");
  }
};
