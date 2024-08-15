import { z } from "zod";

const roomValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    roomNo: z.number({
      required_error: "Room number is required!",
    }),
    floorNo: z.number({
      required_error: "Floor number is required!",
    }),
    capacity: z.number(),
    pricePerSlot: z.number(),
    amenities: z.array(z.string(), {
      required_error: "At least one amenity is required!",
    }),
    isDeleted: z.boolean().optional(),
  }),
});

export const RoomValidation = {
  roomValidationSchema,
};
