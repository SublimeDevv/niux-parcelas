export interface InternalUser {
  id: string;
  name: string;
  userName: string;
  email: string;
  createdAt: string;
  updatedAt?: string;
  rol?: string;
  roleId?: string;
}

export interface ApiUser {
  id: string;
  name: string;
  userName: string;
  email: string;
  createdAt: string;
  updatedAt?: string;
  usersRoles: Array<{
    role: {
      id: string;
      name: string;
    };
  }>;
}

export interface UserListResponse {
  users: ApiUser[];
  total: number;
}
