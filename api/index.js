const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./database/db");

//routes
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/note");

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/note", noteRoutes);

connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`));
