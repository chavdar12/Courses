function modernTimesOfHashTag(text) {
    text.split(' ')
        .filter((word) => /^#[A-Za-z]+$/.test(word))
        .forEach((word) => console.log(word.slice(1)));
}

module.exports = modernTimesOfHashTag;
