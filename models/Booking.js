const mongoose = require("mongoose")

const BookingSchema = new mongoose.Schema(
  {
     userId: {
      type: String,
      required: true,
    },
     listingId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Booking =mongoose.model("Booking", BookingSchema)
module.exports = Booking