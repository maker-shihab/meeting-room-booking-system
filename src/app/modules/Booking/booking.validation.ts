import { z } from "zod";

const bookingValidationSchema = z.object({
  body: z.object({
    room: z.string(),
    slots: z.array(z.string()).min(1),
    user: z.string(),
    date: z.string(),
    totalAmount: z.number().positive().optional(),
    isConfirmed: z.enum(["confirmed", "unconfirmed", "canceled"]).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateBookingValidationSchema = z.object({
  body: z.object({
    room: z.string().optional(),
    slots: z.array(z.string()).optional(),
    user: z.string().optional(),
    date: z.string().optional(),
    totalAmount: z.number().positive().optional(),
    isConfirmed: z.enum(["confirmed", "unconfirmed", "canceled"]).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const BookingValidation = {
  bookingValidationSchema,
  updateBookingValidationSchema,
};
