import prisma from "@/lib/db";
import getRedisClient from "@/lib/redis";
import { getCached, setCached } from "@/lib/redis-helpers";
import { ResponseHelper, withErrorHandling } from "@/lib/response";
import User from "@/modules/users/interfaces/userList";
import bcrypt from "bcrypt";

export async function GET() {
  return withErrorHandling(async () => {
    try {
    const redis = await getRedisClient();
    const cachedUsers = await getCached<User[]>(redis, "usersList");
    if (cachedUsers) {
      return ResponseHelper.ok(cachedUsers);
    }

    const usersList = await prisma.user.findMany({
      where: {
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        userName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        usersRoles: {
          select: {
            role: {
              select: {
                name: true, 
              }
            }
          }
        }
      }
    });

    if (usersList.length === 0) {
      return ResponseHelper.notFound("No users found");
    }

    const usersListSorted = usersList.map(({ usersRoles, ...user }) => ({
      ...user,
      rol: usersRoles[0]?.role.name || null,
    })).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    await setCached(redis, "usersList", usersListSorted, 3600);

    return ResponseHelper.ok(usersListSorted);

     } catch (error) {
       console.log("Error fetching users:", error);
       return ResponseHelper.internalError("Failed to fetch users", error);
    }
  });
}

export async function POST(request: Request) {
  return withErrorHandling(async () => {
    const { firstName, lastName, email, password, roleId } =
      await request.json();

    if (!firstName || !lastName || !email || !password) {
      return ResponseHelper.missingFields();
    }

    const findByEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (findByEmail) {
      return ResponseHelper.emailExists();
    }

    const findByUserName = await prisma.user.findFirst({
      where: {
        userName: `${firstName} ${lastName}`,
      },
    });

    if (findByUserName) {
      return ResponseHelper.usernameExists();
    }

    const userName = `${firstName} ${lastName}`.toUpperCase();

    if (!roleId) return ResponseHelper.missingFields("Role ID is required");

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: passwordHash,
        name: `${firstName} ${lastName}`,
        userName,
      },
    });

    const createRole = await prisma.usersRole.create({
      data: {
        userId: user.id,
        roleId,
      },
    });

    if (!user || !createRole) {
      return ResponseHelper.internalError("Failed to create user");
    }

    return ResponseHelper.created({ user: user.userName });
  });
}

export async function PUT(request: Request) {
  return withErrorHandling(async () => {
    const { id, firstName, lastName, email, password } =
      await request.json();

    if (!id) {
      return ResponseHelper.missingFields("User ID is required");
    }

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return ResponseHelper.notFound("User not found");
    }

    const dataToUpdate: {
      name?: string;
      userName?: string;
      email?: string;
      passwordHash?: string;
    } = {};

    if (email) {
      const emailInUse = await prisma.user.findFirst({
        where: {
          email,
          NOT: {
            id, 
          },
        },
      });
      if (emailInUse) {
        return ResponseHelper.emailExists();
      }
      dataToUpdate.email = email;
    }

    if (firstName || lastName) {
      const newFirstName = firstName || existingUser.name.split(" ")[0];
      const newLastName = lastName || existingUser.name.split(" ").slice(1).join(" ");
      const fullName = `${newFirstName} ${newLastName}`;
      
      dataToUpdate.name = fullName;
      dataToUpdate.userName = fullName.toUpperCase();
    }
    
    if (password) {
      dataToUpdate.passwordHash = await bcrypt.hash(password, 10);
    }

    if (Object.keys(dataToUpdate).length > 0) {
      await prisma.user.update({
        where: { id },
        data: dataToUpdate,
      });
    }

    return ResponseHelper.ok({ message: "User updated successfully" });
  });
}

export async function DELETE(request: Request) {
  return withErrorHandling(async () => {
    const { id, permanent } = await request.json();

    if (!id) {
      return ResponseHelper.missingFields("User ID is required");
    }

    const userExists = await prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      return ResponseHelper.notFound("User not found");
    }
    
    if (permanent) {
      await prisma.usersRole.deleteMany({
        where: { userId: id },
      });
      await prisma.user.delete({
        where: { id },
      });
      return ResponseHelper.ok({ message: "User permanently deleted" });

    } else {
      await prisma.user.update({
        where: { id },
        data: { isDeleted: true },
      });
      return ResponseHelper.ok({ message: "User disabled successfully" });
    }
  });
}