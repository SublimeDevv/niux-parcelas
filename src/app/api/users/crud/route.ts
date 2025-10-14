import prisma from "@/lib/db";
import { ResponseHelper } from "@/lib/response";
import { userSchema } from "@/modules/users/schemas/userSchema";
import bcrypt from "bcrypt";

export const GET = async () => {
  try {
    const users = await prisma.user.findMany({
      where: { isDeleted: false },
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return ResponseHelper.ok(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return ResponseHelper.badRequest((error as Error).message || "Invalid data");
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password, roleId } = userSchema.parse(body);

    const existingUserByEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
        isDeleted: false,
      },
    });

    if (existingUserByEmail) {
      return ResponseHelper.badRequest("Ya existe un usuario con ese email");
    }

    const roleExists = await prisma.role.findUnique({
      where: { id: roleId, isDeleted: false },
    });

    if (!roleExists) {
      return ResponseHelper.badRequest("El rol especificado no existe");
    }

    const fullName = `${firstName} ${lastName}`;
    const userName = fullName.toUpperCase();

    const existingUserByUserName = await prisma.user.findFirst({
      where: {
        userName: {
          equals: userName,
          mode: "insensitive",
        },
        isDeleted: false,
      },
    });

    if (existingUserByUserName) {
      return ResponseHelper.badRequest("Ya existe un usuario con ese nombre");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: fullName,
        userName,
        email,
        passwordHash,
      },
    });

    await prisma.usersRole.create({
      data: {
        userId: newUser.id,
        roleId,
      },
    });

    const userWithRole = await prisma.user.findUnique({
      where: { id: newUser.id },
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

    return ResponseHelper.created(userWithRole);
  } catch (error: unknown) {
    return ResponseHelper.badRequest((error as Error).message || "Invalid data");
  }
};
