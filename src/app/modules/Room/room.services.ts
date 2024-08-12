import { TRoom } from "./room.interface";
import { Room } from "./room.model";

const createRoomFromDB = async (payload: TRoom) => {
  const result = await Room.create(payload);
  return result;
};

const getAllRoomsFromDB = async () => {
  const result = await Room.find({});
  return result;
};
export const RoomService = {
  createRoomFromDB,
  getAllRoomsFromDB,
};
