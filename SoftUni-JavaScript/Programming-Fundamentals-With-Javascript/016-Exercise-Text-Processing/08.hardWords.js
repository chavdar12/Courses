function hardWords([letter, words]) {
    console.log(letter.replace(/_+/g, (hole) => words.find((word) => word.length === hole.length) ?? hole));
}

module.exports = hardWords;
