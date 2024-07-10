import { z } from "zod";

// Example schema for a user record
const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  age: z.number().int().positive("Age must be a positive integer"),
});