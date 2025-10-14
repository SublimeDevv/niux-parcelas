interface User {
  id: string;
  name: string;
  userName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  rol?: string;
}

export default User;
