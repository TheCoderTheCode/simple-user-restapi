import express, { Request, Response } from "express"
import mongoose from "mongoose"
import { StatusCodes } from "http-status-codes"

import "dotenv/config"

const app = express()

// Default middleware to show a Hello World message
app.get("/", (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send("<h1>Hello World!</h1>")
})

const main = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL!)

    app.listen(process.env.PORT, () =>
      console.log(`[server]: server is running on port ${process.env.PORT}`),
    )
  } catch (error) {
    console.error(error)
  }
}

main()
