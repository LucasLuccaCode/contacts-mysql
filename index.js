const express = require("express")
const exphbs = require("express-handlebars")

const app = express()
const PORT = 3000

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

const bookRoutes = require("./routes/bookRoutes")
app.use("/books", bookRoutes)

app.get("/", (req, res) => {
    res.redirect("/books")
})

app.use("*", (req, res) => {
    res.status(404).send("<h1>Page not found</h1>")
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))