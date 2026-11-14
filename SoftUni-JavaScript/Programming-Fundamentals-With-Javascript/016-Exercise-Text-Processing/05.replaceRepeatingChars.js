function replaceRepeatingChars(text) {
    console.log([...text].filter((char, i) => char !== text[i - 1]).join(''));
}

module.exports = replaceRepeatingChars;
