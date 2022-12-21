require("dotenv").config()

const express = require("express")
const router = express.Router()

// Connection with Mysql
const connection = require("../db")

router.route("/")
    .get((req, res) => {
        const query = `SELECT * FROM books`
        connection.query(query, (err, results) => {
            if (err) throw err
            res.render("books", { books: results })
        })
    })
    .post((req, res) => {
        const { title, author, page_count } = req.body

        const query = `INSERT INTO books (title, author, page_count) VALUES (?, ?, ?)`
        const data = [title, author, page_count]

        connection.query(query, data, (err) => {
            if (err) throw err
            res.redirect("/books")
        })
    })


router.route("/:bookId")
    .post((req, res) => {
        const { bookId } = req.params

        const query = `DELETE FROM books WHERE id = ?`

        connection.query(query, [bookId], (err) => {
            if (err) throw err
            res.redirect("/books")
        })
    })

router.route("/:bookId/edit")
    .get((req, res) => {
        const { bookId } = req.params

        const query = `SELECT * FROM books WHERE id = ?`
        connection.query(query, [bookId], (err, results) => {
            if (err) throw err
            res.render("book-edit", { book: results[0], btnText: "Atualizar" })
        })
    })
    .post((req, res) => {
        const { id: bookId, title, author, page_count } = req.body
        const query = `UPDATE books SET title = ?, author = ?, page_count = ? WHERE id = ?`
        const data = [title, author, page_count, bookId]

        connection.query(query, data, (err) => {
            if (err) throw err
            res.redirect("/books")
        })
    })

module.exports = router