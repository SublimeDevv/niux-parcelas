export interface InternalRole {
  id: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
  usersCount?: number;
}

export interface ApiRole {
  id: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
  usersRoles: Array<{
    user: {
      id: string;
      name: string;
    };
  }>;
}

export interface RoleListResponse {
  roles: ApiRole[];
  total: number;
}
