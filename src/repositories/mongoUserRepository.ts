import { User } from "@/models"
import { IUser, IUserRepository } from "@/types"

export default class MongoUserRepository implements IUserRepository {
  async findById(id: string): Promise<IUser | null> {
    return User.findById(id).exec()
  }

  async findAll(): Promise<IUser[]> {
    return User.find().exec()
  }

  async create(data: Partial<IUser>): Promise<IUser> {
    const user = new User(data)
    return user.save()
  }

  async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, data, { new: true }).exec()
  }

  async delete(id: string): Promise<IUser | null> {
    return User.findByIdAndDelete(id).exec()
  }
}
