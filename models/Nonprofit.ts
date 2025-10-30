import mongoose from "mongoose";

const NonprofitSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String },
    email: { type: String },
    description: { type: String },
    address: { type: String },
    phone: { type: String },
    website: { type: String },
    needs: [{ type: String }],
    verified: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Nonprofit ||
  mongoose.model("Nonprofit", NonprofitSchema);
