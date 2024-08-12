import { z } from "zod";

const roomValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    roomNo: z.number({
      required_error: "Room number is required!",
    }),
    capacity: z.number(),
    pricePerSlot: z.number(),
    amenities: z.number(),
    isDeleted: z.boolean(),
  }),
});

export const RoomValidation = {
  roomValidationSchema,
};
