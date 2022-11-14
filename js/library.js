/*
Dark Mode
*/

const darkModeToggle = document.querySelector(".toggle-switch>label>input");

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
    }
}

darkModeToggle.addEventListener("change", switchTheme);

// Use desktop/browser color scheme by default
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    darkModeToggle.checked = true;
    document.documentElement.setAttribute("data-theme", "dark");
}

/*
Modal
*/
const modal = document.querySelector("#book-modal");
const btnAddBook = document.querySelector("#add-book");
const btnClose = document.querySelector("#close");
const inputTitle = document.querySelector("#title");
const inputIsdn = document.querySelector("#isdn");
const inputRead = document.querySelector("#read");

// Clears modal form inputs upon close
function clearInputs() {
    inputTitle.value = "";
    inputIsdn.value = "";
    inputRead.checked = false;
}

// Show modal
btnAddBook.addEventListener("click", function() {
    modal.style.display = "block";
});

// Hide modal
function hideModal() {
    modal.style.display = "none";
    clearInputs();
}

// Hide modal when close clicked
btnClose.addEventListener("click", function() {
    hideModal();
});

// Hide modal when outside modal clicked
window.addEventListener("click", function(e) {
    if (e.target == modal) {
        hideModal();
    }
});

/*
Library
*/

const formBookInfo = document.querySelector("#book-info");

let library = [];  // Library array

// Book object constructor
function book(title, isdn, read) {
    
    if (title != "undefined" && isdn != "") {
        this.title = title;
    } else {
        this.title = "";
    }
    
    if (isdn != "undefined" && isdn != "") {
        this.isdn = isdn;
    } else {
        this.isdn = "";
    }

    if (read != "0") {
        this.read = true;
    } else {
        this.read = false;
    }
}

// Adds book to library
book.prototype.addToLibrary = function() {
    library.push(this);
    updateBookshelf();
}

const bookShelf = document.querySelector("#book-shelf");

// Removes all bookshelf children
function clearBookshelf() {
    while (bookShelf.firstChild) {
        bookShelf.removeChild(bookShelf.lastChild);
    }
}

// Builds bookshelf from array items
function updateBookshelf() {

    clearBookshelf();

    for (i=0; i<library.length; i++) {
        createBookElement(i);
    }
    
}

// Creates a new book element
function createBookElement(libraryIndex) {
    const newCard = document.createElement("div");
    const closeButton = document.createElement("button");
    
    closeButton.innerHTML = "Remove Book";
    closeButton.addEventListener("click", removeBook);
    newCard.appendChild(closeButton);
    newCard.setAttribute("lib-index", libraryIndex);
    newCard.classList.add("book");
    bookShelf.appendChild(newCard);
}

function removeBook(e) {
    const bookCard = this.parentNode;
    const bookIndex = bookCard.getAttribute("lib-index");
    library.splice(bookIndex, 1);
    updateBookshelf();
}

// Gets submitted data from form
function getData(form) {
    const formData = new FormData(form);
    return Object.fromEntries(formData);
}

// Get form data and preventDefault behavior
formBookInfo.addEventListener("submit", function(e) {
    e.preventDefault();  // Prevent form from submitting
    const formObject = getData(e.target);
    const newBook = new book(formObject.title, formObject.isdn, formObject.read);
    newBook.addToLibrary();
    hideModal();
});

/*
Copyright Message
*/

// Update copyright message in dom with current year
const copyrightMessage = document.querySelector("#copyright-message");
const currentYear = new Date().getFullYear();
copyrightMessage.innerHTML = `Copyright &copy ${currentYear} George Ciesinski`;