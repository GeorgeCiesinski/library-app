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

// Uses desktop/browser color scheme by default
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
    this.title = title;
    this.isdn = isdn;
    this.read = read;
}

// Adds book to library
book.prototype.addToLibrary = function() {
    library.push(this);
    console.log(library);
}

// Removes book from library
book.prototype.removeFromLibrary = function() {
    // Remove
}

// Gets submitted data from form
function getData(form) {
    const formData = new FormData(form);
    return Object.fromEntries(formData);
}

// Adds event listener for submit event
formBookInfo.addEventListener("submit", function(e) {
    e.preventDefault();
    const formObject = getData(e.target);
    // console.log(formObject);
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