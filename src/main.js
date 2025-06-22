const express = require("express")
const { connectDB } = require("./db/mongoDB")
const { userRoute,
        postRoute,
        postImagesRoute,
        commentRoute,
        tagRoute,
        commentTagRoute } = require("./routes")
require('dotenv').config()
const swaggerUi = require("swagger-ui-express")
const YAML = require("yamljs")
const path = require("path")
const swaggerDocument = YAML.load(path.join(__dirname, "../swagger.yaml"))
const app = express()
const PORT = process.env.PORT ?? 5050

app.use(express.json())
app.use("/users", userRoute)
app.use("/post", postRoute)
app.use("/post-images", postImagesRoute)
app.use("/comments", commentRoute)
app.use("/tags", tagRoute)
app.use("/comment-tags", commentTagRoute)

// Configurar Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Anti-Social Network API Documentation"
}))

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
  console.log(`Documentación API disponible en http://localhost:${PORT}/api-docs`)
})
