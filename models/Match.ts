import mongoose, { Schema, models } from "mongoose";

const MatchSchema = new Schema({
  donationId: { type: Schema.Types.ObjectId, ref: "Donation", required: true },
  nonprofitId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  score: { type: Number, required: true }, // matching score from algorithm
  distanceKm: Number,
  status: { type: String, enum: ["suggested", "requested", "accepted", "completed"], default: "suggested" },
}, { timestamps: true });

const Match = models.Match || mongoose.model("Match", MatchSchema);
export default Match;