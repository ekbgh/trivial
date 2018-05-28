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
    setTimeout(() => div.remove(), 3000);
  }

  // Clear form fields
  clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

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
  // delte from Booklist
  ui.deleteFromBookList(e.target);
  // Show Alert
  ui.showAlert("Successfully removed", "success");
});
