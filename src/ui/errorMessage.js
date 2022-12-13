const timeOut = 5000;
const errorClass = "error";

export function showErrorMessage(element, message, errorElement) {
    errorElement.innerHTML = message;
    setTimeout(() => {
        element.classList.remove(errorClass);
        element.value = '';
        errorElement.innerHTML = '';
    }, timeOut); 
}