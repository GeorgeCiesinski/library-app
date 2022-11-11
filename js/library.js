// Modal
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

// Update copyright message in dom with current year
const updateCopyright = function() {
    const copyrightMessage = document.querySelector("#copyright-message");
    const currentYear = new Date().getFullYear();
    copyrightMessage.innerHTML = `Copyright &copy ${currentYear} George Ciesinski`;
}   

updateCopyright();
