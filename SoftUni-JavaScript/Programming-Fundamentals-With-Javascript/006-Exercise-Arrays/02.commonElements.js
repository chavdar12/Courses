function commonElements(first, second) {
    first.filter((element) => second.includes(element)).forEach((element) => console.log(element));
}

module.exports = commonElements;
