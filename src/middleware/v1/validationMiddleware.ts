import { Request, Response, NextFunction } from "express"
import { z, ZodError, ZodIssue } from "zod"
import { StatusCodes } from "http-status-codes"

export default function validate(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: z.ZodObject<any, any>,
  property?: string,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[(property as keyof Request) || "body"])
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: ZodIssue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }))
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Invalid data", errors: errorMessages })
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Something went wrong." })
      }
    }
  }
}
