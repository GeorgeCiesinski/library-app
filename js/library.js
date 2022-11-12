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

/*
Modal
*/
const modal = document.querySelector("#book-modal");
const addBook = document.querySelector("#add-book");
const close = document.querySelector("#close");

// Show modal
addBook.addEventListener("click", function() {
    console.log("working");
    modal.style.display = "block";
});

// Hide modal when close clicked
close.addEventListener("click", function() {
    modal.style.display = "none";
});

// Hide modal when outside modal clicked
window.addEventListener("click", function() {
    if (this.event.target == modal) {
        modal.style.display = "none";
    }
});

/*
Copyright Message
*/

// Update copyright message in dom with current year
const updateCopyright = function() {
    const copyrightMessage = document.querySelector("#copyright-message");
    const currentYear = new Date().getFullYear();
    copyrightMessage.innerHTML = `Copyright &copy ${currentYear} George Ciesinski`;
}   

updateCopyright();
