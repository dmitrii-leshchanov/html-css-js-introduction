export class BookForm {
    #booksFormInputElements;
    #dateErrorElement;
    #pagesErrorElement;
    #formElement;
    #dateInputElement;
    #pagesInputElement;
    #minPages;
    #maxPages;
    #minYear;
    #maxYear;

    constructor (params) {
        this.#booksFormInputElements = document.querySelectorAll(".books-form-class [name]");
        this.#dateErrorElement = document.querySelector("#date_error");
        this.#pagesErrorElement = document.querySelector("#pages_error");
        this.#formElement = document.querySelector("#book-form");
        this.#dateInputElement = document.querySelector("#date-input");
        this.#pagesInputElement = document.querySelector("#pages-input");
        this.#minPages = params.minPages;
        this.#maxPages = params.maxPages;
        this.#minYear = params.minYear;
        this.#maxYear = getMaxYear();
        this.onChange();
    }

    addSubmitHandler(processBooksFun) {
        this.#formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            const book = Array.from(this.#booksFormInputElements).reduce(
                (res, cur) => {
                    res[cur.name] = cur.value;
                    return res;
                }, {}
            )
            console.log(book);
            processBooksFun(book);
        })
    }

    onChange() {
        this.#dateInputElement.addEventListener("change", (event) => {
            this.validatePublishingDate(event.target);
        })
        this.#pagesInputElement.addEventListener("change", (event) => {
            this.validatePages(event.target);
        })
    }

    validatePublishingDate(element) {
        const value = +element.value.slice(0,4);
        if(value < this.#minYear || value > this.#maxYear) {
            const message = value < this.#minYear ? `year should be ${this.#minYear} or greater` : `year must be ${this.#maxYear} or less`;
            showErrorMessage(element, message, this.#dateErrorElement);
        }
    }

    validatePages(element) {
        const value = +element.value;
        if(value < this.#minPages || value > this.#maxPages) {
            const message = value < this.#minPages ? `number of pages should be ${this.#minPages} or greater` : `number of pages can't be more than ${this.#maxPages}`;
            showErrorMessage(element, message, this.#pagesErrorElement);
        }
    }
}

function getMaxYear() {
    return new Date().getFullYear();
}









import { Library } from "./data/library.js";
import { showErrorMessage } from "./src/ui/errormessage.js";
import { BookForm } from "./src/ui/bookform.js";


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