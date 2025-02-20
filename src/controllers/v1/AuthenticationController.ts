import { IUserService } from "@/types"
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export default class AuthenticationController {
  constructor(private readonly userService: IUserService) {}

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body

    try {
      const user = await this.userService.findOneBy("email", email)

      if (!user) {
        res.status(StatusCodes.FORBIDDEN).json({ message: "User not found" })
        return
      }

      const isEqual = await bcrypt.compare(password, user.password)

      if (!isEqual) {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Invalid credentials." })
      }

      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECURE_HASH!,
        {
          expiresIn: "1h",
        },
      )

      res.status(StatusCodes.OK).json({ token: token, id: user.id })
    } catch (error) {
      console.error(error)
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong!", error: error })
    }
  }

  async signup(req: Request, res: Response): Promise<void> {
    const { email, name, password } = req.body

    try {
      const user = await this.userService.findOneBy("email", email)

      if (user) {
        res.status(StatusCodes.CONFLICT).json({
          error: "Email already in use",
          message:
            "The email you entered is already associated with an account.",
        })
        return
      }

      const hashPassword = await bcrypt.hash(password, 12)

      const newUser = await this.userService.createUser({
        name,
        email,
        password: hashPassword,
      })

      res
        .status(StatusCodes.CREATED)
        .json({ message: "User created successfully", id: newUser._id })
    } catch (error) {
      console.error(error)
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong!", error: error })
    }
  }
}
