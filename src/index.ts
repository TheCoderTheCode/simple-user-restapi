import express, { Application, Request, Response } from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import { StatusCodes } from "http-status-codes"

import "dotenv/config"

const app: Application = express()

/**
 * Body Parser Middleware to format json content
 * Content-Type: application/json
 */
app.use(bodyParser.json())

/**
 * CORS configuration and allowed methods and headers definition
 */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  next()
})

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
