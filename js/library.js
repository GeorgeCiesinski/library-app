/*
Dark Mode
*/

const darkModeToggle = document.querySelector(".toggle-switch>label>input");

const switchTheme = function(e) {
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
const clearInputs = function() {
    inputTitle.value = "";
    inputIsdn.value = "";
    inputRead.checked = false;
}

// Show modal
btnAddBook.addEventListener("click", function() {
    console.log("working");
    modal.style.display = "block";
});

// Hide modal when close clicked
btnClose.addEventListener("click", function() {
    modal.style.display = "none";
    clearInputs();
});

// Hide modal when outside modal clicked
window.addEventListener("click", function(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});

/*
Library
*/

/*
Copyright Message
*/

// Update copyright message in dom with current year
const copyrightMessage = document.querySelector("#copyright-message");
const currentYear = new Date().getFullYear();
copyrightMessage.innerHTML = `Copyright &copy ${currentYear} George Ciesinski`;