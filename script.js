//Constructor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

//Display constructor
function Display() {}
//
Display.prototype.add = function () {
  // console.log("adding to UI");
  // let book = new Book(name, author, type);
  let books = localStorage.getItem("books");
  if (books == null) {
    booksObj = [];
  } else {
    booksObj = JSON.parse(books);
  }
  let html = "";
  booksObj.forEach((element, index) => {
    html += `<tr class="bookhead bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700">
    <td class="py-4 px-6 bookname">${element.name}</td>
    <td class="py-4 px-6">${element.author}</td>
    <td class="py-4 px-6">${element.type}</td>
    <td class="py-4 px-6"><button" onclick="display.deletebook(${index})" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
    Delete
  </button></td>
  </tr>`;
  });
  let tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = html;
};
// Implement the clear function
Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

//Implement the validate function
Display.prototype.validate = function (book) {
  if (book.name.length < 2 || book.author.length < 2 || book.type.checked) {
    return false;
  } else {
    return true;
  }
};
Display.prototype.show = function (type, message) {
  let alert = document.getElementById("alert");
  alert.innerHTML = ` <div
  class=" ${type}"
  role="alert"
  >
  <p>${message}</p>
  </div>`;
  setTimeout(() => {
    alert.innerHTML = "";
  }, 2000);
};

//delete function
Display.prototype.deletebook = function (index) {
  console.log("this is delete function");
  let books = localStorage.getItem("books");
  if (books == null) {
    booksObj = [];
  } else {
    booksObj = JSON.parse(books);
  }
  booksObj.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(booksObj));
  display.add();
};

//Add submit event listenter to the libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let type;
  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let cooking = document.getElementById("cooking");

  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else {
    type = cooking.value;
  }

  let book = new Book(name, author, type);
  let books = localStorage.getItem("books");
  if (books == null) {
    booksObj = [];
  } else {
    booksObj = JSON.parse(books);
  }
  let obj = {
    name: name,
    author: author,
    type: type,
  };
  booksObj.push(obj);
  localStorage.setItem("books", JSON.stringify(booksObj));
  // console.log("You have submitted library form");
  // console.log(book);

  let display = new Display();
  if (display.validate(book)) {
    display.add();
    display.clear();
    display.show("success", "Success! your book is successfully added");
  } else {
    //show error to the User
    display.show("danger", "Sorry! your book is not added");
  }
  e.preventDefault();
}
let display = new Display();
display.add();
//todos"
//1.store all the data to the localStorage
//2.Give another column as an option to delete the book
//3.Add a scroll bar to the view

//delete function
let search = document.getElementById("searchTxt");
search.addEventListener("input", () => {
  let inputVal = search.value.toLowerCase();
  //   console.log("input event fired", inputVal);
  let bookhead = document.getElementsByClassName("bookhead");
  // console.log(bookhead);
  Array.from(bookhead).forEach((element) => {
    let bookname = element.getElementsByTagName("td")[0].innerText;
    // console.log(bookname);
    if (bookname.includes(inputVal)) {
      element.style.display = "";
    } else {
      element.style.display = "none";
    }
  });
});
class Library {
  constructor(bookList) {
    this.bookList = bookList;
    this.issuedBooks = {};
  }
  getBookList() {
    this.bookList.forEach((element) => {
      console.log(element);
    });
  }
  issueBook(bookname, user) {
    if (this.issuedBooks[bookname] == undefined) {
      this.issuedBooks[bookname] = user;
    } else {
      console.log("this book is already issued!");
    }
  }
  returnBook(bookname) {
    delete this.issuedBooks[bookname];
  }
}
//success
