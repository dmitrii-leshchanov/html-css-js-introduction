import { Library } from "./data/library.js";
import { showErrorMessage } from "./ui/errormessage.js";
import { BookForm } from "./ui/bookform.js";


const authorFormInputElemets = document.querySelectorAll(".author-form-class [name]")

const MIN_PAGES = 50;
const MAX_PAGES = 2000;
const MIN_YEAR = 1980;



const sectionsElement = document.querySelectorAll("section");
const buttonsMenuElement = document.querySelectorAll(".buttons-menu *");
const pagesFormErrorElement = document.querySelector("#pages_form_error");
const booksListElement = document.querySelector("#books-all");
const booksPagesListElement = document.querySelector("#books-bypages-list");
const booksAuthorListElement = document.querySelector("#books-author");


const library = new Library;

const bookForm = new BookForm ({idForm: "book-form", idDateInput: "date-input", idPagesInput: "pages-input", idDateError: "date_error", idPagesError: "pages-error", minYear: MIN_YEAR, minPages: MIN_PAGES, maxPages: MAX_PAGES})
bookForm.addSubmitHandler((book) => library.addBook(book));


//-----------------------------------------------

let pageFrom = 0;
let pageTo = 0;
function onSubmitPages(event) {
    event.preventDefault();
    const books = library.getBooksByPages(pageFrom, pageTo);
    booksPagesListElement.innerHTML = getBookItems(books);
}

function onChangePagesFrom(event) {
    const value = +event.target.value;
    if(pageTo && value >= pageTo) {
        showErrorMessage(event.target, "Page number 'from' nust be less than Page number", pagesFormErrorElement);
    } else {
        pageFrom = value;
    }
}

function onChangePagesTo(event) {
    const value = +event.target.value;
    if(pageFrom && value < pageFrom) {
        showErrorMessage(event.target, "Page 'to' must be greater than Page 'From' ", pagesFormErrorElement);
    } else {
        pageTo = value;
    }
}

function showSection(index) {
    sectionsElement.forEach(e => e.hidden = true)
    sectionsElement[index].hidden = false;
    if(index == 1) {
        const books = library.getAllBooks();
        booksListElement.innerHTML = getBookItems(books);
    }
}

function getBookItems(books) {
    return books.map (book => 
        `<li class = "books-item">
            <div class = "books-item-container">
                <p class="books-item-paragraph">Title: ${book.title} </p>
                <p class="books-item-paragraph">Author: ${book.author} </p>
                <p class="books-item-paragraph">Genre: ${book.genre} </p>
                <p class="books-item-paragraph">Publishing Date: ${book.publishingDate} </p>
                <p class="books-item-paragraph">Number of pages: ${+book.pages} </p>
            </div>
        </li>`).join('');
}

function onSubmitAuthor(event) {
    event.preventDefault();
    const author = Array.from(authorFormInputElemets)[0].value;
    const books = library.getBooksByAuthor(author);
    booksAuthorListElement.innerHTML = getBookItems(books);
}



window.showSection = showSection;
window.onChangePagesTo = onChangePagesTo;
window.onChangePagesFrom = onChangePagesFrom;
window.onSubmitPages = onSubmitPages;
window.onSubmitAuthor = onSubmitAuthor;
