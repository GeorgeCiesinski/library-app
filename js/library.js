/*
Dark Mode
*/

const darkModeToggle = document.querySelector(".toggle-switch>label>input");

// Sets data-theme attribute to light or dark
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
        this.isbn = isbn.replace(/-|\s/g,"");  // Removes spaces and dashes
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

    // If ISBN provided, tries to fetch book data
    if (this.isbn) {
        const url = "https://openlibrary.org/isbn/" + this.isbn + ".json";

        // Fetch from Open Library
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    // Promise is rejected if 2xx response not received
                    throw new Error("Not 2xx response", {cause: response});
                }
                return response.json();
            })
            // Updates object data with information from Open Library
            .then((bookData) => {
                this.title = bookData.title;  // Overwrites title with accurate title
                this.cover = "https://covers.openlibrary.org/b/id/" + bookData.covers[0] + "-L.jpg"
                // Add to library array and updates bookshelf
                library.push(this);  
                updateBookshelf();
            })
            .catch((error) => {
                // Log error and display alert
                console.warn("Failed to fetch book data:", error)
                window.alert("Failed to fetch book information from Open Library. Check that the ISBN is correct.")
            });
    } else if (!this.isbn && this.title) {
        // If no ISBN provided, push data as entered by user
        library.push(this);
        updateBookshelf();
    }
    else if (!this.isbn && !this.title) {
        // If no title or ISBN provided, do not add book and display alert
        window.alert("You must provide an ISBN or a title to add a book.")
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

    // Get book data from library array
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

    // Info Div
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info-div");

    // Add book title
    const header = document.createElement("h3");
    if (book.title) {
        header.innerHTML = book.title;
    } else {
        header.innerHTML = "No Title Provided";
    }
    infoDiv.appendChild(header);

    // Add book isbn & OpenLibrary link
    if (book.isbn) {
        // ISBN info
        const isbn = document.createElement("h4");
        isbn.innerHTML = "ISBN: ";
        // OpenLibrary info
        const openLibrary = document.createElement("a");
        const linkText = document.createTextNode(book.isbn);
        openLibrary.appendChild(linkText);
        openLibrary.title = "Open Library Link";
        openLibrary.href = "https://openlibrary.org/isbn/" + book.isbn;
        openLibrary.classList.add("open-library-link");
        // Append to card
        infoDiv.appendChild(isbn);
        isbn.appendChild(openLibrary);
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
    removeButton.classList.add("remove");
    removeButton.addEventListener("click", removeBook);
    bookButtons.appendChild(removeButton);

    // Add book button container to infoDiv
    infoDiv.appendChild(bookButtons);

    // Append infoDiv to card
    newCard.appendChild(infoDiv);

    // Set attribute and class
    newCard.setAttribute("lib-index", libraryIndex);
    newCard.classList.add("book");

    // Add to bookshelf
    bookShelf.appendChild(newCard);
}

// Toggle book read
function toggleRead(e) {
    const bookIndex = getBookIndex(e.currentTarget);
    const bookObject = library.at(bookIndex);
    if (bookObject.read) {
        bookObject.read = false;
        e.currentTarget.setAttribute("is-read", "false");
        e.currentTarget.innerHTML = "Unread";
    } else {
        bookObject.read = true;
        e.currentTarget.setAttribute("is-read", "true");
        e.currentTarget.innerHTML = "Read";
    }
}

// Remove book from library
function removeBook(e) {
    const bookIndex = getBookIndex(this);
    library.splice(bookIndex, 1);  // Remove from library
    updateBookshelf();
}

// Returns book index in library
function getBookIndex(element) {
    const bookCard = element.parentNode.parentNode.parentNode;  // Get book card
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