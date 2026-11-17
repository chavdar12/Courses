function maxNumber(arr) {
    const tops = arr.filter((n, i) => arr.slice(i + 1).every((right) => n > right));
    console.log(tops.join(' '));
}

module.exports = maxNumber;
