function censoredWords(text, word) {
    console.log(text.replaceAll(word, '*'.repeat(word.length)));
}

module.exports = censoredWords;
