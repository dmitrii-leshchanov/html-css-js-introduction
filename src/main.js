import { Library } from "./data/library.js";
const booksFormInputElements = document.querySelectorAll(".books-form-class [name]");
const authorFormInputElemets = document.querySelectorAll(".author-form-class [name]")

const minPages = 50;
const maxPages = 2000;
const minYear = 1980;
const maxYear = getMaxYear();
const timeOut = 5000;
const errorClass = "error";


const sectionsElement = document.querySelectorAll("section");
const buttonsMenuElement = document.querySelectorAll(".buttons-menu *");
const dateErrorElement = document.querySelector("#date_error");
const pagesErrorElement = document.getElementById("pages_error");
const pagesFormErrorElement = document.querySelector("#pages_form_error");
const booksListElement = document.querySelector("#books-all");
const booksPagesListElement = document.querySelector("#books-bypages-list");
const booksAuthorListElement = document.querySelector("#books-author");


const library = new Library;


function getMaxYear() {
    return new Date().getFullYear();
}


function onSubmitBookForm(event) {
    event.preventDefault();
    const book = Array.from(booksFormInputElements).reduce(
        (res, cur) => {
            res[cur.name] = cur.value;
            return res;
        }, {}
    )
    console.log(book);
    library.addBook(book);
}

function onChangeBookForm(event) {
    if(event.target.name == "pages") {
        validatePages(event.target);
    } else if (event.target.name == "publishingDate") {
        validatePublishingDate(event.target);
    }
}

function validatePages(element) {
    const value = +element.value;
    if(value < minPages || value > maxPages) {
        const message = value < minPages ? `number of pages should be ${minPages} or greater` : `number of pages can't be more than ${maxPages}`;
        showErrorMessage(element, message, pagesErrorElement);
    }
}

function validatePublishingDate(element) {
    const value = +element.value.slice(0,4);
    if(value < minYear || value > maxYear) {
        const message = value < minYear ? `year should be ${minYear} or greater` : `year must be ${maxYear} or less`;
        showErrorMessage(element, message, dateErrorElement);
    }
}

function showErrorMessage(element, message, errorElement) {
    errorElement.innerHTML = message;
    setTimeout(() => {
        element.classList.remove(errorClass);
        element.value = '';
        errorElement.innerHTML = '';
    }, timeOut); 
}


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



window.onSubmitBookForm = onSubmitBookForm;
window.onChangeBookForm = onChangeBookForm;
window.showSection = showSection;
window.onChangePagesTo = onChangePagesTo;
window.onChangePagesFrom = onChangePagesFrom;
window.onSubmitPages = onSubmitPages;
window.onSubmitAuthor = onSubmitAuthor;
