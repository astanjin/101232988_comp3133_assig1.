const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
    type: String,
    required: [true, 'Please enter user name'],
    unique: [true, "Duplicate username Not allowed"],
    trim: true,
    lowercase: true
    },
  firstname: {
    type: String,
    required: [true, 'Please enter first name'],
    trim: true,
    lowercase: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    unique :true 
  },
  password: {
    type: String,
    required: true,
    select:false,
    match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/,
      "Enter valid password with upper,lower case letters,number and special characters"]
  },
  type:{
    type: String,
    required: true,
    enum:['admin','customer']
  },
  
},
{ timestamps: true }
);
const User = mongoose.model("User", UserSchema);
module.exports = User;