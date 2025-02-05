import { IUserRepository, IUserService, IUser } from "@/types"

export default class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getAllUsers(): Promise<IUser[]> {
    return this.userRepository.findAll()
  }

  async getUserById(id: string): Promise<IUser | null> {
    return this.userRepository.findById(id)
  }

  async createUser(data: Partial<IUser>): Promise<IUser> {
    return this.userRepository.create(data)
  }

  async updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return this.userRepository.update(id, data)
  }

  async deleteUser(id: string): Promise<IUser | null> {
    return this.userRepository.delete(id)
  }
}
