import { MongoUserRepository } from "@/repositories"
import { User } from "@/models"

jest.mock("@/models/userModel")

describe("MongoUserRepository", () => {
  let userRepository: MongoUserRepository

  beforeAll(() => {
    userRepository = new MongoUserRepository()
  })

  it("should be able to create a user", async () => {
    const userData = {
      name: "John Doe",
      email: "john.doe@test.com",
      _id: "123",
    }

    ;(User.prototype.save as jest.Mock).mockResolvedValue(userData)

    const result = await userRepository.create(userData)

    expect(result).toEqual(userData)
    expect(User.prototype.save).toHaveBeenCalledTimes(1)
  })

  it("should be able to retrieve all users", async () => {
    const users = [
      { _id: "123", name: "John Doe", email: "john.doe@test.com" },
      { _id: "124", name: "Jane Doe", email: "jane.doe@test.com" },
    ]

    const findMock = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(users),
    })

    ;(User.find as jest.Mock) = findMock

    const result = await userRepository.findAll()

    expect(result).toEqual(users)
    expect(findMock).toHaveBeenCalledTimes(1)
    expect(findMock().exec).toHaveBeenCalledTimes(1)
  })

  it("should be able to find a user by its ID", async () => {
    const user = { _id: "123", name: "John Doe", email: "john.doe@test.com" }

    const findByIdMock = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(user),
    })

    ;(User.findById as jest.Mock) = findByIdMock

    const result = await userRepository.findById("123")

    expect(result).toEqual(user)
    expect(findByIdMock).toHaveBeenCalledTimes(1)
    expect(findByIdMock().exec).toHaveBeenCalledTimes(1)
  })

  it("should be able to update user", async () => {
    const updatedUser = {
      _id: "123",
      name: "John Doe",
      email: "john.update.doe@test.com",
    }

    const findByIdAndUpdateMock = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(updatedUser),
    })

    ;(User.findByIdAndUpdate as jest.Mock) = findByIdAndUpdateMock

    const result = await userRepository.update("123", {
      email: "john.updated.doe@test.com",
    })

    expect(result).toEqual(updatedUser)
    expect(findByIdAndUpdateMock).toHaveBeenCalledTimes(1)
    expect(findByIdAndUpdateMock().exec).toHaveBeenCalledTimes(1)
  })

  it("should be able to delete a user", async () => {
    const deletedUser = {
      _id: "123",
      name: "John Doe",
      email: "john.doe@test.com",
    }

    const findByIdAndDeleteMock = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(deletedUser),
    })

    ;(User.findByIdAndDelete as jest.Mock) = findByIdAndDeleteMock

    const result = await userRepository.delete("123")

    expect(result).toEqual(deletedUser)
    expect(findByIdAndDeleteMock).toHaveBeenCalledTimes(1)
    expect(findByIdAndDeleteMock().exec).toHaveBeenCalledTimes(1)
  })
})
