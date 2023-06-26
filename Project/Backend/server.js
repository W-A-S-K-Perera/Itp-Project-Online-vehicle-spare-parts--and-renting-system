const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./Routes/userRoutes"); 
const employeeRoute = require("./Routes/employeeRoute")
const productRoute = require("./Routes/productRoute");
const billRoute = require ("./Routes/billRoute")
const errorHandler = require("./middleware/errorMiddleware");
const pendingBillEmailRoute = require ("./Routes/sendEmailRoute");

const inventoryItemRoute = require("./Routes/inventoryItemRoute");

const supplierRoute = require("./routes/supplierRoute");
const supplyRoute = require("./routes/supplyRoute");

const cookieParser = require("cookie-parser");
const path = require("path");

const app = express(); 

//middleware
app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({
  origin:["http://localhost:3000"],
  credentials:true,
}));
app.use("/profileImgEmp", express.static(path.join(__dirname, "profileImgEmp")))
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // user profile photo
app.use("/uploads", express.static("uploads"));



app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoute);
app.use ("/api/utility", billRoute);

app.use('/api', pendingBillEmailRoute);

app.use("/api/products", productRoute);
app.use("/api/InventoryItems", inventoryItemRoute);

app.use("/api/suppliers", supplierRoute);
app.use("/api/supplys", supplyRoute);



//routes
app.get("/", (req,res)=>{
    res.send("Home Page");
});

//error middleware
app.use(errorHandler);
mongoose.set('strictQuery', false);


const PORT = process.env.PORT || 5000;
//connecting to mongo DB
mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            app.listen(PORT, () =>{
                console.log("Connected to DB and Server running on port ", PORT)
            })
        })
        .catch((err) => console.log(err))
