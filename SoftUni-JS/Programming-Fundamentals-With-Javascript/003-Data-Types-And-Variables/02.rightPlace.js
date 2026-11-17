function rightPlace(word, char, expected) {
    console.log(word.replace('_', char) === expected ? 'Matched' : 'Not Matched');
}

module.exports = rightPlace;
