import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import express from "express";
import multer from 'multer';
import UserModel from "./Models/UserModel.js";
import CarModel from "./Models/CarModel.js";
import BookingModel from "./Models/BookModel.js";
import * as ENV from "./config.js";

const app = express();

// CORS middleware
const corsOptions = {
  origin: ENV.CLIENT_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());


app.use('/uploads', express.static('uploads'));

//  Setup Multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

//  MongoDB Connection
//const /connectString = "mongodb+srv://admin:admin@carrentalcluster.earyxfz.mongodb.net/CarRentalDB";
const connectString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}`;

mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//  Register User 
app.post("/registerUser", async (req, res) => {
  try {
    const { name, email, address, phone, age, password, role } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      address,
      phone,
      age,
      password: hashedpassword,
      role: role || "customer", // default to customer
    });

    await user.save();
    res.send({ user, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

//  Login — return user with role
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) return res.status(500).json({ error: "User not found." });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: "Authentication failed" });

    // Include role in response
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "Success.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Add Car
app.post("/addCar", upload.single("imageFile"), async (req, res) => {
  try {
    const { carName, carBrand, modelYear,plateNum, transmission, fuelType, pricePerDay } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const car = new CarModel({
      carName,
      carBrand,
      modelYear,
      plateNum,
      transmission,
      fuelType,
      pricePerDay,
      imageUrl,
    });

    await car.save();
    res.status(201).json({ message: "Car added successfully", car });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get All Cars
app.get("/getCars", async (req, res) => {
  try {
    const cars = await CarModel.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Car
app.delete("/deleteCar/:id", async (req, res) => {
  try {
    await CarModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting car" });
  }
});


app.get("/getCar/:id", async (req, res) => {
  try {
    const car = await CarModel.findById(req.params.id);
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: "Car not found" });
  }
});


app.put("/updateCar/:id", async (req, res) => {
  try {
    const updatedCar = await CarModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCar);
  } catch (error) {
    res.status(500).json({ error: "Failed to update car" });
  }
});


app.get("/getUsers", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


app.delete("/deleteUser/:id", async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});





app.post("/bookCar", async (req, res) => {
  const { carId, pickupDate, returnDate } = req.body;

  try {
    // Check for overlapping bookings for the same car
    const overlapping = await BookingModel.findOne({
      carId,
      $or: [
        {
          pickupDate: { $lte: new Date(returnDate) },
          returnDate: { $gte: new Date(pickupDate) }
        }
      ]
    });

    if (overlapping) {
      return res.status(400).json({ message: "Car is already booked for the selected dates." });
    }

    const booking = new BookingModel(req.body);
    await booking.save();
    res.status(201).send("Booking saved");
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).send("Failed to save booking");
  }
});



app.get("/getBookings/:email", async (req, res) => {
  try {
    const bookings = await BookingModel.find({ userEmail: req.params.email });
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).send("Failed to fetch bookings");
  }
});



app.put("/updateBookingStatus/:id", async (req, res) => {
  const { status } = req.body;

  try {
    const booking = await BookingModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).send("Booking not found");
    }

    res.status(200).send("Status updated");
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).send("Failed to update status");
  }
});



app.get("/getAllBookings", async (req, res) => {
  try {
    const bookings = await BookingModel.find();
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    res.status(500).send("Failed to fetch bookings");
  }
});



// Get Available Cars based on Pickup/Return Dates
app.get("/getAvailableCars", async (req, res) => {
  try {
    const { pickup, return: returnDate } = req.query;

    if (!pickup || !returnDate) {
      return res.status(400).json({ message: "Pickup and return dates are required." });
    }

    // Find bookings overlapping with requested dates
    const overlappingBookings = await BookingModel.find({
      $or: [
        {
          pickupDate: { $lte: new Date(returnDate) },
          returnDate: { $gte: new Date(pickup) }
        }
      ]
    });

    const bookedCarIds = overlappingBookings.map(booking => booking.carId.toString());

    // Find cars NOT in bookedCarIds
    const availableCars = await CarModel.find({
      _id: { $nin: bookedCarIds }
    });

    res.json(availableCars);
  } catch (error) {
    console.error("Error fetching available cars:", error);
    res.status(500).send("Failed to fetch available cars");
  }
});




const port = ENV.PORT || 3001;
app.listen(port, () => {
console.log(`You are connected at port: ${port}`);


});
