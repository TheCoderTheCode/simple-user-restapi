import { Router } from "express"
import { UserController } from "@/controllers"
import { validate } from "@/middleware"
import { userSchema } from "@/schemas"

const router = Router()

const routes = (userController: UserController) => {
  router.get("/users", userController.getAllUsers.bind(userController))
  router.get("/users/:id", userController.getUserById.bind(userController))
  router.post(
    "/users",
    validate(userSchema),
    userController.createUser.bind(userController),
  )
  router.patch(
    "/users/:id",
    validate(userSchema),
    userController.updateUser.bind(userController),
  )
  router.delete("/users/:id", userController.deleteUser.bind(userController))

  return router
}

export default routes
