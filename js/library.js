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
const inputIsbn = document.querySelector("#isbn");
const inputRead = document.querySelector("#read");

// Clears modal form inputs upon close
function clearInputs() {
    inputTitle.value = "";
    inputIsbn.value = "";
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

let library = [];  // Library array
const formBookInfo = document.querySelector("#book-info");
const bookShelf = document.querySelector("#book-shelf");

// Get form data and preventDefault behavior
formBookInfo.addEventListener("submit", function(e) {
    e.preventDefault();  // Prevent form from submitting
    const formObject = getData(e.target);
    console.log(formObject);
    const newBook = new book(formObject.title, formObject.isbn, formObject.read);
    newBook.addToLibrary();
    hideModal();
});

// Gets submitted data from form
function getData(form) {
    const formData = new FormData(form);
    return Object.fromEntries(formData);
}

// Book object constructor
function book(title, isbn, read) {

    if (title) {
        this.title = title;
    } else {
        this.title = "";
    }

    if (isbn) {
        this.isbn = isbn;
    } else {
        this.isbn = "";
    }

    this.read = (read == "1") ? true : false;

    // Null properties - updated later
    this.cover = null;
    this.data = null;
}

// Adds book to library
book.prototype.addToLibrary = async function() {

    if (this.isbn) {
        const url = "https://openlibrary.org/isbn/" + this.isbn + ".json";

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("OpenLibrary response was not ok.")
                }
                return response.json();
            })
            .then((bookData) => {
                this.title = bookData.title;
                this.cover = "https://covers.openlibrary.org/b/id/" + bookData.covers[0] + "-L.jpg"
                this.data = bookData;
                library.push(this);
                updateBookshelf();
            })
            .catch((error) => console.error("Failed to fetch book data:", error));
    } else {
        library.push(this);
        updateBookshelf();
    }
    
}

// Builds bookshelf from array items
function updateBookshelf() {
    // Clear existing elements from bookshelf
    clearBookshelf();
    // Iterate through library and build book elements
    for (i=0; i<library.length; i++) {
        createBookElement(i);
    }
}

// Removes all bookshelf children
function clearBookshelf() {
    while (bookShelf.firstChild) {
        bookShelf.removeChild(bookShelf.lastChild);
    }
}

// Creates a new book element
function createBookElement(libraryIndex) {

    const book = library.at(libraryIndex);

    // Create card base element
    const newCard = document.createElement("div");

    // Add book image
    const image = document.createElement("img");
    if (book.cover) {
        image.src = book.cover;
    } else {
        image.src = "images/no-cover.jpg";
    }
    newCard.appendChild(image);

    // Add book title
    const header = document.createElement("h3");
    if (book.title) {
        header.innerHTML = book.title;
    } else {
        header.innerHTML = "No Title Provided";
    }
    newCard.appendChild(header);

    // Add book isbn & OpenLibrary link
    if (book.isbn) {
        // ISBN info
        const isbn = document.createElement("h4");
        isbn.innerHTML = "ISBN: " + book.isbn;
        // OpenLibrary info
        const openLibrary = document.createElement("a");
        const linkText = document.createTextNode("View in OpenLibrary");
        openLibrary.appendChild(linkText);
        openLibrary.title = "Open Library Link";
        openLibrary.href = "https://openlibrary.org/isbn/" + book.isbn;
        // Append to card
        newCard.appendChild(isbn);
        newCard.appendChild(openLibrary);
    } 
    

    // Book button container
    const bookButtons = document.createElement("div");
    bookButtons.classList.add("book-buttons"); 

    // Add Read / Not Read button
    const readButton = document.createElement("button");
    if (book.read) {
        readButton.setAttribute("is-read", "true");
        readButton.innerHTML = "Read";
    } else {
        readButton.setAttribute("is-read", "false");
        readButton.innerHTML = "Unread";
    }
    readButton.addEventListener("click", toggleRead);
    bookButtons.appendChild(readButton);

    // Add remove button
    const removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove";
    removeButton.addEventListener("click", removeBook);
    bookButtons.appendChild(removeButton);

    // Add book button container to card
    newCard.appendChild(bookButtons);

    // Set attribute and class
    newCard.setAttribute("lib-index", libraryIndex);
    newCard.classList.add("book");
    bookShelf.appendChild(newCard);
}

// Toggle book read
function toggleRead(e) {
    const bookIndex = getBookIndex(this);
    const bookObject = library.at(bookIndex);
    if (bookObject.read) {
        bookObject.read = false;
        this.setAttribute("is-read", "false");
        this.innerHTML = "Unread";
    } else {
        bookObject.read = true;
        this.setAttribute("is-read", "true");
        this.innerHTML = "Read";
    }
}

// Remove book from library
function removeBook(e) {
    const bookIndex = getBookIndex(this);
    library.splice(bookIndex, 1);  // Remove from library
    updateBookshelf();
}

function getBookIndex(element) {
    const bookCard = element.parentNode.parentNode;  // Get book card
    return bookCard.getAttribute("lib-index");  // Return library index
}

/*
Copyright Message
*/

// Update copyright message in dom with current year
(function addCopyright() {
    const copyrightMessage = document.querySelector("#copyright-message");
    const currentYear = new Date().getFullYear();
    copyrightMessage.innerHTML = `Copyright &copy ${currentYear} George Ciesinski`;
})();  // Self invokes