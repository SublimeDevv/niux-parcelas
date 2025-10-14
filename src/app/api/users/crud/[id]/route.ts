import prisma from "@/lib/db";
import { ResponseHelper } from "@/lib/response";
import { userUpdateSchema } from "@/modules/users/schemas/userSchema";
import bcrypt from "bcrypt";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id, isDeleted: false },
      include: {
        usersRoles: {
          where: { isDeleted: false },
          include: {
            role: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return ResponseHelper.notFound("Usuario no encontrado");
    }

    return ResponseHelper.ok(user);
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
    const data = userUpdateSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { id, isDeleted: false },
      include: {
        usersRoles: {
          where: { isDeleted: false },
        },
      },
    });

    if (!existingUser) {
      return ResponseHelper.notFound("Usuario no encontrado");
    }

    if (data.email) {
      const userWithSameEmail = await prisma.user.findFirst({
        where: {
          email: {
            equals: data.email,
            mode: "insensitive",
          },
          isDeleted: false,
          NOT: {
            id,
          },
        },
      });

      if (userWithSameEmail) {
        return ResponseHelper.badRequest("Ya existe un usuario con ese email");
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};

    if (data.firstName || data.lastName) {
      const firstName = data.firstName || existingUser.name.split(" ")[0];
      const lastName = data.lastName || existingUser.name.split(" ").slice(1).join(" ");
      const fullName = `${firstName} ${lastName}`;
      
      updateData.name = fullName;
      updateData.userName = fullName.toUpperCase();

      const userWithSameUserName = await prisma.user.findFirst({
        where: {
          userName: {
            equals: updateData.userName,
            mode: "insensitive",
          },
          isDeleted: false,
          NOT: {
            id,
          },
        },
      });

      if (userWithSameUserName) {
        return ResponseHelper.badRequest("Ya existe un usuario con ese nombre");
      }
    }

    if (data.email) {
      updateData.email = data.email;
    }

    if (data.password) {
      updateData.passwordHash = await bcrypt.hash(data.password, 10);
    }

    await prisma.user.update({
      where: { id, isDeleted: false },
      data: updateData,
    });

    if (data.roleId) {
      const roleExists = await prisma.role.findUnique({
        where: { id: data.roleId, isDeleted: false },
      });

      if (!roleExists) {
        return ResponseHelper.badRequest("El rol especificado no existe");
      }

      const currentUserRole = await prisma.usersRole.findFirst({
        where: { 
          userId: id, 
          roleId: data.roleId, 
          isDeleted: false 
        },
      });

      if (!currentUserRole) {
        await prisma.usersRole.updateMany({
          where: { userId: id, isDeleted: false },
          data: { isDeleted: true, deletedAt: new Date() },
        });

        const existingDeletedRole = await prisma.usersRole.findFirst({
          where: { 
            userId: id, 
            roleId: data.roleId, 
            isDeleted: true 
          },
        });

        if (existingDeletedRole) {
          await prisma.usersRole.update({
            where: { id: existingDeletedRole.id },
            data: { 
              isDeleted: false, 
              deletedAt: null,
              updatedAt: new Date()
            },
          });
        } else {
          await prisma.usersRole.create({
            data: {
              userId: id,
              roleId: data.roleId,
            },
          });
        }
      }
    }

    const userWithRole = await prisma.user.findUnique({
      where: { id },
      include: {
        usersRoles: {
          where: { isDeleted: false },
          include: {
            role: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return ResponseHelper.ok(userWithRole);
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
    const url = new URL(request.url);
    const permanent = url.searchParams.get('permanent') === 'true';

    const existingUser = await prisma.user.findUnique({
      where: { id, isDeleted: false },
    });

    if (!existingUser) {
      return ResponseHelper.notFound("Usuario no encontrado");
    }

    if (permanent) {
      await prisma.usersRole.deleteMany({
        where: { userId: id },
      });

      await prisma.user.delete({
        where: { id },
      });

      return ResponseHelper.ok({ message: "Usuario eliminado permanentemente" });
    } else {
      await prisma.user.update({
        where: { id },
        data: { 
          isDeleted: true,
          deletedAt: new Date(),
        },
      });

      await prisma.usersRole.updateMany({
        where: { userId: id },
        data: { 
          isDeleted: true,
          deletedAt: new Date(),
        },
      });

      return ResponseHelper.ok({ message: "Usuario deshabilitado exitosamente" });
    }
  } catch (error) {
    return ResponseHelper.badRequest((error as Error).message || "Invalid data");
  }
};
