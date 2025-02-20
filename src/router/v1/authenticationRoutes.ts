import { AuthenticationController } from "@/controllers"
import { Router } from "express"
import { authSchema } from "@/schemas"
import { validate } from "@/middleware"

const router = Router()

const routes = (authenticationController: AuthenticationController) => {
  router.post(
    "/login",
    validate(authSchema.loginSchema),
    authenticationController.login.bind(authenticationController),
  )
  router.put(
    "/signup",
    validate(authSchema.signupSchema),
    authenticationController.signup.bind(authenticationController),
  )
  return router
}

export default routes
