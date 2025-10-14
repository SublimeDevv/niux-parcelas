import prisma from "@/lib/db";
import { ResponseHelper } from "@/lib/response";
import { roleUpdateSchema } from "@/modules/roles/schemas/roleSchema";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const role = await prisma.role.findUnique({
      where: { id, isDeleted: false },
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

    if (!role) {
      return ResponseHelper.notFound("Rol no encontrado");
    }

    return ResponseHelper.ok(role);
  } catch (error) {
    return ResponseHelper.badRequest((error as Error).message || "Invalid data");
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = roleUpdateSchema.parse(body);

    const existingRole = await prisma.role.findUnique({
      where: { id, isDeleted: false },
    });

    if (!existingRole) {
      return ResponseHelper.notFound("Rol no encontrado");
    }

    if (data.name) {
      const roleWithSameName = await prisma.role.findFirst({
        where: {
          name: {
            equals: data.name,
            mode: "insensitive",
          },
          isDeleted: false,
          NOT: {
            id,
          },
        },
      });

      if (roleWithSameName) {
        return ResponseHelper.badRequest("Ya existe un rol con ese nombre");
      }
    }

    const updatedRole = await prisma.role.update({
      where: { id, isDeleted: false },
      data: {
        ...(data.name !== undefined && { name: data.name }),
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

    return ResponseHelper.ok(updatedRole);
  } catch (error) {
    return ResponseHelper.badRequest((error as Error).message || "Invalid data");
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const existingRole = await prisma.role.findUnique({
      where: { id, isDeleted: false },
      include: {
        usersRoles: {
          where: { isDeleted: false },
        },
      },
    });

    if (!existingRole) {
      return ResponseHelper.notFound("Rol no encontrado");
    }

    if (existingRole.usersRoles.length > 0) {
      return ResponseHelper.badRequest(
        "No se puede eliminar un rol que tiene usuarios asignados"
      );
    }

    await prisma.role.update({
      where: { id },
      data: { 
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    return ResponseHelper.ok({ message: "Rol eliminado exitosamente" });
  } catch (error) {
    return ResponseHelper.badRequest((error as Error).message || "Invalid data");
  }
};
