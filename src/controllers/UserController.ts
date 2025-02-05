import { Request, Response } from "express"
import { IUserService } from "@/types"
import { StatusCodes } from "http-status-codes"

export default class UserController {
  constructor(private readonly userService: IUserService) {}

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers()
      res.status(StatusCodes.OK).json(users)
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong!", error: error })
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    try {
      const user = await this.userService.getUserById(id)
      if (!user) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "User not found." })
        return
      }

      res.status(StatusCodes.OK).json(user)
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong!", error: error })
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body
    try {
      const newUser = await this.userService.createUser({
        name,
        email,
        password,
      })
      res.status(StatusCodes.CREATED).json({ id: newUser._id })
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong!", error: error })
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const { name, email, emailVerified, password } = req.body

    try {
      const updatedUser = await this.userService.updateUser(id, {
        name,
        email,
        emailVerified,
        password,
      })
      if (!updatedUser) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "User not found. Impossible to update." })
        return
      }

      res.status(StatusCodes.OK).json({ id: updatedUser._id })
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong!", error: error })
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params
    try {
      const deletedUser = await this.userService.deleteUser(id)
      if (!deletedUser) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Could not delete. User not found." })
        return
      }

      res.status(StatusCodes.OK).json({ id: deletedUser._id })
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong!", error: error })
    }
  }
}
