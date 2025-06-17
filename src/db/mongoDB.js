const mongoose = require("mongoose")
const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb://root:example@localhost:27017/antiSocial?authSource=admin"

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