import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    email: z.string({
      required_error: "Email is required!",
    }),
    password: z.string({
      required_error: "Password must be at least 8 characters long",
    }),
    phone: z.string({}),
    role: z.enum(["admin", "user"]),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
