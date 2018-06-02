(function IIFE() {
  class Book {
    constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
    }
  }

  class UI {
    // Add book to list
    addBookToList(book) {
      const list = document.querySelector("#book-list");
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href='#' class='delete'>X</a></td>`;

      list.appendChild(row);
    }

    // Delete book from list
    deleteFromBookList(target) {
      if (target.classList.contains("delete")) {
        // remove parent element
        target.parentElement.parentElement.remove();
      }
    }

    // Show Alert
    showAlert(message, className) {
      // Create a div
      const div = document.createElement("div");
      // Set class Attribut
      div.className = `alert ${className}`;
      // Set text node
      div.appendChild(document.createTextNode(message));
      // Get Parent
      const container = document.querySelector(".container");
      // Get Form
      const form = document.querySelector("#book-form");
      // Insert Alert
      container.insertBefore(div, form);
      // Set timer
      setTimeout(() => div.remove(), 2000);
    }

    // Clear form fields
    clearFields() {
      document.querySelector("#title").value = "";
      document.querySelector("#author").value = "";
      document.querySelector("#isbn").value = "";
    }
  }

  // Local Storage class
  class Store {
    static getBooks() {
      let books;
      if (localStorage.getItem("books") === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem("books"));
      }
      return books;
    }

    static displayBooks() {
      const books = Store.getBooks();
      const ui = new UI();
      books.forEach(book => {
        //Add book to UI
        ui.addBookToList(book);
      });
    }

    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem("books", JSON.stringify(books));
    }

    static removeBook(isbn) {
      const books = Store.getBooks();
      books.forEach((book, index) => {
        if (book.isbn === isbn) {
          books.splice(index, 1);
        }
      });
      localStorage.setItem("books", JSON.stringify(books));
    }
  }

  //DOM Load Event
  document.addEventListener("DOMContentLoaded", Store.displayBooks());

  //Event Listener for add Book
  document.querySelector("#book-form").addEventListener("submit", e => {
    // Prevent Default submit behaviour
    e.preventDefault();
    // Get form values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;
    // Instantiating Book
    const book = new Book(title, author, isbn);
    // Instantiating UI
    const ui = new UI();
    // Validate form inputs
    if (title === "" || author === "" || isbn === "") {
      // Error Alert
      ui.showAlert("Please fill out all fields", "error");
    } else {
      // Add book to list
      ui.addBookToList(book);
      //Add book to Local Storage
      Store.addBook(book);
      // Success Alert
      ui.showAlert("Successfully Added", "success");
      // Clear form fields
      ui.clearFields();
    }
  });

  //Event Listener for delete book
  document.querySelector("#book-list").addEventListener("click", e => {
    e.preventDefault();
    // Instantiate UI
    const ui = new UI();
    // delete from Booklist
    ui.deleteFromBookList(e.target);

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show Alert
    ui.showAlert("Successfully removed", "success");
  });
})
