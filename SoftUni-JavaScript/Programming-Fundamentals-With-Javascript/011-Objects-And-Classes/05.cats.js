class Cat {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    meow() {
        console.log(`${this.name}, age ${this.age} says Meow`);
    }
}

function cats(input) {
    input.map((line) => new Cat(...line.split(' '))).forEach((cat) => cat.meow());
}

module.exports = cats;
