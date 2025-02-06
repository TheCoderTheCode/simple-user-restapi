import { UserController } from "@/controllers"
import { IUser, IUserService } from "@/types"
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

jest.mock("@/types")

describe("UserController", () => {
  let userController: UserController
  let userServiceMock: jest.Mocked<IUserService>

  beforeAll(() => {
    userServiceMock = new (jest.fn(() => ({
      getAllUsers: jest.fn(),
      getUserById: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    })))() as jest.Mocked<IUserService>

    userController = new UserController(userServiceMock)
  })

  it("should be able to create a user", async () => {
    const user = { name: "John Doe", email: "john.doe@example.com" }
    const createdUser = { _id: "123", ...user }

    userServiceMock.createUser.mockResolvedValue(createdUser as IUser)

    const req = { body: user } as unknown as Request
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response

    await userController.createUser(req, res)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED)
    expect(res.json).toHaveBeenCalledWith({ id: "123" })
  })

  it("should responde with error 500 if throws any error while creating a user", async () => {
    const user = { name: "John Doe", email: "john.doe@example.com" }

    userServiceMock.createUser.mockRejectedValue(undefined)

    const req = { body: user } as unknown as Request
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response

    await userController.createUser(req, res)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it("should be able to retrieve all users", async () => {
    const users = [
      { _id: "123", name: "John Doe", email: "john.doe@test.com" },
      { _id: "124", name: "Jane Doe", email: "jane.doe@test.com" },
    ]

    userServiceMock.getAllUsers.mockResolvedValue(users as IUser[])

    const req = {} as Request
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response

    await userController.getAllUsers(req, res)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK)
    expect(res.json).toHaveBeenCalledWith(users)
  })

  it("should response with error 500 if throws any error while trying to retrieve all users", async () => {
    userServiceMock.getAllUsers.mockRejectedValue(undefined)

    const req = {} as Request
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response

    await userController.getAllUsers(req, res)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it("should be able to return a user by its ID", async () => {
    const user = { _id: "123", name: "John Doe", email: "john.doe@test.com" }

    userServiceMock.getUserById.mockResolvedValue(user as IUser)

    const req = { params: { id: "123" } } as unknown as Request
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response

    await userController.getUserById(req, res)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK)
    expect(res.json).toHaveBeenCalledWith(user)
  })

  it("should response with error 400 if do not found any user with the specific ID", async () => {
    userServiceMock.getUserById.mockResolvedValue(null)

    const req = { params: { id: "123" } } as unknown as Request
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response

    await userController.getUserById(req, res)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it("should response with error 500 if throws any error while trying to get the user by its ID", async () => {
    userServiceMock.getUserById.mockRejectedValue(undefined)

    const req = { params: { id: "123" } } as unknown as Request
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response

    await userController.getUserById(req, res)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it("should be able to update a user", async () => {
    const updatedUser = {
      _id: "123",
      name: "John Doe",
      email: "john.update.doe@test.com",
    }

    userServiceMock.updateUser.mockResolvedValue(updatedUser as IUser)

    const req = {
      params: { id: "123" },
      body: { email: "john.update.doe@test.com" },
    } as unknown as Request
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response

    await userController.updateUser(req, res)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK)
    expect(res.json).toHaveBeenCalledWith({ id: "123" })
  })

  it("should send a response with statusCode 400 if could not update the user", async () => {
    userServiceMock.updateUser.mockResolvedValue(null)

    const req = {
      params: { id: "123" },
      body: { email: "john.update.doe@test.com" },
    } as unknown as Request
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response

    await userController.updateUser(req, res)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it("should send a response with statusCode 500 if throws any error while trying to update a user", async () => {
    userServiceMock.updateUser.mockRejectedValue(undefined)

    const req = {
      params: { id: "123" },
      body: { email: "john.update.doe@test.com" },
    } as unknown as Request
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response

    await userController.updateUser(req, res)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it("should be able to delete a user", async () => {
    const deletedUser = {
      _id: "123",
      name: "John Doe",
      email: "john.doe@test.com",
    }

    userServiceMock.deleteUser.mockResolvedValue(deletedUser as IUser)

    const req = { params: { id: "123" } } as unknown as Request
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response

    await userController.deleteUser(req, res)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK)
    expect(res.json).toHaveBeenCalledWith({ id: "123" })
  })

  it("should send a response with statusCode 400 if could not delete the user", async () => {
    userServiceMock.deleteUser.mockResolvedValue(null)

    const req = { params: { id: "123" } } as unknown as Request
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response

    await userController.deleteUser(req, res)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it("should send a response with statusCode 500 if throws any error while trying to delete the user", async () => {
    userServiceMock.deleteUser.mockRejectedValue(undefined)

    const req = { params: { id: "123" } } as unknown as Request
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response

    await userController.deleteUser(req, res)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledTimes(1)
  })
})
