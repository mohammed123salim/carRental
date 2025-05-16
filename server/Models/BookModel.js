import mongoose from "mongoose";

const BookingSchema = mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cars",
    required: true,
  },
  carName: {
    type: String,
    required: true,
  },
  carBrand: {
    type: String,
    required: true,
  },
  modelYear: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  userEmail: {
    type: String,
    required: true,
  },
  pickupDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  totalDays: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "In Progress",
  },
  plateNum: {            
    type: String,
    required: true,
  },
});

const BookingModel = mongoose.model("bookings", BookingSchema);
export default BookingModel;
