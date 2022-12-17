import { Library } from "./data/library.js";
import { BookForm } from "./ui/bookForm.js";
import { BooksList } from "./ui/booksList.js";
import { PagesForm } from "./ui/pagesForm.js";
import { AuthorForm } from "./ui/authorForm.js";
const MIN_PAGES = 50;
const MAX_PAGES = 2000;
const MIN_YEAR = new Date('1980-01-01');



const listAllBooks = new BooksList("books-all");
const listBooksByPages = new BooksList("books-bypages-list");
const listBooksByAuthor = new BooksList("books-author");
const sectionsElement = document.querySelectorAll("section");
const buttonsMenuElement = document.querySelectorAll(".buttons-menu *");


const library = new Library();

// ****   Book Form    ****

const paramsBookForm = {idForm: "book-form", idDateInput: "date-input", idPagesInput: "pages-input", idDateError: "date_error", idPagesError: "pages-error", minYear: MIN_YEAR, minPages: MIN_PAGES, maxPages: MAX_PAGES}
const bookForm = new BookForm (paramsBookForm);

bookForm.addSubmitHandler((book) => library.addBook(book));

// ****   Pages Form    ****
const pagesParams = {
    idForm: "#pages-form", idSalaryFromInput: "#pages-from",
    idSalaryToInput: "#pages-to", idErrorMessage: "#pages_form_error"
}
const pagesForm = new PagesForm(pagesParams);
pagesForm.addSubmitHandler((pagesObj) => {
    const books = library.getBooksByPages(pagesObj.pagesFrom, pagesObj.pagesTo);
    listBooksByPages.showBooks(books);
})

// ****   Author Form    ****
const paramsAuthorForm = {
    idForm: "author-form",
    idAuthorInput: "author-input"
}

const authorForm = new AuthorForm(paramsAuthorForm);
authorForm.addSubmitHandler((author) => {
    const books = library.getBooksByAuthor(author);
    listBooksByAuthor.showBooks(books);
})

// ****   Show Section    ****

function showSection(index) {
    sectionsElement.forEach(e => e.hidden = true)
    sectionsElement[index].hidden = false;
    if(index == 1) {
        const books = library.getAllBooks();
        listAllBooks.showBooks(books);
    }
}


window.showSection = showSection;
