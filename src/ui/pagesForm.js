import { showErrorMessage } from "./errorMessage.js";

export class PagesForm {
    #formElement;
    #pagesFromInputElement;
    #pagesToInputElement;
    #errorMessageElement;
    #pagesFrom;
    #pagesTo;

    constructor(params) {
        this.#formElement = document.querySelector("#pages-form");
        this.#pagesFromInputElement = document.querySelector("#pages-from");
        this.#pagesToInputElement = document.querySelector("#pages-to");
        this.#errorMessageElement = document.querySelector("#pages_form_error");
        this.onChangePagesFrom();
        this.onChangePagesTo();
    }

    addSubmitHandler(processPagesFun) {
        this.#formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            const pagesObj = {pagesFrom: this.#pagesFrom, pagesTo: this.#pagesTo};
            processPagesFun(pagesObj);
        })
    }

    onChangePagesFrom() {
        this.#pagesFromInputElement.addEventListener("change", (event) => {
            const value = +event.target.value;
            if(this.#pagesTo &&  value >= this.#pagesTo) {
                showErrorMessage(event.target, "Pages 'from' must be less than Pages 'to'", this.#errorMessageElement);
            } else {
                this.#pagesFrom = value;
            }
        })
    }

    onChangePagesTo() {
        this.#pagesToInputElement.addEventListener("change", (event) => {
            const value = +event.target.value;
            if(this.#pagesFrom && value < this.#pagesFrom) {
                showErrorMessage(event.target, "Pages 'To' must be greater than Pages 'From'", this.#errorMessageElement);
            }
            this.#pagesTo = value;
        })
    }
}