const express= require("express");
const  cors = require("cors");
const dotenv= require("dotenv");
const connectDB = require('./config/db');
const authRoutes= require("./routes/auth");
//load environmnet variablews
dotenv.config();

//connect to mongodb
connectDB();

//create express app

const app= express();


//Middleware
app.use(cors());
app.use(express.json());



//routes
app.get("/",(req,res)=>res.send("api is running"));
app.use("/api/auth", require("./routes/auth"));   // signup/login
app.use("/api/test", require("./routes/test"));   // protected test route

app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/apply", require("./routes/apply"));

const profileRoutes = require("./routes/profileRoutes");
app.use("/api/profile", profileRoutes);
// Employer applications routes
app.use("/api/employer", require("./routes/employerRoutes"));


const dashboardRoutes = require("./routes/dashboardRoute");
app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/resume", require("./routes/resumeRoutes"));


// Resume download
app.use("/uploads", express.static("uploads"));
//start server
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>
console.log(`Server is running on Port ${PORT}`));
