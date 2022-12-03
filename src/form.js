const inputElements = document.querySelectorAll(".form-class [name]");
const errorElement = document.querySelector(".error");

const minSalary = 1000;
const maxSalary = 40000;
const timeout = 5000;
const minYear = 1950;
const thisYear = new Date().getFullYear();

let timerId = -1;
function onSubmit(event) {
    event.preventDefault();
    const employee = Array.from(inputElements).reduce(
        (res, cur) => {
            res[cur.name] = cur.value;
            return res;
        }, {}
    )
    console.log(employee);
}
function onChange(event) {
    if (event.target.name == "salary") {
        salaryValidation(event);
    }

    if (event.target.name == "birthDate") {
        birthDateValidation(event);
    }
}

function salaryValidation(event) {
    const salary = +event.target.value;
    if(salary < minSalary || salary > maxSalary) {
        errorMessage(event, 
            `Salary should be in a range from ${minSalary} NIS to ${maxSalary} NIS. Salary = ${salary} NIS`);
    }
}

function birthDateValidation(event) {
    const birthDateArr = (event.target.value).split("-");
    const birthYear = +birthDateArr[0];
    if(birthYear < minYear || birthYear > thisYear) {
        errorMessage(event, 
            `Birth year can't be less than ${minYear} and more than ${thisYear}. Selected year = ${birthYear}`);
    }
}

function errorMessage(event, message) {
    event.target.value = '';
    errorElement.innerHTML = message; 
    timerId = setTimeout(() => {
        errorElement.innerHTML = '';
    }, timeout)
}
