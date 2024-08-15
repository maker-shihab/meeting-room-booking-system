import { z } from "zod";

const slotValidationSchema = z.object({
  body: z.object({
    room: z.string({
      required_error: "Room id is required",
    }),
    date: z.string({
      required_error: "Date is required",
    }),
    startTime: z.string({
      required_error: "Start Time is required",
    }),
    endTime: z.string({
      required_error: "End Time is required",
    }),
    isBooked: z.boolean().optional(),
  }),
});

export const SlotValidation = {
  slotValidationSchema,
};
