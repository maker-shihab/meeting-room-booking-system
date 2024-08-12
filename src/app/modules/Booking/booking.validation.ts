import { z } from "zod";

const bookingValidationSchema = z.object({
  body: z.object({
    roomId: z.string().uuid(),
    slots: z.array(z.string().uuid()).min(1),
    user: z.string().uuid(),
    date: z.date(),
    totalAmount: z.number().positive(),
    isConfirmed: z.enum(["confirmed", "unconfirmed", "canceled"]),
    isDeleted: z.boolean(),
  }),
});

export const BookingValidation = {
  bookingValidationSchema,
};
