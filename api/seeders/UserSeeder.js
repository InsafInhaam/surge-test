const User = require("../models/user");
const connectDB = require("../database/db");

connectDB();

const user = new User({
  firstName: "Admin",
  lastName: "Admin",
  email: "admin123@user.com",
  dateOfBirth: "05/10/2003",
  mobile: 789056342,
  status: "single",
  password: "admin1234",
  accountType: 0,
});

user.save();
