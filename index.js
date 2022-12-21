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
    res.render("home")
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))