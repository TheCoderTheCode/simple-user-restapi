import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers
  if (!authorization || !authorization.startsWith("Bearer ")) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized: No token provided" })
    return
  }

  const token = authorization?.split(" ")[1]

  try {
    const decodedToken = jwt.verify(
      token!,
      process.env.JWT_SECURE_HASH!,
    ) as unknown as {
      id: string
    }

    if (!decodedToken) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized: Invalid token" })
      return
    }

    req.userId = decodedToken.id
    next()
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong.", error: error })
  }
}
