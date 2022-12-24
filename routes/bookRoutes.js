require("dotenv").config()

const express = require("express")
const router = express.Router()

const BookControllers = require("../controllers/BookControllers")

router.get("/", BookControllers.showBooks)

router.route("/add")
    .get(BookControllers.showCreateBook)
    .post(BookControllers.createBook)


router.route("/:bookId")
    .get(BookControllers.showBook)
    .post(BookControllers.deleteBook)

router.route("/:bookId/edit")
    .get(BookControllers.showEditBook)
    .post(BookControllers.updateBook)

module.exports = router