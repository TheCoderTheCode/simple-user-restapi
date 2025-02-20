import { Router } from "express"
import { UserController } from "@/controllers"
import { validate } from "@/middleware"
import { userSchema } from "@/schemas"
import { auth } from "@/middleware"

const router = Router()

const routes = (userController: UserController) => {
  router.get("/users", auth, userController.getAllUsers.bind(userController))
  router.get(
    "/users/:id",
    auth,
    userController.getUserById.bind(userController),
  )
  router.post(
    "/users",
    auth,
    validate(userSchema),
    userController.createUser.bind(userController),
  )
  router.patch(
    "/users/:id",
    auth,
    validate(userSchema),
    userController.updateUser.bind(userController),
  )
  router.delete(
    "/users/:id",
    auth,
    userController.deleteUser.bind(userController),
  )

  return router
}

export default routes
