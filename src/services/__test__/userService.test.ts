import { UserService } from "@/services"
import { IUser, IUserRepository } from "@/types"

jest.mock("@/types")

describe("UserService", () => {
  let userService: UserService
  let userRepositoryMock: jest.Mocked<IUserRepository>

  beforeAll(() => {
    userRepositoryMock = new (jest.fn(() => ({
      findOneBy: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    })))() as jest.Mocked<IUserRepository>
    userService = new UserService(userRepositoryMock)
  })

  it("should be able to create a user", async () => {
    const user = { name: "John Doe", email: "john.doe@test.com" }
    const savedUser = { _id: "123", ...user }

    userRepositoryMock.create.mockResolvedValue(savedUser as IUser)

    const result = await userService.createUser(user)

    expect(result).toEqual(savedUser as IUser)
    expect(userRepositoryMock.create).toHaveBeenCalledTimes(1)
  })

  it("should be able to retrieve all users", async () => {
    const users = [
      { _id: "123", name: "John Doe", email: "john.doe@test.com" },
      { _id: "124", name: "Jane Doe", email: "jane.doe@test.com" },
    ]

    userRepositoryMock.findAll.mockResolvedValue(users as IUser[])

    const result = await userService.getAllUsers()

    expect(result).toEqual(users)
    expect(userRepositoryMock.findAll).toHaveBeenCalledTimes(1)
  })

  it("should be able to return a user by its ID", async () => {
    const user = { _id: "123", name: "John Doe", email: "john.doe@test.com" }

    userRepositoryMock.findById.mockResolvedValue(user as IUser)

    const result = await userService.getUserById("123")

    expect(result).toEqual(user)
    expect(userRepositoryMock.findById).toHaveBeenCalledTimes(1)
  })

  it("should be able to update a user", async () => {
    const updatedUser = {
      _id: "123",
      name: "John Doe",
      email: "john.update.doe@test.com",
    }

    userRepositoryMock.update.mockResolvedValue(updatedUser as IUser)

    const result = await userService.updateUser("123", {
      email: "john.update.doe@test.com",
    })

    expect(result).toEqual(updatedUser)
    expect(userRepositoryMock.update).toHaveBeenCalledTimes(1)
  })

  it("should be able to delete a user", async () => {
    const deletedUser = {
      _id: "123",
      name: "John Doe",
      email: "john.doe@test.com",
    }

    userRepositoryMock.delete.mockResolvedValue(deletedUser as IUser)

    const result = await userService.deleteUser("123")

    expect(result).toEqual(deletedUser)
    expect(userRepositoryMock.delete).toHaveBeenCalledTimes(1)
  })
})
