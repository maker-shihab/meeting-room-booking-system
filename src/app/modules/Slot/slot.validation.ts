import { z } from "zod";

const slotValidationSchema = z.object({
  body: z.object({
    room: z.string({
      required_error: "Room id is required",
    }),
    date: z.date({
      required_error: "Date is required",
    }),
    startTime: z.date({
      required_error: "Start Time is required",
    }),
    endTime: z.date({
      required_error: "End Time is required",
    }),
    isBooked: z.boolean(),
  }),
});

export const SlotValidation = {
  slotValidationSchema,
};
