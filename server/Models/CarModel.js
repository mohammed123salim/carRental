import mongoose from "mongoose";

const CarSchema = mongoose.Schema({
  carName: { 
    type: String,
     required: true 
    },
  carBrand: { 
    type: String,
     required: true
     },
  modelYear: {
     type: Number,
      required: true
     },
  plateNum: {
      type: String,
       required: true,
       unique: true,
      },   
  transmission: {
     type: String,
      required: true
     },
  fuelType: {
     type: String,
      required: true
     },
  imageUrl: {
     type: String 
    },
  pricePerDay: { 
    type: Number,
     required: true 
    },
});

const CarModel = mongoose.model("cars", CarSchema);
export default CarModel;
