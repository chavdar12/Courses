function distinctArray(arr) {
    console.log([...new Set(arr)].join(' '));
}

module.exports = distinctArray;
