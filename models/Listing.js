const mongoose = require("mongoose")

const ListingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    listing_title: {
      type: String,
      required: true,
    },
    listing_description: {
      type: String,
      required: true,
    },
     street: {
      type: String,
      required: true,
    },
     city: {
      type: String,
      required: true,
      lowercase: true
    },
     postal_code: {
      type: String,
      required: true,
    },
     price: {
      type: Number,
      required: true,
    },
     email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)
 const Listing = mongoose.model("Listing", ListingSchema)
module.exports = Listing
