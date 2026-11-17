function stringIterator(text) {
    // A string's own iterator walks characters; split once and walk the words with an explicit iterator.
    const words = text.split(' ')[Symbol.iterator]();
    for (let step = words.next(); !step.done; step = words.next()) {
        console.log(step.value);
    }
}

module.exports = stringIterator;
