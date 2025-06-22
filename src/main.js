const express = require("express")
const { connectDB } = require("./db/mongoDB")
const { userRoute,
        postRoute,
        postImagesRoute,
        commentRoute,
        tagRoute,
        commentTagRoute } = require("./routes")
require('dotenv').config()
const app = express()
const PORT = process.env.PORT ?? 5050

app.use(express.json())
app.use("/users", userRoute)
app.use("/post", postRoute)
app.use("/post-images", postImagesRoute)
app.use("/comments", commentRoute)
app.use("/tags", tagRoute)
app.use("/comment-tags", commentTagRoute)

app.listen(PORT, async (error) => {
  if (error) {
    console.log(error.message)
    process.exit(1)
  }
  try {
    await connectDB()
  } catch (dbError) {
    console.log(dbError.message)
    process.exit(1)
  }
  console.log(`App iniciada en http://0.0.0.0:${PORT}`)
})
