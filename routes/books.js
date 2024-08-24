const express = require("express");
const { books } = require("../Data/books.json");
const { users } = require("../Data/user.json");

const router = express.Router();

/**
 * Route : /
 * Method : GET
 * Description : Getting all books
 * Access : Public
 * Parameters : None
 */

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Books fetched successfully",
    data: books,
  });
});

/**
 * Route : /:id
 * Method : GET
 * Description : Getting books by their Id
 * Access : Public
 * Parameters : Id
 */

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book doesn't exist",
    });
  } else {
    return res.status(200).json({
      success: true,
      message: "Book found",
      data: book,
    });
  }
});

/**
 * Route : /books/issued/by-user
 * Method : GET
 * Description : Get all issued books
 * Access : Public
 * Parameters : None
 */

router.get("/issued/by-user", (req, res) => {
  const usersWithTheIssuedBooks = users.filter((each) => {
    if (each.issuedBook) return each;
  });

  const issuedBooks = [];
  usersWithTheIssuedBooks.forEach((each) => {
    const book = books.find((book) => (book.id = each.issuedBook));

    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });
  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No books are issued",
    });
  }
  res.status(200).json({
    success: true,
    message: "Issued books fetched successfully",
    data: issuedBooks,
  });
});

/**
 * Route : /
 * Method : POST
 * Description : Adding new book
 * Access : Public
 * Parameters : None
 * data : id, name, author, genre, price, publisher
 */

router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No data provided",
    });
  }

  const book = books.find((each) => each.id === data.id);
  if (book) {
    return res.status(400).json({
      success: false,
      message: "Book already exist",
    });
  }
  const allBooks = { ...books, data };
  return res.status(201).json({
    success: true,
    message: "Book Added successfully",
    data: allBooks,
  });
});

/**
 * Route : /updateBook/:id
 * Method : PUT
 * Description : Updating a book by their Id
 * Access : Public
 * Parameters : Id
 * data : id, name, author, genre, price, publisher
 */

router.put("/updateBook/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(400).json({
      success: false,
      message: "Book Doesn't Exist",
    });
  }

  const updateData = books.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }

    return each;
  });

  return res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: updateData,
  });
});

module.exports = router;
