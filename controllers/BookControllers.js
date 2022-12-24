// Connection with Mysql
const connection = require("../db")

module.exports = class BookControllers {
  static async showBooks(req, res) {
    const query = `SELECT * FROM books`
    connection.query(query, (err, results) => {
      if (err) throw err
      res.render("book/books", { books: results })
    })
  }
  static showCreateBook(req, res) {
    res.render("book/create-book", { book: {}, btnText: "Adicionar" })
  }

  static async createBook(req, res) {
    const { title, author, page_count } = req.body

    const query = `INSERT INTO books (title, author, page_count) VALUES (?, ?, ?)`
    const data = [title, author, page_count]

    connection.query(query, data, (err) => {
      if (err) throw err
      res.redirect("/books")
    })
  }

  static async showBook(req, res) {
    const { bookId } = req.params

    const query = `SELECT * FROM books WHERE id = ?`

    connection.query(query, [bookId], (err, results) => {
      if (err) throw err
      res.render("book/show-book", { book: results[0] })
    })
  }

  static async deleteBook(req, res) {
    const { bookId } = req.params

    const query = `DELETE FROM books WHERE id = ?`

    connection.query(query, [bookId], (err) => {
      if (err) throw err
      res.redirect("/books")
    })
  }

  static async showEditBook(req, res) {
    const { bookId } = req.params

    const query = `SELECT * FROM books WHERE id = ?`
    connection.query(query, [bookId], (err, results) => {
      if (err) throw err
      res.render("book/book-edit", { book: results[0], btnText: "Atualizar" })
    })
  }

  static async updateBook(req, res) {
    const { id: bookId, title, author, page_count } = req.body
    const query = `UPDATE books SET title = ?, author = ?, page_count = ? WHERE id = ?`
    const data = [title, author, page_count, bookId]

    connection.query(query, data, (err) => {
      if (err) throw err
      res.redirect("/books")
    })
  }
}