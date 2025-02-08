import { z } from "zod"

export const userSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  emailVerified: z.boolean().optional(),
  password: z.string().min(8),
})
