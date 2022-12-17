export class AuthorForm {
    #formElement;
    #authorInputElement;

    constructor(params) {
        this.#formElement = document.getElementById(params.idForm);
        this.#authorInputElement = document.getElementById(params.idAuthorInput);
    }

    addSubmitHandler(processAuthorFun) {
        this.#formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            const author = this.#authorInputElement.value;
            processAuthorFun(author);
        })
    }
}