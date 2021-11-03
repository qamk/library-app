function Book(title, author, numPages, read) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.read = read;
}

Book.prototype.info = function () {
    let readText = this.read ? "You have read this book" : "Book not yet read"
    return this.title + " is written by " + this.author + ", " + numPages + ". " + readText
}

const myBook = new Book('Foo', 'Bar', 1, true)