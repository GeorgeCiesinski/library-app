// Update copyright message in dom with current year
const updateCopyright = function() {
    const copyrightMessage = document.querySelector("#copyright-message");
    const currentYear = new Date().getFullYear();
    copyrightMessage.innerHTML = `Copyright &copy ${currentYear} George Ciesinski`;
}   

updateCopyright();
