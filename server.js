const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

//init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API RUNNING"));

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/product", require("./routes/api/product"));
app.use("/api/personalInfo", require("./routes/api/personalInfo"));
app.use("/api/cart", require("./routes/api/cart"));
app.use("/api/order", require("./routes/api/order"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
