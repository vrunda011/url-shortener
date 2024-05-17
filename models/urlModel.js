const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema(
  {
    FullUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const URL = mongoose.model("url", URLSchema);
module.exports = URL;
