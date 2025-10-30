import mongoose, { Schema, models } from "mongoose";

const DonationSchema = new Schema({
  donorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  quantity: { type: Number, default: 1 },
  photoUrl: String,
  location: { type: String, required: true },
  status: { type: String, enum: ["open", "claimed", "completed"], default: "open" },
}, { timestamps: true });

const Donation = models.Donation || mongoose.model("Donation", DonationSchema);
export default Donation;