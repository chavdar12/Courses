function charactersInRange(first, second) {
    const [from, to] = [first.charCodeAt(0), second.charCodeAt(0)].sort((a, b) => a - b);
    const chars = [];
    for (let code = from + 1; code < to; code++) {
        chars.push(String.fromCharCode(code));
    }
    console.log(chars.join(' '));
}

module.exports = charactersInRange;
