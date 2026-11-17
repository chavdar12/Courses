function addAndSubtract(arr) {
    const modified = arr.map((n, i) => (n % 2 === 0 ? n + i : n - i));
    const sum = (numbers) => numbers.reduce((a, b) => a + b, 0);
    console.log(modified);
    console.log(sum(arr));
    console.log(sum(modified));
}

module.exports = addAndSubtract;
