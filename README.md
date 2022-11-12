# library-app
Library app built as an assignment for The Odin Project 

## Project Information
This app makes use of object constructors to create new books and load them into the bookshelf. 

## Difficulties Encountered

### Dark Mode & Toggle
My main difficulty with this project was implementing a dark mode. This is my first dark mode in any project. I couldn't decide at first if I wanted a CSS only dark mode, or if I wanted to use JS. After spending some time researching it I realized that the CSS only dark mode would not be well suited for the project. Since it worked by placing the dark-mode input first in the webpage and using the CSS selector `#dark-mode:checked ~ *`, it meant that I had to structure the page in a specific way for it to work, and would add difficulties styling it so the toggle appeared where I wanted it. In short, it would take a ton of code.

I researched further and found an [article](https://dev.to/ananyaneogi/create-a-dark-light-mode-switch-with-css-variables-34l8) by [Ananya Neogi](https://dev.to/ananyaneogi) which showed how to make a JS dark mode. This article made it really easy to understand, and it seemed to achieve the same thing as the CSS only method with only a few lines of code. After implementing the JS method, I was really happy with the result. 

Lastly, I added dark mode detection following [this stack overflow](https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript) answer so that the site uses the user's default theme. 