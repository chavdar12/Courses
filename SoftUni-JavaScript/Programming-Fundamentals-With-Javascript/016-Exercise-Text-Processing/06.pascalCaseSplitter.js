function pascalCaseSplitter(text) {
    console.log(text.match(/[A-Z][a-z]*/g).join(', '));
}

module.exports = pascalCaseSplitter;
