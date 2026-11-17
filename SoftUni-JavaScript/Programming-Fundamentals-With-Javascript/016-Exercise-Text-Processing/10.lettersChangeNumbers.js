function lettersChangeNumbers(text) {
    const position = (char) => char.toLowerCase().charCodeAt(0) - 96;
    const isUpper = (char) => char === char.toUpperCase();
    let total = 0;
    for (const token of text.trim().split(/\s+/)) {
        const before = token[0];
        const after = token.at(-1);
        let number = Number(token.slice(1, -1));
        number = isUpper(before) ? number / position(before) : number * position(before);
        number = isUpper(after) ? number - position(after) : number + position(after);
        total += number;
    }
    console.log(total.toFixed(2));
}

module.exports = lettersChangeNumbers;
