import { IUser } from "@/types"

export default interface IUserService {
  getAllUsers(): Promise<IUser[]>
  getUserById(id: string): Promise<IUser | null>
  createUser(data: Partial<IUser>): Promise<IUser>
  updateUser(id: string, data: Partial<IUser>): Promise<IUser | null>
  deleteUser(id: string): Promise<IUser | null>
}
