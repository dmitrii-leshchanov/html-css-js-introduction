function f1() {
    const a = this;
    return a;
}

function f2() {
    const a = this;
    return a;
}

const f = f1();
f1();

console.log(f);