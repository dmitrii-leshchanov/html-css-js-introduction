const inputElements = document.querySelectorAll(".form-class [name]");
const labelElements = document.querySelectorAll("[for]");
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
        if(+event.target.value < 1000 || +event.target.value > 40000){
            event.target.value=''
            labelElements[1].hidden = false;
            labelElements[1].style.color = 'red';
            setTimeout(() => {
                labelElements[1].hidden = true;
            }, 5000);  
        }
    }

    if (event.target.name == "birthDate") {
        const birthArr = event.target.value.split("-");
        const thisYear = new Date().getFullYear();
        if(birthArr[0] < 1950 || birthArr[0] > thisYear) {
            event.target.value = '';
            labelElements[0].hidden = false;
            labelElements[0].style.color = 'red';
            setTimeout(() => {
                labelElements[0].hidden = true;
            }, 5000);
        }
    }
}
