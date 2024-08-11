import { TUser } from "./user.interface";
import { User } from "./user.mode";

const createUserFromDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find({});
  return result;
};

const getSingleUserFromDb = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const udpateUserFromDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload);
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
      useFindAndModify: false,
    },
  );
  return result;
};

export const UserService = {
  createUserFromDB,
  getAllUsersFromDB,
  getSingleUserFromDb,
  udpateUserFromDB,
  deleteUserFromDB,
};
