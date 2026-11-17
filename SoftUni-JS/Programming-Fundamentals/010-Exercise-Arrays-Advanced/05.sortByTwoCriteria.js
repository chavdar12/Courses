function sortByTwoCriteria(arr) {
    [...arr]
        .sort((a, b) => a.length - b.length || a.toLowerCase().localeCompare(b.toLowerCase()))
        .forEach((word) => console.log(word));
}

module.exports = sortByTwoCriteria;
