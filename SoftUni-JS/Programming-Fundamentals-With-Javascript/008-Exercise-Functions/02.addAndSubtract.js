function addAndSubtract(a, b, c) {
    const sum = (x, y) => x + y;
    const subtract = (x, y) => x - y;
    console.log(subtract(sum(a, b), c));
}

module.exports = addAndSubtract;
