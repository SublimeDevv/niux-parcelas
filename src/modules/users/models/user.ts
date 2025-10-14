export interface User {
  id: string;
  name: string;
  userName: string;
  email: string;
  passwordHash: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface UserWithRole extends User {
  usersRoles: Array<{
    role: {
      id: string;
      name: string;
    };
  }>;
}
