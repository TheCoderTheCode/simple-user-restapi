import { IUser } from "@/types"

export default interface IUserRepository {
  findById(id: string): Promise<IUser | null>
  findAll(): Promise<IUser[]>
  create(data: Partial<IUser>): Promise<IUser>
  update(id: string, data: Partial<IUser>): Promise<IUser | null>
  delete(id: string): Promise<IUser | null>
}
