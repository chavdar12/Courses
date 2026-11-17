function passwordGenerator([first, second, key]) {
    let vowelIndex = 0;
    const replaced = (first + second)
        .toLowerCase()
        .replace(/[aeiou]/g, () => key[vowelIndex++ % key.length].toUpperCase());
    console.log(`Your generated password is ${[...replaced].reverse().join('')}`);
}

module.exports = passwordGenerator;
