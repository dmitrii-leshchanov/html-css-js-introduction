function createRandomEmployees(nEmpoloyees, idDigits, minSalary, maxSalary, minBirthYear, maxBirhYear) {

    let empoloyeesArray = [];
    for(i = 0; i < nEmpoloyees; i++) {
        empoloyeesArray[i] = createEmployee(getId(idDigits), getRandomIntInrange(minSalary, maxSalary), getRandomIntInrange(minBirthYear, maxBirhYear));
    }
    return empoloyeesArray;
}

function getId(idDigits) {
    let id = 0;
    do {
        id =  Math.floor(Math.random() * Math.pow(10, idDigits));
    } while (idDigits != id.toString().length)
    return id;
}

function createEmployee(id, salary, birthYear) {
    return {id, salary, birthYear};
}

function getRandomIntInrange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getAverangeAge(employees) {
    const thisYear = new Date().getFullYear();
    const summOfYears = employees.reduce(function(prev, cur) {
        return prev + (thisYear - cur.birthYear);
    }, 0);
    const averageAge = Math.floor(summOfYears / employees.length);
    return averageAge;
}

function getEmployeesBySalary(employees, salaryFrom, salaryTo) {
    let filtred = employees.filter(e => e.salary >= salaryFrom && e.salary <= salaryTo);
    let sorted = filtred.sort((e1, e2) => e1.salary - e2.salary);
    return sorted;
}

function increaseSalary(employees, borderSalary, percent) {
    let filtred = employees.filter(e => e.salary < borderSalary);
    let increaced = filtred.map(e => e.salary + (e.salary * percent / 100));
    for(i = 0; i < filtred.length; i++) {
        filtred[i].salary = increaced[i];
    }

    return filtred;
}

const nEmpoloyees = 20;
const idDigits = 4;
const minSalary = 5600;
const maxSalary = 15000;
const minBirthYear = 1950;
const maxBirhYear = 2002;
const employees = createRandomEmployees(nEmpoloyees, idDigits, minSalary, maxSalary, minBirthYear, maxBirhYear);
console.log("List of employees:", employees);

const averageAge = getAverangeAge(employees);
console.log(`The average age of employees is: ${averageAge}`);

const minSalaryBorder = 8900;
const maxSalaryBorder = 14800;
const employeesInSalaryRange = getEmployeesBySalary(employees, minSalaryBorder, maxSalaryBorder);
console.log(`List of employees in salary range from ${minSalaryBorder} to ${maxSalaryBorder}`, employeesInSalaryRange);

const percentToIncrease = 10;
const employeesWithIncresedSalary = increaseSalary(employees, minSalaryBorder, percentToIncrease);
console.log(`List of employees with a ${percentToIncrease}% increase to salary `, employeesWithIncresedSalary);

const finalEmployees = employees.sort((e1, e2) => e1.salary - e2.salary);
console.log("Final list of employees:", finalEmployees);

