function repeatString(text, count) {
    const repeat = (str, n) => str.repeat(n);
    console.log(repeat(text, count));
}

module.exports = repeatString;
