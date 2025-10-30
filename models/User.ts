import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // only for credentials auth
  role: { type: String, enum: ["donor", "nonprofit", "admin"], default: "donor" },
  organization: { type: String },
  location: { type: String },
  verified: { type: Boolean, default: false },
}, { timestamps: true });

const User = models.User || mongoose.model("User", UserSchema);
export default User;