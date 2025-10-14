export interface Role {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt?: Date;
  isDeleted: boolean;
  deletedAt?: Date;
}

export interface RoleWithUsers extends Role {
  usersRoles: Array<{
    user: {
      id: string;
      name: string;
      email: string;
    };
  }>;
}
