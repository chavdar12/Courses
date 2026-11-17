function revealWords(wordsLine, template) {
    let text = template;
    for (const word of wordsLine.split(', ')) {
        text = text.replace('*'.repeat(word.length), word);
    }
    console.log(text);
}

module.exports = revealWords;
