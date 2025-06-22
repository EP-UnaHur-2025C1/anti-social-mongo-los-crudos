const mongoose = require("mongoose")
require('dotenv').config()
const MONGO_URL =
  process.env.MONGO_URI

let isConnected
const connectDB = async () => {
  if (!isConnected) {
    try {
      await mongoose.connect(MONGO_URL)
      console.log("conexion con Mongo exitosa")
      isConnected = true
    } catch (error) {
      console.log(error.message)
    }
  }
}

module.exports = { mongoose, connectDB }