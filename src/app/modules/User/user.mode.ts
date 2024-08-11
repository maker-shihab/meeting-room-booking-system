import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 4,
      select: false,
    },
    phone: {
      type: Number,
      required: [true, "Please enter a valid phone number"],
      minlength: 10,
      maxlength: 15,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

userSchema.statics.isUserEsists = async function (id: string) {
  const existingUser = await this.findById(id);
  return !!existingUser;
};

export const User = model<TUser, UserModel>("User", userSchema);
