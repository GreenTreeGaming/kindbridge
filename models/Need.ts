import mongoose, { Schema, models } from "mongoose";

const NeedSchema = new Schema({
  nonprofitId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  urgency: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  quantity: { type: Number, default: 1 },
  description: String,
  status: { type: String, enum: ["open", "fulfilled"], default: "open" },
}, { timestamps: true });

const Need = models.Need || mongoose.model("Need", NeedSchema);
export default Need;