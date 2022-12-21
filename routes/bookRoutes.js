require("dotenv").config()

const express = require("express")
const router = express.Router()

// Connection with mysql
const connection = require("../db")

router.route("/")
    .post((req, res) => {
        const { title, author, page_count } = req.body

        const query = `INSERT INTO books (title, author, page_count) VALUES (?, ?, ?)`
        const data = [title, author, page_count]

        connection.query(query, data, (err) => {
            if (err) throw err
            res.redirect("/")
        })
    })

module.exports = router