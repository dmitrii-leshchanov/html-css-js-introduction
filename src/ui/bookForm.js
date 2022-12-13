import { showErrorMessage } from "./errormessage.js";

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
        const value = new Date(element.value);
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
    return new Date();
}