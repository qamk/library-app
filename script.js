let mylibrary = [];
const title = document.getElementById('book_title');
const author = document.getElementById('book_author');
const numPages = document.getElementById('book_pages');
const read = document.querySelector('input[type=radio]:checked').value;
const toggleFormButton = document.getElementById('toggle_form');
const submitButton = document.getElementById('new_book');
const table = document.getElementsByTagName('table')[0];

// Book constructor
function Book(title, author, numPages, read) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.read = read;
}

Book.prototype.info = function () {
    let readText = (this.read == 'Read') ? 'You have read this book' : 'Book not yet read';
    return this.title + ' is written by ' + this.author + ', ' + numPages + '. ' + readText;
}


function addBookToLibrary() {
  let mybook = new Book;
  mybook.title = title.value;
  mybook.author = author.value;
  mybook.numPages = +numPages.value;
  mybook.read = (read == 'yes') ? 'Read' : 'Not yet read';

  mylibrary.push(mybook);
  let index = mylibrary.length - 1;
  addBookToTable(mybook, index);
}

function addBookToTable(book, index) {
  let row = insertRow();
  for (let property in book) {
    let isRead = property === 'read';
    let isFunction = typeof(book[property]) === 'function';
    if (isRead) {
      let toggleReadButton = createButton('toggle-read', `${book[property]}`, index, toggleRead);
      row.insertCell(-1).append(toggleReadButton);
    }
    else if (!isFunction) {
      row.insertCell(-1).innerHTML = book[property];
    }
  }
  let deleteButton = createButton('delete-button', 'Remove Book', index, removeEntry)
  row.insertCell(-1).append(deleteButton);
}

function insertRow() {
  const tableBody = table.tBodies[0];
  let newRow = document.createElement("tr");
  return tableBody.appendChild(newRow);
}

function createButton(className, buttonText, index, event) {
  let button = document.createElement('button');
  button.setAttribute('class', className);
  button.setAttribute('data-index', index);
  button.innerHTML = buttonText;
  button.addEventListener('click', event);
  return button;
}

function toggleRead(event) {
  let button = event.target;
  let dataIndex = event.target.getAttribute('data-index');
  let oldButtonText = event.target.innerHTML;
  let newButtonText = (oldButtonText == 'Read') ? 'Not yet read' : 'Read';
  button.innerHTML = newButtonText;
  mylibrary[dataIndex].read = newButtonText;
}

function removeEntry(event) {
  let buttonRow = event.target.parentNode.parentNode;
  let dataIndex = event.target.getAttribute('data-index');
  updateSubsequentDataIndex(buttonRow);
  mylibrary.splice(dataIndex, 1);
  buttonRow.parentNode.removeChild(buttonRow);
}

function updateSubsequentDataIndex(row) {
  const startIndex = row.rowIndex - 1;
  const table = row.parentNode;
  let librarySize = mylibrary.length;
  // console.log(`start index: ${startIndex}\n library size: ${librarySize}`)
  for (let i=startIndex; i < librarySize; i++) {
    // console.log(`button class: ${cellChild(table.rows[i], 4, 0)}`);
    let buttons = cellChild(table.rows[i], 4, 0);
    let oldIndex = buttons.read.getAttribute('data-index');
    buttons.read.setAttribute('data-index', +oldIndex - 1);
    buttons.remove.setAttribute('data-index', +oldIndex - 1);
    // console.log(`old index: ${oldIndex}\nnew index: ${+oldIndex-1}`);
  }
}

function cellChild(row, cellIndex, childIndex) {
  // console.log(row)
  let buttons = { 
    read: row.cells[cellIndex - 1].childNodes[childIndex],
    remove: row.cells[cellIndex].childNodes[childIndex]
  }
  return buttons;
}

function toggleForm() {
  const formDiv = document.querySelector('#form_div');
  if (formDiv.style.display === 'block') {
    formDiv.style.display = 'none';
    toggleFormButton.innerHTML = 'Add new book';
  } else {
    formDiv.style.display = 'block';
    toggleFormButton.innerHTML = 'Hide form';
  }
}


toggleFormButton.addEventListener('click', toggleForm);
submitButton.addEventListener('click', function() {
  addBookToLibrary();
});

