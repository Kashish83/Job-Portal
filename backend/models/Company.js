const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    website: String,
    about: String,
    location: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
