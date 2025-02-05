import mongoose, { Schema } from "mongoose"
import { IUser } from "@/types"

const userSchema = new Schema<IUser>({
  name: { type: String },
  email: { type: String, required: true },
  emailVerified: { type: Boolean, default: false },
  password: { type: String, required: true },
})

export const User = mongoose.model<IUser>("User", userSchema)
