import express, { Request, Response } from "express"
import "dotenv/config"
import { StatusCodes } from "http-status-codes"

const app = express()

// Default middleware to show a Hello World message
app.get("/", (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send("<h1>Hello World!</h1>")
})

app.listen(process.env.PORT, () =>
  console.log(`[server]: server is running on port ${process.env.PORT}`),
)
